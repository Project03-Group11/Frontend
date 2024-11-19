import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  appContainer: {
      backgroundColor: '#faf3e9', // soft coffee background
      flex: 1,
      paddingTop: 30, // Offset for fixed navbar
    },
    profileContainer: {
    flex:1,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  profileContainer: {
    maxWidth: 600,
    margin: 'auto',
    padding: 20,
    backgroundColor: '#f5efe6', // light coffee background
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    color: '#3e2a1c', // deep coffee color for text
  },
  profileHeader: {
  flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#d4b59e', // soft coffee color
    borderWidth: 2,
  },
  username: {
    fontSize: 24,
    color: '#3e2a1c',
    marginVertical: 10,
  },
  editProfileButton: {
    backgroundColor: '#d4b59e',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignItems: 'center',
  },
  clubsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#3e2a1c',
    borderBottomColor: '#d4b59e',
    borderBottomWidth: 2,
    paddingBottom: 5,
    marginBottom: 10,
  },
  clubList: {
    padding: 0,
    margin: 0,
  },
  clubItem: {
    padding: 10,
    backgroundColor: '#fff8f0', // lighter coffee
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clubName: {
      backgroundColor: '#f0e4d7',
      padding: 5,
      borderRadius: 4,
      color: '#3e2a1c',
      fontSize: 16,
      marginBottom:10,
      marginLeft:10
    },
    currentRead: {
      backgroundColor: '#f0e4d7',
      padding: 5,
      borderRadius: 4,
      color: '#3e2a1c',
      fontSize: 14,
      marginLeft:10
    },
    editClubButton: {
        backgroundColor: '#d4b59e',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 4,
        alignItems: 'center',
      },

  myClubName: {
      backgroundColor: '#f0e4d7', // light background for club name text
      padding: 5,
      borderRadius: 4,
      color: '#3e2a1c',
      fontSize: 16,

    },
    myCurrentRead: {
      backgroundColor: '#f0e4d7', // light background for current read text
      padding: 5,
      marginLeft: 10,
      borderRadius: 4,
      color: '#3e2a1c',
      fontSize: 14,
      maxWidth: 200,
    },
    ownedClubs: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f5efe6',
        borderRadius: 8,
      },

      ownedClubItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#fff8f0',
        borderRadius: 5,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },

      clubDetails:{
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
          shadowOffset: {
            width: 0,
            height: 4,
          },
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
          fontSize: 18,
        },
        input: {
            backgroundColor: '#e0d4c8',
            color: '#3e2a1c',
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 8,
            fontSize: 16,
            marginBottom: 20,
            width: '100%',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2, // for subtle shadow effect on Android
        }
});

export default styles;