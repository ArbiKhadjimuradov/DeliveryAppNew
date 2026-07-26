import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image || 'https://via.placeholder.com/300x200'}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
          ${product.price}
        </Typography>
        {product.category_name && (
          <Typography variant="caption" color="text.secondary">
            Категория: {product.category_name}
          </Typography>
        )}
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          В корзину
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;