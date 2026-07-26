import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { productApi } from '../api'; // Импортируем наш новый модуль API



const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]); // Убрали <Product[]>
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Убрали <string | null>
  
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Используем метод из нашего централизованного модуля api
      const response = await productApi.getProducts();
      setProducts(response.data);
      Alert.alert('Успех', `Загружено ${response.data.length} товаров`);
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || 'Неизвестная ошибка';
      setError(errorMessage);
      Alert.alert('Ошибка загрузки', errorMessage);
      console.error('Ошибка запроса:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderProduct = ({ item }) => ( // Убрали ": { item: Product }"
  <View style={styles.productCard}>
    <Text style={styles.productName}>{item.name}</Text>
    <Text style={styles.productPrice}>{item.price} руб.</Text>
    <Text style={styles.productStock}>Остаток: {item.stock} шт.</Text>
    {item.description && (
      <Text style={styles.productDescription} numberOfLines={2}>
        {item.description}
      </Text>
    )}
  </View>
);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Супермаркет доставки</Text>
        <Text style={styles.subtitle}>Мобильное приложение</Text>
      </View>

      <View style={styles.controls}>
        <Button
          title={loading ? 'Загрузка...' : 'Получить товары'}
          onPress={fetchProducts}
          disabled={loading}
          color="#4CAF50"
        />
        
        <Button
          title="Перейти в корзину"
          onPress={() => navigation.navigate('Cart')}
          color="#FF9800"
        />

        <Button
          title="Очистить список"
          onPress={() => setProducts([])}
          color="#FF5252"
          disabled={products.length === 0}
        />
      </View>

      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Загрузка товаров...</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Ошибка: {error}</Text>
        </View>
      )}

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Товаров нет. Нажмите "Получить товары"
              </Text>
            </View>
          )
        }
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Всего товаров: {products.length}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  loaderContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 15,
    margin: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  errorText: {
    color: '#D32F2F',
    textAlign: 'center',
  },
  listContent: {
    padding: 15,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  productStock: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: 'white',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#333',
  },
});

export default HomeScreen;