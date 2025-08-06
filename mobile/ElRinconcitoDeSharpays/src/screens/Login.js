import React from 'react';
import { View, StatusBar, StyleSheet, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Login() {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image
        source={require('../../assets/SharpayLogoWhite.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Iniciar Sesión</Text>

      <View style={styles.box}>

        <Text style={styles.info}>Complete los campos</Text>

        <View style={styles.fields}>
          <FontAwesome name='envelope' size={17} style={styles.icons}></FontAwesome>
          <TextInput placeholder='Correo electrónico' style={styles.inputs}></TextInput>
        </View>

        <View style={styles.fields}>
          <FontAwesome name='lock' size={22} style={styles.icons}></FontAwesome>
          <TextInput placeholder='Contraseña' style={styles.inputs}></TextInput>
        </View>


        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>


        <Text style={styles.forgettenPassword}>Olvidé mi contraseña</Text>

      </View>

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
    width: 100,
    height: 100,
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 35,
    top: 70
  },
  box: {
    backgroundColor: 'white',
    width: '100%',
    height: '50%',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    top: 130,
    margin: 0,
    // Child elements
    justifyContent: 'center',
    alignItems: 'center'
  },
  info: {
    color: "#636361ff",
    bottom: 60,
    fontSize: 16
  },
  fields: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    width: 280,
    height: 50,
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#eeeeeee5',
    color: "#7A7A73",

    bottom: 30
  },
  inputs: {
    fontSize: 14,
    paddingLeft: 10
  },
  icons: {
    color: "#7A7A73",
  },
  button: {
    backgroundColor: "#FE3F8D",
    borderRadius: 15,
    width: 180,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  forgettenPassword: {
    top: 40,
    color: '#4e4e4eff',
    textDecorationLine: 'underline',
  }
});
