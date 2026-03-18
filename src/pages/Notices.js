import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axios';
import Navbar from '../components/Navbar';

const Notices = () => {
  const { user } = useAuth();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await axiosInstance.get('/notices/');
      setNotices(response.data);
    } catch (error) {
      console.error('Failed to fetch notices:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredNotices = categoryFilter === 'all' 
    ? notices 
    : notices.filter(n => n.category === categoryFilter);

  const getCategoryColor = (category) => {
    const colors = {
      urgent: '#DC2626',
      general: '#6B7280',
      maintenance: '#F59E0B',
      event: '#3B82F6',
      exam: '#8B5CF6',
      holiday: '#10B981',
    };
    return colors[category] || '#6B7280';
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '0.5rem' }}>
              Notices
            </h1>
            <p style={{ color: '#6B7280', fontFamily: 'monospace' }}>
              {filteredNotices.length} notices found
            </p>
          </div>
          {(user?.role === 'warden' || user?.role === 'admin') && (
            <Link to="/notices/create">
              <button style={{ padding: '0.75rem 1.5rem', backgroundColor: '#000000', color: 'white', border: '2px solid #000000', cursor: 'pointer', fontWeight: 'bold', fontFamily: 'monospace' }}>
                + New Notice
              </button>
            </Link>
          )}
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', fontFamily: 'monospace' }}>
            Filter by Category
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ padding: '0.5rem', border: '2px solid #000000', borderRadius: '0', fontFamily: 'monospace', backgroundColor: 'white' }}
          >
            <option value="all">All Categories</option>
            <option value="general">General</option>
            <option value="urgent">Urgent</option>
            <option value="maintenance">Maintenance</option>
            <option value="event">Event</option>
            <option value="exam">Exam</option>
            <option value="holiday">Holiday</option>
          </select>
        </div>

        {filteredNotices.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'white', border: '3px solid #000000' }}>
            <p style={{ fontSize: '1.25rem', color: '#6B7280', fontFamily: 'monospace' }}>
              No notices found
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {filteredNotices.map((notice) => (
              <div key={notice.id} style={{ backgroundColor: 'white', padding: '1.5rem', border: '3px solid #000000' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', fontFamily: 'system-ui' }}>
                      {notice.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.75rem', color: '#6B7280', fontFamily: 'monospace', marginBottom: '1rem' }}>
                      <span>
                        {new Date(notice.created_at).toLocaleDateString('en-IN', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                      {notice.created_by_role === 'warden' && (
                        <span style={{ backgroundColor: '#DBEAFE', padding: '0.25rem 0.5rem', border: '1px solid #3B82F6', color: '#1E40AF', fontWeight: 'bold' }}>
                          By Warden
                        </span>
                      )}
                      {notice.created_by_role === 'admin' && (
                        <span style={{ backgroundColor: '#E0E7FF', padding: '0.25rem 0.5rem', border: '1px solid #6366F1', color: '#4338CA', fontWeight: 'bold' }}>
                          By Admin
                        </span>
                      )}
                    </div>
                  </div>

                  <span style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: getCategoryColor(notice.category),
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    fontFamily: 'monospace',
                    border: '2px solid #000000',
                  }}>
                    {notice.category}
                  </span>
                </div>

                <p style={{ color: '#374151', lineHeight: '1.6', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                  {notice.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notices;
