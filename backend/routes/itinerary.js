const express = require('express');
const router = express.Router();
const { extractTripDetails } = require('../services/openaiService');
const { searchHotels } = require('../services/bookingService');
const { searchFlights } = require('../services/flightService');

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;

    const tripDetails = await extractTripDetails(prompt);

    const hotels = await searchHotels(tripDetails);
    const flights = await searchFlights(tripDetails);

    const itinerary = {
      summary: `Trip from ${tripDetails.origin} to ${tripDetails.destination} for ${tripDetails.duration} days.`,
      hotelOptions: hotels,
      flightOptions: flights,
      itineraryPlan: generateDayWisePlan(tripDetails),
    };

    res.json(itinerary);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating itinerary');
  }
});

function generateDayWisePlan(tripDetails) {
  let plan = [];
  for (let i = 1; i <= tripDetails.duration; i++) {
    plan.push({ day: i, activities: `Explore Islamabad - Day ${i}` });
  }
  return plan;
}

module.exports = router;
