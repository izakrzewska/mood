import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { JournalFormData } from '../../types';
import { ImagePicker } from '../ImagePicker/ImagePicker';
import { MainButton } from '../MainButton/MainButton';
import { FormError } from './components';
// import * as ImagePicker from 'expo-image-picker';

interface JournalFormProps {
  onSubmit: (data: JournalFormData) => void;
  defaultValues?: { title: string; content: string; images: string[] };
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
            returnKeyType='done'
            label='Title'
            autoFocus
            mode='outlined'
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name='title'
        defaultValue={defaultValues ? defaultValues.title : ''}
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
      <Controller
        control={control}
        render={({ onChange, value }) => (
          <ImagePicker value={value} onChange={onChange} setValue={setValue} />
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
