import React, { useState, useEffect } from 'react';
import { Platform, View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert, Modal } from 'react-native';
import styles from './JoinClubPageStyles';

const JoinClubPage = () => {
  let userId;

  if (Platform.OS === 'web') {
    userId = localStorage.getItem('userId');
  } else {
    userId = JSON.parse(SecureStore.getItem('userId'));
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [allClubs, setAllClubs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const fetchAllClubs = async () => {
      try {
        const response = await fetch('https://group11be-29e4f568939f.herokuapp.com/api/club/get-all');
        if (!response.ok) {
          throw new Error('Failed to fetch all clubs.');
        }
        const data = await response.json();

        // Fetch the book covers and add them to the club data
        const clubsWithCovers = await Promise.all(data.map(async (club) => {
          const bookResponse = await fetch(`https://group11be-29e4f568939f.herokuapp.com/api/book/get/${club.bookId}`);
          const bookData = await bookResponse.json();
          return {
            ...club,
            coverImg: bookData.coverImg, // Add the coverImg to each club's data
          };
        }));

        setResults(clubsWithCovers); // Initially show all clubs with cover images
        setAllClubs(clubsWithCovers); // Store all clubs for reference
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
      
      // Add book cover images to the filtered results
      const filteredClubsWithCovers = await Promise.all(data.map(async (club) => {
        const bookResponse = await fetch(`https://group11be-29e4f568939f.herokuapp.com/api/book/get/${club.bookId}`);
        const bookData = await bookResponse.json();
        return {
          ...club,
          coverImg: bookData.coverImg,
        };
      }));

      setResults(filteredClubsWithCovers); // Show filtered results with cover images
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleJoinClub = async (clubId) => {
    try {
      const response = await fetch(`https://group11be-29e4f568939f.herokuapp.com/api/member/get/user/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user membership data');
      }
      const memberships = await response.json();
      const isAlreadyMember = memberships.some((membership) => membership.clubId === clubId);
      
      if (isAlreadyMember) {
        setModalMessage('You have already joined this club.');
        setModalVisible(true);
        return; 
      }
        const joinResponse = await fetch('https://group11be-29e4f568939f.herokuapp.com/api/member/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          clubId: clubId,
        }),
      });
  
      if (!joinResponse.ok) {
        throw new Error('Failed to join the club');
      }
  
      const joinData = await joinResponse.json();
      console.log('Successfully joined the club:', joinData);
      setModalMessage('You have successfully joined the club!');
      setModalVisible(true);
    } catch (error) {
      console.error('Error joining the club:', error);
      setModalMessage('An error occurred while trying to join the club.');
      setModalVisible(true);
    }
  };
  

  return (
    <View style={styles.clubSearchContainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for clubs..."
          value={searchTerm}
          onChangeText={(text) => {
            setSearchTerm(text);
            handleSearch(text); // Calls to update the search
          }}
        />
      </View>

      <ScrollView contentContainerStyle={styles.resultsContainer}>
        {results.map((club) => (
          <View key={club.id} style={styles.clubCard}>
            <Text style={styles.clubName}>{club.name}</Text>
            <View style={styles.clubDetails}>
              <Image
                source={{ uri: club.coverImg }} // Now use coverImg directly from club data
                style={styles.clubImage}
              />
              <View style={styles.clubTextContainer}>
                <Text style={styles.summary}>{club.description}</Text>
                <TouchableOpacity
                  style={styles.joinButton}
                  onPress={() => handleJoinClub(club.id)}
                >
                  <Text style={styles.joinButtonText}>Join Club</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default JoinClubPage;
