import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Platform, Pressable, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './HomepageStyles';

const Post = ({ tag, username, content, timestamp, likes }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prevCount => liked ? prevCount - 1 : prevCount + 1);
  };

  return (
    <View style={styles.postContainer}>
      <Text style={styles.tag}>{tag}</Text>
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.content}>{content}</Text>
      <Text style={styles.timestamp}>{timestamp}</Text>

      <View style={styles.actionsContainer}>
        <Pressable onPress={handleLike} style={styles.likeButton}>
          <Image
            source={{
              uri: liked //TODO: update user given the post user ID to increase likes amount
                ? 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png'
                : 'https://cdn.icon-icons.com/icons2/1122/PNG/512/likeblackheartbutton_79537.png'
            }}
            style={styles.likeIcon}
          />
          <Text style={styles.likeCount}>{likeCount}</Text>
        </Pressable>

        <Pressable style={styles.commentButton}>
          <Text style={styles.actionText}> Comment</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default function Homepage() {
  const [posts, setPosts] = useState([]);
    const [userMap, setUserMap] = useState({});
    const [sortOrder, setSortOrder] = useState('newest');

    //Context: this fetches users one time, at initial load, and makes a user map.
     //We then use the user map to get which user posted what
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch("https://group11be-29e4f568939f.herokuapp.com/api/user/get-all");
          const data = await response.json();
          const userMapping = data.reduce((acc, user) => {
            acc[user.id] = user.username;
            return acc;
          }, {});
          setUserMap(userMapping);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

      const fetchPosts = async () => {
        try {
          const response = await fetch("https://group11be-29e4f568939f.herokuapp.com/api/post/get-all");
          const data = await response.json();
          const formattedPosts = data.map(post => ({
            id: post.id.toString(),
            tag: 'Example Club', // TODO: Replace with Actual Club
            username: userMap[post.userId] || `User ${post.userId}`, //If somehow there is a null username, "Username" is User ID
            content: post.discussion,
            timestamp: new Date(post.createdAt).toLocaleString(),
            likes: post.likes
          }));
          setPosts(formattedPosts);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };

      fetchUsers().then(fetchPosts); //this makes sure we actually get the users first before we fetch posts
    }, [userMap]);

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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Post
            tag={item.tag}
            username={item.username}
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
