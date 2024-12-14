import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext'; // Adjust import path as needed
import '../styles/Cart.scss'; // Create this SCSS file for styling

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  if (cart.itemCount === 0) {
    return (
      <div className="cart-empty">
        <h2>Tu carrito está vacío</h2>
        <Link to="/productos" className="continue-shopping-btn">
          Continuar comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Tu Carrito</h1>
      <div className="cart-items">
        {cart.items.map(item => (
          <div key={item.id} className="cart-item">
            <img
              src={item.imagen}
              alt={item.nombre}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h3>{item.nombre}</h3>
              <p className="cart-item-price">Precio: ${item.precio}</p>

              <div className="quantity-control">
                <button
                  onClick={() => updateQuantity(item, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button onClick={() => updateQuantity(item, item.quantity + 1)}>
                  +
                </button>
              </div>

              <p className="cart-item-subtotal">
                Subtotal: ${(item.precio * item.quantity).toFixed(2)}
              </p>

              <button
                onClick={() => removeFromCart(item)}
                className="remove-item-btn"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-summary-details">
          <p>Número de artículos: {cart.itemCount}</p>
          <p>Total: ${cart.total.toFixed(2)}</p>
        </div>

        <div className="cart-actions">
          <button onClick={clearCart} className="clear-cart-btn">
            Vaciar Carrito
          </button>
          <Link to="/checkout" className="proceed-to-checkout-btn">
            Proceder al Pago
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
