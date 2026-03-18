import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Profile = () => {
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState(null);

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

  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem' }}>My Profile</h1>
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #E5E7EB' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <input
                type="file"
                id="profile-pic"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              <label htmlFor="profile-pic" style={{ cursor: 'pointer' }}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  backgroundColor: imagePreview ? 'transparent' : '#2563EB',
                  backgroundImage: imagePreview ? `url(${imagePreview})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                  color: 'white',
                  margin: '0 auto',
                  position: 'relative',
                  border: '3px solid #E5E7EB',
                }}>
                  {!imagePreview && user?.name?.charAt(0).toUpperCase()}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '30px',
                    height: '30px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    border: '2px solid #2563EB',
                  }}>
                    📷
                  </div>
                </div>
              </label>
              <p style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.5rem' }}>Click to upload photo</p>
            </div>
            <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>{user?.name}</h2>
            <p style={{ textAlign: 'center', color: '#6B7280', textTransform: 'uppercase', fontWeight: '500' }}>
              {user?.role}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            <div>
              <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.25rem' }}>Email</p>
              <p style={{ fontWeight: '500' }}>{user?.email}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.25rem' }}>Phone</p>
              <p style={{ fontWeight: '500' }}>{user?.phone || 'Not provided'}</p>
            </div>
            {user?.admission_number && (
              <div>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.25rem' }}>Admission Number</p>
                <p style={{ fontWeight: '500' }}>{user.admission_number}</p>
              </div>
            )}
            {user?.employee_id && (
              <div>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.25rem' }}>Employee ID</p>
                <p style={{ fontWeight: '500' }}>{user.employee_id}</p>
              </div>
            )}
          </div>
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #E5E7EB', display: 'flex', gap: '1rem' }}>
            <Link to="/change-password" style={{ flex: 1 }}>
              <button style={{ width: '100%', padding: '0.75rem', backgroundColor: '#2563EB', color: 'white', border: 'none', borderRadius: '4px', fontWeight: '500' }}>
                Change Password
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
