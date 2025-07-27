import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    quantity: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => setError('Greška pri učitavanju proizvoda'));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
      .then(res => {
        if (res.ok) {
          navigate('/admin/dashboard');
        } else {
          setError('Greška pri ažuriranju proizvoda');
        }
      })
      .catch(() => setError('Greška pri ažuriranju proizvoda'));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl font-bold mb-6">Uredi proizvod</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Naziv *</label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 rounded p-2"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label className="block mb-1">Opis</label>
          <textarea
            name="description"
            className="w-full border border-gray-300 rounded p-2"
            value={product.description}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label className="block mb-1">Cijena *</label>
          <input
            type="number"
            name="price"
            step="0.01"
            className="w-full border border-gray-300 rounded p-2"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label className="block mb-1">URL slike</label>
          <input
            type="text"
            name="image"
            className="w-full border border-gray-300 rounded p-2"
            value={product.image}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label className="block mb-1">Količina *</label>
          <input
            type="number"
            name="quantity"
            className="w-full border border-gray-300 rounded p-2"
            value={product.quantity}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Sačuvaj promjene
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/dashboard')}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Odustani
          </button>
        </div>
      </form>
    </div>
  );
}