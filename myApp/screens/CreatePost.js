import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Platform } from 'react-native';
import styles from './HomepageStyles';

let Picker;
if (Platform.OS === 'web') {
  Picker = require('react-native-web').Picker; // Web import
} else {
  Picker = require('@react-native-picker/picker').Picker; // Mobile import
}

export default function CreatePost({ onPostCreated }) {
  const [postText, setPostText] = useState('');
  const [selectedClub, setSelectedClub] = useState('');
  const [clubList, setClubList] = useState([]);
  const[userClubs, setuserClubs]= useState([]);

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

  useEffect(() => {
    const getUserClubs = async () => {
      var userID;
      if(Platform.OS==='web'){
        userID =localStorage.getItem("userId");
      }else{
        userID = await SecureStore.getItem("userId");
      }

      try {
        const response = await fetch(`https://group11be-29e4f568939f.herokuapp.com/api/member/get/user/${userID}`);
        const data = await response.json();

        const memberClubs = clubList.filter(club =>  data.some(member => member.clubId === club.id));

        console.log(memberClubs);

        setuserClubs(memberClubs);

      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    }

    getUserClubs();
  },[clubList])

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
            {userClubs.map((club) => (
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
