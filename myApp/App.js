import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import GoogleSignInExpo from './src/components/login/GoogleSignInExpo';
import GoogleSignInWeb from './src/components/login/GoogleSignInWeb';
import * as SecureStore from 'expo-secure-store';

import Homepage from './screens/Homepage';
import ProfilePage from './screens/ProfilePage';
import CommentsScreen from './screens/Comment';
import JoinClubPage from './screens/JoinClubPage';
import BookSearchForClubPage from './screens/BookSearchForClub';
import BookSearchPage from './screens/BookSearch';

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


function MainTabs() {
  const isAuthenticated = useAuth();
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: '#c9ad9d',
          height: Platform.OS === 'android' ? 90 : 60,
          paddingBottom: Platform.OS === 'android' ? 20 : 10,
      },        
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#281b0d',
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
            options={{ 
              title: 'Web Login', 
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="login" size={size} color={color} />
              ),
            }}
          />
        ) : (
          <Tab.Screen
            name="AppLogin"
            component={GoogleSignInExpo}
            options={{ 
              title: 'App Login',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="login" size={size} color={color} />
              ), 
            }}
            
          />
        )
      ) : (
        <>
          <Tab.Screen
            name="Homepage"
            component={Homepage}
            options={{
              title: 'Home Page ',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="home" size={size} color={color} />
              ), 
            }}
          />
          <Tab.Screen
            name="JoinClub"
            component={JoinClubPage}
            options={{
              title: 'Join Club ',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="group" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="BookSearchPage"
            component={BookSearchPage}
            options={{
              title: 'Book Search ',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="search" size={size} color={color} />
              ),
            }}          
          />
          <Tab.Screen
            name="Profile"
            component={ProfilePage}
            options={{
              title: 'Profile ',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="person" size={size} color={color} />
              ),
            }}
            listeners={({ navigation }) => ({
              tabPress: (e) => {
                e.preventDefault(); // Prevent default navigation
                navigation.navigate('Profile', { refreshParent: true });
              },
            })}
          />
        </>
      )}
    </Tab.Navigator>
  );
}



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainTabs"
      >
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Comments"
          component={CommentsScreen}
          options={{ title: 'Comments' }}
        />
        <Stack.Screen
          name="BookSearch"
          component={BookSearchForClubPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

