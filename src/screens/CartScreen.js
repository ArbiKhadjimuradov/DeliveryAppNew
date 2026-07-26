import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const CartScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Корзина (заглушка)</Text>
      <Text>Экран корзины. Товаров пока нет.</Text>
      <Button title="Назад" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default CartScreen;