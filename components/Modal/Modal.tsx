import React, { FC } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import NativeModal from 'react-native-modal';

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
}

export const Modal: FC<ModalProps> = ({ isModalVisible, children }) => {
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
        <View style={styles.modalView}>{children}</View>
      </View>
    </NativeModal>
  );
};
