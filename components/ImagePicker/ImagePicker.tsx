import * as ExpoImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Platform, View, Text } from 'react-native';
import { MainButton } from '../MainButton/MainButton';
import { Image } from './Image';

export const ImagePicker = ({ value, setValue }: any) => {
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
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setValue('images', [...value, result.uri]);
    }
  };

  const onImageDelete = (image: string) => {
    setValue(
      'images',
      value.filter((addedImage: string) => addedImage !== image)
    );
  };
  return (
    <View>
      {value ? (
        <View style={{ flexDirection: 'row' }}>
          {value.map((uri: string) => (
            <Image
              uri={uri}
              key={uri}
              onImageDelete={onImageDelete}
              isSelected={selectedImage === uri}
              setSelectedImage={setSelectedImage}
            />
          ))}
        </View>
      ) : null}
      <MainButton
        text='Add photo'
        onPress={onAddPhotosPress}
        mode='text'
        disabled={value.length >= 3}
      />
    </View>
  );
};
