import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { API_ENDPOINTS } from '../api/config';
import Navbar from '../components/Navbar';

const ComplaintHistory = () => {
  const { id } = useParams();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, [id]);

  const fetchHistory = async () => {
    try {
      const response = await axiosInstance.get(`${API_ENDPOINTS.COMPLAINTS}${id}/history`);
      setHistory(response.data);
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div><Navbar /><div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div></div>;

  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem' }}>Complaint History</h1>
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          {history.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#6B7280' }}>No history available</p>
          ) : (
            <div style={{ position: 'relative', paddingLeft: '2rem' }}>
              <div style={{ position: 'absolute', left: '0.5rem', top: 0, bottom: 0, width: '2px', backgroundColor: '#E5E7EB' }}></div>
              {history.map((item, index) => (
                <div key={item.id} style={{ position: 'relative', marginBottom: '2rem' }}>
                  <div style={{ position: 'absolute', left: '-1.5rem', width: '1rem', height: '1rem', borderRadius: '50%', backgroundColor: '#2563EB', border: '2px solid white' }}></div>
                  <div style={{ padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: '500', color: '#2563EB' }}>
                        {item.old_status ? `${item.old_status} → ${item.new_status}` : item.new_status}
                      </span>
                      <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                        {new Date(item.changed_at).toLocaleString()}
                      </span>
                    </div>
                    {item.notes && <p style={{ color: '#374151', fontSize: '0.875rem' }}>{item.notes}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintHistory;
