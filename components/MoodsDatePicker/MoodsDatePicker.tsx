import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View } from 'react-native';

export const MoodsDatePicker = ({ date, onChange, ...rest }: any) => {
  return (
    <View>
      <DateTimePicker
        testID='startDatePicker'
        value={date}
        mode='date'
        is24Hour={true}
        display='default'
        onChange={onChange}
        {...rest}
      />
    </View>
  );
};
