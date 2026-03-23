import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useTheme } from '../context/ThemeContext'; // 🟢 Global context

const Settings = () => {
  const themeContext = useTheme();

  // 🟢 LOCAL STATE IS BACK: Button ab hamesha move karega!
  const [localDark, setLocalDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
  });

  // 🟢 BULLETPROOF TOGGLE FUNCTION
  const handleThemeToggle = () => {
    const newTheme = !localDark;
    
    // 1. Button ko turant move karao (Visual Feedback)
    setLocalDark(newTheme);

    // 2. Global Context ko update karo (Agar exist karta hai)
    if (themeContext && themeContext.toggleTheme) {
      themeContext.toggleTheme();
    }

    // 3. Brute-force DOM change (Agar context fail bhi hua toh page dark hoga hi)
    if (newTheme) {
      document.body.style.backgroundColor = '#111827';
      document.body.style.color = '#F9FAFB';
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.style.backgroundColor = '#F3F4F6';
      document.body.style.color = '#111827';
      localStorage.setItem('theme', 'light');
    }
  };

  const handleSave = () => {
    const btn = document.getElementById('save-btn');
    const originalText = btn.innerText;
    btn.innerText = 'Syncing...';
    btn.style.backgroundColor = '#10B981';
    
    setTimeout(() => {
      btn.innerText = 'Preferences Saved!';
      setTimeout(() => {
        btn.innerText = originalText;
        btn.style.backgroundColor = '#2563EB';
      }, 2000);
    }, 800);
  };

  // Dynamic Colors based on LOCAL state so UI always updates
  const cardBg = localDark ? '#1F2937' : '#FFFFFF';
  const borderColor = localDark ? '#374151' : '#E5E7EB';
  const textColor = localDark ? '#F9FAFB' : '#111827';
  const textMuted = localDark ? '#9CA3AF' : '#6B7280';
  const primaryColor = '#2563EB';

  // Toggle Switch Component
  const ToggleSwitch = ({ checked, onChange }) => (
    <div 
      onClick={onChange}
      style={{
        width: '44px',
        height: '24px',
        backgroundColor: checked ? primaryColor : (localDark ? '#4B5563' : '#D1D5DB'),
        borderRadius: '999px',
        position: 'relative',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
      }}
    >
      <div style={{
        width: '20px',
        height: '20px',
        backgroundColor: '#FFFFFF',
        borderRadius: '50%',
        position: 'absolute',
        top: '2px',
        left: checked ? '22px' : '2px',
        transition: 'left 0.3s',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }} />
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', transition: 'all 0.3s ease' }}>
      <Navbar />
      
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem', fontSize: '2rem', color: textColor, fontWeight: '700' }}>
          System Settings
        </h1>
        
        <div style={{ 
          backgroundColor: cardBg, 
          padding: '2rem', 
          borderRadius: '12px', 
          border: `1px solid ${borderColor}`,
          boxShadow: localDark ? '0 4px 6px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.05)',
          transition: 'all 0.3s ease'
        }}>
          
          {/* 🟢 APPEARANCE SECTION */}
          <div style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: `1px solid ${borderColor}` }}>
            <h2 style={{ fontSize: '1.25rem', color: textColor, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🎨 Appearance
            </h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: '0 0 0.25rem 0', fontWeight: '500', color: textColor, fontSize: '1.1rem' }}>Display Theme</p>
                <p style={{ margin: 0, fontSize: '0.875rem', color: textMuted }}>Switch between Day and Night viewing modes.</p>
              </div>
              <ToggleSwitch 
                checked={localDark} 
                onChange={handleThemeToggle} // 🟢 Calls the brute-force function
              />
            </div>
          </div>

          {/* 🟢 NOTIFICATIONS SECTION */}
          <div style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: `1px solid ${borderColor}` }}>
            <h2 style={{ fontSize: '1.25rem', color: textColor, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🔔 Notifications
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ margin: '0 0 0.25rem 0', fontWeight: '500', color: textColor }}>Email Alerts</p>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: textMuted }}>Receive updates on assignments and billing.</p>
                </div>
                <ToggleSwitch 
                  checked={notifications.email} 
                  onChange={() => setNotifications({ ...notifications, email: !notifications.email })} 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ margin: '0 0 0.25rem 0', fontWeight: '500', color: textColor }}>Browser Push Notifications</p>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: textMuted }}>Get real-time alerts on your device.</p>
                </div>
                <ToggleSwitch 
                  checked={notifications.push} 
                  onChange={() => {
                    const newState = !notifications.push;
                    setNotifications({ ...notifications, push: newState });
                    if (newState) alert('Browser permission requested for Push Notifications.');
                  }} 
                />
              </div>
            </div>

            <div style={{ 
              marginTop: '1.5rem', 
              padding: '1.25rem', 
              backgroundColor: localDark ? 'rgba(37, 99, 235, 0.1)' : '#EFF6FF', 
              borderRadius: '8px',
              border: `1px solid ${localDark ? 'rgba(37, 99, 235, 0.2)' : '#BFDBFE'}`
            }}>
              <p style={{ fontSize: '0.875rem', color: localDark ? '#60A5FA' : '#1E40AF', marginBottom: '0.75rem', marginTop: 0 }}>
                <strong>📧 Active Alert Triggers:</strong>
              </p>
              <ul style={{ fontSize: '0.875rem', color: localDark ? '#9CA3AF' : '#374151', lineHeight: '1.8', margin: 0, paddingLeft: '1.5rem' }}>
                <li>New complaint assignments to caretakers</li>
                <li>Status resolutions on your active tickets</li>
                <li>Monthly bill generation and due dates</li>
                <li>Critical warden announcements</li>
              </ul>
            </div>
          </div>

          {/* 🟢 SAVE ACTION */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              id="save-btn"
              onClick={handleSave} 
              style={{ 
                padding: '0.75rem 2rem', 
                backgroundColor: primaryColor, 
                color: 'white', 
                border: 'none', 
                borderRadius: '6px', 
                fontWeight: '600',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px rgba(37, 99, 235, 0.2)'
              }}
            >
              Save Preferences
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;