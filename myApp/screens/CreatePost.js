import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './HomepageStyles';
import * as SecureStore from 'expo-secure-store';

export default function CreatePost({ onPostCreated }) {
  const [postText, setPostText] = useState('');
  const [selectedClub, setSelectedClub] = useState('');
  const [clubList, setClubList] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch('https://group11be-29e4f568939f.herokuapp.com/api/club/get-all');
        const data = await response.json();
        setClubList(data);
      } catch (error) {
        console.error('Error fetching clubs:', error);
      }
    };
    fetchClubs();
  }, []);

  const handlePostSubmit = async () => {
    if (!postText.trim() || !selectedClub) {
      alert('Please enter some text and select a club!');
      return;
    }

    const userId = Platform.OS === 'web' 
      ? localStorage.getItem('userId') 
      : await SecureStore.getItemAsync('userId');

    const newPost = {
      userId,
      clubId: selectedClub,
      discussion: postText.trim(),
      likes: 0,
    };

    try {
      const response = await fetch('https://group11be-29e4f568939f.herokuapp.com/api/post/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        alert('Post created successfully!');
        setPostText('');
        setSelectedClub('');
        onPostCreated();
      } else {
        console.error('Error creating post:', await response.text());
        alert('Failed to create post.');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <View style={styles.createPostContainer}>
      <Text style={styles.createPostHeader}>Create Post</Text>
      
      <TextInput
        style={styles.textInput}
        placeholder="What's on your mind...?"
        value={postText}
        onChangeText={setPostText}
        multiline
      />

      <View style={styles.pickerAndButtonContainer}>
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Club:</Text>
          <Picker
            selectedValue={selectedClub}
            style={styles.createPostPicker}
            onValueChange={(itemValue) => setSelectedClub(itemValue)}
          >
            <Picker.Item label="Select a club..." value="" />
            {clubList.map((club) => (
              <Picker.Item key={club.id} label={club.name} value={club.id} />
            ))}
          </Picker>
        </View>

        <Pressable style={styles.postButton} onPress={handlePostSubmit}>
          <Text style={styles.postButtonText}>Post</Text>
        </Pressable>
      </View>
    </View>
  );
}
