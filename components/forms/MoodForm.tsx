import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import { colors } from '../../themes';
import { MoodFormData } from '../../types';
import { MoodImage } from '../images';
import { MainButton } from '../MainButton/MainButton';
import { FormError } from './components';

interface MoodFormProps {
  onSubmit: (data: MoodFormData) => void;
  defaultValues?: { value: number };
}

export const MoodForm: FC<MoodFormProps> = ({ onSubmit, defaultValues }) => {
  const { control, handleSubmit, errors, setValue, clearErrors } = useForm<
    MoodFormData
  >({
    reValidateMode: 'onSubmit',
  });

  const onMoodPress = (value: number) => {
    clearErrors();
    setValue('value', value);
  };
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 30,
        paddingHorizontal: 30,
        marginTop: 60,
      }}
    >
      <Controller
        control={control}
        render={({ value }) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignContent: 'center',
              justifyContent: 'center',
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((mood) => {
              const isMoodSelected =
                value === mood || defaultValues?.value === mood;
              return (
                <View
                  key={mood}
                  style={{
                    width: 60,
                    height: 60,
                    margin: 10,
                    borderBottomWidth: isMoodSelected ? 3 : 1,
                    borderBottomColor: colors.main,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height: 60,
                      width: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => onMoodPress(mood)}
                  >
                    <Text
                      style={{
                        fontSize: isMoodSelected ? 30 : 20,
                        opacity: isMoodSelected ? 1 : 0.5,
                      }}
                    >
                      {mood}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          // <TextInput
          //   keyboardType='number-pad'
          //   keyboardAppearance='light'
          //   label='Mood'
          //   autoFocus
          //   mode='outlined'
          //   onBlur={onBlur}
          //   onChangeText={(value) => onChange(value)}
          //   value={value}
          // />
        )}
        name='value'
        defaultValue={defaultValues ? defaultValues.value.toString() : ''}
        rules={{
          required: {
            value: true,
            message: 'Select your mood value',
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
