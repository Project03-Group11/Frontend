import React, { useState, useEffect } from 'react';
import { Platform, ScrollView,View, Text, Image, TouchableOpacity, FlatList, Alert, Modal, Pressable, TextInput, ActivityIndicator } from 'react-native';
import styles from "./ProfilepageStyles";
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

export default function ProfilePage() {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);

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
  const [resetFlag, setresetFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  const handleRefresh = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  };

  useEffect(() => {
    const getUserId = async () => {
      let userId = null;
      try {
        if (Platform.OS === 'web') {
          userId = localStorage.getItem('userId');
        } else {
          userId = await JSON.stringify(SecureStore.getItemAsync('userId'));
        }

        if (userId) {
          setUserId(userId);
        } else {
          console.error('User ID not found.');
        }
      } catch (error) {
        console.error('Error getting user ID:', error);
      } finally {
        setIsLoading(false);  
      }
    };

    getUserId();
  }, []);

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

        setusermemberclubs(memberClubsData);

        // Update user with member clubs
        setUser(prevUser => ({
          ...prevUser,
          clubs: memberClubs,
        }));

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchData();
  }, [resetFlag, userId]);

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

  const removeClub = async (clubID) => {
    const member = usermemberclubs.find((club) => club.clubId === clubID);

    if (!member) {
      console.log(usermemberclubs)
      console.error(`No member found for clubID ${clubID}`);
      return;
    }
    console.log(member)

    const memberID = member.id;
    try {
      const response = await fetch(`https://group11be-29e4f568939f.herokuapp.com/api/member/remove/${memberID}`, {
        method: 'DELETE'
      });
  
      if (response.ok) {
        console.log(`Member with ID ${memberID} deleted successfully.`);
        setresetFlag(!resetFlag);
      } else {
        const errorData = await response.json();
        console.error('Failed to delete post:', errorData.message || response.status);
      }
    } catch (error) {
      console.error('An error occurred while deleting the post:', error);
    }

  }


  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.appContainer} contentContainerStyle={{ flexGrow: 1 }}>
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
              <View>
              <View style={styles.ownedClubItem}>
                <Text style={styles.myClubName}>{item.name}</Text>
                <Text style={styles.myCurrentRead}>{item.description}</Text>
                <TouchableOpacity style={styles.addButton} onPress={() => removeClub(item.id)}>
                  <img src = "https://cdn-icons-png.flaticon.com/512/14090/14090261.png" style={styles.removeIcon}/>
              </TouchableOpacity>
              </View>
              
              
              {/* https://cdn-icons-png.flaticon.com/512/14090/14090261.png */}
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
              <View>
              <TouchableOpacity style={styles.addButton} onPress={() => setNewClubModalVisible(true)}>
                  <Text style={styles.addButtonText}>Edit club</Text>
                </TouchableOpacity>
              <View style={styles.ownedClubItem}>
                <Text style={styles.myClubName}>{item.name}</Text>
                <Text style={styles.myCurrentRead}>{item.description}</Text>
              </View>
              </View>
            )}
          />
        </View>
      </View>
</ScrollView>
  );
}
