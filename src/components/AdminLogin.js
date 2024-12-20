import React, { useState } from 'react';
import { signInWithEmailAndPassword } from '@firebase/auth';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../firebase/firebaseConfig';
import '../styles/AdminLogin.scss';

const AdminLogin = () => {
  // Authentication State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  // Product Management State
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null); // File input
  const [productDescription, setProductDescription] = useState('');
  const [products, setProducts] = useState([]);

  // Authentication

  // Login Handler
  const handleLogin = async e => {
    e.preventDefault();
    setError('');

    try {
      // Admin email (you should replace with your actual admin email)
      const ADMIN_EMAIL = 'admin@watchworld.com';

      if (email !== ADMIN_EMAIL) {
        setError('Acceso solo para administradores');
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);

      // Fetch existing products on login
      await fetchProducts();
    } catch (error) {
      setError('Credenciales incorrectas');
      console.error('Login error:', error);
    }
  };

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const productsCollection = collection(db, 'productos');
      const snapshot = await getDocs(productsCollection);
      const productsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Add New Product
  const handleAddProduct = async e => {
    e.preventDefault();

    // Validation
    if (!productName || !productPrice || !productImage) {
      setError('Por favor complete todos los campos');
      return;
    }

    try {
      // Upload image to Firebase Storage
      const imageRef = ref(storage, `productos/${productImage.name}`);
      const snapshot = await uploadBytes(imageRef, productImage);
      const imageUrl = await getDownloadURL(snapshot.ref);

      // Create product object
      const newProduct = {
        nombre: productName,
        precio: parseFloat(productPrice),
        imagen: imageUrl,
        descripcion: productDescription || '',
      };

      const docRef = await addDoc(collection(db, 'productos'), newProduct);

      // Update local state
      setProducts([...products, { id: docRef.id, ...newProduct }]);

      // Reset form
      setProductName('');
      setProductPrice('');
      setProductImage(null);
      setProductDescription('');
      setError('');
    } catch (error) {
      console.error('Error adding product:', error);
      setError('No se pudo agregar el producto');
    }
  };

  // Delete Product
  const handleDeleteProduct = async productId => {
    try {
      await deleteDoc(doc(db, 'productos', productId));

      // Update local state
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('No se pudo eliminar el producto');
    }
  };

  // Logout Handler
  const handleLogout = () => {
    auth.signOut();
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  // Login Form
  if (!isLoggedIn) {
    return (
      <div className="admin-login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Acceso Administrador</h2>
          {error && <p className="error-message">{error}</p>}
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="admin-dashboard">
      <button onClick={handleLogout} className="logout-button">
        Cerrar Sesión
      </button>

      <div className="product-management">
        <h2>Agregar Nuevo Producto</h2>
        <form onSubmit={handleAddProduct} className="add-product-form">
          {error && <p className="error-message">{error}</p>}
          <input
            type="text"
            placeholder="Nombre del Producto"
            value={productName}
            onChange={e => setProductName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Precio"
            value={productPrice}
            onChange={e => setProductPrice(e.target.value)}
            step="0.01"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={e => setProductImage(e.target.files[0])}
            required
          />
          <textarea
            placeholder="Descripción (Opcional)"
            value={productDescription}
            onChange={e => setProductDescription(e.target.value)}
          />
          <button type="submit">Agregar Producto</button>
        </form>

        <div className="product-list">
          <h2>Productos Existentes</h2>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.nombre}</td>
                  <td>${product.precio}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="delete-button"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
