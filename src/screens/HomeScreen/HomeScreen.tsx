import React, { useState } from 'react';
import { LogBox, View, Text, Button, PermissionsAndroid } from 'react-native';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import { collection, doc, setDoc } from 'firebase/firestore';
import Geolocation from '@react-native-community/geolocation';

import styles from './styles';
import { db } from '../../config/firebase';

const HomeScreen = () => {
  LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
  setUpdateIntervalForType(SensorTypes.accelerometer, 1000); // defaults to 100ms
  const [subscription, setSubscription] = useState<any>();
  const [trip, setTrip] = useState<Trip>();
  const [points, setPoints] = useState<Point[]>([]);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Se requiere acceso a su ubicación',
          message: 'La aplicación necesita acceder a tu ubicación',
          buttonNeutral: 'Pregúntame Luego',
          buttonNegative: 'Cancelar',
          buttonPositive: 'Ok',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const startTrip = async () => {
    const hasLocationPermissions = await requestLocationPermission();
    if (hasLocationPermissions) {
      const newTrip: Trip = { date: '20/11/2022' };
      setTrip(newTrip);
      const accelerometerSubscription = accelerometer.subscribe(
        ({ x, y, z, timestamp }) => {
          Geolocation.getCurrentPosition(position => {
            const newPoint: Point = {
              x: x,
              y: y,
              z: z,
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
            };
            setPoints(prevPoints => [...prevPoints, newPoint]);
            console.log(
              `x: ${x}, y: ${y}, z: ${z}, timestamp: ${timestamp}, lat: ${position.coords.latitude}, long: ${position.coords.longitude}`,
            );
          });
        },
      );
      setSubscription(accelerometerSubscription);
    } else {
      // TO DO: Aca muestro un mensaje de error de que no acepto los
      // permisos de la ubicacion
      console.log('No tengo permisos');
    }
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
        await setDoc(pointReference, {
          x: point.x,
          y: point.y,
          z: point.z,
          latitude: point.latitude,
          longitude: point.longitude,
        });
      });
      await setDoc(tripReference, { date: trip?.date });
    } catch (error) {
      // TO DO: Aca muestro un mensaje de error indicando que no se puedieron
      // subir los datos al servidor
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
