import React from 'react';
import { Text, View, Image, ActivityIndicator } from 'react-native';

import styles from './styles';

const LoaderScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../images/rqsense_logo.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.centerContainer}>
        <ActivityIndicator size={130} color="#FFC700" />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Cargando</Text>
          <Text style={styles.text}>recorrido</Text>
        </View>
      </View>
      <View style={styles.downContainer} />
    </View>
  );
};

export default LoaderScreen;
