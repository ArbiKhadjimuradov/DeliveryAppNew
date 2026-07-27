import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';

// ⚠️ ВАЖНО: замени этот IP на локальный IP-адрес твоего компьютера в сети Wi-Fi
// Узнать его: открой cmd на компьютере и введи "ipconfig", смотри "IPv4-адрес"
// Телефон и компьютер должны быть в одной Wi-Fi сети
const API_URL = 'http://192.168.31.80:8000/api/products/';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setLoading(true);

    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setProducts(data.results);
        setError(null);
      })
      .catch(e => {
        setError(e.message);
        console.error('Ошибка загрузки:', e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const addToCart = product => {
    setCart([...cart, product]);
  };

  const removeFromCart = id => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + parseFloat(item.price),
    0,
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={{ marginTop: 10 }}>Загрузка товаров...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>🚀 Delivery App</Text>
        <View style={styles.errorBox}>
          <Text style={styles.errorTitle}>
            Внимание: Не удалось загрузить товары
          </Text>
          <Text>Проверьте, запущен ли Django сервер:</Text>
          <Text style={styles.code}>python manage.py runserver 0.0.0.0:8000</Text>
          <Text>Ошибка: {error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderProduct = ({ item: product }) => {
    const inCart = cart.some(item => item.id === product.id);
    return (
      <View style={[styles.card, inCart && styles.cardInCart]}>
        <Text style={styles.cardTitle}>{product.name}</Text>
        <Text style={styles.cardDescription}>
          {product.description || 'Без описания'}
        </Text>
        <Text style={styles.cardPrice}>${product.price}</Text>

        {inCart ? (
          <View style={styles.inCartRow}>
            <Text style={styles.inCartText}>✓ В корзине</Text>
            <TouchableOpacity
              style={styles.removeButtonSmall}
              onPress={() => removeFromCart(product.id)}>
              <Text style={styles.buttonText}>Удалить</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addToCart(product)}>
            <Text style={styles.buttonText}>+ Добавить</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>🚀 Delivery App</Text>

        {/* ШАПКА С КОРЗИНОЙ */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Товары ({products.length})</Text>
          <View style={styles.headerCartInfo}>
            <View>
              <Text style={styles.cartLabel}>🛒 Корзина ({cart.length})</Text>
              {cart.length > 0 && (
                <Text style={styles.cartSum}>Сумма: ${totalPrice.toFixed(2)}</Text>
              )}
            </View>
            {cart.length > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => setCart([])}>
                <Text style={styles.buttonText}>Очистить</Text>
              </TouchableOpacity>
            )}