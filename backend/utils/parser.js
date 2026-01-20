// utils/parser.js

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function extractCities(text) {
  const timePhrases = ['next week', 'this week', 'today', 'tomorrow'];
  let cleanedText = text.toLowerCase();
  timePhrases.forEach(phrase => {
    cleanedText = cleanedText.replace(new RegExp(phrase, 'gi'), '').trim();
  });

  const regex = /from\s+(.+?)\s+(?:to|in)\s+(.+)/i;
  const match = cleanedText.match(regex);

  let fromCity = match && match[1] ? capitalize(match[1].trim()) : null;
  let toCity = match && match[2] ? capitalize(match[2].trim()) : null;

  return { fromCity, toCity };
}

function parseDates(text) {
  const today = new Date();
  let departDate = today.toISOString().split('T')[0];

  if (text.toLowerCase().includes('next week')) {
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    departDate = nextWeek.toISOString().split('T')[0];
  }

  const arrivalDate = departDate;
  const departureDate = new Date(new Date(arrivalDate).getTime() + 2 * 86400000)
    .toISOString().split('T')[0];

  return { departDate, arrivalDate, departureDate };
}

module.exports = { extractCities, parseDates };
