import React, { useState, useEffect } from 'react';
import { Platform, View, Text, Image, TouchableOpacity, FlatList, Alert, Modal, Pressable, TextInput, ActivityIndicator } from 'react-native';
import styles from "./ProfilepageStyles";
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';

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
  const [currentBook, setCurrentBook] = useState(null);
  const [user, setUser] = useState({});
  const [searchUsage, setsearchUsage] = useState('');
  const [clubs, setClubs] = useState([]);
  const [userClubs, setuserClubs] = useState([]);
  const [usermemberclubs, setusermemberclubs] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  const handleRefresh = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
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
    const fetchData = async () => {
      try {
        // Fetch user details
        const userResponse = await fetch(`https://group11be-29e4f568939f.herokuapp.com/api/user/get/${userId}`);
        const userData = await userResponse.json();
        setUser(userData);
        setText(userData.username);

        // Fetch all clubs
        const clubsResponse = await fetch(`https://group11be-29e4f568939f.herokuapp.com/api/club/get-all`);
        const clubsData = await clubsResponse.json();
        setClubs(clubsData);

        // Fetch clubs owned by the user
        const userClubsResponse = await fetch(`https://group11be-29e4f568939f.herokuapp.com/api/club/get/user/${userId}`);
        const userClubsData = await userClubsResponse.json();
        setuserClubs(userClubsData);

        // Fetch member clubs
        const memberClubsResponse = await fetch(`https://group11be-29e4f568939f.herokuapp.com/api/member/get/user/${userId}`);
        const memberClubsData = await memberClubsResponse.json();

        const memberClubs = memberClubsData.map(member => clubsData.find(club => club.id === member.clubId));
        setusermemberclubs(memberClubs);

        // Update user with member clubs
        setUser(prevUser => ({
          ...prevUser,
          clubs: memberClubs,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
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

  // Show loading spinner until data is loaded
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if(Platform.OS==='web'){
    return (
      <ScrollView style={styles.appContainer}>
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
                    // userId,
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

          <View >
            <Text style={styles.sectionTitle}>Clubs I Own</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => setNewClubModalVisible(true)}>
              <Text style={styles.addButtonText}>+ Add New Club</Text>
            </TouchableOpacity>
            <FlatList
              data={userClubs}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.ownedClubItem}>
                  <Text style={styles.myClubName}>{item.name}</Text>
                  <Text style={styles.myCurrentRead}>{item.description}</Text>
                </View>
              )}
            />
          </View>
        </View>
    </ScrollView>
    );
  }

  const renderClubItem = ({ item }) => (
    <View style={styles.clubItemA}>
      <Text style={styles.clubNameA}>{item.name}</Text>
      <Text style={styles.clubDescriptionA}>{item.description}</Text>
    </View>
  );
  return (
    <ScrollView style={styles.scrollContainer}>
    <View style={styles.appContainer}>
      {/* Modal for Changing Username */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredViewA}>
          <View style={styles.modalViewA}>
            <Text style={styles.modalTextA}>Change Username</Text>
            <TextInput
              style={styles.inputA}
              onChangeText={setText}
              value={text}
              placeholder="Enter new username"
            />
            <Pressable
              style={[styles.buttonA, styles.buttonCloseA]}
              onPress={handleSaveUsername}
            >
              <Text style={styles.textStyleA}>Save</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Modal for Creating a New Club */}
      <Modal
        animationType="slide"
        transparent
        visible={newClubModalVisible}
        onRequestClose={() => setNewClubModalVisible(!newClubModalVisible)}
      >
        <View style={styles.centeredViewA}>
          <View style={styles.modalViewA}>
            <Text style={styles.modalTextA}>Create New Club</Text>
            <TextInput
              style={styles.inputA}
              placeholder="Club Name"
              onChangeText={setClubName}
              value={clubName}
            />
            <TextInput
              style={styles.inputDescriptionA}
              placeholder="Enter club description..."
              placeholderTextColor="#a59b8c"
              multiline
              numberOfLines={6}
              value={clubDescription}
              onChangeText={setClubDescription}
            />
            <TouchableOpacity
              style={styles.bookButtonA}
              onPress={() => {
                setNewClubModalVisible(false);
                navigation.navigate('BookSearch', {
                  clubName,
                  clubDescription,
                  searchUsage: 'create',
                  onSelectBook: (book) => setCurrentBook(book),
                });
              }}
            >
              <Text style={styles.textStyleA}>Search for Book</Text>
            </TouchableOpacity>
            <Pressable
              style={[styles.buttonA, styles.buttonCloseA]}
              onPress={() => setNewClubModalVisible(false)}
            >
              <Text style={styles.textStyleA}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Profile Section */}
      <View style={styles.profileHeaderA}>
        <Image
          source={{ uri: user.profilePic }}
          style={styles.profilePictureA}
        />
        <Text style={styles.usernameA}>{user.username}</Text>
        <TouchableOpacity
          style={styles.editProfileButtonA}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ color: 'white' }}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButtonA} onPress={handleLogout}>
          <Text style={styles.logoutButtonTextA}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* My Clubs Section */}
      <View style={styles.listSectionA}>
        <Text style={styles.sectionTitleA}>My Clubs</Text>
        {user.clubs && user.clubs.length > 0 ? (
          user.clubs.map((item, index) => (
            <View key={index} style={styles.clubItemA}>
              <Text style={styles.clubNameA}>{item.name}</Text>
              <Text style={styles.clubDescriptionA}>{item.description}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyMessageA}>No clubs found</Text>
        )}
      </View>

        {/* Clubs I Own Section */}
        <View style={styles.listSectionA}>
          <Text style={styles.sectionTitleA}>Clubs I Own</Text>
          <TouchableOpacity
            style={styles.addButtonA}
            onPress={() => setNewClubModalVisible(true)}
          >
            <Text style={styles.addButtonTextA}>+ Add New Club</Text>
          </TouchableOpacity>
          {userClubs.length > 0 ? (
            userClubs.map((item, index) => (
              <View key={index} style={styles.clubItemA}>
                <Text style={styles.clubNameA}>{item.name}</Text>
                <Text style={styles.clubDescriptionA}>{item.description}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyMessageA}>No owned clubs</Text>
          )}
        </View>
    </View>
    </ScrollView>
  );

}