import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { RadioButton, TextInput } from 'react-native-paper';
import { availableMoods } from '../../constants';
import { colors } from '../../themes';
import { MoodFormData } from '../../types';
import { MainButton } from '../MainButton/MainButton';
import { FormError } from './components';

interface MoodFormProps {
  onSubmit: (data: MoodFormData) => void;
  defaultValues?: { value: number };
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
      <MainButton
        mode='text'
        onPress={handleSubmit(onSubmit)}
        text='Save'
        extraStyles={{ marginTop: 20 }}
      />
    </View>
  );
};
