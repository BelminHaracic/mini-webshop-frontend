import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GuestHome from './pages/GuestHome';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminAddProduct from './pages/AdminAddProduct';
import AdminEditProduct from './pages/AdminEditProduct';
import AdminOrders from './pages/AdminOrders';
import AdminSettings from './pages/AdminSettings';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Guest Routes */}
        <Route path="/" element={<GuestHome />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <PrivateRoute><AdminDashboard /></PrivateRoute>
        } />
        <Route path="/admin/add" element={
          <PrivateRoute><AdminAddProduct /></PrivateRoute>
        } />
        <Route path="/admin/edit/:id" element={
          <PrivateRoute><AdminEditProduct /></PrivateRoute>
        } />
        <Route path="/admin/orders" element={
          <PrivateRoute><AdminOrders /></PrivateRoute>
        } />
        <Route path="/admin/settings" element={
          <PrivateRoute><AdminSettings /></PrivateRoute>
        } />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;