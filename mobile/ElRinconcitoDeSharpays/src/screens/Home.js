import React, { useState } from 'react';
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
import useOrders from '../hooks/orders/useOrders';
import { API_URL } from '../config';

export default function Home() {
  const { logout } = React.useContext(AuthContext);
  const { employee, getEmployee } = useEmployee();
  const { orders, loading, getOrders } = useOrders();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigation = useNavigation();

  // Refresca datos cada vez que la pantalla recibe el foco
  useFocusEffect(
    React.useCallback(() => {
      getEmployee();
      getOrders();
      fetchCategories();
    }, [getEmployee, getOrders])
  );

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/categories`);
      if (!res.ok) throw new Error('Error al obtener categorías');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

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

  const getStatusColor = (status) => {
    switch (status) {
      case "pendiente": return "#FFD93D";
      case "pagado": return "#77DD77";
      case "entregado": return "#87CEEB";
      case "completado": return "#4CAF50";
      case "cancelado": return "#FF6961";
      default: return "#ccc";
    }
  };

  // Filtrar órdenes por categoría
  const filteredOrders = selectedCategory
    ? orders.filter(o => o.categoryId?.category === selectedCategory)
    : orders;

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
      <ScrollView horizontal style={styles.categoryContainer} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={[styles.categoryButton, selectedCategory === null && styles.selectedCategory]}
          onPress={() => setSelectedCategory(null)}
        >
          <Text style={[styles.categoryText, selectedCategory === null && styles.selectedCategoryText]}>
            Todo
          </Text>
        </TouchableOpacity>

        {categories.map((cat) => (
          <TouchableOpacity
            key={cat._id}
            style={[styles.categoryButton, selectedCategory === cat.category && styles.selectedCategory]}
            onPress={() => setSelectedCategory(cat.category)}
          >
            <Text style={[styles.categoryText, selectedCategory === cat.category && styles.selectedCategoryText]}>
              {cat.category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.divider} />

      {/* Recent Orders */}
      <Text style={styles.sectionTitle}>Pedidos recientes</Text>
      <View style={styles.orderList}>
        {loading ? (
          <Text>Cargando órdenes...</Text>
        ) : filteredOrders.length === 0 ? (
          <Text>No hay órdenes recientes</Text>
        ) : (
          filteredOrders.map((order, i) => {
            // Aquí hacemos console.log para ver la imagen
            console.log('Imagen de la categoría:', order.categoryId?.image ?? 'Sin categoría');


            return (
              <View key={order._id || i} style={styles.orderItem}>
                <Image
                  source={
                    order.categoryId?.image
                      ? { uri: order.categoryId.image }
                      : require('../../assets/SharpayLogoWhite.png')
                  }
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
            );
          })
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#F4F4F4', paddingHorizontal: 20, paddingTop: 40 },
  appLogo: { width: 100, height: 50, marginHorizontal: 10 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15, paddingHorizontal: 5 },
  topProfileImage: { width: 50, height: 50, borderRadius: 25 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 10, marginBottom: 20, elevation: 2 },
  searchInput: { flex: 1, fontSize: 14 },
  greetingCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 20, elevation: 3, alignItems: 'center' },
  greetingText: { fontSize: 16 },
  bold: { fontWeight: 'bold' },
  highlight: { color: '#FE3F8D', fontWeight: 'bold' },
  subText: { fontSize: 13, marginTop: 4, color: '#444' },
  pending: { fontSize: 12, color: '#999', marginTop: 6 },
  greetingImage: { width: 60, height: 60, marginLeft: 10 },
  categoryContainer: { flexDirection: 'row', marginBottom: 20 },
  categoryButton: { paddingVertical: 6, paddingHorizontal: 16, borderRadius: 20, borderColor: '#ccc', borderWidth: 1, marginRight: 8 },
  selectedCategory: { borderColor: '#FE3F8D' },
  categoryText: { fontSize: 14, color: '#333' },
  selectedCategoryText: { color: '#FE3F8D' },
  divider: { height: 1, backgroundColor: '#ccc', marginVertical: 10, width: '100%' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  orderList: { marginBottom: 30 },
  orderItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 14, borderRadius: 12, marginBottom: 12, elevation: 2 },
  orderLogo: { width: 50, height: 50, marginRight: 14, borderRadius: 10 },
  orderTitle: { fontWeight: 'bold', fontSize: 14 },
  orderInfo: { fontSize: 12, color: '#555', marginTop: 2 },
  orderSub: { fontSize: 11, color: '#aaa', marginTop: 2 },
  dot: { width: 10, height: 10, borderRadius: 50, marginLeft: 10 }
});
