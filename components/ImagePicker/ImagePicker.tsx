import React, { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  View,
  Platform,
  Image,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import { TextInput, Text, IconButton } from 'react-native-paper';
import { JournalFormData } from '../../types';
import { MainButton } from '../MainButton/MainButton';
import * as ExpoImagePicker from 'expo-image-picker';
import { colors } from '../../themes';
import { onChange } from 'react-native-reanimated';

export const ImagePicker = ({ value, onChange, setValue }: any) => {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>();
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const onAddPhotosPress = async () => {
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 3],
      // quality: 1,
    });

    if (!result.cancelled) {
      setImages([...images, result.uri]);
      setValue('images', [...value, result.uri]);
    }
  };

  const onImageDelete = (image: string) => {
    setImages(images.filter((addedImage) => addedImage !== image));
  };

  return (
    <View>
      {images && (
        <View style={{ flexDirection: 'row' }}>
          {images.map((image) => (
            <TouchableHighlight
              key={image}
              onPress={() => setSelectedImage(image)}
            >
              <ImageBackground
                source={{ uri: image }}
                imageStyle={selectedImage === image && { opacity: 0.5 }}
                style={{ height: 100, width: 100 }}
              >
                {selectedImage === image && (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                      opacity: 1,
                    }}
                  >
                    <IconButton
                      icon='delete'
                      onPress={() => onImageDelete(image)}
                    />
                  </View>
                )}
              </ImageBackground>
            </TouchableHighlight>
          ))}
        </View>
      )}
      <MainButton text='Add photo' onPress={onAddPhotosPress} mode='text' />
    </View>
  );
};
