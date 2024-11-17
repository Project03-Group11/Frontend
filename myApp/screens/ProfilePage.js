import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView, Alert, Modal, Pressable, TextInput } from 'react-native';
import styles from "./ProfilepageStyles";

export default function ProfilePage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState(' ');
  const [user, setUser] = useState({
    username: "Loading...",
    profilePicture: "https://i.pinimg.com/originals/96/cd/7e/96cd7e329caf7040d9f6ddfea710ebcd.gif",
    clubs: [
      { name: "The Lego Man Club", currentRead: "To Kill a Mockingbird by Harper Lee" },
      { name: "Alpha Wolf Club", currentRead: "1984 by George Orwell" },
    ],
    ownedClubs: [],
    userId: null
  });

  useEffect(() => {
    const fetchUser = async () => {
          try {
            const response = await fetch("https://group11be-29e4f568939f.herokuapp.com/api/user/get/email/lego.dreamer@example.com");
            const data = await response.json();

            setUser(prevUser => ({
              ...prevUser,
              username: data.username,
              userId: data.id, // Set the userId here from the response
            }));
            setText(data.username);
          } catch (error) {
            console.error("Error fetching users:", error);
          }
        };

        const fetchOwnedClubs = async () => {
          if (!user.userId) return; // Only fetch if userId is set

          var link = "https://group11be-29e4f568939f.herokuapp.com/api/club/get/user/"+user.userId;

          try {
            const response = await fetch(link);
            const data = await response.json();

            setUser(prevUser => ({
              ...prevUser,
              ownedClubs: data,
            }));
          } catch (error) {
            console.error("Error fetching clubs:", error);
          }
        };

        fetchUser();
        fetchOwnedClubs();
  }, [user.userId]);

  const handleSaveUsername = async () => {
    if(!text.trim()){
        setModalVisible(false);
        Alert.alert("User not changed");
        return;
    }
    try {
          const response = await fetch("https://group11be-29e4f568939f.herokuapp.com/api/user/update/5", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: text }),
          });

          if (response.ok) {
            const updatedUser = await response.json();
            setUser(prevUser => ({
              ...prevUser,
              username: updatedUser.username,
            }));
            setModalVisible(false);
          } else {
            Alert.alert("Failed to update username.");
          }
        } catch (error) {
          console.error("Error updating username:", error);
          Alert.alert("Error updating username.");
        }
  };
return (
  <View style={styles.appContainer}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalTextContainer}>
            <Text style={styles.modalText}>Change UserName</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={setText}
            value={text}
          />
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={handleSaveUsername}
          >
            <Text style={styles.textStyle}>Save</Text>
          </Pressable>
        </View>
      </View>
    </Modal>

    <View style={styles.profileContainer}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
        <Text style={styles.username}>{user.username}</Text>
        <TouchableOpacity style={styles.editProfileButton} onPress={() => setModalVisible(true)}>
          <Text style={{ color: 'white' }}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.clubsSection}>
        <Text style={styles.sectionTitle}>My Clubs</Text>
        <FlatList
          data={user.clubs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.clubItem}>
              <Text style={styles.myClubName}>{item.name}</Text>
              <Text style={styles.myCurrentRead}>{item.currentRead}</Text>
            </View>
          )}
        />
      </View>

      <View>
        <Text style={styles.sectionTitle}>Clubs I Own</Text>
        <View >
          <FlatList
            data={user.ownedClubs}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.ownedClubItem}>
                <View style={styles.clubDetails}>
                  <Text style={styles.clubName}>Club: {item.name}</Text>
                  <Text style={styles.currentRead}>Description: {item.description}</Text>
                </View>
                <TouchableOpacity style={styles.editClubButton}>
                  <Text style={styles.editClubButtonText}>Edit Club</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  </View>
);

}

