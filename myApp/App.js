// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Platform } from 'react-native';
import GoogleSignInExpo from './src/components/login/GoogleSignInExpo';
import GoogleSignInWeb from './src/components/login/GoogleSignInWeb';

export default function App() {
  console.log("STARTED")
  if (Platform.OS === 'web') {
    console.log("Called Web");
    return <GoogleSignInWeb />;
  } else {
    console.log("Called Expo");
    return <GoogleSignInExpo />;
    console.log("End expo");
  }
}