import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
        const foundProduct = response.data.find(p => p.id === Number(id));
        if (!foundProduct) {
          setError('Product not found');
        } else {
          setProduct(foundProduct);
        }
      } catch (err) {
        setError('Failed to load product details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    if (product.quantity < 1) {
      alert('This product is out of stock');
      return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      if (existingItem.quantity + quantity > product.quantity) {
        alert(`Only ${product.quantity} items available in stock`);
        return;
      }
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart', { state: { addedToCart: true } });
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-lg text-gray-700">Učitavanje detalja proizvoda...</p>
      </div>
    </div>
  );

  if (error || !product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md p-6 bg-red-50 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h2 className="text-xl font-bold text-red-600 mt-4">Produkt nije pronađen</h2>
        <p className="text-gray-700 mt-2">{error || 'The requested product does not exist.'}</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Products
        </button>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Product Image */}
            <div className="lg:w-1/2 bg-gray-100 flex items-center justify-center p-8">
              <img 
                src={product.image || 'https://via.placeholder.com/500'} 
                alt={product.name}
                className="max-h-96 w-full object-contain"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500';
                }}
              />
            </div>

            {/* Product Details */}
            <div className="lg:w-1/2 p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center mb-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    product.quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">BR: {product.id}</span>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 mb-4">{product.description}</p>
                <div className="flex items-center mb-4">
                  <span className="text-3xl font-bold text-gray-900">{product.price.toFixed(2)}KM</span>
                  {product.originalPrice && (
                    <span className="ml-2 text-lg text-gray-500 line-through">{product.originalPrice.toFixed(2)}KM</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  {product.quantity > 0 
                    ? `${product.quantity} items available` 
                    : 'Currently out of stock'}
                </p>
              </div>

              {product.quantity > 0 && (
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <label htmlFor="quantity" className="mr-3 text-gray-700">Količina:</label>
                    <div className="flex border border-gray-300 rounded">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                      >
                        -
                      </button>
                      <input 
                        type="number" 
                        id="quantity"
                        min="1" 
                        max={product.quantity}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.min(product.quantity, Math.max(1, parseInt(e.target.value) || 1)))}
                        className="w-12 text-center border-x border-gray-300"
                      />
                      <button 
                        onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={addToCart}
                    disabled={product.quantity < 1}
                    className={`w-full py-3 px-6 rounded-lg font-medium ${
                      product.quantity > 0 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    } transition-colors`}
                  >
                    {product.quantity > 0 ? 'Dodavanje u korpu' : 'Out of Stock'}
                  </button>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Besplatna dostava za narudžbe preko 150 KM</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Povrat robe u roku od 30 dana</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}