import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

interface Props {
  state: number;
}

const StateIndicator = ({ state }: Props) => {
  const getStyles = (myState: number) => {
    if (myState === state) {
      return [styles.circle, styles.activeState];
    } else {
      return [styles.circle, styles.notActiveState];
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <View style={getStyles(1)}>
          <Text style={styles.number}>1</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.stateTitle}>Iniciar</Text>
          <Text style={styles.stateTitle}>Recorrido</Text>
        </View>
      </View>
      <View style={styles.circleContainer}>
        <View style={getStyles(2)}>
          <Text style={styles.number}>2</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.stateTitle}>Recorrido</Text>
          <Text style={styles.stateTitle}>en proceso</Text>
        </View>
      </View>
      <View style={styles.circleContainer}>
        <View style={getStyles(3)}>
          <Text style={styles.number}>3</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.stateTitle}>Finalizar</Text>
          <Text style={styles.stateTitle}>recorrido</Text>
        </View>
      </View>
      <View style={styles.circleContainer}>
        <View style={[styles.circle, styles.notActiveState]}>
          <Text style={styles.number}>4</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.stateTitle}>Cargar</Text>
          <Text style={styles.stateTitle}>recorrido</Text>
        </View>
      </View>
    </View>
  );
};

export default StateIndicator;
