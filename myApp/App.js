import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import GoogleSignInExpo from './src/components/login/GoogleSignInExpo';
import GoogleSignInWeb from './src/components/login/GoogleSignInWeb';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

import Homepage from './screens/Homepage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const PlatformUsed = Platform.OS;

function MainTabs({ isAuthenticated }) {
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
            component={Homepage} // Replace with actual Profile screen
            options={{ title: 'Profile' }}
          />
        </>
      )}
    </Tab.Navigator>
  );
}


export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    if(PlatformUsed==='web'){
      useEffect(() => {
        const token = localStorage.getItem('userData');
        setIsAuthenticated(!!token); // Set to true if token exists
      }, []);
    }else{
      useEffect(() => {
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
      }, []);
    }

    return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name="MainTabs" component={MainTabs} /> */}
            <Stack.Screen name="MainTabs">
              {() => <MainTabs isAuthenticated={isAuthenticated} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
    );
}