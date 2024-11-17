import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import GoogleSignInExpo from './src/components/login/GoogleSignInExpo';
import GoogleSignInWeb from './src/components/login/GoogleSignInWeb';
import * as SecureStore from 'expo-secure-store';

import Homepage from './screens/Homepage';
import ProfilePage from './screens/ProfilePage';
import CommentsScreen from './screens/Comment';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const PlatformUsed = Platform.OS;

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = () => {
    if (Platform.OS === 'web') {
      const token = localStorage.getItem('userData');
      setIsAuthenticated(!!token); // Set to true if token exists
    } else {
      const checkSessionToken = async () => {
        try {
          const token = await SecureStore.getItemAsync('userData');
          setIsAuthenticated(!!token); // Set to true if token exists
        } catch (error) {
          console.error('Error retrieving session token:', error);
          setIsAuthenticated(false);
        }
      };
      checkSessionToken();
    }
  };
  useEffect(() => {
    checkAuth();
  }, []); // Run once on component mount

  return isAuthenticated;
};

function MainTabs({ route }) {
  const { isAuthenticated } = route.params;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#c9ad9d',
        },
        tabBarActiveTintColor: '#8b5e3c',
        tabBarInactiveTintColor: '#9c6644',
        headerStyle: {
          backgroundColor: '#c9ad9d',
        },
        headerTintColor: '#8b5e3c',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {!isAuthenticated ? (
        PlatformUsed === 'web' ? (
          <Tab.Screen
            name="WebLogin"
            component={GoogleSignInWeb}
            options={{ title: 'Web Login' }}
          />
        ) : (
          <Tab.Screen
            name="AppLogin"
            component={GoogleSignInExpo}
            options={{ title: 'App Login' }}
          />
        )
      ) : (
        <>
          <Tab.Screen
            name="Homepage"
            component={Homepage}
            options={{ title: 'HomePage' }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfilePage} // Replace with actual Profile screen
            options={{ title: 'Profile' }}
          />
        </>
      )}
    </Tab.Navigator>
  );
}


export default function App() {
  const isAuthenticated= useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainTabs"
      >
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          initialParams={{ isAuthenticated: isAuthenticated }}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Comments"
          component={CommentsScreen}
          options={{ title: 'Comments' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

