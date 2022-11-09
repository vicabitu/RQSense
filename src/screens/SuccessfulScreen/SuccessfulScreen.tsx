import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { StackActions } from '@react-navigation/native';

import styles from './styles';
import { navigationRef } from '../../navigation/controls';

const SuccessfulScreen = () => {
  const goToHome = () => {
    const popAction = StackActions.pop(1);
    navigationRef.dispatch(popAction);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../images/rqsense_logo.png')}
          style={styles.imageLogo}
        />
        <Image
          source={require('../../images/successful_icon.png')}
          style={styles.imageSuccessIcon}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Recorrido</Text>
          <Text style={styles.text}>cargado con éxito</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={goToHome}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SuccessfulScreen;
