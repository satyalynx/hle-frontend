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
        description: notice.description || notice.content, // Handling potential field mismatch
        priority: notice.priority || 'normal',
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
      setError(err.response?.data?.detail || 'FAILED TO MODIFY PARAMETERS.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', paddingBottom: '4rem' }}>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '0.5rem', fontFamily: 'system-ui', textTransform: 'uppercase', letterSpacing: '-1px' }}>
            Modify Parameters
          </h1>
          <p style={{ color: '#000', backgroundColor: '#E5E7EB', display: 'inline-block', padding: '0.3rem 0.8rem', border: '2px solid #000', fontFamily: 'monospace', fontWeight: 'bold' }}>
            UPDATE EXISTING BROADCAST DATA
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '3rem', border: '4px solid #000', boxShadow: '12px 12px 0 #E5E7EB' }}>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase', fontSize: '0.9rem' }}>
              Directive Title
            </label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required style={{ width: '100%', padding: '1rem', border: '3px solid #000', borderRadius: '0', fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 'bold', boxSizing: 'border-box', outline: 'none' }} />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase', fontSize: '0.9rem' }}>
              Transmission Content
            </label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows={6} style={{ width: '100%', padding: '1rem', border: '3px solid #000', borderRadius: '0', fontFamily: 'monospace', fontSize: '1rem', fontWeight: '500', resize: 'vertical', boxSizing: 'border-box', outline: 'none' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase', fontSize: '0.9rem' }}>
                Classification
              </label>
              <select name="category" value={formData.category} onChange={handleChange} style={{ width: '100%', padding: '1rem', border: '3px solid #000', borderRadius: '0', fontFamily: 'monospace', backgroundColor: '#F9FAFB', fontWeight: '900', cursor: 'pointer', outline: 'none' }}>
                <option value="general">GENERAL</option>
                <option value="urgent">URGENT</option>
                <option value="maintenance">MAINTENANCE</option>
                <option value="event">EVENT</option>
                <option value="exam">EXAM</option>
                <option value="holiday">HOLIDAY</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase', fontSize: '0.9rem' }}>
                System Priority
              </label>
              <select name="priority" value={formData.priority} onChange={handleChange} style={{ width: '100%', padding: '1rem', border: '3px solid #000', borderRadius: '0', fontFamily: 'monospace', backgroundColor: '#F9FAFB', fontWeight: '900', cursor: 'pointer', outline: 'none' }}>
                <option value="low">LOW</option>
                <option value="normal">NORMAL</option>
                <option value="high">HIGH</option>
                <option value="critical">CRITICAL</option>
              </select>
            </div>
          </div>

          {error && <div style={{ padding: '1rem', backgroundColor: '#FEF2F2', color: '#DC2626', border: '3px solid #DC2626', marginBottom: '2rem', fontFamily: 'monospace', fontWeight: '900' }}>[ERROR]: {error}</div>}
          
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button type="submit" disabled={loading} style={{ flex: 2, padding: '1rem', backgroundColor: loading ? '#9CA3AF' : '#2563EB', color: 'white', border: '4px solid #000', fontWeight: '900', fontFamily: 'monospace', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '1.1rem', textTransform: 'uppercase', boxShadow: loading ? 'none' : '6px 6px 0 #000' }}>
              {loading ? 'PROCESSING...' : 'CONFIRM OVERRIDE'}
            </button>
            <button type="button" onClick={() => navigate('/notices')} style={{ flex: 1, padding: '1rem', backgroundColor: '#FFF', color: '#000', border: '4px solid #000', fontWeight: '900', fontFamily: 'monospace', cursor: 'pointer', fontSize: '1.1rem', textTransform: 'uppercase', boxShadow: '6px 6px 0 #E5E7EB' }}>
              ABORT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNotice;