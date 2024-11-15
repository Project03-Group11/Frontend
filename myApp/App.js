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

// export default function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const PlatformUsed = Platform.OS;
//   if(PlatformUsed==='web'){
//     useEffect(() => {
//       const token = localStorage.getItem('email');
//       setIsAuthenticated(!!token); // Set to true if token exists
//     }, []);
//   }else{
//     useEffect(() => {
//       const checkSessionToken = async () => {
//         try {
//           const token = await AsyncStorage.getItem('email');
//           setIsAuthenticated(!!token); // Set to true if token exists
//         } catch (error) {
//           console.error('Error retrieving session token:', error);
//           setIsAuthenticated(false);
//         }
//       };
//       checkSessionToken();
//     }, []);
  
//   }
//   // Replace this useEffect with actual auth logic, such as checking token
//   useEffect(() => {
//     // Example check - replace with real auth check
//     const checkAuthStatus = async () => {
//       const userLoggedIn = false; // Replace with actual authentication status
//       setIsAuthenticated(userLoggedIn);
//     };

//     checkAuthStatus();
//   }, []);

//   const LoginScreen = Platform.OS === 'web' ? GoogleSignInWeb : GoogleSignInExpo;

//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         {isAuthenticated ? (
//           <Stack.Screen name="MainTabs" component={MainTabs} />
//         ) : (
//           <Stack.Screen name="Login" component={LoginScreen} />
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// function MainTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarStyle: {
//           backgroundColor: '#c9ad9d', // Light tan background to match the page theme
//         },
//         tabBarActiveTintColor: '#8b5e3c', // Darker brown for active tab icon and text
//         tabBarInactiveTintColor: '#9c6644', // A slightly lighter brown for inactive tabs
//         headerStyle: {
//           backgroundColor: '#c9ad9d', // Light tan for header background
//         },
//         headerTintColor: '#8b5e3c', // Darker brown for header text color
//         headerTitleStyle: {
//           fontWeight: 'bold',
//         },
//       }}
//     >
//       <Tab.Screen
//         name="Homepage"
//         component={Homepage}
//         options={{ title: 'HomePage' }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Homepage} // Replace with actual Profile screen
//         options={{ title: 'Profile' }}
//       />
//     </Tab.Navigator>
//   );
// }

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
        options={{ title: 'HomePage' }}
      />
      <Tab.Screen
        name="Profile"
        component={Homepage} // Replace with actual Profile screen
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="MainTabs" component={MainTabs} /> */}
        <Stack.Screen name="MainTabs" component={MainTabs} />
        {/* <Stack.Screen
          name="Comments"
          component={CommentsScreen}
          options={{ headerShown: true, title: 'Comments' }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });






