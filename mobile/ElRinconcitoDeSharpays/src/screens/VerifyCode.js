import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton'; // Ajusta la ruta según tu estructura
import useRecoveryPassword from '../hooks/useRecoveryPassword'; // Ajusta la ruta según tu estructura

const VerificationScreen = ({ navigation }) => {
  const [codeDigits, setCodeDigits] = useState(['', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);
  
  const { code, setCode, verifyCode } = useRecoveryPassword();

  const handleCodeChange = (value, index) => {
    // Solo permitir números
    if (value && !/^\d$/.test(value)) return;
    
    const newCode = [...codeDigits];
    newCode[index] = value;
    setCodeDigits(newCode);
    
    // Actualizar el código en el hook
    const fullCode = newCode.join('');
    setCode(fullCode);

    // Auto-focus al siguiente input
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Si presiona backspace y el campo actual está vacío, ir al anterior
    if (e.nativeEvent.key === 'Backspace' && !codeDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const fullCode = codeDigits.join('');
    
    if (fullCode.length !== 5) {
      Alert.alert('Error', 'Por favor ingresa los 5 dígitos del código');
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await verifyCode();
      
      if (success) {
        // Navegar a la pantalla de cambio de contraseña
        navigation.navigate('ChangePassword');
      }
    } catch (error) {
      console.error('Error verificando código:', error);
      Alert.alert('Error', 'Hubo un problema al verificar el código');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header con botón de regreso */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Contenido principal */}
      <View style={styles.content}>
        <Text style={styles.title}>Ingresa el código de{'\n'}5 dígitos</Text>
        
        <Text style={styles.subtitle}>
          Tu código fue enviado al correo que nos proporcionaste
        </Text>

        {/* Campos de código */}
        <View style={styles.codeContainer}>
          {codeDigits.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[
                styles.codeInput,
                digit ? styles.codeInputFilled : styles.codeInputEmpty
              ]}
              value={digit}
              onChangeText={(value) => handleCodeChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="numeric"
              maxLength={1}
              textAlign="center"
              autoFocus={index === 0}
              editable={!isLoading}
            />
          ))}
        </View>

        {/* Botón de verificación */}
        <CustomButton
          title={isLoading ? "Verificando..." : "Comprobar"}
          onPress={handleVerify}
          disabled={isLoading || codeDigits.join('').length !== 5}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 50,
    lineHeight: 20,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  codeInput: {
    width: 55,
    height: 60,
    borderWidth: 2,
    borderRadius: 12,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  codeInputEmpty: {
    borderColor: '#E5E5E5',
    backgroundColor: '#F9F9F9',
  },
  codeInputFilled: {
    borderColor: '#ff4081',
    backgroundColor: '#fff',
    color: '#333',
  },
});

export default VerificationScreen;