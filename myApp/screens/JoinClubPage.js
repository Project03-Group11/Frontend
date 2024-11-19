import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import styles from './JoinClubPageStyles';

const JoinClubPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [allClubs, setAllClubs] = useState([]);

  useEffect(() => {
    const fetchAllClubs = async () => {
      try {
        const response = await fetch('https://group11be-29e4f568939f.herokuapp.com/api/club/get-all');
        if (!response.ok) {
          throw new Error('Failed to fetch all clubs.');
        }
        const data = await response.json();
        setResults(data); // Initially show all clubs
        setAllClubs(data); // Store all clubs for reference
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };

    fetchAllClubs();
  }, []);

  const handleSearch = async (term) => {
    try {
      if (term.trim() === '') {
        setResults(allClubs); // Show all clubs when search is empty
        return;
      }

      const response = await fetch(`https://group11be-29e4f568939f.herokuapp.com/api/club/get/name/${term}`);
      if (!response.ok) {
        throw new Error('Failed to fetch clubs.');
      }
      const data = await response.json();
      setResults(data); // Show filtered results
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleJoinClub = (clubId) => {
    Alert.alert('Join Club', `You have joined the club with ID: ${clubId}`);
    // Implement join club logic here
  };

  return (
    <View style={styles.clubSearchContainer}>
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>Join a Club</Text>
      </View>

      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for clubs..."
          value={searchTerm}
          onChangeText={(text) => {
            setSearchTerm(text);
            handleSearch(text);  // Calls to update the search
          }}
        />
      </View>

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
                <Text style={styles.joinButtonText}>Join Club</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default JoinClubPage;
