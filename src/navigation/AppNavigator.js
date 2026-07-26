import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Главная' }}
        />
        <Stack.Screen 
          name="Cart" 
          component={CartScreen} 
          options={{ title: 'Корзина' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;