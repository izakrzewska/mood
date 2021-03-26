import React, { FC, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, ScrollView } from 'react-native';
import { MoodFormData } from '../../types';
import { MainButton } from '../MainButton/MainButton';
import { FormError } from './components';
import { TextInput, RadioButton, Text, Card, Title } from 'react-native-paper';
import { availableMoods } from '../../constants';
import { colors } from '../../themes';

interface MoodFormProps {
  onSubmit: (data: MoodFormData) => void;
  defaultValues?: { value: number; note: string };
}

export const MoodForm: FC<MoodFormProps> = ({ onSubmit, defaultValues }) => {
  const { control, handleSubmit, errors } = useForm<MoodFormData>({
    reValidateMode: 'onBlur',
  });
  return (
    <View style={{ flex: 1 }}>
      <Controller
        control={control}
        render={(props) => (
          <ScrollView>
            <RadioButton.Group
              onValueChange={(value: any) => props.onChange(value)}
              value={props.value}
            >
              {availableMoods.map((mood) => {
                return (
                  <RadioButton.Item
                    key={mood.value}
                    color={colors.main}
                    label={mood.value.toString()}
                    value={mood.value.toString()}
                  />
                );
              })}
            </RadioButton.Group>
          </ScrollView>
        )}
        name='value'
        defaultValue={defaultValues ? defaultValues.value.toString() : ''}
        rules={{
          required: {
            value: true,
            message: 'This field is required',
          },
        }}
      />
      <FormError error={errors.value} />

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            multiline
            label='Note'
            mode='outlined'
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name='note'
        defaultValue={defaultValues ? defaultValues.note : ''}
      />
      <MainButton
        mode='text'
        onPress={handleSubmit(onSubmit)}
        text='Save'
        extraStyles={{ marginTop: 20 }}
      />
    </View>
  );
};
