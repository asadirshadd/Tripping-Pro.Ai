const express = require('express');
const cors = require('cors');
const axios = require('axios');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const RAPID_API_KEY = process.env.RAPID_API_KEY;
const RAPID_API_HOST = 'booking-com15.p.rapidapi.com';

const headers = {
  'X-RapidAPI-Key': RAPID_API_KEY,
  'X-RapidAPI-Host': RAPID_API_HOST,
};

async function extractCities(userQuery) {
  const prompt = `Extract the departure and destination cities from this user query: "${userQuery}". Respond as JSON like {"fromCity": "...", "toCity": "..."}.`;
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });
  return JSON.parse(completion.choices[0].message.content);
}

async function searchFlightDestination(city) {
  const url = `https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination?query=${encodeURIComponent(city)}`;
  const response = await axios.get(url, { headers });
  return response.data.data;
}

async function searchHotelDestination(city) {
  const url = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination?query=${encodeURIComponent(city)}`;
  const response = await axios.get(url, { headers });
  return response.data.data;
}

async function getFlightData(fromId, toId, departDate) {
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
  };
  const response = await axios.get(url, { headers, params });
  return response.data?.data?.airlines || [];
}

async function searchHotels(dest_id, search_type, arrivalDate, departureDate) {
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
}

app.post('/chat', async (req, res) => {
  const userQuery = req.body.query;

  try {
    const intentPrompt = `Classify the user query as either "travel" or "general". Only reply with "travel" or "general".\nQuery: "${userQuery}"`;
    const intentRes = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: intentPrompt }],
    });

    let intent = intentRes.choices[0].message.content.trim().toLowerCase().replace(/["']/g, '');

    if (intent !== 'travel') {
      const generalRes = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userQuery }],
      });
      const reply = generalRes.choices[0].message.content.trim();
      return res.json({ message: reply, flights: null, hotels: null, itinerary: null });
    }

    const { fromCity, toCity } = await extractCities(userQuery);

    const today = new Date();
    const departDate = today.toISOString().split('T')[0];
    const arrivalDate = departDate;
    const departureDate = new Date(today.getTime() + 86400000).toISOString().split('T')[0];

    const [fromData, toData, hotelData] = await Promise.all([
      searchFlightDestination(fromCity),
      searchFlightDestination(toCity),
      searchHotelDestination(toCity),
    ]);

    const fromDest = fromData?.find(item => item.id?.includes('AIRPORT')) || fromData?.[0];
    const toDest = toData?.find(item => item.id?.includes('AIRPORT')) || toData?.[0];
    const hotelDest = hotelData?.find(item => item.dest_id);

    let flights = [];
    let hotels = [];

    if (fromDest?.id && toDest?.id) {
      flights = await getFlightData(fromDest.id, toDest.id, departDate);
    }

    if (hotelDest) {
      hotels = await searchHotels(hotelDest.dest_id, hotelDest.search_type, arrivalDate, departureDate);
    }

    const hasResults = flights.length > 0 || hotels.length > 0;
    const summaryMessage = hasResults
      ? `Flights Found: ${flights.length}\nHotels Found: ${hotels.length}`
      : `Sorry, no results found.`;

    res.json({ message: summaryMessage, flights, hotels });

  } catch (error) {
    console.error('Chat Error:', error.message);
    res.status(500).json({ message: 'Error processing your request.' });
  }
});

app.post('/generate-itinerary', async (req, res) => {
  const userMessage = req.body.query;

  try {
    const extractPrompt = `From the following user request: "${userMessage}", extract ONLY the destination city and number of days. Format: {"city": "...", "days": ...}. If not available, return nulls.`;
    const extractRes = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: extractPrompt }],
    });

    const { city, days } = JSON.parse(extractRes.choices[0].message.content.trim());

    if (!city || !days) {
      return res.json({ message: 'Please specify the city and number of days for your itinerary.' });
    }

    const itineraryPrompt = `Create a detailed day-by-day travel itinerary for a ${days}-day trip to ${city}. Include sightseeing, local experiences, cultural highlights, and dining recommendations. Format: Day 1: ..., Day 2: ..., etc.`;

    const itineraryRes = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: itineraryPrompt }],
    });

    const itinerary = itineraryRes.choices[0].message.content.trim();

    res.json({ message: `Itinerary for ${days} days in ${city}:`, itinerary });

  } catch (error) {
    console.error('Itinerary Error:', error.message);
    res.status(500).json({ message: 'Failed to generate itinerary.' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
