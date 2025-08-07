import React, { useEffect, useRef } from "react";
import { View, Image, StyleSheet, Animated, StatusBar } from "react-native";

const SplashScreen = ({ navigation }) => {
  const backgroundColor = useRef(new Animated.Value(0)).current;
  const logoPinkOpacity = useRef(new Animated.Value(1)).current;
  const logoWhiteOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Transición del fondo (blanco → rosa)
    Animated.timing(backgroundColor, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();

    // Transición cruzada entre logos
    Animated.timing(logoPinkOpacity, {
      toValue: 0,
      duration: 1500,
      delay: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(logoWhiteOpacity, {
      toValue: 1,
      duration: 1500,
      delay: 500,
      useNativeDriver: true,
    }).start();

    // Navegar al login después de todo
    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
  }, []);

  const bgColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFFFFF', '#FE3F8D'],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar hidden />

      {/* Logo rosa (desaparece) */}
      <Animated.Image
        source={require('../../assets/rinconcitoDeSharpays.png')}
        style={[styles.logo, { position: 'absolute', opacity: logoPinkOpacity }]}
        resizeMode="contain"
      />

      {/* Logo blanco (aparece) */}
      <Animated.Image
        source={require('../../assets/rinconcitoDeSharpaysWhite.png')}
        style={[styles.logo, { position: 'absolute', opacity: logoWhiteOpacity }]}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 225,
    height: 225,
  },
});

export default SplashScreen;
