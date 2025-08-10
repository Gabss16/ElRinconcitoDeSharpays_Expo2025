import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";
import useRecoveryPassword from "../hooks/useRecoveryPassword";

const RecoveryPassword = () => {
  const navigation = useNavigation();
  const { email, setEmail, sendCode } = useRecoveryPassword();
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    setLoading(true);
    const success = await sendCode(); // Llamamos al hook
    setLoading(false);

    if (success) {
      navigation.navigate("VerifyCode"); // Redirige a la pantalla de verificación
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Botón de retroceso */}
      <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                  <Ionicons name="chevron-back" size={24} color="#333" />
                </TouchableOpacity>
      </View>

      {/* Título */}
      <Text style={styles.title}>Reinicia tu contraseña</Text>
      <Text style={styles.subtitle}>
        Ingresa tu correo para enviar el código de verificación
      </Text>

      {/* Label y Campo de texto */}
      <Text style={styles.label}>Correo electrónico</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Ionicons name="mail-outline" size={20} color="#999" style={styles.icon} />
      </View>

      {/* Botón reutilizable */}
      <CustomButton
        title={loading ? "Enviando..." : "Enviar"}
        onPress={handleSendCode}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 18,
    color: "#999",
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  icon: {
    marginLeft: 10,
  },
});

export default RecoveryPassword;
