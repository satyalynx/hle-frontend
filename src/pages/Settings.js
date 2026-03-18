import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
  });

  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem' }}>Settings</h1>
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid #E5E7EB' }}>
            <h2 style={{ marginBottom: '1rem' }}>Appearance</h2>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Theme</label>
              <select value={theme} onChange={(e) => setTheme(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #E5E7EB', borderRadius: '4px' }}>
                <option value="light">Light</option>
                <option value="dark">Dark (Coming Soon)</option>
              </select>
            </div>
          </div>
          <div>
            <h2 style={{ marginBottom: '1rem' }}>Notifications</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" checked={notifications.email} onChange={(e) => {
                  setNotifications({ ...notifications, email: e.target.checked });
                  if (e.target.checked) {
                    alert('✅ Email notifications enabled! You will receive updates on your registered email.');
                  } else {
                    alert('❌ Email notifications disabled.');
                  }
                }} />
                <span>Email Notifications</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" checked={notifications.push} onChange={(e) => {
                  setNotifications({ ...notifications, push: e.target.checked });
                  alert('Push notifications coming soon!');
                }} />
                <span>Push Notifications (Coming Soon)</span>
              </label>
            </div>
            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#EFF6FF', borderRadius: '4px' }}>
              <p style={{ fontSize: '0.875rem', color: '#1E40AF', marginBottom: '0.5rem' }}>
                <strong>📧 You will receive emails for:</strong>
              </p>
              <ul style={{ fontSize: '0.875rem', color: '#374151', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                <li>New complaint assignments</li>
                <li>Status updates on your complaints</li>
                <li>Bill reminders and due dates</li>
                <li>Important notices and announcements</li>
              </ul>
            </div>
          </div>
          <div style={{ marginTop: '2rem' }}>
            <button onClick={() => alert('Settings saved!')} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#2563EB', color: 'white', border: 'none', borderRadius: '4px', fontWeight: '500' }}>
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
