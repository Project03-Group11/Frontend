import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  clubSearchContainer: {
    backgroundColor: '#faf3e9',
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },

  navbar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: '#3e2a1c',
    paddingVertical: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    zIndex: 1000,
  },

  navbarTitle: {
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

  resultsContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 100,
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

  clubInfo: {
    flex: 1,
  },

  clubName: {
    fontSize: 20,
    color: '#3e2a1c',
    fontWeight: 'bold',
  },

  summary: {
    fontStyle: 'italic',
    color: '#555',
    marginVertical: 10,
  },

  joinButton: {
    backgroundColor: '#d4b59e',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginTop: 10,
  },

  joinButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
