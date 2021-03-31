import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { JournalFormData } from '../../types';
import { MainButton } from '../MainButton/MainButton';
import { FormError } from './components';

interface JournalFormProps {
  onSubmit: (data: JournalFormData) => void;
  defaultValues?: { content: string };
}

export const JournalForm: FC<JournalFormProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const { control, handleSubmit, errors } = useForm<JournalFormData>({
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
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            multiline
            label='Title'
            autoFocus
            mode='outlined'
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name='title'
        defaultValue={defaultValues ? defaultValues.content : ''}
        rules={{
          required: {
            value: true,
            message: 'This field is required',
          },
        }}
      />
      <FormError error={errors.title} />
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            multiline
            label='Journal'
            autoFocus
            mode='outlined'
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
      <MainButton
        mode='text'
        onPress={handleSubmit(onSubmit)}
        text='Save'
        extraStyles={{ marginTop: 20 }}
      />
    </View>
  );
};
