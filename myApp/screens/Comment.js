import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from './CommentStyles';

const API_BASE_URL = 'https://group11be-29e4f568939f.herokuapp.com/api/comment';
const USER_API_URL = 'https://group11be-29e4f568939f.herokuapp.com/api/user';

const CommentsScreen = ({ route }) => {
    const { post } = route.params;
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        fetchCommentsWithUserData();
    }, []);

    const fetchCommentsWithUserData = async () => {
        try {
            // Fetch comments for the post
            const response = await fetch(`${API_BASE_URL}/get/post/${post.postId}`);
            const commentsData = await response.json();

            // Fetch user data for each comment
            const commentsWithUserData = await Promise.all(
                commentsData.map(async (comment) => {
                    const userResponse = await fetch(`${USER_API_URL}/get/${comment.userId}`);
                    const userData = await userResponse.json();
                    return { ...comment, username: userData.username, profilePic: userData.profilePic };
                })
            );

            console.log(commentsWithUserData);

            setComments(commentsWithUserData);
        } catch (error) {
            console.error('Error fetching comments with user data:', error);
        }
    };

    const handleAddComment = async () => {
        if (newComment.trim()) {
            try {
                const response = await fetch(`${API_BASE_URL}/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        postId: post.postId,
                        userId: 6, // TODO:Replace with the actual user ID if available
                        comment: newComment,
                    }),
                });

                if (response.ok) {
                    const addedComment = await response.json();
                    fetchCommentsWithUserData(); // Refresh comments list with user data
                    setNewComment('');
                } else {
                    console.error('Error adding comment:', response.statusText);
                }
            } catch (error) {
                console.error('Error adding comment:', error);
            }
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    return (
        <View style={styles.container}>
            {post && (
                <View style={styles.postContainer}>
                    <Text style={styles.clubName}>{post.tag}</Text>
                    <View style={styles.userInfoContainer}>
                        {post.profilePic ? (
                            <Image source={{ uri: post.profilePic }} style={styles.profilePic} />
                        ) : (
                            <View style={styles.profilePicPlaceholder}></View>
                        )}
                        <Text style={styles.username}>{post.username}</Text>
                    </View>
                    <Text style={styles.postContent}>{post.content}</Text>
                    <Text style={styles.timestamp}>{post.timestamp}</Text>
                </View>
            )}

            <FlatList
                data={comments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.commentContainer}>
                        <View style={styles.userInfoContainer}>
                            {item.profilePic ? (
                                <Image source={{ uri: item.profilePic }} style={styles.commentProfilePic} />
                            ) : (
                                <View style={styles.profilePicPlaceholder}></View>
                            )}
                            <Text style={styles.commentUsername}>{item.username}</Text>
                        </View>
                        <Text style={styles.commentText}>{item.comment}</Text>
                        <Text style={styles.timestamp}>{formatDate(item.createdAt)}</Text>
                    </View>
                )}
                style={styles.commentsList}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.commentInput}
                    placeholder="Add a comment..."
                    value={newComment}
                    onChangeText={setNewComment}
                />
                <TouchableOpacity onPress={handleAddComment} style={styles.addCommentButton}>
                    <Text style={styles.addCommentButtonText}>Post</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CommentsScreen;
