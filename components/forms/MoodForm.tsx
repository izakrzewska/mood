import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { MoodFormData } from '../../types';
import { MoodImage } from '../images';
import { MainButton } from '../MainButton/MainButton';
import { FormError } from './components';

interface MoodFormProps {
  onSubmit: (data: MoodFormData) => void;
  defaultValues?: { value: number };
}

export const MoodForm: FC<MoodFormProps> = ({ onSubmit, defaultValues }) => {
  const { control, handleSubmit, errors } = useForm<MoodFormData>({
    reValidateMode: 'onChange',
  });
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 30,
        paddingHorizontal: 30,
        marginTop: 60,
      }}
    >
      <View style={{ alignSelf: 'flex-end' }}>
        <MoodImage />
      </View>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            keyboardType='number-pad'
            keyboardAppearance='light'
            label='Mood'
            autoFocus
            mode='outlined'
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name='value'
        defaultValue={defaultValues ? defaultValues.value.toString() : ''}
        rules={{
          required: {
            value: true,
            message: 'This field is required',
          },
          min: {
            value: 1,
            message: 'Minimum value is 1',
          },
          max: {
            value: 10,
            message: 'Maximum value is 10',
          },
        }}
      />
      <FormError error={errors.value} />
      <MainButton
        mode='text'
        onPress={handleSubmit(onSubmit)}
        text='Save'
        extraStyles={{ marginTop: 20 }}
      />
    </View>
  );
};
