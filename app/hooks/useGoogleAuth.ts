import { useEffect, useState } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GOOGLE_CONFIG } from '../config/googleConfig';

WebBrowser.maybeCompleteAuthSession();

interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: GOOGLE_CONFIG.webClientId,
    androidClientId: GOOGLE_CONFIG.androidClientId,
    iosClientId: GOOGLE_CONFIG.iosClientId,
  });

  const [googleUser, setGoogleUser] = useState<GoogleUser | null>(null);
  const [loading, setLoading] = useState(false);

  // Obtiene info del usuario desde Google
  const getUserInfo = async (token: string) => {
    if (!token) return;
    
    try {
      const response = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      const user = await response.json();
      setGoogleUser(user);
      return user;
    } catch (error) {
      console.error('Error obteniendo info de usuario:', error);
      return null;
    }
  };

  // Escucha la respuesta de Google
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      if (authentication?.accessToken) {
        getUserInfo(authentication.accessToken);
      }
    }
  }, [response]);

  // Inicia el flujo de login con Google
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await promptAsync();
    } catch (error) {
      console.error('Error en Google Sign-In:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    signInWithGoogle,
    googleUser,
    loading,
  };
};