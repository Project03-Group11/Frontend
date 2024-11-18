import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  clubSearchContainer: {
    backgroundColor: '#faf3e9', // soft coffee background
    flex: 1, // For full height
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },

  navbar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: '#3e2a1c',
    color: '#ffffff',
    paddingVertical: 15,
    textAlign: 'center',
    elevation: 4, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    zIndex: 1000,
  },

  navbarTitle: {
    margin: 0,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },

  searchBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
  },

  searchInput: {
    width: '60%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#d4b59e',
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#fff',
  },

  searchButton: {
    backgroundColor: '#d4b59e',
    color: 'white',
    borderWidth: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
    borderRadius: 5,
    fontSize: 16,
  },

  resultsContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 100, // To avoid overlap with navbar
  },

  clubCard: {
    flexDirection: 'row',
    backgroundColor: '#fff8f0',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    padding: 20,
    marginVertical: 15,
    width: '80%',
    maxWidth: 600,
  },

  coverImage: {
    width: 120,
    height: 180,
    resizeMode: 'cover',
    borderRadius: 5,
    marginRight: 20,
  },

  clubInfo: {
    flex: 1,
    flexDirection: 'column',
  },

  clubName: {
    fontSize: 20,
    color: '#3e2a1c',
    fontWeight: 'bold',
    marginBottom: 5,
  },

  clubOwner: {
    color: '#3e2a1c',
    fontWeight: 'bold',
    marginBottom: 10,
  },

  currentReadTitle: {
    color: '#3e2a1c',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },

  summary: {
    fontStyle: 'italic',
    color: '#555',
    marginVertical: 10,
  },

  joinButton: {
    backgroundColor: '#d4b59e',
    color: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
});

export default styles;
