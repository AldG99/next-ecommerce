import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartContext'; // Proveedor del contexto del carrito.
import Navbar from './components/Navbar'; // Barra de navegación principal.
import Home from './components/Home'; // Componente para la página principal.
import ProductList from './components/ProductList'; // Lista de productos.
import ProductDetail from './components/ProductDetail'; // Detalle de un producto.
import Cart from './components/Cart'; // Página del carrito de compras.
import Checkout from './components/Checkout'; // Proceso de pago.
import Footer from './components/Footer'; // Pie de página.
import AdminLogin from './components/AdminLogin'; // Inicio de sesión para administradores.
import './App.css'; // Estilos globales de la aplicación.

function App() {
  return (
    <CartProvider>
      {/* Proveedor de contexto que gestiona el carrito de compras. */}
      <Router>
        {/* Enrutador para manejar la navegación entre páginas. */}
        <div className="app-container">
          <Navbar /> {/* Barra de navegación presente en todas las páginas. */}
          <Routes>
            {/* Configuración de las rutas de la aplicación. */}
            <Route path="/" element={<Home />} />
            {/* Ruta de la página principal. */}
            <Route path="/productos" element={<ProductList />} />
            {/* Ruta para listar productos. */}
            <Route path="/producto/:id" element={<ProductDetail />} />
            {/* Ruta para el detalle de un producto. */}
            <Route path="/carrito" element={<Cart />} />
            {/* Ruta para la página del carrito. */}
            <Route path="/checkout" element={<Checkout />} />
            {/* Ruta para el proceso de pago. */}
            <Route path="/admin" element={<AdminLogin />} />
            {/* Ruta para el inicio de sesión de administradores. */}
          </Routes>
          <Footer /> {/* Pie de página presente en todas las páginas. */}
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
