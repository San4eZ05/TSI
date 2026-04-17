// App.tsx
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Auth } from "./pages/Auth";
import { Support } from "./pages/Support";
import { ProductsPage } from "./pages/ProductsPage";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import AddProductModal from './components/AddProductModal';
import type { Product, User } from './components/types';
import "./App.css";

const API_URL = 'http://localhost:5000/api/products';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Проверка сохраненного токена при загрузке
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setCurrentUser(JSON.parse(savedUser));
    }
    
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Ошибка загрузки данных');
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Не удалось загрузить объявления');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (newProduct: Omit<Product, 'id'>) => {
    if (!token) {
      alert('Необходимо авторизоваться');
      return;
    }
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Ошибка при добавлении');
      }

      const addedProduct = await response.json();
      setProducts([addedProduct, ...products]);
      setIsModalOpen(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Ошибка при добавлении объявления');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!token) {
      alert('Необходимо авторизоваться');
      return;
    }
    
    if (!window.confirm('Вы уверены, что хотите удалить это объявление?')) return;
    
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Ошибка при удалении');
      }
      
      setProducts(products.filter(product => product.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Ошибка при удалении объявления');
    }
  };

  const handleUpdateProduct = async (updatedProduct: Product) => {
    if (!token) {
      alert('Необходимо авторизоваться');
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/${updatedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Ошибка при обновлении');
      }

      const product = await response.json();
      setProducts(products.map(p => p.id === product.id ? product : p));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Ошибка при обновлении объявления');
    }
  };

  const handleLogin = (user: User, token: string) => {
    setCurrentUser(user);
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Загрузка объявлений...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchProducts}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Header currentUser={currentUser} onLogout={handleLogout} />
        <ScrollToTop/>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route 
            path="/auth" 
            element={currentUser ? <Navigate to="/products" /> : <Auth onLogin={handleLogin} />} 
          />
          <Route 
            path="/products" 
            element={
              <ProductsPage 
                products={products}
                isModalOpen={isModalOpen}
                onOpenModal={() => setIsModalOpen(true)}
                onCloseModal={() => setIsModalOpen(false)}
                onAddProduct={handleAddProduct}
                onDeleteProduct={handleDeleteProduct}
                onUpdateProduct={handleUpdateProduct}
                currentUser={currentUser}
              />
            } 
          />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Footer />
      </BrowserRouter>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </>
  );
}

export default App;