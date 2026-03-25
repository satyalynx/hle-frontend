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
      general: '#4B5563',
      maintenance: '#F59E0B',
      event: '#2563EB',
      exam: '#7C3AED',
      holiday: '#10B981',
    };
    return colors[category] || '#4B5563';
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ padding: '4rem', textAlign: 'center', fontFamily: 'monospace', fontWeight: '900', fontSize: '1.2rem', textTransform: 'uppercase' }}>
          [ FETCHING SYSTEM BROADCASTS... ]
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', paddingBottom: '4rem' }}>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '3rem', fontWeight: '900', fontFamily: 'system-ui', margin: '0 0 0.5rem 0', textTransform: 'uppercase', letterSpacing: '-1px' }}>
              System Broadcasts
            </h1>
            <p style={{ color: '#000', fontFamily: 'monospace', fontWeight: 'bold', backgroundColor: '#E5E7EB', display: 'inline-block', padding: '0.3rem 0.8rem', border: '2px solid #000' }}>
              OFFICIAL DIRECTIVES & ANNOUNCEMENTS
            </p>
          </div>
          
          {(user?.role === 'warden' || user?.role === 'admin') && (
            <Link to="/notices/create">
              <button style={{ padding: '1rem 2rem', backgroundColor: '#000000', color: 'white', border: '4px solid #000000', cursor: 'pointer', fontWeight: '900', fontFamily: 'monospace', fontSize: '1.1rem', boxShadow: '6px 6px 0 #E5E7EB', textTransform: 'uppercase', transition: 'transform 0.1s' }} onMouseDown={(e) => e.currentTarget.style.transform = 'translate(2px, 2px)'} onMouseUp={(e) => e.currentTarget.style.transform = 'translate(0, 0)'}>
                INITIALIZE BROADCAST
              </button>
            </Link>
          )}
        </div>

        <div style={{ backgroundColor: 'white', padding: '1.5rem', border: '4px solid #000', marginBottom: '2.5rem', boxShadow: '6px 6px 0 #E5E7EB', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <label style={{ fontSize: '1rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase' }}>
            FILTER DIRECTIVES:
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ padding: '0.75rem 1rem', border: '3px solid #000', borderRadius: '0', fontFamily: 'monospace', backgroundColor: '#F9FAFB', fontWeight: '900', cursor: 'pointer', outline: 'none', minWidth: '200px' }}
          >
            <option value="all">ALL CATEGORIES</option>
            <option value="general">GENERAL</option>
            <option value="urgent">URGENT</option>
            <option value="maintenance">MAINTENANCE</option>
            <option value="event">EVENT</option>
            <option value="exam">EXAM</option>
            <option value="holiday">HOLIDAY</option>
          </select>
          <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#6B7280', marginLeft: 'auto' }}>
            [{filteredNotices.length} RECORDS FOUND]
          </span>
        </div>

        {filteredNotices.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: 'white', border: '4px dashed #9CA3AF' }}>
            <p style={{ fontSize: '1.25rem', color: '#6B7280', fontFamily: 'monospace', fontWeight: '900', textTransform: 'uppercase' }}>
              NO DIRECTIVES IN CURRENT SELECTION
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '2rem' }}>
            {filteredNotices.map((notice) => {
              const isUrgent = notice.category === 'urgent';
              const cardBorderColor = isUrgent ? '#DC2626' : '#000000';
              const cardBgColor = isUrgent ? '#FEF2F2' : '#FFFFFF';

              return (
                <div key={notice.id} style={{ backgroundColor: cardBgColor, padding: '2rem', border: `4px solid ${cardBorderColor}`, boxShadow: `8px 8px 0 ${isUrgent ? 'rgba(220, 38, 38, 0.2)' : '#E5E7EB'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontFamily: 'monospace', marginBottom: '1rem', flexWrap: 'wrap' }}>
                        
                        {/* 🟢 ENTERPRISE AUTHORITY BADGES */}
                        {notice.created_by_role === 'warden' && (
                          <span style={{ backgroundColor: '#000', padding: '0.3rem 0.8rem', color: '#FFF', fontWeight: '900', fontSize: '0.85rem', letterSpacing: '1px' }}>
                            [ AUTH: WARDEN ]
                          </span>
                        )}
                        {notice.created_by_role === 'admin' && (
                          <span style={{ backgroundColor: '#2563EB', padding: '0.3rem 0.8rem', color: '#FFF', fontWeight: '900', fontSize: '0.85rem', letterSpacing: '1px' }}>
                            [ AUTH: SYSTEM ADMIN ]
                          </span>
                        )}

                        {/* System Log Date */}
                        <span style={{ color: '#4B5563', fontWeight: 'bold', fontSize: '0.9rem' }}>
                          LOG: {new Date(notice.created_at).toLocaleDateString('en-IN', { 
                            year: 'numeric', month: 'short', day: '2-digit' 
                          }).toUpperCase()}
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1.8rem', fontWeight: '900', margin: '0', fontFamily: 'system-ui', color: isUrgent ? '#991B1B' : '#111827', lineHeight: '1.2' }}>
                        {notice.title}
                      </h3>
                    </div>

                    <span style={{
                      padding: '0.4rem 1rem',
                      backgroundColor: getCategoryColor(notice.category),
                      color: 'white',
                      fontSize: '0.85rem',
                      fontWeight: '900',
                      textTransform: 'uppercase',
                      fontFamily: 'monospace',
                      border: '3px solid #000',
                    }}>
                      {notice.category}
                    </span>
                  </div>

                  <div style={{ borderTop: `2px dashed ${isUrgent ? '#FCA5A5' : '#D1D5DB'}`, paddingTop: '1.5rem' }}>
                    <p style={{ color: '#111827', lineHeight: '1.6', fontFamily: 'monospace', whiteSpace: 'pre-wrap', fontSize: '1.1rem', fontWeight: '500', margin: 0 }}>
                      {notice.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notices;