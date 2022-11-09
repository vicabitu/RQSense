import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 3.5,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  imageLogo: {
    width: 85,
    height: 74,
  },
  imageSuccessIcon: {
    width: 85,
    height: 85,
  },
  contentContainer: {
    flex: 2.5,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 14,
  },
  text: {
    fontWeight: '300',
    fontSize: 24,
    lineHeight: 29,
    color: '#000000',
  },
  buttonContainer: {
    paddingHorizontal: 25,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 37,
    borderRadius: 18.5,
    borderWidth: 1,
    backgroundColor: '#FFC700',
  },
  buttonText: {
    fontSize: 20,
    color: '#000000',
    fontWeight: '400',
    lineHeight: 23,
  },
});

export default styles;
