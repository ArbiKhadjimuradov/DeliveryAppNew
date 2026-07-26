import React, { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // НОВЫЙ STATE ДЛЯ КОРЗИНЫ
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setLoading(true);
    
    fetch('http://127.0.0.1:8000/api/products/')
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

  // ФУНКЦИЯ ДОБАВЛЕНИЯ В КОРЗИНУ
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // ФУНКЦИЯ УДАЛЕНИЯ ИЗ КОРЗИНЫ
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // ПОДСЧЁТ СУММЫ
  const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);

  if (loading) {
    return <div style={{ padding: 20 }}>Загрузка товаров...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: 20 }}>
        <h1>🚀 Delivery App</h1>
        <div style={{ background: '#ffe6e6', padding: 20, borderRadius: 8 }}>
          <h3>Внимание: Не удалось загрузить товары</h3>
          <p>Проверьте, запущен ли Django сервер:</p>
          <code>python manage.py runserver 0.0.0.0:8000</code>
          <p>Ошибка: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🚀 Delivery App</h1>
      
      {/* ШАПКА С КОРЗИНОЙ */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        padding: '15px 20px',
        background: '#f8f9fa',
        borderRadius: 8,
        border: '1px solid #dee2e6'
      }}>
        <h2 style={{ margin: 0 }}>Товары ({products.length})</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
          <div>
            <strong>🛒 Корзина ({cart.length})</strong>
            {cart.length > 0 && (
              <div style={{ fontSize: '0.9em', color: '#666' }}>
                Сумма: ${totalPrice.toFixed(2)}
              </div>
            )}
          </div>
          {cart.length > 0 && (
            <button
              onClick={() => setCart([])}
              style={{
                background: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: '0.9em'
              }}
            >
              Очистить
            </button>
          )}
        </div>
      </div>
      
      {/* СПИСОК ТОВАРОВ */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {products.map(product => {
          // ПРОВЕРЯЕМ, ЕСТЬ ЛИ ТОВАР В КОРЗИНЕ
          const inCart = cart.some(item => item.id === product.id);
          return (
            <div key={product.id} style={{ 
              border: '1px solid #ccc', 
              padding: 15, 
              borderRadius: 8,
              width: 200,
              background: inCart ? '#f0f9ff' : 'white'
            }}>
              <h3 style={{ marginTop: 0 }}>{product.name}</h3>
              <p style={{ color: '#666', fontSize: '0.9em', minHeight: 40 }}>
                {product.description || 'Без описания'}
              </p>
              <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
                ${product.price}
              </p>
              
              {inCart ? (
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ color: '#28a745' }}>✓ В корзине</span>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    style={{
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: 4,
                      cursor: 'pointer',
                      fontSize: '0.9em'
                    }}
                  >
                    Удалить
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addToCart(product)}
                  style={{
                    background: '#007bff',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: 4,
                    cursor: 'pointer',
                    width: '100%',
                    fontSize: '1em'
                  }}
                >
                  + Добавить
                </button>
              )}
            </div>
          );
        })}
      </div>
      
      {/* СПИСОК КОРЗИНЫ */}
      {cart.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <h2>Ваша корзина</h2>
          <div style={{
            border: '1px solid #dee2e6',
            borderRadius: 8,
            padding: 20,
            background: '#f8f9fa'
          }}>
            {cart.map((item, index) => (
              <div key={`${item.id}-${index}`} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: '1px solid #eee'
              }}>
                <div>
                  <strong>{item.name}</strong>
                  <div style={{ color: '#666', fontSize: '0.9em' }}>
                    ${item.price}
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    background: '#6c757d',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontSize: '0.8em'
                  }}
                >
                  ✕ Удалить
                </button>
              </div>
            ))}
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
              paddingTop: 20,
              borderTop: '2px solid #dee2e6'
            }}>
              <div>
                <strong>Итого ({cart.length} товаров):</strong>
                <div style={{ fontSize: '1.5em', color: '#28a745', fontWeight: 'bold' }}>
                  ${totalPrice.toFixed(2)}
                </div>
              </div>
              <button
                style={{
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '12px 30px',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: '1.1em',
                  fontWeight: 'bold'
                }}
                onClick={() => alert(`Заказ оформлен! Сумма: $${totalPrice.toFixed(2)}`)}
              >
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;