import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { API_ENDPOINTS } from '../api/config';
import Navbar from '../components/Navbar';

const EditNotice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'normal',
    category: 'general',
  });

  useEffect(() => {
    fetchNotice();
  }, [id]);

  const fetchNotice = async () => {
    try {
      const response = await axiosInstance.get(`${API_ENDPOINTS.NOTICES}${id}`);
      const notice = response.data;
      setFormData({
        title: notice.title,
        description: notice.description,
        priority: notice.priority,
        category: notice.category || 'general',
      });
    } catch (error) {
      console.error('Failed to fetch notice:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axiosInstance.put(`${API_ENDPOINTS.NOTICES}${id}`, formData);
      navigate('/notices');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update notice');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem' }}>Edit Notice</h1>
        <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px' }} />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows={5} style={{ width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px' }} />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Priority</label>
            <select name="priority" value={formData.priority} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px' }}>
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          {error && <div style={{ padding: '0.75rem', backgroundColor: '#FEE2E2', color: '#DC2626', borderRadius: '4px', marginBottom: '1rem' }}>{error}</div>}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" disabled={loading} style={{ flex: 1, padding: '0.75rem', backgroundColor: loading ? '#9CA3AF' : '#2563EB', color: 'white', border: 'none', borderRadius: '4px', fontWeight: '500' }}>
              {loading ? 'Updating...' : 'Update Notice'}
            </button>
            <button type="button" onClick={() => navigate('/notices')} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#E5E7EB', color: '#374151', border: 'none', borderRadius: '4px' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNotice;
