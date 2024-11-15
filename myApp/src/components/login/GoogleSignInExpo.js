// src/components/GoogleSignInExpo.js
import React, { useEffect, useState } from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as Google from "expo-auth-session/providers/google";
// import * as AuthSession from 'expo-auth-session';

const redirectUri = 'https://auth.expo.io/@sebasx5/myApp';
const webClientId= '604488331524-7adg3sic5ljsej03mi6vdt43jo7dm3ps.apps.googleusercontent.com';
const androidClientId ='604488331524-7adg3sic5ljsej03mi6vdt43jo7dm3ps.apps.googleusercontent.com';
const iosClientId ='604488331524-7adg3sic5ljsej03mi6vdt43jo7dm3ps.apps.googleusercontent.com';
const expoClientId ='604488331524-7adg3sic5ljsej03mi6vdt43jo7dm3ps.apps.googleusercontent.com';
const GoogleSignInExpo = () => {
  console.log("start expo sign in");
  const [userInfo, setUserInfo] = useState(null);
    const config={
        webClientId,
        expoClientId,
        androidClientId,
        iosClientId,
        redirectUri,        
    }
    const [request, response, promptAsync] = Google.useAuthRequest(config);
    const handleToken = () => {
      console.log("in handle token");
      if(response?.type === 'success'){
        const {authentication}=response;
        const token= authentication?.accessToken;
        console.log("Access token",token);
        getUserInfo(token);
      }else{
        console.log(response);
      }
      console.log("handle end");
    }

    const getUserInfo = async (token) =>{
        console.log("in get user info");
        if(!token) return;
        try {
            const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
              headers: { Authorization: `Bearer ${token}` },
            });
            const user = await res.json();
            setUserInfo(user);
            console.log(user);
        } catch (error) {
            console.error('Failed to fetch user info', error);
        }
    }

  useEffect(() =>{
      console.log("called useEffect");
      handleToken();
  }, [response])

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        disabled={!request}
        onPress={() => promptAsync()}
      >
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>
      {userInfo && <Text style={styles.welcomeText}>Welcome, {userInfo.name}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  // Centers vertically
    alignItems: 'center',       // Centers horizontally
    backgroundColor: '#fff',    // Optional: background color
  },
  button: {
    backgroundColor: '#4285F4', // Google blue color
    paddingVertical: 25,        // Increases height
    paddingHorizontal: 50,      // Increases width
    borderRadius: 8,            // Rounds corners
  },
  buttonText: {
    color: '#fff',
    fontSize: 50,               // Increases font size
    fontWeight: 'bold',
    textAlign: 'center',
  },
  welcomeText: {
    marginTop: 20,              // Adds space between button and text
    fontSize: 18,
    color: '#333',
  },
});

export default GoogleSignInExpo;
