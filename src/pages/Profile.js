import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Profile = () => {
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // 🟢 DARK MODE STATE & LOGIC
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = '#111827';
      document.body.style.color = '#F9FAFB';
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.style.backgroundColor = '#F3F4F6';
      document.body.style.color = '#111827';
      localStorage.setItem('theme', 'light');
    }
    // Cleanup on unmount
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, [isDarkMode]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        alert('Profile picture uploaded! (Save functionality pending)');
      };
      reader.readAsDataURL(file);
    }
  };

  // Dynamic Colors based on theme
  const cardBg = isDarkMode ? '#1F2937' : '#FFFFFF';
  const borderColor = isDarkMode ? '#374151' : '#E5E7EB';
  const textColor = isDarkMode ? '#F9FAFB' : '#111827';
  const textMuted = isDarkMode ? '#9CA3AF' : '#6B7280';
  const primaryColor = '#2563EB';

  return (
    <div style={{ minHeight: '100vh', transition: 'all 0.3s ease' }}>
      <Navbar />
      
      <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem', fontSize: '2rem', color: textColor, fontWeight: '700' }}>
          My Account
        </h1>

        {/* 🟢 TOP PROFILE BANNER */}
        <div style={{ 
          backgroundColor: cardBg, 
          padding: '2rem', 
          borderRadius: '12px', 
          border: `1px solid ${borderColor}`,
          boxShadow: isDarkMode ? '0 4px 6px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.05)',
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          marginBottom: '2rem',
          transition: 'all 0.3s ease'
        }}>
          {/* Your Original Image Uploader - Styled */}
          <div>
            <input
              type="file"
              id="profile-pic"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <label htmlFor="profile-pic" style={{ cursor: 'pointer', display: 'block' }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: imagePreview ? 'transparent' : primaryColor,
                backgroundImage: imagePreview ? `url(${imagePreview})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3.5rem',
                color: 'white',
                position: 'relative',
                border: `4px solid ${cardBg}`,
                boxShadow: `0 0 0 2px ${primaryColor}`
              }}>
                {!imagePreview && user?.name?.charAt(0).toUpperCase()}
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '5px',
                  width: '32px',
                  height: '32px',
                  backgroundColor: isDarkMode ? '#374151' : 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  border: `2px solid ${primaryColor}`,
                  fontSize: '0.9rem'
                }}>
                  ✏️
                </div>
              </div>
            </label>
          </div>

          <div>
            <h2 style={{ margin: '0 0 0.25rem 0', fontSize: '1.75rem', color: textColor }}>{user?.name || 'Loading...'}</h2>
            <span style={{ 
              display: 'inline-block',
              padding: '0.25rem 0.75rem', 
              backgroundColor: isDarkMode ? 'rgba(37, 99, 235, 0.2)' : '#DBEAFE', 
              color: primaryColor,
              borderRadius: '999px', 
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              fontWeight: '600',
              letterSpacing: '0.5px'
            }}>
              {user?.role || 'User'}
            </span>
          </div>
        </div>

        {/* 🟢 TABS NAVIGATION */}
        <div style={{ display: 'flex', gap: '1rem', borderBottom: `2px solid ${borderColor}`, marginBottom: '2rem' }}>
          <button 
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '1rem 2rem',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'overview' ? `3px solid ${primaryColor}` : '3px solid transparent',
              color: activeTab === 'overview' ? primaryColor : textMuted,
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            📋 Profile Details
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            style={{
              padding: '1rem 2rem',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'settings' ? `3px solid ${primaryColor}` : '3px solid transparent',
              color: activeTab === 'settings' ? primaryColor : textMuted,
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            ⚙️ System Settings
          </button>
        </div>

        {/* 🟢 TAB CONTENT: OVERVIEW */}
        {activeTab === 'overview' && (
          <div style={{ 
            backgroundColor: cardBg, 
            padding: '2rem', 
            borderRadius: '12px', 
            border: `1px solid ${borderColor}`,
            boxShadow: isDarkMode ? '0 4px 6px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: textColor, borderBottom: `1px solid ${borderColor}`, paddingBottom: '1rem' }}>
              Personal Information
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              <div>
                <p style={{ fontSize: '0.875rem', color: textMuted, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address</p>
                <p style={{ fontWeight: '500', fontSize: '1.1rem', color: textColor, margin: 0 }}>{user?.email || 'N/A'}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', color: textMuted, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phone Number</p>
                <p style={{ fontWeight: '500', fontSize: '1.1rem', color: textColor, margin: 0 }}>{user?.phone || 'Not provided'}</p>
              </div>
              
              {user?.admission_number && (
                <div>
                  <p style={{ fontSize: '0.875rem', color: textMuted, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Admission Number</p>
                  <p style={{ fontWeight: '500', fontSize: '1.1rem', color: textColor, margin: 0 }}>{user.admission_number}</p>
                </div>
              )}
              
              {user?.employee_id && (
                <div>
                  <p style={{ fontSize: '0.875rem', color: textMuted, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Employee ID</p>
                  <p style={{ fontWeight: '500', fontSize: '1.1rem', color: textColor, margin: 0 }}>{user.employee_id}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 🟢 TAB CONTENT: SETTINGS */}
        {activeTab === 'settings' && (
          <div style={{ 
            backgroundColor: cardBg, 
            padding: '2rem', 
            borderRadius: '12px', 
            border: `1px solid ${borderColor}`,
            boxShadow: isDarkMode ? '0 4px 6px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: textColor, borderBottom: `1px solid ${borderColor}`, paddingBottom: '1rem' }}>
              Application Preferences
            </h3>
            
            {/* Dark Mode Toggle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div>
                <p style={{ margin: '0 0 0.5rem 0', color: textColor, fontWeight: '600', fontSize: '1.1rem' }}>Display Theme</p>
                <p style={{ margin: 0, color: textMuted, fontSize: '0.875rem' }}>Switch between Light and Dark mode across the application.</p>
              </div>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
                  color: textColor,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.target.style.opacity = '0.8'; }}
                onMouseLeave={(e) => { e.target.style.opacity = '1'; }}
              >
                {isDarkMode ? '☀️ Switch to Light' : '🌙 Switch to Dark'}
              </button>
            </div>

            {/* Security Settings */}
            <h3 style={{ marginTop: '2rem', marginBottom: '1.5rem', color: textColor, borderBottom: `1px solid ${borderColor}`, paddingBottom: '1rem' }}>
              Security
            </h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: '0 0 0.5rem 0', color: textColor, fontWeight: '600', fontSize: '1.1rem' }}>Password Management</p>
                <p style={{ margin: 0, color: textMuted, fontSize: '0.875rem' }}>Update your account password to stay secure.</p>
              </div>
              <Link to="/change-password" style={{ textDecoration: 'none' }}>
                <button style={{ 
                  padding: '0.75rem 1.5rem', 
                  backgroundColor: primaryColor, 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '8px', 
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}>
                  Change Password
                </button>
              </Link>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;