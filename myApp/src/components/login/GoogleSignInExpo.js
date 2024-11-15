// // src/components/GoogleSignInExpo.js
// import React, { useEffect, useState } from 'react';
// import { Button, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
// import * as Google from "expo-auth-session/providers/google";
// // import * as AuthSession from 'expo-auth-session';

// const redirectUri = 'https://auth.expo.io/@sebasx5/myApp';
// const webClientId= '604488331524-7adg3sic5ljsej03mi6vdt43jo7dm3ps.apps.googleusercontent.com';
// const androidClientId ='604488331524-7adg3sic5ljsej03mi6vdt43jo7dm3ps.apps.googleusercontent.com';
// const expoClientId ='604488331524-7adg3sic5ljsej03mi6vdt43jo7dm3ps.apps.googleusercontent.com';
// const GoogleSignInExpo = () => {
//   console.log("start expo sign in");
//   const [userInfo, setUserInfo] = useState(null);
//     const config={
//         webClientId,
//         expoClientId,
//         androidClientId,
//         redirectUri,        
//     }
//     const [request, response, promptAsync] = Google.useAuthRequest(config);
//     const handleToken = () => {
//       console.log("in handle token");
//       if(response?.type === 'success'){
//         const {authentication}=response;
//         const token= authentication?.accessToken;
//         console.log("Access token",token);
//         getUserInfo(token);
//       }else{
//         console.log(response);
//       }
//       console.log("handle end");
//     }

//     const getUserInfo = async (token) =>{
//         console.log("in get user info");
//         if(!token) return;
//         try {
//             const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
//               headers: { Authorization: `Bearer ${token}` },
//             });
//             const user = await res.json();
//             setUserInfo(user);
//             console.log(user);
//         } catch (error) {
//             console.error('Failed to fetch user info', error);
//         }
//     }

//   useEffect(() =>{
//       console.log("called useEffect");
//       handleToken();
//   }, [response])

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={styles.button}
//         disabled={!request}
//         onPress={() => promptAsync()}
//       >
//         <Text style={styles.buttonText}>Sign in with Google</Text>
//       </TouchableOpacity>
//       {userInfo && <Text style={styles.welcomeText}>Welcome, {userInfo.name}</Text>}
//     </View>
//   );
// };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',  // Centers vertically
// //     alignItems: 'center',       // Centers horizontally
// //     backgroundColor: '#fff',    // Optional: background color
// //   },
// //   button: {
// //     backgroundColor: '#4285F4', // Google blue color
// //     paddingVertical: 25,        // Increases height
// //     paddingHorizontal: 50,      // Increases width
// //     borderRadius: 8,            // Rounds corners
// //   },
// //   buttonText: {
// //     color: '#fff',
// //     fontSize: 50,               // Increases font size
// //     fontWeight: 'bold',
// //     textAlign: 'center',
// //   },
// //   welcomeText: {
// //     marginTop: 20,              // Adds space between button and text
// //     fontSize: 18,
// //     color: '#333',
// //   },
// // });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',   // Centers vertically
//     alignItems: 'center',       // Centers horizontally
//     backgroundColor: '#fff',    // Optional: background color
//   },
//   button: {
//     backgroundColor: '#4285F4', // Google blue color
//     paddingVertical: height * 0.03,  // Responsive height padding (3% of screen height)
//     paddingHorizontal: width * 0.2,  // Responsive width padding (20% of screen width)
//     borderRadius: 8,                // Rounds corners
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: width * 0.05,         // Responsive font size (5% of screen width)
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   welcomeText: {
//     marginTop: height * 0.02,       // Adds space between button and text (2% of screen height)
//     fontSize: width * 0.045,        // Responsive font size (4.5% of screen width)
//     color: '#333',
//   },
// });



// export default GoogleSignInExpo;

import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, ActivityIndicator, Alert, Dimensions } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';
const { width, height } = Dimensions.get('window');


