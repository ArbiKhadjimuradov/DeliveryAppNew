import React, { useState, useEffect } from 'react';
import { 
  Container, 
  AppBar, 
  Toolbar, 
  Typography, 
  CssBaseline,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  Box
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Простой компонент продукта
const ProductCard = ({ product, onAddToCart }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2, height: '100%' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image || 'https://via.placeholder.com/300x200?text=No+Image'}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.description || 'Нет описания'}
        </Typography>
        <Typography variant="h6" color="primary">
          ${product.price}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2 }}
          onClick={() => onAddToCart(product)}
          fullWidth
        >
          В корзину
        </Button>
      </CardContent>
    </Card>
  );
};

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Загружаем товары при запуске
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Подключаемся к твоему Django API
      const response = await fetch('http://127.0.0.1:8000/api/products/products/');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Ошибка загрузки товаров:', error);
      // Тестовые данные, если API недоступно
      setProducts([
        { id: 1, name: 'Пицца Маргарита', price: 12.99, description: 'Классическая пицца с томатами и моцареллой' },
        { id: 2, name: 'Бургер', price: 8.99, description: 'Сочный бургер с говядиной' },
        { id: 3, name: 'Салат Цезарь', price: 6.99, description: 'Свежий салат с курицей' },
        { id: 4, name: 'Кофе Латте', price: 3.99, description: 'Ароматный кофе с молоком' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    alert(`Товар "${product.name}" добавлен в корзину!`);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            🚀 Delivery App
          </Typography>
          <IconButton color="inherit" onClick={() => setCartOpen(!cartOpen)}>
            <ShoppingCartIcon />
            {cartItems.length > 0 && (
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({cartItems.length})
              </Typography>
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          🛒 Наши товары ({products.length})
        </Typography>
        
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard 
                product={product} 
                onAddToCart={addToCart}
              />
            </Grid>
          ))}
        </Grid>

        {products.length === 0 && (
          <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 4 }}>
            😔 Товаров пока нет. Добавьте их через админку Django!
          </Typography>
        )}
      </Container>

      {/* Простая корзина */}
      {cartOpen && cartItems.length > 0 && (
        <Box sx={{
          position: 'fixed',
          right: 20,
          top: 80,
          width: 300,
          bgcolor: 'background.paper',
          boxShadow: 3,
          p: 2,
          borderRadius: 1,
          zIndex: 1000
        }}>
          <Typography variant="h6" gutterBottom>
            Корзина ({cartItems.length})
          </Typography>
          {cartItems.map(item => (
            <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>{item.name} × {item.quantity}</Typography>
              <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
            </Box>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, pt: 2, borderTop: 1 }}>
            <Typography variant="h6">Итого:</Typography>
            <Typography variant="h6">
              ${cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
            </Typography>
          </Box>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Оформить заказ
          </Button>
        </Box>
      )}
    </>
  );
}

export default App;