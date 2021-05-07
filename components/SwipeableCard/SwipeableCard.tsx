import React, { FC } from 'react';
import { Animated, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Divider } from 'react-native-paper';
import { MainButton } from '../MainButton/MainButton';

interface SwipeableCardProps {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  enabled?: boolean;
}

const styles = StyleSheet.create({
  hiddenButtonsContainer: {
    height: '100%',
    flexDirection: 'row',
    marginEnd: 15,
  },
});

export const SwipeableCard: FC<SwipeableCardProps> = ({
  onEdit,
  onDelete,
  children,
  enabled = true,
}) => {
  const onRightSwipe = () => {
    return (
      <Animated.View style={styles.hiddenButtonsContainer}>
        <MainButton mode='text' text='Edit' onPress={onEdit} />
        <MainButton mode='text' text='Delete' onPress={onDelete} />
      </Animated.View>
    );
  };

  return (
    <>
      <Swipeable enabled={enabled} renderRightActions={onRightSwipe}>
        {children}
      </Swipeable>
      <Divider />
    </>
  );
};
