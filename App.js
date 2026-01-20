import Navigation from './src/components/navigation/Navigation';
import {AuthProvider} from './src/context/auth/AuthProvider';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import { PRIMARY, WHITE } from "./src/styling/colors/Colors";
import Toast from 'react-native-toast-message';
import React from "react";
import { useColorScheme } from 'react-native';

export default function App() {
    const scheme = useColorScheme();
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle={'light-content'} backgroundColor={PRIMARY} />
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </SafeAreaView>
      <Toast />
    </>
  );
}
