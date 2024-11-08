// src/components/GoogleSignInExpo.js
import React, { useEffect, useState } from 'react';
// import {GoogleSignin} from 'expo-auth-session/providers/google';
import { Button, Text, View } from 'react-native';
// import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

const webClientId= '604488331524-kpf6d52b7c851436hf9q3lo5ot54lcc9.apps.googleusercontent.com';

const GoogleSignInExpo = () => {
    const config={
        webClientId
    }
    const [request, response, promptAsync] = Google.useAuthRequest(config);
    const handleToken = () => {
        if(response?.type === 'success'){
            const {authentication}=response;
            const token= authentication?.accessToken;
            console.log("Access token",token);
            getUserInfo(token);
        }
    }

    const getUserInfo = async (token) =>{
        if(!token) return;
        try {
            const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
              headers: { Authorization: `Bearer ${token}` },
            });
            const user = await res.json();
            console.log(user);
        } catch (error) {
            console.error('Failed to fetch user info', error);
        }
    }

    useEffect(() =>{
        handleToken();
    }, [response])

  return (
    <View>
      <Button
        disabled={!request}
        title="Sign in with Google"
        onPress={() => promptAsync()}
      />
      {userInfo && <Text>Welcome, {userInfo.name}</Text>}
    </View>
  );
};

export default GoogleSignInExpo;
