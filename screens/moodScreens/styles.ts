import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  historyScreenContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  card: {
    marginVertical: 20,
    marginHorizontal: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '80%',
    alignSelf: 'center',
  },
  valueContainer: {
    marginEnd: 20,
    justifyContent: 'center',
  },
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
