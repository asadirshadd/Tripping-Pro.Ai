import { FLIGHT_API_KEY } from "../config/apiConfig"

// Function to search for flights
export async function searchFlights(from, to, date) {
  try {
    const url = "https://kiwi-com-cheap-flights.p.rapidapi.com/flights"
    const queryParams = new URLSearchParams({
      fly_from: from,
      fly_to: to,
      date_from: date,
      date_to: date,
      adults: "1",
      children: "0",
      infants: "0",
      selected_cabins: "M",
      limit: "5",
    })

    const response = await fetch(`${url}?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": FLIGHT_API_KEY,
        "X-RapidAPI-Host": "kiwi-com-cheap-flights.p.rapidapi.com",
      },
    })

    if (!response.ok) {
      throw new Error(`Flight API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching flight data:", error)
    return { data: [] }
  }
}

// Function to get airport code from city name
export function getAirportCode(city) {
  const cityToCode = {
    karachi: "KHI",
    lahore: "LHE",
    islamabad: "ISB",
    peshawar: "PEW",
    quetta: "UET",
    multan: "MUX",
    faisalabad: "LYP",
    sialkot: "SKT",
  }

  return cityToCode[city.toLowerCase()] || city.toUpperCase()
}

// Function to format date for the API
export function formatDate(date) {
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}
