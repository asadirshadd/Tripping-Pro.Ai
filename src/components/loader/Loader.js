import styles from '../../styling/css/Style';
import {
  View,
  Image,
  StyleSheet,
  Animated,
  Easing,
  Modal,
  Text,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

export default function Loader() {
  return (
    <>
      <Modal
        style={{flex: 1, backgroundColor: 'transparent'}}
        visible={true}
        transparent={true}>
        <View style={styles.loader_container}>
          <View style={styles.loader_container_bg} />
          <Text style={styles.loader_text}>Loading...</Text>
        </View>
      </Modal>
    </>
  );
}
