import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { useAuth } from '../context/AuthContext'; // 🟢 1. useAuth import kiya
import Navbar from '../components/Navbar';

const MyFeedback = () => {
  const { user } = useAuth(); // 🟢 2. Logged-in user ki ID nikalne ke liye
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchFeedback();
    }
  }, [user]); // 🟢 3. Jab user mil jaye tab fetch kare

  const fetchFeedback = async () => {
    try {
      // 🟢 4. URL mein user.id pass kiya (Backend fix ke match karne ke liye)
      const response = await axiosInstance.get(`/mess/feedback/my/${user.id}`);
      setFeedback(response.data);
    } catch (error) {
      console.error('Failed to fetch feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div><Navbar /><div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'monospace' }}>Loading your history...</div></div>;

  return (
    <div style={{ backgroundColor: '#F3F4F6', minHeight: '100vh', paddingBottom: '3rem' }}>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem', fontFamily: 'system-ui', fontWeight: 'bold' }}>My Food Expose History</h1>
        
        {feedback.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'white', border: '3px solid #000', boxShadow: '4px 4px 0 #000' }}>
            <p style={{ fontSize: '1.25rem', color: '#6B7280', fontFamily: 'monospace' }}>You haven't exposed any food yet, {user?.name}.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {feedback.map((item) => (
              <div key={item.id} style={{ backgroundColor: 'white', padding: '1.5rem', border: '3px solid #000', boxShadow: '4px 4px 0 #000' }}>
                <div style={{ fontSize: '1.5rem', color: item.rating < 3 ? '#DC2626' : '#10B981', marginBottom: '0.5rem', letterSpacing: '2px' }}>
                  {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                </div>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem', fontFamily: 'monospace', fontWeight: 'bold' }}>
                  {new Date(item.created_at).toLocaleDateString()}
                </p>
                {item.comment && (
                  <p style={{ color: '#000', fontFamily: 'monospace', fontSize: '1.1rem', backgroundColor: '#F9FAFB', padding: '1rem', border: '1px dashed #D1D5DB' }}>
                    "{item.comment}"
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFeedback;