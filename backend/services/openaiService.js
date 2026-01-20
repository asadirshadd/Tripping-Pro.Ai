require("dotenv").config()
const axios = require("axios")

// OpenAI API key from environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY

// Function to generate a response from OpenAI
exports.generateTravelRecommendation = async (userQuery, flightData, hotelData) => {
  try {
    // Prepare flight and hotel data for the AI prompt
    let travelDataPrompt = ""

    if (flightData && flightData.data && flightData.data.length > 0) {
      travelDataPrompt += "FLIGHT OPTIONS:\n"
      flightData.data.slice(0, 3).forEach((flight, index) => {
        travelDataPrompt += `Option ${index + 1}: ${flight.cityFrom} to ${flight.cityTo}\n`
        travelDataPrompt += `  Airline: ${flight.airlines.join(", ")}\n`
        travelDataPrompt += `  Departure: ${new Date(flight.local_departure).toLocaleString()}\n`
        travelDataPrompt += `  Arrival: ${new Date(flight.local_arrival).toLocaleString()}\n`
        travelDataPrompt += `  Duration: ${Math.floor(flight.duration.total / 3600)}h ${Math.floor((flight.duration.total % 3600) / 60)}m\n`
        travelDataPrompt += `  Price: ${flight.price} ${flight.currency}\n\n`
      })
    }

    if (hotelData && hotelData.result && hotelData.result.length > 0) {
      travelDataPrompt += "HOTEL OPTIONS:\n"
      hotelData.result.slice(0, 3).forEach((hotel, index) => {
        travelDataPrompt += `Option ${index + 1}: ${hotel.hotel_name}\n`
        travelDataPrompt += `  Rating: ${hotel.review_score || "N/A"}/10\n`
        travelDataPrompt += `  Address: ${hotel.address}, ${hotel.city}\n`
        travelDataPrompt += `  Price: ${hotel.min_total_price} ${hotel.currency_code}\n`
        travelDataPrompt += `  Amenities: ${(hotel.hotel_facilities || []).slice(0, 5).join(", ")}\n\n`
      })
    }

    // Make the API request
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a helpful travel assistant that specializes in planning trips.
            You help users find flights, hotels, and attractions. You provide detailed information about destinations.
            You can suggest itineraries and travel tips. You're knowledgeable about travel requirements, costs, and seasonal considerations.
            Always be friendly, helpful, and provide specific details when possible. If you don't know something, be honest about it.
            Format your responses in a clear, organized way with sections when appropriate.

            ${travelDataPrompt ? "Here is real-time travel data to use in your response:\n\n" + travelDataPrompt : ""}`,
          },
          {
            role: "user",
            content: userQuery,
          },
        ],
        temperature: 0.7,
        max_tokens: 800,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      },
    )

    return response.data.choices[0].message.content
  } catch (error) {
    console.error("Error calling OpenAI API:", error)

    // Implement rate limiting handling
    if (error.response && error.response.status === 429) {
      console.log("OpenAI rate limited, using fallback response")
      return generateFallbackResponse(userQuery, flightData, hotelData)
    }

    throw error
  }
}

// Function to generate a fallback response when OpenAI is unavailable
const generateFallbackResponse = (userQuery, flightData, hotelData) => {
  let response = "I'm currently experiencing connectivity issues with my AI service. "

  // Check if we have flight data
  if (flightData && flightData.data && flightData.data.length > 0) {
    response += "Here are some flight options I found:\n\n"

    flightData.data.slice(0, 3).forEach((flight, index) => {
      response += `Flight Option ${index + 1}: ${flight.cityFrom} to ${flight.cityTo}\n`
      response += `• Airline: ${flight.airlines.join(", ")}\n`
      response += `• Departure: ${new Date(flight.local_departure).toLocaleString()}\n`
      response += `• Price: ${flight.price} ${flight.currency}\n\n`
    })
  }

  // Check if we have hotel data
  if (hotelData && hotelData.result && hotelData.result.length > 0) {
    response += "Here are some hotel options I found:\n\n"

    hotelData.result.slice(0, 3).forEach((hotel, index) => {
      response += `Hotel Option ${index + 1}: ${hotel.hotel_name}\n`
      response += `• Rating: ${hotel.review_score || "N/A"}/10\n`
      response += `• Price: ${hotel.min_total_price} ${hotel.currency_code}\n\n`
    })
  }

  return response
}
