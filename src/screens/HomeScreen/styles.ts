import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  header: {
    zIndex: 1,
  },
  contentContainer: {
    paddingHorizontal: 30,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  activityIndicator: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
});

export default styles;
