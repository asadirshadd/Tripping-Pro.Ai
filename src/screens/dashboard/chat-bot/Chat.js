import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, StyleSheet, ScrollView, Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';


const Chat = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      let storedId = await AsyncStorage.getItem('sessionId');
      if (!storedId) {
        const newId = uuid.v4(); // ✅ fix
        await AsyncStorage.setItem('sessionId', newId);
        storedId = newId;
      }
      setSessionId(storedId);
    };
    getSession();
  }, []);

  const sendQuery = async () => {
    if (!query.trim() || !sessionId) return;
    const userMessage = { text: query, sender: 'user', originalQuery: query };
    setMessages(prev => [...prev, userMessage]);

    try {
      const res = await fetch('https://api-4exftahqnq-uc.a.run.app/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, sessionId })
      });
      const data = await res.json();

      const flightOffers = data.flights || data.flightOffers || [];

      const parsedFlights = Array.isArray(flightOffers)
        ? flightOffers.map(flight => {
            const firstSegment = flight.segments?.[0];
            const leg = firstSegment?.legs?.[0];
            const carrier = leg?.carriersData?.[0];
            return {
              airline: carrier?.name || 'N/A',
              logoUrl: carrier?.logo || '',
              flightNumber: leg?.flightInfo?.flightNumber || 'N/A',
              departure: `${leg?.departureAirport?.cityName || 'N/A'} (${leg?.departureAirport?.code || ''})`,
              arrival: `${leg?.arrivalAirport?.cityName || 'N/A'} (${leg?.arrivalAirport?.code || ''})`,
              price:
                flight?.priceBreakdown?.total?.units != null
                  ? `${flight.priceBreakdown.total.currencyCode} $${flight.priceBreakdown.total.units}`
                  : 'N/A',
            };
          })
        : [];

      const hotels = Array.isArray(data.hotels) ? data.hotels : [];

      const botMessage = {
        text: data.message || 'Here are your travel options.',
        sender: 'bot',
        flights: parsedFlights,
        hotels,
        itinerary: data.itinerary || null,
        originalQuery: query
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { text: 'Error connecting to server.', sender: 'bot' }]);
    }

    setQuery('');
  };

  const requestItinerary = async (originalQuery) => {
    try {
      const res = await fetch('https://api-4exftahqnq-uc.a.run.app/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: originalQuery }),
      });
      const data = await res.json();
      const botMessage = {
        text: data.message || 'Here is your itinerary.',
        sender: 'bot',
        itinerary: data.itinerary || null
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { text: 'Error generating itinerary.', sender: 'bot' }]);
    }
  };

  const renderItem = ({ item }) => (
    <ScrollView style={[styles.message, item.sender === 'user' ? styles.user : styles.bot]}>
      <Text style={styles.messageText}>{item.text}</Text>

      {/* Flights */}
      {item.sender === 'bot' && Array.isArray(item.flights) && item.flights.length > 0 && (
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>✈️ Flights:</Text>
          {item.flights.slice(0, 5).map((f, i) => (
            <View key={i} style={styles.detailCard}>
              <Text>Airline: {f.airline}</Text>
              <Text>Flight No: {f.flightNumber}</Text>
              <Text>From: {f.departure}</Text>
              <Text>To: {f.arrival}</Text>
              <Text>Price: {f.price}</Text>
              {f.logoUrl ? <Image source={{ uri: f.logoUrl }} style={styles.flightImage} /> : null}
            </View>
          ))}
        </View>
      )}

      {/* Hotels */}
      {item.sender === 'bot' && Array.isArray(item.hotels) && item.hotels.length > 0 && (
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>🏨 Hotels:</Text>
          {item.hotels.slice(0, 5).map((h, i) => (
            <View key={i} style={styles.detailCard}>
              <Text>Name: {h.property?.name || h.name || 'N/A'}</Text>
              <Text>Address: {h.accessibilityLabel?.split('\n')[0] || 'N/A'}</Text>
              <Text>Stars: {h.property?.accuratePropertyClass || h.accuratePropertyClass || 'N/A'}★</Text>
              <Text>
                Price: {h.property?.priceBreakdown?.grossPrice?.value || 'N/A'}{' '}
                {h.property?.priceBreakdown?.grossPrice?.currency || ''}
              </Text>
              {h.property?.photoUrls?.[0] && (
                <Image source={{ uri: h.property.photoUrls[0] }} style={styles.hotelImage} />
              )}
            </View>
          ))}
        </View>
      )}

      {/* Itinerary */}
      {item.sender === 'bot' && item.itinerary && (
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>🗺️ Itinerary:</Text>
          <Text style={styles.messageText}>{item.itinerary}</Text>
        </View>
      )}

      {/* Plan Button */}
      {item.sender === 'bot' &&
        Array.isArray(item.flights) && item.flights.length > 0 &&
        Array.isArray(item.hotels) && item.hotels.length > 0 && (
          <TouchableOpacity
            onPress={() => requestItinerary(item.originalQuery)}
            style={styles.itineraryButton}
          >
            <Text style={styles.sendText}>📅 Plan My Itinerary</Text>
          </TouchableOpacity>
        )}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask me about travel..."
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity onPress={sendQuery} style={styles.sendButton}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff', marginBottom: 50 },
  list: { paddingBottom: 20 },
  message: { padding: 10, borderRadius: 8, marginVertical: 5, maxWidth: '80%' },
  user: { backgroundColor: '#DCF8C6', alignSelf: 'flex-end' },
  bot: { backgroundColor: '#ECECEC', alignSelf: 'flex-start' },
  messageText: { fontSize: 16 },
  detailsContainer: { marginTop: 5 },
  sectionTitle: { fontWeight: 'bold', fontSize: 14, marginTop: 5 },
  detailCard: { backgroundColor: '#f9f9f9', padding: 8, marginVertical: 4, borderRadius: 6 },
  hotelImage: { width: 150, height: 100, borderRadius: 6, marginTop: 5 },
  flightImage: { width: 120, height: 50, resizeMode: 'contain', marginTop: 5 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  input: { flex: 1, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10 },
  sendButton: { backgroundColor: '#007AFF', padding: 10, borderRadius: 8, marginLeft: 10 },
  sendText: { color: '#fff', fontWeight: 'bold' },
  itineraryButton: {
    backgroundColor: '#34A853',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center'
  },
});

export default Chat;
