const express = require('express');
const cors = require('cors');
const axios = require('axios');
const OpenAI = require('openai');
const { onRequest } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');

const OPENAI_API_KEY = defineSecret('OPENAI_API_KEY');
const RAPID_API_KEY = defineSecret('RAPID_API_KEY');

const app = express();
app.use(cors());
app.use(express.json());

const RAPID_API_HOST = 'booking-com15.p.rapidapi.com';

// 🔎 Chat Endpoint
app.post('/chat', async (req, res) => {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const rapidApiKey = process.env.RAPID_API_KEY;
    const { query, sessionId } = req.body;

    const intentPrompt = `Classify the user query as either "travel" or "general". Only reply with "travel" or "general".\nQuery: "${query}"`;
    const intentRes = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: intentPrompt }],
    });

    const intent = intentRes.choices[0].message.content.trim().toLowerCase().replace(/["']/g, '');

    if (intent !== 'travel') {
      const generalRes = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: query }],
      });
      const reply = generalRes.choices[0].message.content.trim();
      return res.json({ message: reply, flights: [], hotels: [], itinerary: null });
    }

    const extractPrompt = `Extract the departure and destination cities from this user query: "${query}". Respond as JSON like {"fromCity": "...", "toCity": "..."}`;
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: extractPrompt }],
    });

    let fromCity, toCity;
    try {
      const parsed = JSON.parse(completion.choices[0].message.content);
      fromCity = parsed.fromCity;
      toCity = parsed.toCity;
    } catch {
      return res.status(400).json({ message: 'Could not extract cities.' });
    }

    const headers = {
      'X-RapidAPI-Key': rapidApiKey,
      'X-RapidAPI-Host': RAPID_API_HOST,
    };

    const searchFlightDestination = async (city) => {
      const url = `https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination?query=${encodeURIComponent(city)}`;
      const response = await axios.get(url, { headers });
      return response.data.data;
    };

    const searchHotelDestination = async (city) => {
      const url = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination?query=${encodeURIComponent(city)}`;
      const response = await axios.get(url, { headers });
      return response.data.data;
    };

    const getFlightData = async (fromId, toId, departDate) => {
      const url = `https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights`;
      const params = {
        fromId,
        toId,
        departDate,
        stops: 'none',
        pageNo: 1,
        adults: 1,
        children: '0,17',
        sort: 'BEST',
        cabinClass: 'ECONOMY',
        currency_code: 'PKR',
      };
      const response = await axios.get(url, { headers, params });
      return response.data?.data?.flightOffers || [];
    };

    const searchHotels = async (dest_id, search_type, arrivalDate, departureDate) => {
      const url = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels`;
      const params = {
        dest_id,
        search_type,
        arrival_date: arrivalDate,
        departure_date: departureDate,
        adults: 1,
        children_age: '0,17',
        room_qty: 1,
        page_number: 1,
        units: 'metric',
        temperature_unit: 'c',
        languagecode: 'en-us',
      };
      const response = await axios.get(url, { headers, params });
      return response.data?.data?.hotels || [];
    };

    const today = new Date();
    const departDate = today.toISOString().split('T')[0];
    const returnDate = new Date(today.getTime() + 86400000).toISOString().split('T')[0];

    const [fromData, toData, hotelData] = await Promise.all([
      searchFlightDestination(fromCity),
      searchFlightDestination(toCity),
      searchHotelDestination(toCity),
    ]);

    const fromDest = fromData?.find(item => item.id?.includes('AIRPORT')) || fromData?.[0];
    const toDest = toData?.find(item => item.id?.includes('AIRPORT')) || toData?.[0];
    const hotelDest = hotelData?.find(item => item.dest_id);

    let flights = [], hotels = [];

    if (fromDest?.id && toDest?.id) {
      flights = await getFlightData(fromDest.id, toDest.id, departDate);
    }

    if (hotelDest) {
      hotels = await searchHotels(hotelDest.dest_id, hotelDest.search_type, departDate, returnDate);
    }

    res.json({
      message: `Flights Found: ${flights.length}, Hotels Found: ${hotels.length}`,
      flights,
      hotels
    });

  } catch (error) {
    console.error('Chat Error:', error.message);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

// 🛫 Flights Endpoint (with optional return date)
app.post('/find-flights', async (req, res) => {
  try {
    const { fromId, toId, departDate, returnDate } = req.body;
    const headers = {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': RAPID_API_HOST,
    };

    const params = {
      fromId,
      toId,
      departDate,
      stops: 'none',
      adults: 1,
      children: '0,17',
      sort: 'BEST',
      cabinClass: 'ECONOMY',
      currency_code: 'PKR',
    };

    if (returnDate) params.returnDate = returnDate;

    const response = await axios.get('https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights', { headers, params });
    res.json({ flights: response.data?.data?.flightOffers || [] });
  } catch (error) {
    console.error('Flight fetch failed:', error.message);
    res.status(500).json({ error: 'Flight fetch failed.' });
  }
});

// ✈️ Itinerary Generation
app.post('/generate-itinerary', async (req, res) => {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const { query } = req.body;

    const extractPrompt = `From the user request: "${query}", extract destination and number of days. Return JSON like: {"city": "Lahore", "days": 3}`;
    const extractRes = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: extractPrompt }],
    });

    const { city, days } = JSON.parse(extractRes.choices[0].message.content.trim());

    const itineraryPrompt = `Create a ${days}-day itinerary for ${city} including sightseeing and local culture.`;
    const itineraryRes = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: itineraryPrompt }],
    });

    res.json({ message: `Here's your itinerary:`, itinerary: itineraryRes.choices[0].message.content.trim() });

  } catch (error) {
    console.error('Itinerary Error:', error.message);
    res.status(500).json({ message: 'Failed to generate itinerary.' });
  }
});

exports.api = onRequest({ secrets: [OPENAI_API_KEY, RAPID_API_KEY] }, app);
