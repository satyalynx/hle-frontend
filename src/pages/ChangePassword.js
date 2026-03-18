import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import Navbar from '../components/Navbar';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (formData.new_password !== formData.confirm_password) {
      setError('Passwords do not match');
      return;
    }

    if (formData.new_password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      await axiosInstance.put('/auth/change-password/', {
        current_password: formData.current_password,
        new_password: formData.new_password,
      });
      setSuccess(true);
      setTimeout(() => navigate('/profile'), 2000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem' }}>Change Password</h1>
        <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Current Password</label>
            <input type="password" name="current_password" value={formData.current_password} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px' }} />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>New Password</label>
            <input type="password" name="new_password" value={formData.new_password} onChange={handleChange} required minLength={8} style={{ width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px' }} />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Confirm New Password</label>
            <input type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px' }} />
          </div>
          {error && <div style={{ padding: '0.75rem', backgroundColor: '#FEE2E2', color: '#DC2626', borderRadius: '4px', marginBottom: '1rem' }}>{error}</div>}
          {success && <div style={{ padding: '0.75rem', backgroundColor: '#D1FAE5', color: '#065F46', borderRadius: '4px', marginBottom: '1rem' }}>Password changed! Redirecting...</div>}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" disabled={loading} style={{ flex: 1, padding: '0.75rem', backgroundColor: loading ? '#9CA3AF' : '#2563EB', color: 'white', border: 'none', borderRadius: '4px', fontWeight: '500' }}>
              {loading ? 'Changing...' : 'Change Password'}
            </button>
            <button type="button" onClick={() => navigate('/profile')} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#E5E7EB', color: '#374151', border: 'none', borderRadius: '4px' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
