import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import styles from './BookSearchForClubStyles';
import * as SecureStore from 'expo-secure-store';


export default function BookSearchForClubPage({ route, navigation }) {
    const { clubName, clubDescription, userId, searchUsage, clubId } = route.params; // Ensure clubId is passed if updating a club
    const [searchQuery, setSearchQuery] = useState('');
    const [books, setBooks] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`https://group11be-29e4f568939f.herokuapp.com/api/book/get/title/${searchQuery}`);
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const handleCreateClub = async (book) => {
        try {
            const response = await fetch('https://group11be-29e4f568939f.herokuapp.com/api/club/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    bookId: book.id,
                    name: clubName,
                    description: clubDescription,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                Alert.alert('Success', `Club "${data.name}" created successfully!`, [
                    { text: 'OK', onPress: () => setTimeout(() => navigation.goBack(), 100) }, // Delay goBack slightly
                ]);
                navigation.goBack();
                navigation.pop();
            } else {
                console.error('Error creating club:', response.statusText);
                Alert.alert('Error', 'Failed to create club. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'An error occurred while creating the club. Please try again.');
        }
    };


    const handleUpdateClub = async (book) => {
        try {
            const response = await fetch(`https://group11be-29e4f568939f.herokuapp.com/api/club/update/${clubId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bookId: book.id,
                    name: clubName,
                    description: clubDescription,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                Alert.alert('Success', `Club "${data.name}" updated successfully!`, [
                    { text: 'OK', onPress: () => setTimeout(() => navigation.pop(), 100) },
                ]);
                navigation.goBack();
                navigation.pop();
            } else {
                console.error('Error updating club:', response.statusText);
                Alert.alert('Error', 'Failed to update club. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'An error occurred while updating the club. Please try again.');
        }
    };

    const handleClubAction = (book) => {
        // Determine action based on the searchUsage parameter
        if (searchUsage === 'create') {
            handleCreateClub(book);
        } else if (searchUsage === 'update') {
            handleUpdateClub(book);
        } else {
            console.log("Invalid action type");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Search for a Book</Text>
            <TextInput
                placeholder="Enter book title"
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.input}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>

            <FlatList
                data={books}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.bookItem}
                        onPress={() => handleClubAction(item)} // Call the handleClubAction function
                    >
                        <Image source={{ uri: item.coverImg }} style={styles.bookImage} />
                        <View style={styles.bookDetails}>
                            <Text style={styles.bookTitle}>{item.title}</Text>
                            <Text style={styles.bookAuthor}>Author: {item.author}</Text>
                            <Text style={styles.bookGenre}>Genre: {item.genre}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
