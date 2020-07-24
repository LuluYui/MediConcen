import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
  <Image source={require('../assets/medi_icon.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginBottom: 12,
  },
});

export default memo(Logo);
