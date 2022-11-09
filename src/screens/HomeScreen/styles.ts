import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1.3,
  },
  image: {
    width: 86,
    height: 74,
  },
  stateIndicatorContainer: {
    flex: 0.8,
    justifyContent: 'center',
  },
  buttonsContainer: {
    justifyContent: 'space-evenly',
    paddingHorizontal: 25,
    flex: 1.7,
  },
  finishMessage: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 37,
    borderRadius: 18.5,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  buttonText: {
    fontSize: 20,
    color: '#000000',
    fontWeight: '400',
    lineHeight: 23,
  },
  pauseButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonPause: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 37,
    borderRadius: 18.5,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    flex: 3,
    marginRight: 15,
  },
  buttonResume: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 37,
    borderRadius: 18.5,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    flex: 3,
  },
  downSpace: {
    flex: 2.2,
    paddingHorizontal: 25,
  },
  buttonUpload: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 37,
    borderRadius: 18.5,
    borderWidth: 1,
    backgroundColor: '#46D365',
  },
});

export default styles;