const redirectUri = 'https://auth.expo.io/@sebasx5/myApp';
const webClientId= '604488331524-7adg3sic5ljsej03mi6vdt43jo7dm3ps.apps.googleusercontent.com';
const androidClientId ='604488331524-7adg3sic5ljsej03mi6vdt43jo7dm3ps.apps.googleusercontent.com';
const expoClientId ='604488331524-7adg3sic5ljsej03mi6vdt43jo7dm3ps.apps.googleusercontent.com';
// const redirectUri2=Google.makeRedirectUri({
//   native: 'myApp://redirect',
//   useProxy:true,
// });
// console.log(redirectUri2);
export default function GoogleSignInScreen({ navigation }) {
  const config={
            webClientId,
            expoClientId,
            androidClientId,
            redirectUri,        
        }
    const [request, response, promptAsync] = Google.useAuthRequest(config);

    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            handleGoogleLoginSuccess(authentication.accessToken);
        }
    }, [response]);

    const handleGoogleLoginSuccess = async (accessToken) => {
        setLoading(true);
        try {
            const decoded = jwtDecode(accessToken);
            const userData = {
                email: decoded.email,
                username: decoded.name,
                profile_pic: decoded.picture,
            };
            await SecureStore.setItemAsync('userData', JSON.stringify(userData));

            // Send user data to backend
            const apiResponse = await fetch(`https:/group11be-29e4f568939f.herokuapp.com/api/user/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!apiResponse.ok) {
                throw new Error(`Failed to add user: ${apiResponse.statusText}`);
            }

            setUserInfo(userData);
            navigation.navigate('HomePage', userData);
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Login Error', 'An error occurred during login. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to ShelfTalk</Text>
            <Text style={styles.subtitle}>Book Clubs, organized</Text>

            {userInfo ? (
                <View style={styles.profile}>
                    <Image source={{ uri: userInfo.profile_pic }} style={styles.profilePic} />
                    <Text style={styles.welcome}>Welcome, {userInfo.username}!</Text>
                </View>
            ) : (
                <View style={styles.loginContainer}>
                    <Text style={styles.googleButtonText}>Sign in with Google to continue</Text>
                    <Button 
                        style = {styles.googleButton}
                        title="Sign in with Google"
                        onPress={() => promptAsync()}
                        disabled={!request}
                    />
                </View>
            )}

            {loading && <ActivityIndicator style={styles.loading} />}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#ebdbc4', // Light brown background color
      justifyContent: 'center',
      alignItems: 'center',
  },
  box: {
      backgroundColor: '#ffffff',
      paddingVertical: height * 0.03, // 3% of screen height for vertical padding
      paddingHorizontal: width * 0.07, // 7% of screen width for horizontal padding
      borderRadius: height * 0.02, // Rounded corners based on height
      width: width * 0.85, // 85% of screen width for the main box
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: height * 0.002 }, // Shadow based on height
      shadowOpacity: 0.2,
      shadowRadius: height * 0.01, // Shadow radius based on height
  },
  title: {
      fontSize: height * 0.045, // 4.5% of screen height
      fontWeight: 'bold',
      color: '#8b5e3c', // Darker brown color
      marginBottom: height * 0.01, // 1% of screen height for spacing
  },
  subtitle: {
      fontSize: height * 0.02, // 2% of screen height
      color: '#a37d5e', // Light brown color
      marginBottom: height * 0.07, // 7% of screen height for spacing
  },
  welcome: {
      fontSize: height * 0.025, // 2.5% of screen height
      fontWeight: 'bold',
      color: '#333',
      marginBottom: height * 0.01, // 1% of screen height for spacing
  },
  signInText: {
      fontSize: height * 0.022, // 2.2% of screen height
      color: '#555',
      textAlign: 'center',
      marginBottom: height * 0.03, // 3% of screen height for spacing
  },
  googleButton: {
      backgroundColor: '#4285F4',
      paddingVertical: height * 0.025, // 1.5% of screen height
      paddingHorizontal: width * 0.18, // 10% of screen width
      borderRadius: height * 0.045, // Border radius based on height
      marginTop: height * 0.16, // 4% of screen height for spacing
      width: width * 0.75, // 60% of screen width for the button
      alignItems: 'center',
  },
  googleButtonText: {
      color: '#a37d5e',
      fontWeight: 'bold',
      fontSize: height * 0.025, // 1.8% of screen height
  },
  termsText: {
      fontSize: height * 0.017, // 1.5% of screen height
      color: '#777',
      textAlign: 'center',
      marginTop: height * 0.04, // 4% of screen height for spacing
  },
  linkText: {
      color: '#8b5e3c', // Darker brown color for links
      textDecorationLine: 'underline',
  },
  loading: {
      marginTop: height * 0.02, // 2% of screen height for spacing
  },
});

