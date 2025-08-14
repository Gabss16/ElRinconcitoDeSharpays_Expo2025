import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext'; // Ajusta ruta si es diferente
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const { user, userImage, logout } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Seguro que quieres cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí",
          onPress: async () => {
            await logout();
            navigation.replace("Login"); // Ajusta el nombre de la pantalla de login
          }
        }
      ]
    );
  };

  // Función para obtener la fuente de la imagen de perfil
  const getProfileImageSource = () => {
    if (userImage) {
      // Si la imagen viene como URL completa
      if (userImage.startsWith('http')) {
        return { uri: userImage };
      }
      // Si la imagen viene como nombre de archivo del servidor
      return { uri: `http://10.10.4.21:4000/uploads/${userImage}` };
    }
    // Imagen por defecto si no hay foto de perfil
    return require('../../assets/placeholder.png');
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Top Bar con perfil y logout */}
      <View style={styles.topBar}>
        {/* Logout */}
        <TouchableOpacity onPress={handleLogout} style={{ padding: 5 }}>
          <FontAwesome name="sign-out" size={26} color="#FE3F8D" />
        </TouchableOpacity>

        {/* Contenedor del logo centrado */}
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image
            source={require('../../assets/SharpayLogo.png')}
            style={styles.appLogo}
            resizeMode="contain"
          />
        </View>

        {/* Foto de perfil dinámica */}
        <Image
          source={getProfileImageSource()}
          style={styles.topProfileImage}
          defaultSource={require('../../assets/placeholder.png')}
        />
      </View>

      {/* Search and Profile */}
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={18} color="#000" style={{ marginRight: 10 }} />
        <TextInput placeholder="Buscar" style={styles.searchInput} />
      </View>

      {/* Greeting Card */}
      <View style={styles.greetingCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.greetingText}>
            <Text style={styles.bold}>Buenos días! </Text>
            <Text style={styles.highlight}>{user || 'Usuario'}</Text>
          </Text>
          <Text style={styles.subText}>Gestiona tus ordenes con confianza y claridad</Text>
          <Text style={styles.pending}>12 ordenes pendientes el día de hoy</Text>
        </View>
        <Image
          source={require('../../assets/SharpayLogoWhite.png')}
          style={styles.greetingImage}
        />
      </View>

      {/* Categories */}
      <View style={styles.categoryContainer}>
        {['Frosty Bites', 'Bougies', 'Boutique'].map((name, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.categoryButton,
              name === 'Boutique' && styles.selectedCategory
            ]}
          >
            <Text style={[
              styles.categoryText,
              name === 'Boutique' && styles.selectedCategoryText
            ]}>{name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Recent Orders */}
      <Text style={styles.sectionTitle}>Pedidos recientes</Text>
      <View style={styles.orderList}>
        {[
          {
            logo: require('../../assets/SharpayLogoWhite.png'),
            name: 'El Paraíso de Dios',
            date: '5 May',
            total: '$10.00',
            items: '1 item',
            placeholder: 'PlaceHolder',
            dotColor: '#FFD93D'
          },
          {
            logo: require('../../assets/SharpayLogoWhite.png'),
            name: 'Frosty Bites',
            date: '3 May',
            total: '$6.00',
            items: '2 items',
            placeholder: 'PlaceHolder',
            dotColor: '#FFD93D'
          },
          {
            logo: require('../../assets/SharpayLogoWhite.png'),
            name: 'Frosty Bites',
            date: '28 Apr',
            total: '$9.00',
            items: '3 items',
            placeholder: 'PlaceHolder, PlaceHolder',
            dotColor: '#77DD77'
          }
        ].map((order, i) => (
          <View key={i} style={styles.orderItem}>
            <Image source={order.logo} style={styles.orderLogo} />
            <View style={{ flex: 1 }}>
              <Text style={styles.orderTitle}>{order.name}</Text>
              <Text style={styles.orderInfo}>{`${order.date} · ${order.total} · ${order.items}`}</Text>
              <Text style={styles.orderSub}>{order.placeholder}</Text>
            </View>
            <View style={[styles.dot, { backgroundColor: order.dotColor }]} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 20,
    paddingTop: 40
  },
  signOut: {
    width: 50,
    height: 50,
    padding: 5
  },
  appLogo: {
    width: 100,
    height: 50,
    marginHorizontal: 10,
  },  
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  topProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
    elevation: 2
  },
  searchInput: {
    flex: 1,
    fontSize: 14
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 50
  },
  greetingCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
    alignItems: 'center'
  },
  greetingText: {
    fontSize: 16
  },
  bold: {
    fontWeight: 'bold'
  },
  highlight: {
    color: '#FE3F8D',
    fontWeight: 'bold'
  },
  subText: {
    fontSize: 13,
    marginTop: 4,
    color: '#444'
  },
  pending: {
    fontSize: 12,
    color: '#999',
    marginTop: 6
  },
  greetingImage: {
    width: 60,
    height: 60,
    marginLeft: 10
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  categoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderColor: '#ccc',
    borderWidth: 1
  },
  selectedCategory: {
    borderColor: '#FE3F8D'
  },
  categoryText: {
    fontSize: 14,
    color: '#333'
  },
  selectedCategoryText: {
    color: '#FE3F8D'
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
    width: '100%'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12
  },
  orderList: {
    marginBottom: 30
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2
  },
  orderLogo: {
    width: 40,
    height: 40,
    marginRight: 14,
    borderRadius: 10
  },
  orderTitle: {
    fontWeight: 'bold',
    fontSize: 14
  },
  orderInfo: {
    fontSize: 12,
    color: '#555',
    marginTop: 2
  },
  orderSub: {
    fontSize: 11,
    color: '#aaa',
    marginTop: 2
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 50,
    marginLeft: 10
  }
});