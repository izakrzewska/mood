import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  authFormContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 30,
  },
  imageContainer: {
    marginVertical: 30,
    alignSelf: 'flex-end',
  },
});

export default styles;
