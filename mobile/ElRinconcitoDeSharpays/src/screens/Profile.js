import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEmployee } from '../hooks/profile/useEmployee'; // Ajusta la ruta según tu proyecto

export default function Profile() {
  const navigation = useNavigation();
  const { employee } = useEmployee();

  return (
    <ScrollView style={styles.container}>
      {/* Botón de volver */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>Perfil</Text>

      {/* Imagen de perfil */}
      <View style={styles.profileContainer}>
        
        <Image
            source={{ uri: employee?.image || 'https://via.placeholder.com/150' }}
            style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIcon}>
            <Ionicons name="pencil" size={16} color="white" />
        </TouchableOpacity>
        </View>

      {/* Campos */}
      <View style={styles.field}>
        <Text style={styles.label}>Nombre</Text>
        <TouchableOpacity style={styles.fieldButton}>
          <Text style={styles.placeholder}>{employee?.name || 'Nombre'}</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Correo electrónico</Text>
        <TouchableOpacity style={styles.fieldButton}>
          <Text style={styles.placeholder}>{employee?.email || 'Correo electrónico'}</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Contraseña</Text>
        <TouchableOpacity style={styles.fieldButton}>
          <Text style={styles.placeholder}>**********</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    left: 90,
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 6,
  },
  field: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  fieldButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeholder: {
    color: '#999',
  },
});
