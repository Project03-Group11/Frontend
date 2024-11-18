import { StyleSheet, Dimensions } from 'react-native';

// Get screen dimensions for responsive design
const { width, height } = Dimensions.get('window');

// Dynamic font size based on screen width
const dynamicFontSize = (size) => {
  return size * (width / 375)*0.45; // Example: based on iPhone 6 width (375px)
};

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: '#faf3e9', // soft coffee background
    flex: 1, // Take up all available space
    justifyContent: 'center', // Vertically center the content
    alignItems: 'center', // Horizontally center the content
    paddingTop: 30, // Offset for fixed navbar
  },
  profileContainer: {
    width: width * 0.9, // 90% of the available screen width
    height: height * 0.6, // 60% of the screen height
    maxWidth: 600, // Limit the maximum width
    marginHorizontal: 20, // Side margin for spacing
    marginTop: 30, // Space from the navbar
    marginBottom: 20, // Space from the bottom
    padding: 20,
    backgroundColor: '#f5efe6', // light coffee background
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    color: '#3e2a1c', // deep coffee color for text
  },
  navbar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: '#3e2a1c', // deep coffee color
    color: '#ffffff',
    paddingVertical: 15,
    textAlign: 'center',
    elevation: 5, // for shadow on Android
    shadowColor: '#000', // for shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    zIndex: 1000,
  },
  navbarTitle: {
    margin: 0,
    fontSize: dynamicFontSize(24), // Increase font size dynamically
    fontWeight: 'bold',
    color: '#ffffff',
  },
  profileHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePicture: {
    width: width * 0.2, // Dynamic width for profile picture based on screen width
    aspectRatio: 1, // Maintain square aspect ratio
    borderRadius: width * 0.15, // Circular profile picture with dynamic radius
    borderColor: '#d4b59e', // soft coffee color
    borderWidth: 2,
  },
  username: {
    fontSize: dynamicFontSize(24), // Slightly bigger font size for username
    color: '#3e2a1c',
    marginVertical: 10,
  },
  editProfileButton: {
    backgroundColor: '#d4b59e',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  clubsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: dynamicFontSize(22), // Slightly bigger font size for section titles
    color: '#3e2a1c',
    borderBottomColor: '#d4b59e',
    borderBottomWidth: 2,
    paddingBottom: 5,
    marginBottom: 10,
    textAlign: 'center',
  },
  clubList: {
    padding: 0,
    margin: 0,
  },
  clubItem: {
    padding: 15,
    backgroundColor: '#fff8f0', // lighter coffee
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clubName: {
    backgroundColor: '#f0e4d7',
    padding: 10,
    borderRadius: 4,
    color: '#3e2a1c',
    fontSize: dynamicFontSize(18), // Increase font size for club name
    marginBottom: 10,
    marginLeft: 10,
  },
  currentRead: {
    backgroundColor: '#f0e4d7',
    padding: 10,
    borderRadius: 4,
    color: '#3e2a1c',
    fontSize: dynamicFontSize(16), // Increase font size for current read
    marginLeft: 10,
  },
  editClubButton: {
    backgroundColor: '#d4b59e',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
  },
  myClubName: {
    backgroundColor: '#f0e4d7', // light background for club name text
    padding: 10,
    borderRadius: 4,
    color: '#3e2a1c',
    fontSize: dynamicFontSize(18), // Increase font size for my club name
  },
  myCurrentRead: {
    backgroundColor: '#f0e4d7', // light background for current read text
    padding: 10,
    marginLeft: 10,
    borderRadius: 4,
    color: '#3e2a1c',
    fontSize: dynamicFontSize(16), // Increase font size for my current read
    maxWidth: 200,
  },
  ownedClubs: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f5efe6',
    borderRadius: 8,
  },
  ownedClubItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff8f0',
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  clubDetails: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#f5efe6',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#d4b59e',
  },
  buttonClose: {
    backgroundColor: '#3e2a1c',
  },
  textStyle: {
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#3e2a1c',
    fontSize: dynamicFontSize(18), // Increased font size for modal text
  },
  input: {
    backgroundColor: '#e0d4c8',
    color: '#3e2a1c',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: dynamicFontSize(16), // Increased font size for input
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // for subtle shadow effect on Android
  },
});

export default styles;
