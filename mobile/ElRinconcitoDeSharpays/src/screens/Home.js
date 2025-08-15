import React, { useEffect } from 'react';
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
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { useEmployee } from '../hooks/profile/useEmployee';
import { useOrders } from '../hooks/orders/useOrders';

export default function Home() {
  const { logout } = React.useContext(AuthContext);
  const { employee, getEmployee } = useEmployee();
  const { orders, loading, getOrders } = useOrders();
  const navigation = useNavigation();

  // Refresca datos cada vez que la pantalla recibe el foco
  useFocusEffect(
    React.useCallback(() => {
      getEmployee();
      getOrders();
    }, [getEmployee, getOrders])
  );

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
            navigation.replace("Login");
          }
        }
      ]
    );
  };

  // Función para obtener color del dot según status
  const getStatusColor = (status) => {
    switch (status) {
      case "pendiente": return "#FFD93D"; // amarillo
      case "pagado": return "#77DD77"; // verde claro
      case "entregado": return "#87CEEB"; // azul
      case "completado": return "#4CAF50"; // verde
      case "cancelado": return "#FF6961"; // rojo
      default: return "#ccc";
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleLogout} style={{ padding: 5 }}>
          <FontAwesome name="sign-out" size={26} color="#FE3F8D" />
        </TouchableOpacity>

        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image
            source={require('../../assets/SharpayLogo.png')}
            style={styles.appLogo}
            resizeMode="contain"
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            source={{ uri: employee?.image || 'https://via.placeholder.com/150' }}
            style={styles.topProfileImage}
            defaultSource={require('../../assets/placeholder.png')}
          />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={18} color="#000" style={{ marginRight: 10 }} />
        <TextInput placeholder="Buscar" style={styles.searchInput} />
      </View>

      {/* Greeting Card */}
      <View style={styles.greetingCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.greetingText}>
            <Text style={styles.bold}>Buenos días! </Text>
            <Text style={styles.highlight}>{employee?.name || 'Usuario'}</Text>
          </Text>
          <Text style={styles.subText}>Gestiona tus ordenes con confianza y claridad</Text>
          <Text style={styles.pending}>
            {orders?.filter(o => o.status === "pendiente").length || 0} ordenes pendientes el día de hoy
          </Text>
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

      <View style={styles.divider} />

      {/* Recent Orders */}
      <Text style={styles.sectionTitle}>Pedidos recientes</Text>
      <View style={styles.orderList}>
        {loading ? (
          <Text>Cargando órdenes...</Text>
        ) : orders.length === 0 ? (
          <Text>No hay órdenes recientes</Text>
        ) : (
          orders.map((order, i) => (
            <View key={order._id || i} style={styles.orderItem}>
              <Image
                source={require('../../assets/SharpayLogoWhite.png')}
                style={styles.orderLogo}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.orderTitle}>
                  {order.categoryId?.category || "Sin categoría"}
                </Text>
                <Text style={styles.orderInfo}>
                  {new Date(order.createdAt).toLocaleDateString()} · ${order.total.toFixed(2)} · {order.orderDetails.length} items
                </Text>
                <Text style={styles.orderSub}>
                  {order.orderDetails.map(p => p.productName).join(", ")}
                </Text>
              </View>
              <View style={[styles.dot, { backgroundColor: getStatusColor(order.status) }]} />
            </View>
          ))
        )}
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
