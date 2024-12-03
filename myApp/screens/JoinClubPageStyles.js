import { StyleSheet, Platform, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  clubSearchContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'web' ? 20 : 10,  // Different padding for web vs mobile
    backgroundColor: '#f4e7d1',
  },

  navbar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: '#3e2a1c',
    paddingVertical: 18, 
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    zIndex: 1000,
  },

  navbarTitle: {
    fontSize: 26, 
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },

  searchBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 0, 
  },

  searchInput: {
    width: '60%',
    padding: 12, 
    borderWidth: 1,
    borderColor: '#d4b59e',
    borderRadius: 6, 
    fontSize: 18, 
    backgroundColor: '#fff',
  },

  resultsContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 50, 
  },

  clubCard: {
    backgroundColor: '#fff8f0',
    borderRadius: 10, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6, 
    elevation: 4,
    padding: 25, 
    marginVertical: 20, 
    width: '90%',
    maxWidth: 650, 
  },

  clubName: {
    fontSize: 24, 
    color: '#3e2a1c',
    fontWeight: 'bold',
    marginBottom: 12, 
  },

  clubDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  clubImage: {
    width: 90, 
    height: 135, 
    borderRadius: 10,
    marginRight: 18, 
  },

  clubTextContainer: {
    flex: 1,
  },

  summary: {
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 12, 
  },

  joinButton: {
    backgroundColor: '#d4b59e',
    paddingVertical: 10, 
    paddingHorizontal: 18, 
    borderRadius: 6, 
  },

  joinButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: width * 0.3,
    height: width * 0.1,
    padding: 20,
    backgroundColor: '#f5efe6',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    width: width * 0.1 ,
    height: width * 0.044,
    backgroundColor: '#d4b59e',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
});

export default styles;
