import { StyleSheet, Platform, Dimensions } from 'react-native';

// Get screen dimensions for responsive styling
const { width } = Dimensions.get('window');  // Get the screen width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'web' ? 20 : 10,  // Different padding for web vs mobile
    backgroundColor: '#f4e7d1', // Fixed background color
  },
  navBar: {
    width: '100%',
    backgroundColor: '#a2755b',
    paddingVertical: 15,
    alignItems: 'center',
  },
  navBarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContainer: {
    alignItems: 'center',
  },
  postContainer: {
    width: '90%',
    minWidth: width * 0.8, // Dynamic minimum width, adjusts based on screen size (80%)
    maxWidth: width * 0.95, // Max width of the post container (95% of the screen width)
    maxHeight:250,
    padding: width * 0.03,  // Dynamic padding based on screen size (5% of the screen width)
    marginVertical: 10,
    backgroundColor: '#fff8f0',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: Platform.OS === 'web' ? 1 : 0,  // Border only for web
    borderColor: '#ddd',
  },
  tag: {
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
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,  
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,  
    marginRight: 10,  
  },
  username: {
    fontWeight: '700',
    fontSize: 18,
    color: '#333',
  },
  content: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginTop: 6,
  },
  timestamp: {
    fontSize: 13,
    color: '#a1a1a1',
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  likeIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    fontSize: 14,
    color: '#555',
    marginLeft: 5,
  },
  commentButton: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#555',
  },
  // Styles for the filter
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,  
    paddingVertical: 8,  
    backgroundColor: '#f4e7d1',  
    borderRadius: 8, 
    marginBottom: 12, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.08, 
    shadowRadius: 4, 
    elevation: 2, 
    height: 70, // Added height to ensure dropdown fits well
    zIndex: 1000,
    width:'100%'
},
filterLabel: {
    fontSize: 16,  
    color: '#8b5e3c',
    fontWeight: '700',
    marginRight: 10,
    // flexShrink: 1,  
},
sortPicker: {
    height: 35, 
    width: width * 0.2,  
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    flex:1,
    paddingHorizontal: 10,
},
  //post styles
  createPostContainer: {
    width: '85%', 
    maxWidth: width * 0.95, 
    minWidth: width * 0.8, 
    padding: 12, 
    backgroundColor: '#fff', 
    marginVertical: 8, 
    borderRadius: 12, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.08, 
    shadowRadius: 4, 
    elevation: 2, 
    alignSelf: 'center',
  },
  createPostHeader: {
    fontSize: 16, 
    fontWeight: '700', 
    color: '#333', 
    marginBottom: 8, 
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#787575',
    borderRadius: 8,
    padding: 8, 
    fontSize: 14, 
    backgroundColor: '#dbd9d9',
    marginBottom: 12, 
    minHeight: 50, 
    textAlignVertical: 'top',
  },
  pickerAndButtonContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    width: '100%',
    // height: 100,
  },
  pickerContainer: {
    flex: 1, 
    marginRight: 10,
    // flexDirection:'row',
  },
  pickerLabel: {
    fontSize: 14,
    color: '#8b5e3c', 
    fontWeight: '600', 
  },
  createPostPicker: {
    height: 35, 
    width: '40%', 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#ddd',
  },
  postButton: {
    backgroundColor: '#a2755b', 
    paddingVertical: 6, 
    paddingHorizontal: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    height: 50,
    justifyContent: 'center',
  },
  postButtonText: {
    color: '#fff', 
    fontSize: 14, 
    fontWeight: '700',
  },
  inputIOS: {
    height: 60, // Match height with iOS
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333', // Text color
  },
  inputAndroid: {
    height: 60, // Match height with iOS
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333', // Text color
  },
  dropdownContainer: {
    width: '80%', // Make the dropdown take full width
    paddingHorizontal: 16, // Add padding to match design consistency
    marginVertical: 10, // Add vertical spacing
    backgroundColor: '#fff',
    height: 60,
  },
  label: {
    marginBottom: 10,
    fontSize: 18,
    color: '#333',
    justifyContent: 'center', 
    alignSelf: 'center',
    fontWeight:'bold',
  },

});

export default styles;

