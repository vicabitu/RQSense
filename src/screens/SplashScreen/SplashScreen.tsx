import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

import styles from './styles';
import { goToScreen } from '../../navigation/controls';

const SplashScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      goToScreen('HomeScreen');
    }, 2500);
  }, []);

  return (
    <View style={styles.activityIndicator}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default SplashScreen;
