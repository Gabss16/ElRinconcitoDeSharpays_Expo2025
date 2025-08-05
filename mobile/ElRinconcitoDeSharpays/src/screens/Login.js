import React from 'react';
import { View, StatusBar, StyleSheet, Image } from 'react-native';

export default function Login() {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
            <Image
              source={require('../../assets/SharpayLogoWhite.png')}
              style={styles.logo}
              resizeMode="contain"
            />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FE3F8D',
  },
  logo: {
    width: 225,
    height: 225,
  },
});
