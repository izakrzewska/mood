import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  staticticsScreenContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  noStatisticsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noStatisticsButton: {
    marginTop: 50,
  },
  historyButton: {
    alignSelf: 'flex-end',
  },
  moodChartContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rateMoodButtonContainer: {
    marginTop: 'auto',
    marginHorizontal: 30,
    marginBottom: 15,
  },
});

export default styles;
