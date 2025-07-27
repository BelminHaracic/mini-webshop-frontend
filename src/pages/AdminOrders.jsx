import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
       const res = await axios.get(`${process.env.REACT_APP_API_URL}/orders`);
        setOrders(res.data);
      } catch (err) {
        console.error("Greška prilikom dohvaćanja narudžbi", err);
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/orders/${id}`, { status });
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    } catch (err) {
      console.error("Greška prilikom ažuriranja statusa", err);
      setError("Failed to update order status.");
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Accepted': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="p-4 bg-red-50 text-red-700 rounded-lg max-w-md mx-auto mt-8">
      <p>{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Upravljanje narudžbama</h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Pretraži narudžbe..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Svi statusi</option>
            <option value="Pending">Na čekanju</option>
            <option value="Accepted">Prihvaćeno</option>
            <option value="Completed">Završeno</option>
            <option value="Rejected">Odbijeno</option>
          </select>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="mt-2 text-gray-600">Nema narudžbi koje odgovaraju vašim kriterijima</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-5">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <span className="text-gray-500 text-sm">#{order.id}</span>
                      <span className="text-gray-500 text-sm">
                        {new Date(order.created_at || new Date()).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-900">
                      {order.customer.first_name} {order.customer.last_name}
                    </h3>
                    <p className="text-sm text-gray-500">{order.customer.address}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <select
                      value={order.status}
                      onChange={e => handleStatusChange(order.id, e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="Pending">Na čekanju</option>
                      <option value="Accepted">Prihvaćeno</option>
                      <option value="Completed">Završeno</option>
                      <option value="Rejected">Odbijeno</option>
                    </select>
                    
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                    >
                      Detalji
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Narudžba #{selectedOrder.id}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(selectedOrder.created_at || new Date()).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Podaci o kupcu</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-500">Ime:</span> {selectedOrder.customer.first_name} {selectedOrder.customer.last_name}</p>
                    <p><span className="text-gray-500">Email:</span> {selectedOrder.customer.email || '-'}</p>
                    <p><span className="text-gray-500">Telefon:</span> {selectedOrder.customer.phone}</p>
                    <p><span className="text-gray-500">Adresa:</span> {selectedOrder.customer.address}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Status narudžbe</h4>
                  <select
                    value={selectedOrder.status}
                    onChange={e => {
                      handleStatusChange(selectedOrder.id, e.target.value);
                      setSelectedOrder({...selectedOrder, status: e.target.value});
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Pending">Na čekanju</option>
                    <option value="Accepted">Prihvaćeno</option>
                    <option value="Completed">Završeno</option>
                    <option value="Rejected">Odbijeno</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-2">Artikli</h4>
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Proizvod</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Količina</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Cijena</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Ukupno</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-sm text-gray-900">{item.name}</td>
                          <td className="px-4 py-2 text-sm text-gray-500">{item.quantity}</td>
                          <td className="px-4 py-2 text-sm text-gray-500">{item.price} KM</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{(item.price * item.quantity).toFixed(2)} KM</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50">
                        <td colSpan="3" className="px-4 py-2 text-sm font-medium text-gray-900 text-right">Ukupno:</td>
                        <td className="px-4 py-2 text-sm font-bold text-gray-900">
                          {selectedOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)} KM
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;