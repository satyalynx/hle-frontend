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
      <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ padding: '4rem', textAlign: 'center', fontFamily: 'monospace' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: '#DC2626' }}>[ ACCESS DENIED ]</h1>
          <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>UNAUTHORIZED ENTITY. REQUIRES WARDEN OR ADMIN CLEARANCE.</p>
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
      alert('[SYSTEM] Broadcast transmitted successfully.');
      navigate('/notices');
    } catch (err) {
      console.error('Notice creation error:', err);
      
      let errorMessage = 'FAILED TO TRANSMIT BROADCAST';
      if (err.response?.data?.detail) {
        if (typeof err.response.data.detail === 'string') {
          errorMessage = err.response.data.detail;
        } else if (Array.isArray(err.response.data.detail)) {
          errorMessage = err.response.data.detail.map(e => e.msg || JSON.stringify(e)).join(', ');
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage.toUpperCase());
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
            Initialize Broadcast
          </h1>
          <p style={{ color: '#000', backgroundColor: '#E5E7EB', display: 'inline-block', padding: '0.3rem 0.8rem', border: '2px solid #000', fontFamily: 'monospace', fontWeight: 'bold' }}>
            TRANSMIT OFFICIAL DIRECTIVES TO ALL TERMINALS
          </p>
        </div>

        <div style={{ backgroundColor: 'white', padding: '3rem', border: '4px solid #000000', boxShadow: '12px 12px 0 #E5E7EB' }}>
          <form onSubmit={handleSubmit}>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase', fontSize: '0.9rem' }}>
                Classification Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '1rem', border: '3px solid #000000', borderRadius: '0', fontFamily: 'monospace', backgroundColor: '#F9FAFB', fontWeight: '900', fontSize: '1rem', cursor: 'pointer', outline: 'none' }}
              >
                <option value="general">GENERAL</option>
                <option value="urgent">URGENT (CRITICAL PRIORITY)</option>
                <option value="maintenance">MAINTENANCE</option>
                <option value="event">EVENT</option>
                <option value="exam">EXAM</option>
                <option value="holiday">HOLIDAY</option>
              </select>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase', fontSize: '0.9rem' }}>
                Directive Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '1rem', border: '3px solid #000000', borderRadius: '0', fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 'bold', boxSizing: 'border-box', outline: 'none' }}
                placeholder="e.g. Mandatory Network Outage at 0200 HRS"
              />
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase', fontSize: '0.9rem' }}>
                Transmission Content *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={8}
                style={{ width: '100%', padding: '1rem', border: '3px solid #000000', borderRadius: '0', fontFamily: 'monospace', resize: 'vertical', fontSize: '1rem', fontWeight: '500', boxSizing: 'border-box', outline: 'none' }}
                placeholder="Enter complete directive details here..."
              />
            </div>

            {error && (
              <div style={{ padding: '1rem', backgroundColor: '#FEF2F2', color: '#DC2626', border: '3px solid #DC2626', marginBottom: '2rem', fontFamily: 'monospace', fontWeight: '900' }}>
                [ERROR]: {error}
              </div>
            )}

            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 2,
                  padding: '1rem',
                  backgroundColor: loading ? '#9CA3AF' : '#000000',
                  color: 'white',
                  border: '4px solid #000000',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: '900',
                  fontFamily: 'monospace',
                  fontSize: '1.1rem',
                  textTransform: 'uppercase',
                  boxShadow: loading ? 'none' : '6px 6px 0 #000',
                  transition: 'transform 0.1s'
                }}
                onMouseDown={(e) => { if(!loading) e.currentTarget.style.transform = 'translate(2px, 2px)' }}
                onMouseUp={(e) => { if(!loading) e.currentTarget.style.transform = 'translate(0, 0)' }}
              >
                {loading ? 'TRANSMITTING...' : 'EXECUTE BROADCAST'}
              </button>

              <button
                type="button"
                onClick={() => navigate('/notices')}
                style={{
                  flex: 1,
                  padding: '1rem',
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                  border: '4px solid #000000',
                  cursor: 'pointer',
                  fontWeight: '900',
                  fontFamily: 'monospace',
                  fontSize: '1.1rem',
                  textTransform: 'uppercase',
                  boxShadow: '6px 6px 0 #E5E7EB'
                }}
              >
                ABORT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNotice;