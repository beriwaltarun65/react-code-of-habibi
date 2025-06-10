import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useEffect } from 'react';
import { FaSearch, FaUserPlus, FaUser, FaHome } from 'react-icons/fa';

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

   const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/search/?search=${searchTerm}`
      );
      const data = await response.json();
      setProducts(data.results || []); 
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">HABIBI</div>
      <div className="nav-links">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <FaSearch size={20} style={{ marginLeft: 10, cursor: 'pointer' }} />
        </div>
        <Link to="/">
          <FaHome size={20} style={{ marginRight: 5 }} />
          <span>Home</span>
        </Link>
        <Link to="/profile">
          <FaUser size={20} style={{ marginRight: 5 }} />
          <span>Profile</span>
        </Link>
        <Link to="/createuser">
          <FaUserPlus size={20} style={{ marginRight: 5 }} />
          <span>Create user</span>
        </Link>
        {localStorage.getItem('access_token') ? (
          <Link onClick={() => logout()}>Logout</Link>
        ) : (
          <Link to={'/login'}>Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
