import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    // Hardkodirani admin kredencijali
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Prijava</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <label className="block mb-2">Korisničko ime</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded p-2 mb-4"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <label className="block mb-2">Lozinka</label>
        <input
          type="password"
          className="w-full border border-gray-300 rounded p-2 mb-6"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}
