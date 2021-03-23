import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  authFormContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 30,
  },
  formInput: {
    padding: 10,
  },
  switchScreenText: {
    justifyContent: 'center',
    paddingTop: 20,
    paddingLeft: 10,
  },
  imageContainer: {
    marginVertical: 30,
    alignSelf: 'flex-end',
  },
});

export default styles;
