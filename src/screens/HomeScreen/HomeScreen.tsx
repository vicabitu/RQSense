import React, { useState } from 'react';
import { LogBox, View, Text, Button } from 'react-native';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';

import styles from './styles';

const HomeScreen = () => {
  LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
  setUpdateIntervalForType(SensorTypes.accelerometer, 1000); // defaults to 100ms
  const [subscription, setSubscription] = useState<any>();

  const startTrip = () => {
    const s = accelerometer.subscribe(({ x, y, z, timestamp }) => {
      console.log({ x, y, z, timestamp });
    });
    setSubscription(s);
  };

  const pauseTrip = () => {
    console.log('pauseTrip');
  };

  const endTrip = () => {
    subscription.unsubscribe();
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Text style={styles.title}>RQSense</Text>
        <Button onPress={startTrip} title="Comenzar" />
        <Button onPress={pauseTrip} title="Pausar" />
        <Button onPress={endTrip} title="Finalizar" />
      </View>
    </View>
  );
};

export default HomeScreen;
