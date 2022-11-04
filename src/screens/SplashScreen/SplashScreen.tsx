import React, { useEffect } from 'react';
import { View, Image, Text } from 'react-native';

import styles from './styles';
import { goToScreen } from '../../navigation/controls';

const SplashScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      goToScreen('HomeScreen');
    }, 2000);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageTop}>
        <Image source={require('../../images/splash_top.png')} />
      </View>
      <View style={styles.centerContainer}>
        <Image source={require('../../images/rqsense_logo.png')} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>¡Te damos la</Text>
          <Text style={styles.text}>bienvenida!</Text>
        </View>
      </View>
      <View style={styles.imageDown}>
        <Image source={require('../../images/splash_down.png')} />
      </View>
    </View>
  );
};

export default SplashScreen;
