import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  circleContainer: {
    alignItems: 'center',
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 23,
    height: 23,
    borderRadius: 100,
  },
  number: {
    fontSize: 10,
    color: '#000000',
    fontWeight: '700',
    lineHeight: 14,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  stateTitle: {
    fontSize: 10,
    color: '#B9B9B9',
    fontWeight: '700',
    lineHeight: 14,
  },
  activeState: {
    backgroundColor: '#FFC700',
  },
  notActiveState: {
    backgroundColor: '#E0E0E0',
  },
});

export default styles;
