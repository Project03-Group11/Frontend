import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './WebLogin.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigation } from '@react-navigation/native';
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

export default function App() {
    return (
        <GoogleOAuthProvider clientId="604488331524-7adg3sic5ljsej03mi6vdt43jo7dm3ps.apps.googleusercontent.com">
            <GoogleSignInWeb />
        </GoogleOAuthProvider>
    );
}