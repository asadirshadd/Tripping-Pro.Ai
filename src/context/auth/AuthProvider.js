import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../../screens/splash/SplashScreen';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch user data (e.g., from an API or storage)
    const fetchUserData = async () => {
      const fetchedUser = await AsyncStorage.getItem('UserId');
      setUser(fetchedUser);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };
    fetchUserData();
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};
