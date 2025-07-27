import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminAddProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price || !quantity) {
      setError('Name, price and quantity are required');
      return;
    }

    const newProduct = {
      name,
      description,
      price: parseFloat(price),
      image,
      quantity: parseInt(quantity, 10),
    };

    fetch(`${process.env.REACT_APP_API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
      .then(res => {
        if (res.ok) {
          navigate('/admin/dashboard');
        } else {
          setError('Failed to add product');
        }
      })
      .catch(() => setError('Failed to add product'));
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name *</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            className="w-full border border-gray-300 rounded p-2"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">Price *</label>
          <input
            type="number"
            step="0.01"
            className="w-full border border-gray-300 rounded p-2"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Image URL</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2"
            value={image}
            onChange={e => setImage(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">Quantity *</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded p-2"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
