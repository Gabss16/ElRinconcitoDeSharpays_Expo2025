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

  return (
    <View style={styles.container}>
      {/* Botón de retroceso */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

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
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 13,
    color: "#999",
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20,
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
