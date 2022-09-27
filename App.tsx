import { useRef, useEffect } from 'react'
import { StatusBar } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter'

import { Routes } from './src/routes'
import { Background } from './src/components/Background';
import { Loading } from './src/components/Loading';

import './src/services/notificationConfig'
import { getTokenNotification } from './src/services/getTokenNOtification'
import { Subscription } from 'expo-modules-core'
import * as Notifications from 'expo-notifications';

export default function App() {


  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  })

  const getTokenNotificationListener = useRef<Subscription>()
  const responseTokenNotificationListener = useRef<Subscription>()

  useEffect(() => {
    getTokenNotification()
  })

  useEffect(() => {
    getTokenNotificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    responseTokenNotificationListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);

    })

    return () => {
      if (getTokenNotificationListener.current && responseTokenNotificationListener.current) {
        Notifications.removeNotificationSubscription(getTokenNotificationListener.current);
        Notifications.removeNotificationSubscription(responseTokenNotificationListener.current);

      }
    }
  }, [])

  return (
    <Background>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}


