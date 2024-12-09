import React, { useState, useEffect, StyleSheet } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './WebLogin.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
function GoogleSignInWeb( ) {
    const navigation= useNavigation();
    const [error, setError] = useState('');

    const handleRefresh = () => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainTabs' }],
        });
    };

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        if (!credentialResponse.credential) {
            setError('Invalid response from Google.');
            return Promise.resolve(); 
        }
        try {
            const decoded = jwtDecode(credentialResponse.credential);
            console.log('Decoded user info:', decoded);
            
            const userData = {
                email: decoded.email,
                username: decoded.name,
                profile_pic: decoded.picture,
            };
            console.log('User data to send to backend:', userData);
            localStorage.setItem('userData',JSON.stringify(userData));
            const response = await fetch(`https://group11be-29e4f568939f.herokuapp.com/api/user/add`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                }
            );
            if (!response.ok) {
                throw new Error(`Failed to add user: ${response.statusText}`);
            }
            handleRefresh();
            return Promise.resolve(); 
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred during login. Please try again.');
            return Promise.reject(error);
        }
    };

    const mockLogin = async() => {
        // setLoading(true);
        const userData = {
            email: "jormoreno@csumb.edu",
            username: "Jorge Moreno",
            profile_pic: "https://lh3.googleusercontent.com/a/ACg8ocKkF4W9gs_Lz_GTZmoUmyXpvzmcP_ijAuteYUjvUYPDBr55Zto=s96-c",
        };
        try {
            localStorage.setItem('userData',JSON.stringify(userData));   
            navigation.navigate('MainTabs', { screen: 'Homepage' });
            handleRefresh();
        } catch (error) {
            console.error("Error during mock login:", error);
        }
    }

    if(Platform.OS === 'web'){

        return (
            <div className="login-container">
                <div className="login-content">
                    <div className="login-card">
                        <div className="brand">
                            <h1>ShelfTalk</h1>
                            <div className="brand-subtitle">Book Clubs, organized</div>
                        </div>

                        <div className="login-header">
                            <h2>Welcome Back</h2>
                            <p>Sign in to continue to your Books</p>
                        </div>

                        <div className="google-login-wrapper">
                            <GoogleLogin
                                onSuccess={handleGoogleLoginSuccess}
                                onError={() => {
                                    setError('Login failed. Please try again.');
                                    console.log('Login Failed');
                                }}
                            />
                        </div>
                        <button type="button" onClick={mockLogin}>Mock Login</button>

                        {error && <div className="error-message">{error}</div>}

                        <div className="terms-section">
                            <p>By signing in, you agree to our</p>
                            <div className="terms-links">
                                <a href="#" className="terms-link">Terms of Service</a>
                                <span>and</span>
                                <a href="#" className="terms-link">Privacy Policy</a>
                            </div>
                        </div>
                    </div>

                    <div className="decorative-pattern"></div>
                </div>
            </div>
        ); 
    }
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.card}>
                    <View style={styles.brand}>
                        <Text style={styles.brandTitle}>ShelfTalk</Text>
                        <Text style={styles.brandSubtitle}>Book Clubs, organized</Text>
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Welcome Back</Text>
                        <Text style={styles.headerSubtitle}>Sign in to continue to your Books</Text>
                    </View>

                    <View style={styles.googleLoginWrapper}>
                        <GoogleLogin
                            onSuccess={handleGoogleLoginSuccess}
                            onError={() => {
                                setError('Login failed. Please try again.');
                                console.log('Login Failed');
                            }}
                        />
                    </View>

                    {error && <Text style={styles.errorMessage}>{error}</Text>}

                    <View style={styles.termsSection}>
                        <Text>By signing in, you agree to our</Text>
                        <View style={styles.termsLinks}>
                            <TouchableOpacity>
                                <Text style={styles.termsLink}>Terms of Service</Text>
                            </TouchableOpacity>
                            <Text> and </Text>
                            <TouchableOpacity>
                                <Text style={styles.termsLink}>Privacy Policy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.decorativePattern} />
            </View>
        </View>
    );
}
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f5f5f5',
//     },
//     content: {
//         width: '90%',
//         alignItems: 'center',
//     },
//     card: {
//         backgroundColor: '#fff',
//         borderRadius: 10,
//         padding: 20,
//         alignItems: 'center',
//         elevation: 5, // Adds shadow for Android
//         shadowColor: '#000', // Adds shadow for iOS
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 5,
//     },
//     brand: {
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     brandTitle: {
//         fontSize: 24,
//         fontWeight: 'bold',
//     },
//     brandSubtitle: {
//         fontSize: 14,
//         color: '#555',
//     },
//     header: {
//         marginBottom: 20,
//         alignItems: 'center',
//     },
//     headerTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//     },
//     headerSubtitle: {
//         fontSize: 14,
//         color: '#777',
//     },
//     googleLoginWrapper: {
//         marginBottom: 20,
//     },
//     errorMessage: {
//         color: 'red',
//         marginBottom: 10,
//     },
//     termsSection: {
//         marginTop: 20,
//         alignItems: 'center',
//     },
//     termsLinks: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     termsLink: {
//         color: '#007bff',
//         textDecorationLine: 'underline',
//     },
//     decorativePattern: {
//         height: 50,
//         width: '100%',
//         backgroundColor: '#e0e0e0',
//         marginTop: 20,
//     },
// });


export default function App() {
    return (
        <GoogleOAuthProvider clientId="604488331524-7adg3sic5ljsej03mi6vdt43jo7dm3ps.apps.googleusercontent.com">
            <GoogleSignInWeb />
        </GoogleOAuthProvider>
    );
}