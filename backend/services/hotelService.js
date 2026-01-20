import { BOOKING_API_KEY } from "../config/apiConfig"

// Function to search for hotels
export async function searchHotels(city, checkIn, checkOut) {
  try {
    const url = "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels"
    const queryParams = new URLSearchParams({
      dest_id: getCityId(city),
      search_type: "CITY",
      arrival_date: checkIn,
      departure_date: checkOut,
      adults: "1",
      children_age: "0",
      room_qty: "1",
      page_number: "1",
      languagecode: "en-us",
      currency_code: "PKR",
    })

    const response = await fetch(`${url}?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": BOOKING_API_KEY,
        "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
      },
    })

    if (!response.ok) {
      throw new Error(`Hotel API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching hotel data:", error)
    return { result: [] }
  }
}

// Function to get city ID for Booking.com API
function getCityId(city) {
  const cityToId = {
    karachi: "-2214278",
    lahore: "-2213939",
    islamabad: "-2212777",
    peshawar: "-2214098",
    quetta: "-2214160",
    multan: "-2214020",
    faisalabad: "-2212621",
    sialkot: "-2214233",
  }

  return cityToId[city.toLowerCase()] || "-2213939" // Default to Lahore if not found
}

// Function to format date for the API (YYYY-MM-DD)
export function formatDate(date) {
  return date.toISOString().split("T")[0]
}
