import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Platform, Alert } from 'react-native';
import styles from './JoinClubStyles';

const JoinClub = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const userId = '4';
  const handleSearch = async () => {
    try {
        const response = await fetch(`https://group11be-29e4f568939f.herokuapp.com/api/club/get/name/${searchTerm}`);
        if(!response.ok){
            throw new Error('Failed to fetch clubs.');
        }
        const data = await response.json();
        setResults(data);
    } catch(error){
        Alert.alert('Error', error.message)
    }
  }
  
  return (
    <View style={styles.clubSearchContainer}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>Join a Club</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for clubs..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Results Container */}
      <ScrollView contentContainerStyle={styles.resultsContainer}>
        {results.map((club) => (
          <View key={club.id} style={styles.clubCard}>
            <View style={styles.clubInfo}>
              <Text style={styles.clubName}>{club.name}</Text>
              <Text style={styles.summary}>{club.description}</Text>
              <TouchableOpacity
                style={styles.joinButton}
                onPress={() => handleJoinClub(club.id)}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Join Club</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default JoinClub;
