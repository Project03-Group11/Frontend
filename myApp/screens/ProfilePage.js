import React, { useState, useEffect } from 'react';
import { Platform, View, Text, Image, TouchableOpacity, FlatList, Alert, Modal, Pressable, TextInput } from 'react-native';
import styles from "./ProfilepageStyles";
import { useNavigation } from '@react-navigation/native';

export default function ProfilePage() {
  const navigation = useNavigation();

  if (Platform.OS === 'web') {
    userId = localStorage.getItem('userId');
  } else {
    userId = JSON.parse(SecureStore.getItem('userId'));
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [newClubModalVisible, setNewClubModalVisible] = useState(false);
  const [text, setText] = useState('');
  const [clubName, setClubName] = useState('');
  const [clubDescription, setClubDescription] = useState('');
  const [currentBook, setCurrentBook] = useState(null);  // Changed to handle the book object
  const [user, setUser] = useState({});
  const [searchUsage, setsearchUsage] = useState('');
  const [clubs, setClubs] = useState([]);

  const handleRefresh = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],  // Navigate to main screen after logging out
    });
  };

  const handleLogout = async () => {
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem('userId');
        localStorage.removeItem('userData');
      } else {
        await SecureStore.deleteItemAsync('userId');
        await SecureStore.deleteItemAsync('userData');
      }
      handleRefresh();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://group11be-29e4f568939f.herokuapp.com/api/user/get/${userId}`);
        const data = await response.json();
        setUser(data);
        setText(data.username);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchAllClubs = async () => {
      try {
        const response = await fetch(`https://group11be-29e4f568939f.herokuapp.com/api/club/get-all`);
        const data = await response.json();
        setClubs(data);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchUser();
    fetchAllClubs();
  }, []);

  const handleSaveUsername = async () => {
    if (!text.trim()) {
      setModalVisible(false);
      Alert.alert("User not changed");
      return;
    }
    try {
      const response = await fetch(`https://group11be-29e4f568939f.herokuapp.com/api/user/update/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
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
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Change Username</Text>
            <TextInput
              style={styles.input}
              onChangeText={setText}
              value={text}
            />
            <Pressable style={[styles.button, styles.buttonClose]} onPress={handleSaveUsername}>
              <Text style={styles.textStyle}>Save</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={newClubModalVisible}
        onRequestClose={() => setNewClubModalVisible(!newClubModalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Create New Club</Text>
            <TextInput
              placeholder="Club Name"
              style={styles.input}
              onChangeText={setClubName}
              value={clubName}
            />
            <TextInput
              style={styles.inputDescription}
              placeholder="Enter club description..."
              placeholderTextColor="#a59b8c"
              multiline={true}
              numberOfLines={6}
              value={clubDescription}
              onChangeText={setClubDescription}
            />
            <TouchableOpacity
              style={styles.bookButton}
              onPress={() => {
                setNewClubModalVisible(false); // Close the modal
                navigation.navigate('BookSearch', {
                  clubName,
                  clubDescription,
                  userId,
                  searchUsage: "create",
                  onSelectBook: (book) => setCurrentBook(book), // Pass the selected book object
                });
              }}
            >
              <Text style={styles.textStyle}>Search for Book</Text>
            </TouchableOpacity>

            <View style={styles.buttonsContainer}>
              <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setNewClubModalVisible(false)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.profileContainer}>
        <View style={styles.profileHeader}>
          <Image source={{ uri: user.profilePic }} style={styles.profilePicture} />
          <Text style={styles.username}>{user.username}</Text>
          <TouchableOpacity style={styles.editProfileButton} onPress={() => setModalVisible(true)}>
            <Text style={{ color: 'white' }}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.clubsSection}>
          <Text style={styles.sectionTitle}>My Clubs</Text>
          <FlatList
            data={user.clubs}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.ownedClubItem}>
                <Text style={styles.myClubName}>{item.name}</Text>
                <Text style={styles.myCurrentRead}>{item.description}</Text>
              </View>
            )}
          />
        </View>

        <View>
          <Text style={styles.sectionTitle}>Clubs I Own</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => setNewClubModalVisible(true)}>
            <Text style={styles.addButtonText}>+ Add New Club</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
