import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#f4e7d1', // Light background color for consistency
    },
    postContainer: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
        width: width * 0.9,
        alignSelf: 'center',
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    profilePicPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ccc',
        marginRight: 10,
    },
    commentProfilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },

    username: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    postContent: {
        fontSize: 16,
        color: '#555',
    },
    commentContainer: {
        marginVertical: 10,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        width: width * 0.6,
        alignSelf: 'center',
    },
    commentUserInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
    },
    commentUsername: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    commentText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginVertical: 8,
    },
    timestamp: {
        fontSize: 12,
        color: '#a1a1a1',
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#fff',
        alignItems: 'center',
        width: width * 0.9,
        alignSelf: 'center',
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    commentInput: {
        flex: 1,
        height: 40,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingLeft: 10,
        fontSize: 16,
    },
    addCommentButton: {
        marginLeft: 10,
        backgroundColor: '#6cbe8c', // Match button color to the tab active color
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    addCommentButtonText: {
        fontSize: 16,
        color: '#fff',
    },
    commentsList: {
        paddingHorizontal: 10,
    },
    clubInfoContainer: {
        marginBottom: 10,
        alignItems: 'center',
    },
    clubName: {
        fontSize: 14,
        color: '#9c6644',
        fontWeight: '600',
        backgroundColor: '#C8E8FC',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    bookTitle: {
        fontSize: 16,
        color: '#666',
    },
    loadingText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        marginVertical: 20,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginVertical: 20,
    },
});

export default styles;
