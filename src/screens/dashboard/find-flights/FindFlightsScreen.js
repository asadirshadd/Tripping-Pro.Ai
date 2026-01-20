import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  FlatList, ActivityIndicator, Image, Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import moment from 'moment';

const BACKEND_URL = 'https://api-4exftahqnq-uc.a.run.app'; // Replace if needed

const FindFlightsScreen = () => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [fromId, setFromId] = useState('');
  const [toId, setToId] = useState('');
  const [departDate, setDepartDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [showDepartPicker, setShowDepartPicker] = useState(false);
  const [showReturnPicker, setShowReturnPicker] = useState(false);
  const [tripType, setTripType] = useState('oneway');
  const [onwardFlights, setOnwardFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCitySuggestions = async (query, setter) => {
    try {
      const res = await axios.get(
        `https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination?query=${encodeURIComponent(query)}`,
        {
          headers: {
            'X-RapidAPI-Key': '566004c1f0msh45d2953ba9e07bfp1ec911jsn27f497c7c661',
            'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com',
          },
        }
      );
      setter(res.data.data || []);
    } catch (err) {
      console.error('Suggestion error:', err.message);
    }
  };

  const extractCode = (text) => {
    const match = text.match(/\(([^)]+)\)/);
    return match ? match[1] : '';
  };

  const handleSearchFlights = async () => {
    if (!fromId || !toId) return;

    const dep = moment(departDate).format('YYYY-MM-DD');
    const ret = moment(returnDate).format('YYYY-MM-DD');
    const fromCode = extractCode(fromCity);
    const toCode = extractCode(toCity);

    setLoading(true);
    setOnwardFlights([]);
    setReturnFlights([]);

    try {
      const onwardRes = await axios.post(`${BACKEND_URL}/find-flights`, {
        fromId,
        toId,
        departDate: dep
      });

      const onwardFiltered = (onwardRes.data.flights || []).filter(flight => {
        const leg = flight.segments?.[0]?.legs?.[0];
        return (
          leg?.departureAirport?.code === fromCode &&
          leg?.arrivalAirport?.code === toCode
        );
      });

      setOnwardFlights(onwardFiltered);

      if (tripType === 'round') {
        const returnRes = await axios.post(`${BACKEND_URL}/find-flights`, {
          fromId: toId,
          toId: fromId,
          departDate: ret
        });

        const returnFiltered = (returnRes.data.flights || []).filter(flight => {
          const leg = flight.segments?.[0]?.legs?.[0];
          return (
            leg?.departureAirport?.code === toCode &&
            leg?.arrivalAirport?.code === fromCode
          );
        });

        setReturnFlights(returnFiltered);
      }

    } catch (err) {
      console.error('Error fetching flights:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderFlightCard = (item) => {
    const leg = item.segments?.[0]?.legs?.[0];
    const carrier = leg?.carriersData?.[0];
    return (
      <View style={styles.flightCard}>
        <View style={styles.headerRow}>
          <Text style={styles.flightTitle}>{carrier?.name || 'Airline'}</Text>
          {carrier?.logo && (
            <Image source={{ uri: carrier.logo }} style={styles.logo} />
          )}
        </View>
        <View style={styles.flightInfo}>
          <Text style={styles.time}>{leg?.departureTime?.slice(11, 16) || 'N/A'}</Text>
          <Text style={styles.arrow}>→</Text>
          <Text style={styles.time}>{leg?.arrivalTime?.slice(11, 16) || 'N/A'}</Text>
        </View>
        <View style={styles.airports}>
          <Text>{leg?.departureAirport?.code || ''}</Text>
          <Text>{leg?.arrivalAirport?.code || ''}</Text>
        </View>
        <Text style={styles.price}>
          {item?.priceBreakdown?.total?.currencyCode} {item?.priceBreakdown?.total?.units}
        </Text>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Flights</Text>

      {/* From Input */}
      <TextInput
        placeholder="Departure"
        style={styles.input}
        value={fromCity}
        onChangeText={(text) => {
          setFromCity(text);
          fetchCitySuggestions(text, setFromSuggestions);
        }}
      />
      {fromSuggestions.map((s, idx) => (
        <TouchableOpacity key={idx} onPress={() => {
          setFromCity(`${s.cityName} (${s.code})`);
          setFromId(s.id);
          setFromSuggestions([]);
        }}>
          <Text style={styles.suggestion}>{s.cityName} ({s.code})</Text>
        </TouchableOpacity>
      ))}

      {/* To Input */}
      <TextInput
        placeholder="Arrival"
        style={styles.input}
        value={toCity}
        onChangeText={(text) => {
          setToCity(text);
          fetchCitySuggestions(text, setToSuggestions);
        }}
      />
      {toSuggestions.map((s, idx) => (
        <TouchableOpacity key={idx} onPress={() => {
          setToCity(`${s.cityName} (${s.code})`);
          setToId(s.id);
          setToSuggestions([]);
        }}>
          <Text style={styles.suggestion}>{s.cityName} ({s.code})</Text>
        </TouchableOpacity>
      ))}

      {/* Dates */}
      <TouchableOpacity onPress={() => setShowDepartPicker(true)} style={styles.input}>
        <Text>{moment(departDate).format('YYYY-MM-DD')}</Text>
      </TouchableOpacity>
      {showDepartPicker && (
        <DateTimePicker
          value={departDate}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={(e, selectedDate) => {
            setShowDepartPicker(false);
            if (selectedDate) setDepartDate(selectedDate);
          }}
        />
      )}

      {tripType === 'round' && (
        <TouchableOpacity onPress={() => setShowReturnPicker(true)} style={styles.input}>
          <Text>{moment(returnDate).format('YYYY-MM-DD')}</Text>
        </TouchableOpacity>
      )}
      {showReturnPicker && (
        <DateTimePicker
          value={returnDate}
          mode="date"
          display="default"
          minimumDate={departDate}
          onChange={(e, selectedDate) => {
            setShowReturnPicker(false);
            if (selectedDate) setReturnDate(selectedDate);
          }}
        />
      )}

      {/* Trip Type */}
      <View style={styles.tripRow}>
        <TouchableOpacity
          style={[styles.tripButton, tripType === 'oneway' && styles.tripSelected]}
          onPress={() => setTripType('oneway')}
        >
          <Text style={styles.tripText}>One Way</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tripButton, tripType === 'round' && styles.tripSelected]}
          onPress={() => setTripType('round')}
        >
          <Text style={styles.tripText}>Round Trip</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.searchButton} onPress={handleSearchFlights}>
        <Text style={styles.searchText}>Search Flights</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 10 }} />}

      {onwardFlights.length > 0 && <Text style={styles.sectionTitle}>Onward Flights</Text>}
      <FlatList
        data={onwardFlights}
        keyExtractor={(item, index) => 'onward-' + index}
        renderItem={({ item }) => renderFlightCard(item)}
      />

      {tripType === 'round' && returnFlights.length > 0 && <Text style={styles.sectionTitle}>Return Flights</Text>}
      <FlatList
        data={returnFlights}
        keyExtractor={(item, index) => 'return-' + index}
        renderItem={({ item }) => renderFlightCard(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', flex: 1 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  input: {
    borderColor: '#ccc', borderWidth: 1, borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 10, marginBottom: 10,
  },
  suggestion: {
    padding: 8, backgroundColor: '#f9f9f9',
    borderBottomWidth: 1, borderBottomColor: '#eee'
  },
  tripRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  tripButton: {
    padding: 10, borderWidth: 1, borderColor: '#ccc',
    borderRadius: 6, width: '45%', alignItems: 'center',
  },
  tripSelected: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  tripText: { color: '#000' },
  searchButton: {
    backgroundColor: '#34A853',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  searchText: { color: '#fff', fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  flightCard: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
  },
  flightTitle: { fontSize: 16, fontWeight: 'bold' },
  logo: { width: 90, height: 35, resizeMode: 'contain', marginVertical: 4 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  flightInfo: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  time: { fontSize: 16, fontWeight: 'bold', marginHorizontal: 5 },
  arrow: { fontSize: 18 },
  airports: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  price: { fontWeight: 'bold', fontSize: 16, marginVertical: 4 },
  bookButton: {
    backgroundColor: '#007AFF',
    marginTop: 8,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  bookText: { color: '#fff', fontWeight: 'bold' },
});

export default FindFlightsScreen;
