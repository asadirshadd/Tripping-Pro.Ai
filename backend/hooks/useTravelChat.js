"use client"

import { useState, useCallback } from "react"
import { getTravelRecommendations } from "../utils/travelUtils"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
}

export function useTravelChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I can help you plan your trip from Karachi to Lahore. Just ask me about flights and hotels, and I'll find the best options for you.",
      role: "assistant",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const handleInputChange = useCallback((text: string) => {
    setInput(text)
  }, [])

  const handleSubmit = useCallback(async () => {
    if (input.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
    }

    setMessages((prev) => [...prev, userMessage])

    // Create a placeholder for the assistant's response
    const assistantMessageId = (Date.now() + 1).toString()
    const assistantMessage: Message = {
      id: assistantMessageId,
      content: "Searching for the best travel options...",
      role: "assistant",
    }

    setMessages((prev) => [...prev, assistantMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      // Check if the message is travel-related
      const isTravelQuery = /trip|travel|flight|hotel|book|karachi|lahore|islamabad|peshawar/i.test(input)

      let response
      if (isTravelQuery) {
        // Get travel recommendations
        response = await getTravelRecommendations(input)
      } else {
        // For non-travel queries, provide a default response
        response =
          "I'm specialized in helping with travel plans, particularly for trips within Pakistan. Could you ask me about flights or hotels for your trip?"
      }

      // Update the assistant message with the response
      setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, content: response } : msg)))
    } catch (e) {
      console.error("Error in chat:", e)
      setError(e instanceof Error ? e : new Error("Unknown error occurred"))

      // Update the assistant message to show the error
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? { ...msg, content: "Sorry, an error occurred while processing your request. Please try again." }
            : msg,
        ),
      )
    } finally {
      setIsLoading(false)
    }
  }, [input])

  return {
    messages,
    input,
    isLoading,
    error,
    handleInputChange,
    handleSubmit,
  }
}
