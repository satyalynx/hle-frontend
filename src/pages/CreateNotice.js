import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axios';
import Navbar from '../components/Navbar';

const CreateNotice = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Only warden and admin can create notices
  if (!user || (user.role !== 'warden' && user.role !== 'admin')) {
    return (
      <div>
        <Navbar />
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Access Denied</h1>
          <p>Only wardens and admins can create notices.</p>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const noticeData = {
        ...formData,
        created_by: user.id,
        created_by_role: user.role
      };

      await axiosInstance.post('/notices/', noticeData);
      alert('✅ Notice created successfully!');
      navigate('/notices');
    } catch (err) {
      console.error('Notice creation error:', err);
      
      let errorMessage = 'Failed to create notice';
      
      if (err.response?.data?.detail) {
        if (typeof err.response.data.detail === 'string') {
          errorMessage = err.response.data.detail;
        } else if (Array.isArray(err.response.data.detail)) {
          errorMessage = err.response.data.detail.map(e => e.msg || JSON.stringify(e)).join(', ');
        } else {
          errorMessage = 'Validation error. Please check all fields.';
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem', fontFamily: 'system-ui' }}>
          Create Notice
        </h1>
        <p style={{ color: '#6B7280', marginBottom: '2rem', fontFamily: 'monospace' }}>
          Post a notice for all students
        </p>

        <div style={{ backgroundColor: 'white', padding: '2rem', border: '3px solid #000000' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontFamily: 'monospace' }}>
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.75rem', border: '2px solid #000000', borderRadius: '0', fontFamily: 'monospace', backgroundColor: 'white' }}
              >
                <option value="general">General</option>
                <option value="urgent">Urgent</option>
                <option value="maintenance">Maintenance</option>
                <option value="event">Event</option>
                <option value="exam">Exam</option>
                <option value="holiday">Holiday</option>
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontFamily: 'monospace' }}>
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.75rem', border: '2px solid #000000', borderRadius: '0', fontFamily: 'monospace' }}
                placeholder="Enter notice title"
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontFamily: 'monospace' }}>
                Content *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={8}
                style={{ width: '100%', padding: '0.75rem', border: '2px solid #000000', borderRadius: '0', fontFamily: 'monospace', resize: 'vertical' }}
                placeholder="Enter notice content..."
              />
            </div>

            {error && (
              <div style={{ padding: '0.75rem', backgroundColor: '#FEE2E2', color: '#DC2626', border: '2px solid #DC2626', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  backgroundColor: loading ? '#9CA3AF' : '#000000',
                  color: 'white',
                  border: '2px solid #000000',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                }}
              >
                {loading ? 'Creating...' : 'Create Notice'}
              </button>

              <button
                type="button"
                onClick={() => navigate('/notices')}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                  border: '2px solid #000000',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNotice;
