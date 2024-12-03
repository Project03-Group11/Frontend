import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#FAF3E0', // Light beige background
    },
    bookListContainer:{
        alignItems: 'center', // Center align all book cards
        marginTop: 8,
    },
    header: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 16,
      color: '#5E4638', 
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
      height: 40,
      backgroundColor: '#fff',
    },
    searchButton: {
      backgroundColor: '#d4b59e',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 50,
      height: 40,
      marginLeft: 8,
    },
    searchButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 18,
    },
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginBottom: 16,
    },
    filter: {
      paddingVertical: 8,
      backgroundColor: '#ddd',
      borderRadius: 8,
      width: '10%',
      minWidth: width * 0.1, 
      maxWidth: width * 0.3, 
      maxHeight:75,
      padding: width * 0.01,
      justifyContent: 'center',
        alignItems: 'center',
    },
    activeFilter: {
      paddingVertical: 8,
      backgroundColor: '#d4b59e',
      borderRadius: 8,
      width: '10%',
      minWidth: width * 0.1, 
      maxWidth: width * 0.3, 
      maxHeight:75,
      padding: width * 0.01,
      justifyContent: 'center',
        alignItems: 'center',
    },
    filterText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    bookCard: {
        width: '70%',
        minWidth: width * 0.8, 
        maxWidth: width * 0.95, 
        maxHeight:250,
        padding: width * 0.03,
        flexDirection: 'row',
        backgroundColor: '#fff', 
        marginVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    coverImage: {
      width: 50,
      height: 70,
      borderRadius: 8,
      marginRight: 16,
      backgroundColor: '#ccc',
    },
    bookDetails: {
      flex: 1,
    },
    bookTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 4,
    },
    bookAuthor: {
      fontSize: 18,
      color: '#555',
      marginBottom: 8,
    },
    bookSummary: {
      fontSize: 18,
      color: '#777',
      marginBottom: 8,
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    genreText: {
      fontSize: 18,
      color: '#555',
      marginRight: 16,
    },
    pagesText: {
      fontSize: 18,
      color: '#555',
    },
    selectButton: {
        backgroundColor: '#d4b59e',
        paddingVertical: 10, 
        paddingHorizontal: 75, 
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        alignSelf: 'center', 
      },
      
    selectButtonText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 16,
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
    noResults: {
        textAlign: 'center',
        fontSize: 26, 
        color: '#8C8C8C', 
        marginTop: 20, 
        fontWeight: '500', 
      },
      
  });
  
  
export default styles;