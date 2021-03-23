import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  staticticsScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 30,
  },
  historyScreenContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 30,
  },
});

export default styles;
