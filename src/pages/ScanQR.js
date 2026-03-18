import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ScanQR = () => {
  const navigate = useNavigate();
  const [manualCode, setManualCode] = useState('');

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualCode.startsWith('COMPLAINT-')) {
      const id = manualCode.split('-')[1];
      navigate(`/complaints/${id}`);
    } else if (manualCode.startsWith('ROOM-')) {
      navigate('/complaints/create');
    } else {
      alert('Invalid QR code');
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem' }}>📱 QR Code Scanner</h1>
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <div style={{ fontSize: '8rem', marginBottom: '2rem' }}>📱</div>
          <h2 style={{ marginBottom: '1rem' }}>Quick Access via QR</h2>
          <p style={{ color: '#6B7280', marginBottom: '2rem' }}>
            Scan room QR codes to quickly raise complaints or scan complaint QR codes for instant status updates
          </p>
          <div style={{ backgroundColor: '#EFF6FF', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#1E40AF', marginBottom: '0.5rem' }}><strong>How it works:</strong></p>
            <ul style={{ textAlign: 'left', color: '#374151', fontSize: '0.875rem', lineHeight: '1.8' }}>
              <li>Each room has a unique QR code</li>
              <li>Scan room QR → Auto-fills complaint form</li>
              <li>Scan complaint QR → View status instantly</li>
              <li>No typing required - super fast!</li>
            </ul>
          </div>
          <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '2rem', marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Manual Entry</h3>
            <form onSubmit={handleManualSubmit}>
              <input type="text" value={manualCode} onChange={(e) => setManualCode(e.target.value)} placeholder="Enter QR code (e.g., COMPLAINT-123)" style={{ width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px', marginBottom: '1rem' }} />
              <button type="submit" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#2563EB', color: 'white', border: 'none', borderRadius: '4px', fontWeight: '500' }}>
                Submit Code
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanQR;
