import React, { useState, useEffect } from 'react';
import {Platform, View, Text, FlatList, StyleSheet, Pressable, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './HomepageStyles';
import { useNavigation } from '@react-navigation/native';

const Post = ({ postId, tag, username, profilePic, content, timestamp, likes }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const navigation = useNavigation();

  const updatePostLikes = async (newLikeCount) => {
    try {
      await fetch(`https://group11be-29e4f568939f.herokuapp.com/api/post/update/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ likes: newLikeCount }),
      });
    } catch (error) {
      console.error("Error updating post likes:", error);
    }
  };

  const handleLike = () => {
    const newLikedStatus = !liked;
    const newLikeCount = newLikedStatus ? likeCount + 1 : likeCount - 1;

    setLiked(newLikedStatus);
    setLikeCount(newLikeCount);
    updatePostLikes(newLikeCount); // Update the like count on the backend
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.userInfoContainer}>
        <Image source={{ uri: profilePic }} style={styles.profilePic} />
        <Text style={styles.username}>{username}</Text>
      </View>

      <Text style={styles.tag}>{tag}</Text>
      <Text style={styles.content}>{content}</Text>
      <Text style={styles.timestamp}>{timestamp}</Text>

      <View style={styles.actionsContainer}>
        <Pressable onPress={handleLike} style={styles.likeButton}>
          <Image
            source={{
              uri: liked
                ? 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png'
                : 'https://cdn.icon-icons.com/icons2/1122/PNG/512/likeblackheartbutton_79537.png'
            }}
            style={styles.likeIcon}
          />
          <Text style={styles.likeCount}>{likeCount}</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Comments', {
            post: {
              postId,
              tag,
              username,
              profilePic,
              content,
              timestamp,
              likes,
            },
          })}
          style={styles.commentButton}
        >
          <Text style={styles.actionText}>Comment</Text>
        </Pressable>

      </View>
    </View>
  );
};


export default function Homepage() {
  if(Platform.OS==='web'){
    userData=JSON.parse(localStorage.getItem('userData'));
    console.log(userData);
  }else{
    userData=JSON.parse(SecureStore.getItem('userData'));
    console.log(userData);
  }

  const [posts, setPosts] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [clubMap, setClubMap] = useState({});
  const [sortOrder, setSortOrder] = useState('newest');
  
  // Fetch all users and map by user ID
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://group11be-29e4f568939f.herokuapp.com/api/user/get-all");
        const data = await response.json();
        const userMapping = data.reduce((acc, user) => {
          acc[user.id] = {
            username: user.username,
            profilePic: user.profilePic,
          };
          return acc;
        }, {});
        setUserMap(userMapping);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Fetch user ID by email
    useEffect(() => {
      const fetchUserId = async () => {
        try {
          const response = await fetch(`https://group11be-29e4f568939f.herokuapp.com/api/user/get/email/${userData.email}`);
          const data = await response.json();
          // setUserId(data.id);
          if(Platform.OS==='web'){
            localStorage.setItem("userId",data.id);
          }else{
            SecureStore.setItem("userId",data.id);
          }
        } catch (error) {
          console.error("Error fetching user id:", error);
        }
      };
      fetchUserId();
    }, [userData.email]);

  // Fetch all clubs and map by club ID
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch("https://group11be-29e4f568939f.herokuapp.com/api/club/get-all");
        const data = await response.json();
        const clubMapping = data.reduce((acc, club) => {
          acc[club.id] = club.name;
          return acc;
        }, {});
        setClubMap(clubMapping);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchClubs();
  }, []);

  useEffect(() => {
    if (Object.keys(userMap).length === 0 || Object.keys(clubMap).length === 0) return;

    const fetchPosts = async () => {
      try {
        const response = await fetch("https://group11be-29e4f568939f.herokuapp.com/api/post/get-all");
        const data = await response.json();

        const formattedPosts = data.map(post => ({
          postId: post.id.toString(),
          tag: clubMap[post.clubId] || "Unknown Club",
          username: userMap[post.userId]?.username || `User ${post.userId}`,
          profilePic: userMap[post.userId]?.profilePic || `https://randomuser.me/api/portraits/men/24.jpg`,
          content: post.discussion,
          timestamp: new Date(post.createdAt).toLocaleString(),
          likes: post.likes,
        }));

        const sortedPosts = formattedPosts.sort((a, b) => {
          const dateA = new Date(a.timestamp);
          const dateB = new Date(b.timestamp);
          return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
        });

        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [userMap, clubMap, sortOrder]);

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Sort By:</Text>
        <Picker
          selectedValue={sortOrder}
          style={styles.picker}
          onValueChange={(itemValue) => setSortOrder(itemValue)}
        >
          <Picker.Item label="Newest to Oldest" value="newest" />
          <Picker.Item label="Oldest to Newest" value="oldest" />
        </Picker>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.postId}
        renderItem={({ item }) => (
          <Post
            postId={item.postId}
            tag={item.tag}
            username={item.username}
            profilePic={item.profilePic}
            content={item.content}
            timestamp={item.timestamp}
            likes={item.likes}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}
