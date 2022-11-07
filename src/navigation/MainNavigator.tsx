import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SplashScreen, HomeScreen, LoaderScreen } from '../screens';
const Stack = createNativeStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator
    initialRouteName="SplashScreen"
    screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SplashScreen" component={SplashScreen} />
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="LoaderScreen" component={LoaderScreen} />
  </Stack.Navigator>
);

export default MainNavigator;
