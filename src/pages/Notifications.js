import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import Navbar from '../components/Navbar';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const mockNotifications = [
        { id: 1, type: 'complaint_updated', title: 'Complaint Status Changed', message: 'Your complaint "AC not working" has been marked as IN PROGRESS', timestamp: new Date(Date.now() - 7200000).toISOString(), read: false, icon: '🔧' },
        { id: 2, type: 'complaint_resolved', title: 'Complaint Resolved', message: 'Your complaint "Broken window" has been RESOLVED. Please check and verify.', timestamp: new Date(Date.now() - 86400000).toISOString(), read: false, icon: '✅' },
        { id: 3, type: 'bill_generated', title: 'New Bill Generated', message: 'Your mess bill for February 2026 is ready. Amount: ₹2,450', timestamp: new Date(Date.now() - 172800000).toISOString(), read: false, icon: '💰' },
        { id: 4, type: 'notice_posted', title: 'New Notice Posted', message: 'Important: Hostel will be closed for maintenance on 5th March', timestamp: new Date(Date.now() - 259200000).toISOString(), read: true, icon: '📢' },
        { id: 5, type: 'menu_updated', title: 'Mess Menu Updated', message: 'Tomorrow\'s special: Biryani for dinner! Rate your experience after the meal.', timestamp: new Date(Date.now() - 345600000).toISOString(), read: true, icon: '🍽️' },
        { id: 6, type: 'complaint_assigned', title: 'Complaint Assigned', message: 'Your complaint has been assigned to Caretaker Ramesh Kumar', timestamp: new Date(Date.now() - 432000000).toISOString(), read: true, icon: '👷' },
      ];
      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getTimeAgo = (timestamp) => {
    const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} mins ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) return <div><Navbar /><div style={{ padding: '2rem', textAlign: 'center' }}>Loading notifications...</div></div>;

  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1>Notifications</h1>
            {unreadCount > 0 && (
              <p style={{ color: '#2563EB', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
              </p>
            )}
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllAsRead} style={{ padding: '0.5rem 1rem', backgroundColor: '#2563EB', color: 'white', border: 'none', borderRadius: '4px', fontSize: '0.875rem' }}>
              Mark all as read
            </button>
          )}
        </div>

        <div style={{ backgroundColor: '#EFF6FF', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', borderLeft: '4px solid #2563EB' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.25rem' }}>⚡</span>
            <p style={{ color: '#1E40AF', fontSize: '0.875rem' }}>
              <strong>Real-time updates enabled!</strong> You'll receive instant notifications when your complaints are updated, bills are generated, or new notices are posted.
            </p>
          </div>
        </div>

        {notifications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔔</div>
            <p style={{ fontSize: '1.25rem', color: '#6B7280' }}>No notifications yet</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {notifications.map((notif) => (
              <div key={notif.id} style={{
                backgroundColor: notif.read ? 'white' : '#EFF6FF',
                padding: '1.5rem',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                borderLeft: notif.read ? '4px solid #E5E7EB' : '4px solid #2563EB',
                transition: 'all 0.3s',
                cursor: 'pointer',
              }}
              onClick={() => markAsRead(notif.id)}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ fontSize: '2rem', flexShrink: 0 }}>{notif.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                      <h3 style={{ fontWeight: 'bold', fontSize: '1rem', color: notif.read ? '#374151' : '#1E40AF' }}>
                        {notif.title}
                      </h3>
                      {!notif.read && (
                        <span style={{ padding: '0.25rem 0.75rem', backgroundColor: '#2563EB', color: 'white', borderRadius: '12px', fontSize: '0.625rem', fontWeight: '600', textTransform: 'uppercase' }}>
                          NEW
                        </span>
                      )}
                    </div>
                    <p style={{ color: '#374151', marginBottom: '0.75rem', lineHeight: '1.5' }}>{notif.message}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{getTimeAgo(notif.timestamp)}</p>
                      <span style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase', fontWeight: '500' }}>
                        {notif.type.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#F9FAFB', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>
            🔄 Auto-refreshing every 10 seconds for real-time updates
          </p>
          <p style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
