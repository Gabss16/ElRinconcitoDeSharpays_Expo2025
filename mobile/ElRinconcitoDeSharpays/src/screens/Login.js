import React from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts } from "expo-font";

//Typing effect
import Typical from 'react-native-typical';

export default function Login() {
  const [fonts] = useFonts({
    Poppins: require("../../assets/fonts/Poppins.ttf"),
    PoppinsBold: require("../../assets/fonts/Poppins-Bold.ttf")
  })

  if (!fonts) return null;

  return (
  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}
  >
    <StatusBar hidden />

    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: 135 }}>
      <Image
        source={require('../../assets/SharpayLogoWhite.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Typical
        steps={['El Rinconcito de\nSharpays']}
        loop={1}
        wrapper="Text"
        style={{
          color: 'white',
          fontFamily: 'PoppinsBold',
          fontSize: 16,
          textAlign: 'start',
          paddingLeft: 10
        }}
      />
    </View>

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.box}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <Text style={styles.info}>Complete los campos</Text>

        <ScrollView
          contentContainerStyle={{ alignItems: 'center' }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.fields}>
            <FontAwesome name='envelope' size={17} style={styles.icons} />
            <TextInput placeholder='Correo electrónico' style={styles.inputs} />
          </View>

          <View style={styles.fields}>
            <FontAwesome name='lock' size={22} style={styles.icons} />
            <TextInput placeholder='Contraseña' secureTextEntry style={styles.inputs} />
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>

        <Text style={styles.forgettenPassword}>Olvidé mi contraseña</Text>

        </ScrollView>
        

      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FE3F8D',
    position: 'relative',
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60
  },
  title: {
    fontFamily: "PoppinsBold",
    color: '#636361ff',
    fontSize: 26,
    marginTop: 100
  },
  box: {
    flex: 1,
    width: '100%',
    height: '60%',
    marginBottom: 0,
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    color: "#636361ff",
    fontSize: 14,
    fontFamily: "Poppins",
    marginBottom: 60
  },
  fields: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    width: 280,
    height: 50,
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#eeeeeee5',
    color: "#7A7A73",
  },
  inputs: {
    flex: 1,
    fontSize: 14,
    paddingLeft: 10,
    fontFamily: "Poppins"
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
    marginBottom: 30,
    marginTop: 50
  },
  buttonText: {
    color: 'white',
    fontFamily: "PoppinsBold"
  },
  forgettenPassword: {
    color: '#4e4e4eff',
    textDecorationLine: 'underline',
    fontFamily: "Poppins",
    marginTop: 20
  }
});