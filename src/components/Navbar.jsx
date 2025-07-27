import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const adminMenuRef = useRef(null);

  // Close admin menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (adminMenuRef.current && !adminMenuRef.current.contains(event.target)) {
        setAdminMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('cart');
    navigate('/');
    setAdminMenuOpen(false);
    setMobileMenuOpen(false);
  };

  // Simple SVG icons as components
  const MenuIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );

  const CloseIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  const CartIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );

  const AdminIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

const ChevronDown = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

  const guestLinks = [
    { name: 'Početna', path: '/' },
    { name: 'Korpa', path: '/cart', icon: <CartIcon /> },
    { name: 'Plaćanje', path: '/checkout' },
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <AdminIcon /> },
    { name: 'Dodaj Proizvod', path: '/admin/add' },
    { name: 'Narudžbe', path: '/admin/orders' },
    { name: 'Postavke', path: '/admin/settings' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="text-xl font-bold text-gray-800">Mini Webshop</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {guestLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-700 hover:text-indigo-600 font-medium flex items-center space-x-1 transition-colors"
              >
                {link.icon && <span>{link.icon}</span>}
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>

          {/* Admin Controls */}
<div className="hidden md:flex items-center space-x-4" ref={adminMenuRef}>
  {isAdmin ? (
    <div className="relative">
      <button 
        className="flex items-center space-x-1 text-sm bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors"
        onClick={() => setAdminMenuOpen(!adminMenuOpen)}
      >
        <AdminIcon />
        <span>Admin</span>
        <ChevronDown />
      </button>
      
      {adminMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          {adminLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              onClick={() => setAdminMenuOpen(false)}
            >
              {link.icon && <span>{link.icon}</span>}
              <span>{link.name}</span>
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-red-600"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Odjava</span>
          </button>
        </div>
      )}
    </div>
  ) : (
    <Link 
      to="/admin" 
      className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium px-3 py-1.5 rounded-lg border border-indigo-600 hover:border-indigo-800 transition-colors"
    >
      <AdminIcon />
      <span>Admin Prijava</span>
    </Link>
  )}
</div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 hover:text-indigo-600 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 mt-2 py-2">
            {guestLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.icon && <span>{link.icon}</span>}
                <span>{link.name}</span>
              </Link>
            ))}

            {isAdmin && (
              <>
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <h3 className="px-4 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Admin Panel
                  </h3>
                  {adminLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.icon && <span>{link.icon}</span>}
                      <span>{link.name}</span>
                    </Link>
                  ))}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-red-600"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Odjava</span>
                </button>
              </>
            )}

            {!isAdmin && (
              <Link
                to="/admin"
                className="flex items-center space-x-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <AdminIcon />
                <span>Admin Prijava</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;