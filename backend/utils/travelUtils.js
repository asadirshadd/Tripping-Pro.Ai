export function extractTravelDetails(query) {
  let fromCity = "karachi";
  let toCity = "lahore";
  let departureDate = new Date();
  departureDate.setDate(departureDate.getDate() + 7);

  let returnDate = new Date(departureDate);
  returnDate.setDate(returnDate.getDate() + 3);

  const fromMatch = query.match(/from\s+(\w+)/i);
  const toMatch = query.match(/to\s+(\w+)/i);

  if (fromMatch && fromMatch[1]) {
    fromCity = fromMatch[1].toLowerCase();
  }

  if (toMatch && toMatch[1]) {
    toCity = toMatch[1].toLowerCase();
  }

  const dateMatch = query.match(/(\d{1,2})[/-](\d{1,2})[/-](\d{4})/);
  if (dateMatch) {
    const day = Number.parseInt(dateMatch[1]);
    const month = Number.parseInt(dateMatch[2]) - 1;
    const year = Number.parseInt(dateMatch[3]);
    departureDate = new Date(year, month, day);

    returnDate = new Date(departureDate);
    returnDate.setDate(departureDate.getDate() + 3);
  }

  return { fromCity, toCity, departureDate, returnDate };
}

export const getAirportCode = (city) => {
  const cityToCode = {
    karachi: "KHI",
    lahore: "LHE",
    islamabad: "ISB",
    peshawar: "PEW",
    quetta: "UET",
    multan: "MUX",
    faisalabad: "LYP",
    sialkot: "SKT",
    dubai: "DXB",
    london: "LON",
    "new york": "NYC",
  };
  return cityToCode[city.toLowerCase()] || city.toUpperCase();
};
