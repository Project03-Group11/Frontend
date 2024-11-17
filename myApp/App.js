import React from 'react';
import { Platform } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import GoogleSignInExpo from './src/components/login/GoogleSignInExpo';
import GoogleSignInWeb from './src/components/login/GoogleSignInWeb';

import Homepage from './screens/Homepage';
import ProfilePage from './screens/ProfilePage';
import CommentsScreen from './screens/Comment';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
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
      {Platform.OS === 'web' ? (
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
      )}
      <Tab.Screen
        name="Homepage"
        component={Homepage}
        options={{ title: 'Discussion Feed' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{ title: 'My Profile' }}
      />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
