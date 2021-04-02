import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { colors } from '../../themes';
import { JournalFormData } from '../../types';
import { ImagePicker } from '../ImagePicker/ImagePicker';
import { MainButton } from '../MainButton/MainButton';
import { FormError } from './components';
interface JournalFormProps {
  onSubmit: (data: JournalFormData) => void;
  defaultValues?: { content: string; images: string[] };
}

export const JournalForm: FC<JournalFormProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const { control, handleSubmit, errors, setValue } = useForm<JournalFormData>({
    reValidateMode: 'onChange',
  });
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            multiline
            blurOnSubmit={true}
            selectTextOnFocus={false}
            style={{
              height: 300,
              backgroundColor: colors.white,
            }}
            label='Journal'
            mode='flat'
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name='content'
        defaultValue={defaultValues ? defaultValues.content : ''}
        rules={{
          required: {
            value: true,
            message: 'This field is required',
          },
        }}
      />
      <FormError error={errors.content} />
      <Controller
        control={control}
        render={({ value }) => (
          <ImagePicker value={value} setValue={setValue} />
        )}
        name='images'
        defaultValue={defaultValues ? defaultValues.images : ''}
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
