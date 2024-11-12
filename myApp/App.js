import React from 'react';
import { Platform } from 'react-native';
import GoogleSignInExpo from './src/components/login/GoogleSignInExpo';
import GoogleSignInWeb from './src/components/login/GoogleSignInWeb';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Homepage from './screens/Homepage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
            <Tab.Navigator
            screenOptions={{
                      tabBarStyle: {
                        backgroundColor: '#c9ad9d', // Light tan background to match the page theme
                      },
                      tabBarActiveTintColor: '#8b5e3c', // Darker brown for active tab icon and text
                      tabBarInactiveTintColor: '#9c6644', // A slightly lighter brown for inactive tabs
                      headerStyle: {
                        backgroundColor: '#c9ad9d', // Light tan for header background
                      },
                      headerTintColor: '#8b5e3c', // Darker brown for header text color
                      headerTitleStyle: {
                        fontWeight: 'bold',
                      },
                    }}
             >

              {Platform.OS === 'web' ? (
                <Tab.Screen
                  name="webLogin"
                  component={GoogleSignInWeb}
                  options={{title: 'Web Login'}}
                />
              ) : (
                <Tab.Screen
                  name="appLogin"
                  component={GoogleSignInExpo}
                  options={{title: 'App Login'}}
                />
              )}

              <Tab.Screen
                name="homepage"
                component={Homepage}
                options={{title: 'HomePage'}}
              />

              <Tab.Screen
                         name="Test"
                         component={Homepage}
                         options={{title: 'Profile'}}
              />

            </Tab.Navigator>
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