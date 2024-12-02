// import { StyleSheet, Platform, Dimensions } from 'react-native';
// const { width } = Dimensions.get('window');
// const styles = StyleSheet.create({
//   clubSearchContainer: {
//     flex: 1,
//     paddingTop: Platform.OS === 'web' ? 20 : 10,  // Different padding for web vs mobile
//     backgroundColor: '#f4e7d1',
//   },

//   navbar: {
//     position: 'absolute',
//     top: 0,
//     width: '100%',
//     backgroundColor: '#3e2a1c',
//     paddingVertical: 18, // Increased padding
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     zIndex: 1000,
//   },

//   navbarTitle: {
//     fontSize: 26, // Increased font size
//     fontWeight: 'bold',
//     color: '#ffffff',
//     textAlign: 'center',
//   },

//   searchBar: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     margin: 0, // Increased margin
//   },

//   searchInput: {
//     width: '60%',
//     padding: 12, // Increased padding
//     borderWidth: 1,
//     borderColor: '#d4b59e',
//     borderRadius: 6, // Slightly increased border radius
//     fontSize: 18, // Increased font size
//     backgroundColor: '#fff',
//   },

//   resultsContainer: {
//     flex: 1,
//     flexDirection: 'column',
//     alignItems: 'center',
//     marginTop: 50, // Increased marginTop for more space
//   },

//   clubCard: {
//     backgroundColor: '#fff8f0',
//     borderRadius: 10, // Increased border radius
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6, // Slightly larger shadow radius
//     elevation: 4,
//     padding: 25, // Increased padding
//     marginVertical: 20, // Increased margin
//     width: '90%',
//     maxWidth: 650, // Increased maxWidth
//   },

//   clubName: {
//     fontSize: 24, // Increased font size
//     color: '#3e2a1c',
//     fontWeight: 'bold',
//     marginBottom: 12, // Increased margin
//   },

//   clubDetails: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   clubImage: {
//     width: 90, // Increased width
//     height: 135, // Increased height
//     borderRadius: 10, // Increased border radius
//     marginRight: 18, // Increased margin
//   },

//   clubTextContainer: {
//     flex: 1,
//   },

//   summary: {
//     fontStyle: 'italic',
//     color: '#555',
//     marginBottom: 12, // Increased margin
//   },

//   joinButton: {
//     backgroundColor: '#d4b59e',
//     paddingVertical: 10, // Increased vertical padding
//     paddingHorizontal: 18, // Increased horizontal padding
//     borderRadius: 6, // Slightly increased border radius
//   },

//   joinButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContainer: {
//     width: width * 0.3,
//     height: width * 0.1,
//     padding: 20,
//     backgroundColor: '#f5efe6',
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   modalText: {
//     fontSize: 30,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   modalButton: {
//     width: width * 0.1 ,
//     height: width * 0.04,
//     backgroundColor: '#d4b59e',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   modalButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 30,
//   },
// });

import { StyleSheet, Platform, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f9f9f9',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 16,
    },
    inputContainer: {
      flexDirection: 'row',
      marginBottom: 16,
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 8,
      marginRight: 8,
      height: 40,
    },
    searchButton: {
      backgroundColor: '#4CAF50',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
      height: 40,
    },
    searchButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 16,
    },
    filter: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: '#ddd',
      borderRadius: 8,
    },
    activeFilter: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: '#4CAF50',
      borderRadius: 8,
    },
    filterText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    resultsContainer: {
      flex: 1,
    },
    noResults: {
      textAlign: 'center',
      fontSize: 16,
      color: '#777',
    },
    bookCard: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      padding: 16,
      marginVertical: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    coverImage: {
      width: 60,
      height: 90,
      marginRight: 16,
    },
    bookDetails: {
      flex: 1,
    },
    bookTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    bookAuthor: {
      fontSize: 16,
      color: '#555',
    },
    bookGenre: {
      fontSize: 14,
      color: '#777',
      marginRight: 10,
    },
    bookSummary: {
        fontSize: 14,
        color: '#777',
    },
    bookPages: {
        fontSize: 14,
        color: '#777',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    selectButton: {
        marginTop: 10,
        backgroundColor: '#4CAF50',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    selectButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
      },
      modalMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
      },
      modalButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
      },
      modalButtonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
});
  


export default styles;