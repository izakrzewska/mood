import * as ExpoImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  Platform,
  TouchableHighlight,
  View,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import { MainButton } from '../MainButton/MainButton';

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
      <View style={{ flexDirection: 'row' }}>
        {value.map((image: any) => (
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
      <MainButton text='Add photo' onPress={onAddPhotosPress} mode='text' />
    </View>
  );
};
