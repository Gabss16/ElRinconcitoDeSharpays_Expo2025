import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PasswordTextBox = ({ 
  placeholder, 
  value, 
  onChangeText, 
  style,
  editable = true 
}) => {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

  const toggleSecureTextEntry = () => {
    setIsSecureTextEntry(!isSecureTextEntry);
  };

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isSecureTextEntry}
        editable={editable}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity
        style={styles.eyeButton}
        onPress={toggleSecureTextEntry}
        activeOpacity={0.7}
      >
        <Ionicons
          name={isSecureTextEntry ? 'eye-off' : 'eye'}
          size={20}
          color="#999"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  eyeButton: {
    marginLeft: 10,
  },
});

export default PasswordTextBox;