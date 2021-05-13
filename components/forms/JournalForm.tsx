import React, { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  View,
  Keyboard,
  Dimensions,
  TextInput as NativeTextInput,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../themes';
import { JournalFormData } from '../../reducers/journals/types';
import { MainButton } from '../MainButton/MainButton';
import { FormError } from './components';
import { useWindowDimensions } from 'react-native';
interface JournalFormProps {
  onSubmit: (data: JournalFormData) => void;
  defaultValues?: { content?: string; title?: string };
}

export const JournalForm: FC<JournalFormProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const windowHeight =
    useWindowDimensions().height - (1 / 3) * useWindowDimensions().height;
  const [inputHeight, setInputHeight] = useState<undefined | number>(
    windowHeight
  );

  const { control, handleSubmit, errors, setValue } = useForm<JournalFormData>({
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        setKeyboardVisible(true);
        setInputHeight(e.endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      (e) => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextInput
              label='Title'
              mode='outlined'
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name='title'
          rules={{
            required: { value: true, message: 'This field is required' },
          }}
          defaultValue={defaultValues ? defaultValues.title : ''}
        />
        <FormError error={errors.title} />
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <ScrollView>
              <NativeTextInput
                multiline
                blurOnSubmit={true}
                placeholder='How are you?'
                style={{
                  height: isKeyboardVisible ? inputHeight : windowHeight,
                  marginTop: 20,
                  fontSize: 16,
                }}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            </ScrollView>
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
    </SafeAreaView>
  );
};
