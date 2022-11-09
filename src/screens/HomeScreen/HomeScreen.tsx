import React, { useState } from 'react';
import {
  LogBox,
  View,
  Text,
  PermissionsAndroid,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import { collection, doc, setDoc } from 'firebase/firestore';
import Geolocation from '@react-native-community/geolocation';

import styles from './styles';
import { db } from '../../config/firebase';
import LoaderScreen from '../LoaderScreen';
import { StateIndicator } from '../../components';
import { goToScreen } from '../../navigation/controls';

const HomeScreen = () => {
  LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
  setUpdateIntervalForType(SensorTypes.accelerometer, 1000); // defaults to 100ms
  const [subscription, setSubscription] = useState<any>();
  const [trip, setTrip] = useState<Trip>({ start: 0, end: 0 });
  const [points, setPoints] = useState<Point[]>([]);
  const [inProcess, setInProcess] = useState<boolean>(false);
  const [onPause, setOnPause] = useState<boolean>(false);
  const [finalized, setFinalized] = useState<boolean>(false);
  const [uploadingData, setUploadingData] = useState<boolean>(false);

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

  const recordPoints = () => {
    const accelerometerSubscription = accelerometer.subscribe(
      ({ x, y, z, timestamp }) => {
        Geolocation.getCurrentPosition(position => {
          const newPoint: Point = {
            x: x,
            y: y,
            z: z,
            timeStamp: timestamp,
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
  };

  const startTrip = async () => {
    setInProcess(true);
    const hasLocationPermissions = await requestLocationPermission();
    if (hasLocationPermissions) {
      const newTrip: Trip = { start: Date.now(), end: 0 };
      setTrip(newTrip);
      recordPoints();
    } else {
      // TO DO: Aca muestro un mensaje de error de que no acepto los
      // permisos de la ubicacion
      console.log('No tengo permisos');
    }
  };

  const pauseTrip = () => {
    setOnPause(true);
    subscription.unsubscribe();
  };

  const restartTrip = () => {
    setOnPause(false);
    recordPoints();
  };

  const endTrip = () => {
    setFinalized(true);
    trip.end = Date.now();
    subscription.unsubscribe();
  };

  const uploadTrip = () => {
    setInProcess(false);
    setOnPause(false);
    setFinalized(false);
    setUploadingData(false);
    const processedPoints = processPoints(5);
    uploadDataToFirestore(processedPoints);
  };

  const processPoints = (chunkSize: number) => {
    const response = [];
    for (let i = 0; i < points.length; i += chunkSize) {
      const chunk = points.slice(i, i + chunkSize);
      const maxX = Math.max(...chunk.map(o => o.x));
      const maxY = Math.max(...chunk.map(o => o.y));
      const maxZ = Math.max(...chunk.map(o => o.z));
      const newPoint: Point = {
        latitude: chunk[0].latitude,
        longitude: chunk[0].longitude,
        timeStamp: chunk[0].timeStamp,
        x: maxX,
        y: maxY,
        z: maxZ,
      };
      response.push(newPoint);
    }
    return response;
  };

  const uploadDataToFirestore = async (processedPoints: Point[]) => {
    try {
      setUploadingData(true);
      const tripReference = doc(collection(db, 'trips'));
      processedPoints.forEach(async point => {
        const pointReference = doc(
          collection(db, `trips/${tripReference.id}/points`),
        );
        await setDoc(pointReference, {
          x: point.x,
          y: point.y,
          z: point.z,
          timeStamp: point.timeStamp,
          latitude: point.latitude,
          longitude: point.longitude,
        });
      });
      await setDoc(tripReference, { start: trip?.start, end: trip?.end });
      setUploadingData(false);
      goToScreen('SuccessfulScreen');
    } catch (error) {
      // TO DO: Aca muestro un mensaje de error indicando que no se puedieron
      // subir los datos al servidor
      console.log(`Error: ${error}`);
    }
  };

  const canStart = () => {
    return inProcess;
  };

  const canPause = () => {
    return !inProcess || onPause || finalized;
  };

  const canRestart = () => {
    return !onPause || finalized;
  };

  const canEnd = () => {
    return !inProcess || finalized;
  };

  const getActiveState = () => {
    if (!inProcess) {
      return 1;
    } else if (inProcess && !finalized) {
      return 2;
    } else if (finalized) {
      return 3;
    } else {
      return 4;
    }
  };

  if (uploadingData) {
    return <LoaderScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../images/rqsense_logo.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.stateIndicatorContainer}>
        <StateIndicator state={getActiveState()} />
      </View>
      <View style={styles.buttonsContainer}>
        {finalized ? (
          <Text style={styles.finishMessage}>
            Recorrido listo para cargar al servidor.
          </Text>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={startTrip}
            disabled={canStart()}>
            <Text style={styles.buttonText}>
              {inProcess ? 'Recorrido en proceso...' : 'Iniciar recorrido'}
            </Text>
          </TouchableOpacity>
        )}
        <View style={styles.pauseButtonsContainer}>
          <TouchableOpacity
            style={styles.buttonPause}
            onPress={pauseTrip}
            disabled={canPause()}>
            <Text style={styles.buttonText}>
              {onPause ? 'Pausado' : 'Pausar'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonResume}
            onPress={restartTrip}
            disabled={canRestart()}>
            <Text style={styles.buttonText}>Reanudar</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={endTrip}
          disabled={canEnd()}>
          <Text style={styles.buttonText}>
            {finalized ? 'Recorrido finalizado' : 'Finalizar recorrido'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.downSpace}>
        {finalized && (
          <TouchableOpacity style={styles.buttonUpload} onPress={uploadTrip}>
            <Text style={styles.buttonText}>Cargar recorrido</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
