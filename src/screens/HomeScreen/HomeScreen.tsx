import React, { useState } from 'react';
import { LogBox, View, Text, Button } from 'react-native';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import { collection, doc, setDoc } from 'firebase/firestore';

import styles from './styles';
import { db } from '../../config/firebase';

const HomeScreen = () => {
  LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
  setUpdateIntervalForType(SensorTypes.accelerometer, 1000); // defaults to 100ms
  const [subscription, setSubscription] = useState<any>();
  const [trip, setTrip] = useState<Trip>();
  const [points, setPoints] = useState<Point[]>([]);

  const startTrip = async () => {
    const newTrip: Trip = { date: '20/11/2022' };
    setTrip(newTrip);
    const accelerometerSubscription = accelerometer.subscribe(
      ({ x, y, z, timestamp }) => {
        console.log({ x, y, z, timestamp });
        const newPoint: Point = { x: x, y: y, z: z };
        setPoints(prevPoints => [...prevPoints, newPoint]);
      },
    );
    setSubscription(accelerometerSubscription);
  };

  const pauseTrip = () => {
    console.log('pauseTrip');
  };

  const endTrip = () => {
    subscription.unsubscribe();
    uploadDataToFirestore();
  };

  const uploadDataToFirestore = async () => {
    try {
      const tripReference = doc(collection(db, 'trips'));
      points.forEach(async point => {
        const pointReference = doc(
          collection(db, `trips/${tripReference.id}/points`),
        );
        await setDoc(pointReference, { x: point.x, y: point.y, z: point.z });
      });
      await setDoc(tripReference, { date: trip?.date });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
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
