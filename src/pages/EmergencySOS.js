import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import Navbar from '../components/Navbar';

const EmergencySOS = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendSOS = async () => {
    setLoading(true);
    try {
      // 🟢 FIXED: Ab hum URL mein ?user_id= bhej rahe hain!
      await axiosInstance.post(`/emergency/?user_id=${user?.id || 1}`, { 
        room_number: "Notified via App", 
        location: message,               
        device_info: navigator.userAgent 
      });
      
      alert('🚨 EMERGENCY ALERT SENT! Warden has been notified.');
      navigate('/dashboard');
    } catch (error) {
      console.error("SOS API ERROR:", error.response?.data || error.message);
      alert('Failed to send SOS. Check console.');
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ backgroundColor: '#FEE2E2', padding: '2rem', borderRadius: '8px', border: '2px solid #DC2626', marginBottom: '2rem' }}>
          <h1 style={{ color: '#DC2626', fontSize: '2rem', marginBottom: '1rem' }}>⚠️ EMERGENCY ALERT</h1>
          <p style={{ color: '#7F1D1D', marginBottom: '1rem' }}>
            Use this button ONLY for genuine emergencies like fire, medical emergency, or safety threats.
          </p>
          <p style={{ color: '#7F1D1D', fontSize: '0.875rem' }}>
            Misuse of this feature may result in account suspension.
          </p>
        </div>

        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Emergency Type</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="Briefly describe the emergency..."
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px', marginBottom: '1.5rem' }}
          />

          {!showConfirm ? (
            <button
              onClick={() => setShowConfirm(true)}
              style={{
                width: '100%',
                padding: '1.5rem',
                backgroundColor: '#DC2626',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                animation: 'pulse 2s infinite',
              }}
            >
              🚨 SEND EMERGENCY ALERT
            </button>
          ) : (
            <div>
              <div style={{ padding: '1rem', backgroundColor: '#FEF3C7', borderRadius: '4px', marginBottom: '1rem' }}>
                <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Are you sure?</p>
                <p style={{ fontSize: '0.875rem', color: '#92400E' }}>
                  This will immediately notify:
                  <br />• Warden
                  <br />• Security
                  <br />• Medical team
                </p>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={handleSendSOS}
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    backgroundColor: loading ? '#9CA3AF' : '#DC2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                  }}
                >
                  {loading ? 'SENDING...' : 'YES, SEND ALERT'}
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    backgroundColor: '#E5E7EB',
                    color: '#374151',
                    border: 'none',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                  }}
                >
                  CANCEL
                </button>
              </div>
            </div>
          )}
        </div>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default EmergencySOS;
