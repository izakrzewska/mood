import React, { FC } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import NativeModal from 'react-native-modal';
import { MainButton } from '../MainButton/MainButton';
import { Text } from 'react-native-paper';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    textAlign: 'center',
  },
});

interface ModalProps {
  isModalVisible: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export const DeleteModal: FC<ModalProps> = ({
  onClose,
  onDelete,
  isModalVisible,
}) => {
  const deviceHeight = Dimensions.get('window').height;

  return (
    <NativeModal
      animationIn='bounceInUp'
      animationOut='bounceOutDown'
      isVisible={isModalVisible}
      backdropOpacity={0.5}
      animationInTiming={1000}
      animationOutTiming={1000}
      deviceHeight={deviceHeight}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>{`Are you sure you want to delete entry?`}</Text>
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <MainButton
              text='Close'
              mode='text'
              onPress={onClose}
              extraStyles={{ flexGrow: 1 }}
            />
            <MainButton
              text='Delete'
              mode='text'
              onPress={onDelete}
              extraStyles={{ flexGrow: 1 }}
            />
          </View>
        </View>
      </View>
    </NativeModal>
  );
};
