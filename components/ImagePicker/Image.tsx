import React, { FC, useState } from 'react';
import { ImageBackground, TouchableHighlight, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { colors } from '../../themes';

interface ImageProps {
  uri: string;
  onImageDelete: (uri: string) => void;
  isSelected: boolean;
  setSelectedImage: (id: string | undefined) => void;
}

export const Image: FC<ImageProps> = ({
  uri,
  onImageDelete,
  isSelected,
  setSelectedImage,
}) => {
  return (
    <TouchableHighlight
      key={uri}
      onPress={() =>
        isSelected ? setSelectedImage(undefined) : setSelectedImage(uri)
      }
    >
      <ImageBackground
        source={{ uri }}
        imageStyle={isSelected && { opacity: 0.5 }}
        style={{
          height: 100,
          width: 100,
          marginHorizontal: 2,
        }}
      >
        {isSelected && (
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
              color={colors.main}
              onPress={() => onImageDelete(uri)}
            />
          </View>
        )}
      </ImageBackground>
    </TouchableHighlight>
  );
};
