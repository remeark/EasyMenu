import React from 'react';
import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';
import { Routes } from './src/routes';

import { SelectWay } from './src/screens/SelectWay';

import { AuthProvider, useAuth } from './src/hooks/auth';
import { Payment } from './src/screens/Payment';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  const { userStorageLoading } = useAuth();

  if(!fontsLoaded || userStorageLoading){
    return <AppLoading />
  };

  return (
    <ThemeProvider theme={theme}>
        <StatusBar 
          barStyle='light-content'
          backgroundColor="transparent"
          translucent
        />
          {/* <Routes /> */}
          <Payment />
    </ThemeProvider>
  );
}

