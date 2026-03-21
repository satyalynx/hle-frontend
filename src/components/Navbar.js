import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axios'; // 🟢 Ye add kar lena upar

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    setShowProfileDropdown(false);
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 🚨 THE NINJA POLLING FOR BELL
  useEffect(() => {
    if (!user) return;
    const checkEmergencies = async () => {
      try {
        const res = await axiosInstance.get('/emergency/active');
        setIsEmergencyActive(res.data?.active || false);
      } catch (error) { setIsEmergencyActive(false); }
    };
    const intervalId = setInterval(checkEmergencies, 3000);
    return () => clearInterval(intervalId);
  }, [user]);

  return (
    <nav style={{ 
      backgroundColor: 'rgba(255, 255, 255, 0.85)', // Slight transparency for Glassmorphism
      backdropFilter: 'blur(12px)', // The blur effect
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid #E5E7EB',
      padding: '0 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 999,
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
    }}>
      <div style={{ 
        maxWidth: '1400px', 
        width: '100%',
        margin: '0 auto',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
      }}>
        
        {/* ================= LEFT SIDE (BRAND & CORE LINKS) ================= */}
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{ 
              fontSize: '1.4rem', 
              fontWeight: '900',
              fontFamily: 'system-ui, sans-serif',
              backgroundColor: '#0F172A',
              color: 'white',
              padding: '0.4rem 1rem',
              borderRadius: '8px',
              letterSpacing: '1px'
            }}>
              HLE.
            </div>
          </Link>
          
          {user && (
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
              <Link to="/food" style={linkStyle}>Food Hub</Link>
              <Link to="/complaints" style={linkStyle}>Complaints</Link>
              <Link to="/notices" style={linkStyle}>Notices</Link>
              <Link to="/about" style={linkStyle}>About</Link>
            </div>
          )}
        </div>

        {/* ================= CENTER (PINTEREST STYLE SEARCH) ================= */}
        {user && (
          <div style={{ flex: 1, maxWidth: '400px', margin: '0 2rem' }}>
            <form onSubmit={handleSearch} style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, fontSize: '1rem' }}>
                🔍
              </span>
              <input
                type="text"
                placeholder="Search complaints, notices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6rem 1rem 0.6rem 2.5rem',
                  borderRadius: '999px', // Pill shape
                  border: '1px solid #E5E7EB',
                  backgroundColor: '#F3F4F6',
                  fontSize: '0.95rem',
                  fontFamily: 'system-ui, sans-serif',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s ease-in-out',
                }}
                onFocus={(e) => {
                  e.target.style.backgroundColor = '#FFFFFF';
                  e.target.style.border = '1px solid #3B82F6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.backgroundColor = '#F3F4F6';
                  e.target.style.border = '1px solid #E5E7EB';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </form>
          </div>
        )}

        {/* ================= RIGHT SIDE (USER ACTIONS) ================= */}
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {user ? (
            <>
              {/* Notification Bell */}
              <Link to="/notifications" style={{ 
                position: 'relative', textDecoration: 'none', fontSize: '1.4rem', 
                color: isEmergencyActive ? '#DC2626' : '#4B5563', 
                transition: 'color 0.2s',
                animation: isEmergencyActive ? 'shake 0.5s infinite' : 'none' 
              }}>
                🔔
                <span style={{ 
                  position: 'absolute', top: '-2px', right: '-2px', 
                  backgroundColor: '#EF4444', width: '10px', height: '10px', 
                  borderRadius: '50%', border: '2px solid white',
                  display: isEmergencyActive ? 'block' : 'none' 
                }}></span>
              </Link>

              {/* Profile Avatar Dropdown */}
              <div ref={dropdownRef} style={{ position: 'relative' }}>
                <div 
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    backgroundColor: '#3B82F6', 
                    color: 'white', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    userSelect: 'none',
                    border: '2px solid transparent',
                    transition: 'all 0.2s',
                    boxShadow: showProfileDropdown ? '0 0 0 3px rgba(59,130,246,0.3)' : 'none'
                  }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>

                {/* The Floating Menu */}
                {showProfileDropdown && (
                  <div style={{
                    position: 'absolute',
                    top: '120%',
                    right: 0,
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #E5E7EB',
                    minWidth: '220px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    animation: 'fadeIn 0.15s ease-out'
                  }}>
                    {/* User Info Header */}
                    <div style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', backgroundColor: '#F9FAFB' }}>
                      <div style={{ fontWeight: 'bold', color: '#111827', fontFamily: 'system-ui' }}>{user.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#6B7280', marginTop: '2px', textTransform: 'capitalize' }}>{user.role} Account</div>
                    </div>

                    <div style={{ padding: '0.5rem 0' }}>
                      <Link to="/profile" onClick={() => setShowProfileDropdown(false)} style={dropdownItemStyle}>👤 My Profile</Link>
                      
                      {/* Role-specific links injected smoothly */}
                      {user.role === 'student' && <Link to="/bills" onClick={() => setShowProfileDropdown(false)} style={dropdownItemStyle}>💰 My Bills</Link>}
                      {(user.role === 'admin' || user.role === 'warden') && <Link to="/heatmap" onClick={() => setShowProfileDropdown(false)} style={dropdownItemStyle}>📊 System Analytics</Link>}
                      {(user.role === 'admin' || user.role === 'warden') && <Link to="/users" onClick={() => setShowProfileDropdown(false)} style={dropdownItemStyle}>👥 Manage Users</Link>}
                      
                      <Link to="/settings" onClick={() => setShowProfileDropdown(false)} style={dropdownItemStyle}>⚙️ Settings</Link>
                      <Link to="/emergency-sos" onClick={() => setShowProfileDropdown(false)} style={{...dropdownItemStyle, color: '#DC2626'}}>🚨 Emergency SOS</Link>
                    </div>

                    <div style={{ borderTop: '1px solid #E5E7EB', padding: '0.5rem 0' }}>
                      <button onClick={handleLogout} style={{ ...dropdownItemStyle, width: '100%', textAlign: 'left', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
                        🚪 Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            // NOT LOGGED IN STATE
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <button style={{ padding: '0.5rem 1.2rem', backgroundColor: 'transparent', color: '#0F172A', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontFamily: 'system-ui', fontSize: '0.95rem' }}>
                  Log in
                </button>
              </Link>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <button style={{ padding: '0.5rem 1.2rem', backgroundColor: '#3B82F6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontFamily: 'system-ui', fontSize: '0.95rem', boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)' }}>
                  Sign up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shake { 0%, 100% {transform: rotate(0deg)} 25% {transform: rotate(15deg)} 75% {transform: rotate(-15deg)} }
      `}</style>
    </nav>
  );
};

// Reusable Styles
const linkStyle = {
  color: '#4B5563',
  textDecoration: 'none',
  fontWeight: '600',
  fontFamily: 'system-ui, sans-serif',
  fontSize: '0.95rem',
  transition: 'color 0.2s',
};

const dropdownItemStyle = {
  display: 'block',
  padding: '0.6rem 1rem',
  color: '#374151',
  textDecoration: 'none',
  fontFamily: 'system-ui, sans-serif',
  fontSize: '0.9rem',
  transition: 'background-color 0.2s',
  cursor: 'pointer'
};

// Add global hover effects directly via DOM to keep React code clean
if (typeof window !== 'undefined') {
  document.addEventListener('mouseover', (e) => {
    if (e.target.tagName === 'A' && e.target.style.color === 'rgb(75, 85, 99)') {
      e.target.style.color = '#000000'; // Darker on hover for top links
    }
    if (e.target.tagName === 'A' && e.target.style.padding === '0.6rem 1rem') {
      e.target.style.backgroundColor = '#F3F4F6'; // Dropdown hover
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.tagName === 'A' && e.target.style.color === 'rgb(0, 0, 0)' && !e.target.style.padding) {
      e.target.style.color = '#4B5563';
    }
    if (e.target.tagName === 'A' && e.target.style.padding === '0.6rem 1rem') {
      e.target.style.backgroundColor = 'transparent';
    }
  });
}

export default Navbar;