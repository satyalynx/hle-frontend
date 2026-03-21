import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axios';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalComplaints: 0,
    pendingComplaints: 0,
    resolvedComplaints: 0,
    totalNotices: 0,
    todayComplaints: 0,
  });
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeEmergency, setActiveEmergency] = useState(null);

  useEffect(() => {
    if (user && (user.role === 'warden' || user.role === 'admin' || user.role === 'caretaker')) {
        const checkEmergencies = async () => {
          try {
             const res = await axiosInstance.get('/emergency/active');
             // 🟢 FIXED: Grab the first active emergency from the list
             if (res.data && res.data.length > 0) {
                 setActiveEmergency(res.data[0]); 
             }
          } catch (error) {}
        };
        const intervalId = setInterval(checkEmergencies, 3000); 
        return () => clearInterval(intervalId);
    }
  }, [user]);

  // 🟢 FIXED: Match your backend PUT route for updating status
  const handleAcknowledge = async () => {
      if (!activeEmergency) return;
      try { 
          await axiosInstance.put(`/emergency/${activeEmergency.id}/status`, {
              status: "handled",
              notes: "Acknowledged via Command Center"
          }); 
      } 
      catch (e) { console.error("Failed to acknowledge", e); } 
      finally { setActiveEmergency(null); }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const complaintsRes = await axiosInstance.get('/complaints/');
      const noticesRes = await axiosInstance.get('/notices/');
      
      const allComplaints = complaintsRes.data;
      let relevantComplaints = allComplaints;

      if (user?.role === 'student') {
        relevantComplaints = allComplaints.filter(c => c.user_id === user.id);
      } else if (user?.role === 'caretaker') {
        relevantComplaints = allComplaints.filter(c => c.assigned_to === user.id);
      }

      const today = new Date().toDateString();
      const todayCount = allComplaints.filter(c => 
        new Date(c.created_at).toDateString() === today
      ).length;

      setStats({
        totalComplaints: relevantComplaints.length,
        pendingComplaints: relevantComplaints.filter(c => c.status !== 'resolved' && c.status !== 'closed').length,
        resolvedComplaints: relevantComplaints.filter(c => c.status === 'resolved' || c.status === 'closed').length,
        totalNotices: noticesRes.data.length,
        todayComplaints: todayCount,
      });

      setRecentComplaints(allComplaints.slice(0, 5));

    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div style={{ padding: '3rem', textAlign: 'center', fontFamily: 'monospace', fontSize: '1.5rem' }}>
          Loading dashboard...
        </div>
      </div>
    );
  }

  // STUDENT DASHBOARD
  if (user?.role === 'student') {
    return (
      <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
        <Navbar />
        
        {/* DENSE HEADER */}
        <div style={{ 
          backgroundColor: '#FFFFFF',
          padding: '1.5rem 2rem',
          borderBottom: '3px solid #000000',
        }}>
          <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'system-ui', margin: 0, marginBottom: '0.25rem' }}>
                {getGreeting()}, {user.name}
              </h1>
              <p style={{ fontFamily: 'monospace', fontSize: '0.875rem', margin: 0, color: '#666' }}>
                Student Dashboard • {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/complaints/create">
                <button style={{ 
                  padding: '0.75rem 1.5rem', 
                  backgroundColor: '#000000', 
                  color: 'white', 
                  border: '3px solid #000000', 
                  cursor: 'pointer', 
                  fontWeight: 'bold', 
                  fontFamily: 'monospace',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563EB';
                  e.currentTarget.style.borderColor = '#2563EB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.borderColor = '#000000';
                }}>
                  + NEW COMPLAINT
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div style={{ padding: '1.5rem', maxWidth: '1600px', margin: '0 auto' }}>
          
          {/* DENSE STATS ROW */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(5, 1fr)', 
            gap: '1rem', 
            marginBottom: '1.5rem' 
          }}>
            <div style={{ backgroundColor: 'white', padding: '1rem', border: '3px solid #000000', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '0.25rem' }}>
                {stats.totalComplaints}
              </div>
              <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 'bold', textTransform: 'uppercase', color: '#666' }}>
                Total
              </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '1rem', border: '3px solid #000000', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '0.25rem' }}>
                {stats.pendingComplaints}
              </div>
              <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 'bold', textTransform: 'uppercase', color: '#666' }}>
                Pending
              </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '1rem', border: '3px solid #000000', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '0.25rem' }}>
                {stats.resolvedComplaints}
              </div>
              <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 'bold', textTransform: 'uppercase', color: '#666' }}>
                Resolved
              </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '1rem', border: '3px solid #000000', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '0.25rem' }}>
                {stats.todayComplaints}
              </div>
              <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 'bold', textTransform: 'uppercase', color: '#666' }}>
                Today
              </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '1rem', border: '3px solid #000000', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '0.25rem' }}>
                {stats.totalNotices}
              </div>
              <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 'bold', textTransform: 'uppercase', color: '#666' }}>
                Notices
              </div>
            </div>
          </div>

          {/* MAIN CONTENT - 3 COLUMNS */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1.5rem' }}>
            
            {/* QUICK ACTIONS - LEFT */}
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', fontFamily: 'system-ui', borderBottom: '3px solid #000000', paddingBottom: '0.5rem' }}>
                QUICK ACTIONS
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                <Link to="/complaints/create" style={{ textDecoration: 'none' }}>
                  <div style={{ backgroundColor: 'white', padding: '1.25rem', border: '3px solid #000000', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#EFF6FF';
                      e.currentTarget.style.borderColor = '#2563EB';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.borderColor = '#000000';
                    }}>
                    <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>📝</div>
                    <div style={{ fontWeight: 'bold', fontFamily: 'monospace', color: '#000000', fontSize: '0.875rem' }}>
                      RAISE COMPLAINT
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#666', fontFamily: 'monospace', marginTop: '0.25rem' }}>
                      Report maintenance issues
                    </div>
                  </div>
                </Link>

                <Link to="/complaints" style={{ textDecoration: 'none' }}>
                  <div style={{ backgroundColor: 'white', padding: '1.25rem', border: '3px solid #000000', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#EFF6FF';
                      e.currentTarget.style.borderColor = '#2563EB';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.borderColor = '#000000';
                    }}>
                    <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>📊</div>
                    <div style={{ fontWeight: 'bold', fontFamily: 'monospace', color: '#000000', fontSize: '0.875rem' }}>
                      MY COMPLAINTS
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#666', fontFamily: 'monospace', marginTop: '0.25rem' }}>
                      Track status & history
                    </div>
                  </div>
                </Link>

                <Link to="/food" style={{ textDecoration: 'none' }}>
                  <div style={{ backgroundColor: 'white', padding: '1.25rem', border: '3px solid #000000', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#EFF6FF';
                      e.currentTarget.style.borderColor = '#2563EB';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.borderColor = '#000000';
                    }}>
                    <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>🍕</div>
                    <div style={{ fontWeight: 'bold', fontFamily: 'monospace', color: '#000000', fontSize: '0.875rem' }}>
                      FOOD HUB
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#666', fontFamily: 'monospace', marginTop: '0.25rem' }}>
                      Menu, ratings & analytics
                    </div>
                  </div>
                </Link>

                <Link to="/bills" style={{ textDecoration: 'none' }}>
                  <div style={{ backgroundColor: 'white', padding: '1.25rem', border: '3px solid #000000', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#EFF6FF';
                      e.currentTarget.style.borderColor = '#2563EB';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.borderColor = '#000000';
                    }}>
                    <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>🧾</div>
                    <div style={{ fontWeight: 'bold', fontFamily: 'monospace', color: '#000000', fontSize: '0.875rem' }}>
                      FEE RECEIPTS
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#666', fontFamily: 'monospace', marginTop: '0.25rem' }}>
                      Annual fee status & records
                    </div>
                  </div>
                </Link>

                <Link to="/notices" style={{ textDecoration: 'none' }}>
                  <div style={{ backgroundColor: 'white', padding: '1.25rem', border: '3px solid #000000', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#EFF6FF';
                      e.currentTarget.style.borderColor = '#2563EB';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.borderColor = '#000000';
                    }}>
                    <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>📢</div>
                    <div style={{ fontWeight: 'bold', fontFamily: 'monospace', color: '#000000', fontSize: '0.875rem' }}>
                      NOTICES
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#666', fontFamily: 'monospace', marginTop: '0.25rem' }}>
                      Official announcements
                    </div>
                  </div>
                </Link>

                <Link to="/emergency-sos" style={{ textDecoration: 'none' }}>
                  <div style={{ backgroundColor: 'white', padding: '1.25rem', border: '3px solid #DC2626', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#FEE2E2';
                      e.currentTarget.style.borderColor = '#DC2626';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.borderColor = '#DC2626';
                    }}>
                    <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>🚨</div>
                    <div style={{ fontWeight: 'bold', fontFamily: 'monospace', color: '#DC2626', fontSize: '0.875rem' }}>
                      EMERGENCY SOS
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#DC2626', fontFamily: 'monospace', marginTop: '0.25rem' }}>
                      Quick emergency alert
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* RECENT ACTIVITY - MIDDLE */}
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', fontFamily: 'system-ui', borderBottom: '3px solid #000000', paddingBottom: '0.5rem' }}>
                RECENT
              </h2>
              <div style={{ backgroundColor: 'white', border: '3px solid #000000', padding: '1rem' }}>
                {recentComplaints.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#666', fontFamily: 'monospace', fontSize: '0.875rem', margin: 0 }}>
                    No activity
                  </p>
                ) : (
                  recentComplaints.map((complaint, index) => (
                    <div key={complaint.id} style={{ 
                      paddingBottom: '0.75rem',
                      marginBottom: '0.75rem',
                      borderBottom: index !== recentComplaints.length - 1 ? '1px solid #E5E7EB' : 'none',
                    }}>
                      <div style={{ fontWeight: 'bold', fontSize: '0.8rem', fontFamily: 'monospace', marginBottom: '0.25rem', color: '#000' }}>
                        {complaint.title.substring(0, 30)}...
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#666', fontFamily: 'monospace' }}>
                        {complaint.status}
                      </div>
                    </div>
                  ))
                )}
                <Link to="/complaints">
                  <button style={{ 
                    width: '100%', 
                    marginTop: '0.75rem',
                    padding: '0.5rem', 
                    backgroundColor: '#000000', 
                    color: 'white', 
                    border: 'none', 
                    cursor: 'pointer', 
                    fontWeight: 'bold', 
                    fontFamily: 'monospace',
                    fontSize: '0.75rem',
                  }}>
                    VIEW ALL →
                  </button>
                </Link>
              </div>

              {/* RESOLUTION TIME */}
              <div style={{ marginTop: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', fontFamily: 'system-ui', borderBottom: '3px solid #000000', paddingBottom: '0.5rem' }}>
                  METRICS
                </h2>
                <div style={{ backgroundColor: 'white', border: '3px solid #000000', padding: '1.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '0.5rem' }}>
                    &lt; 24h
                  </div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 'bold', textTransform: 'uppercase', color: '#666' }}>
                    Avg. Resolution Time
                  </div>
                </div>
              </div>
            </div>

            {/* SYSTEM STATUS - RIGHT */}
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', fontFamily: 'system-ui', borderBottom: '3px solid #000000', paddingBottom: '0.5rem' }}>
                STATUS
              </h2>
              <div style={{ backgroundColor: 'white', border: '3px solid #000000', padding: '1rem', marginBottom: '1rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 'bold', marginBottom: '0.5rem', color: '#666' }}>
                    RESOLUTION RATE
                  </div>
                  <div style={{ backgroundColor: '#E5E7EB', height: '8px', border: '2px solid #000000' }}>
                    <div style={{ 
                      width: `${stats.totalComplaints > 0 ? (stats.resolvedComplaints / stats.totalComplaints * 100) : 0}%`, 
                      height: '100%', 
                      backgroundColor: '#2563EB' 
                    }}></div>
                  </div>
                  <div style={{ fontSize: '0.7rem', fontFamily: 'monospace', marginTop: '0.25rem', color: '#666' }}>
                    {stats.totalComplaints > 0 ? Math.round(stats.resolvedComplaints / stats.totalComplaints * 100) : 0}% Resolved
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 'bold', marginBottom: '0.5rem', color: '#666' }}>
                    PENDING QUEUE
                  </div>
                  <div style={{ backgroundColor: '#E5E7EB', height: '8px', border: '2px solid #000000' }}>
                    <div style={{ 
                      width: `${stats.totalComplaints > 0 ? (stats.pendingComplaints / stats.totalComplaints * 100) : 0}%`, 
                      height: '100%', 
                      backgroundColor: '#DC2626' 
                    }}></div>
                  </div>
                  <div style={{ fontSize: '0.7rem', fontFamily: 'monospace', marginTop: '0.25rem', color: '#666' }}>
                    {stats.pendingComplaints} Active
                  </div>
                </div>
              </div>

              {/* QUICK STATS */}
              <div style={{ backgroundColor: 'white', border: '3px solid #000000', padding: '1rem' }}>
                <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 'bold', marginBottom: '0.75rem', color: '#666' }}>
                  QUICK STATS
                </div>
                <div style={{ marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E5E7EB' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#000' }}>This Week</span>
                    <span style={{ fontSize: '1rem', fontWeight: 'bold', fontFamily: 'monospace' }}>-</span>
                  </div>
                </div>
                <div style={{ marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E5E7EB' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#000' }}>This Month</span>
                    <span style={{ fontSize: '1rem', fontWeight: 'bold', fontFamily: 'monospace' }}>{stats.totalComplaints}</span>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#000' }}>System Status</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold', fontFamily: 'monospace', color: '#10B981' }}>● ONLINE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // WARDEN DASHBOARD
  if (user?.role === 'warden') {
    return (
      <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
        <Navbar />
        
        {/* 🚨 YAHAN CHIPKAANA HAI (Warden ke liye) */}
        {activeEmergency && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(8px)' }}>
              <div style={{ backgroundColor: '#FEF2F2', border: '5px solid #DC2626', padding: '3rem', maxWidth: '600px', width: '90%', textAlign: 'center', animation: 'pulse 1.5s infinite' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚨</div>
                  <h1 style={{ color: '#DC2626', fontSize: '2.5rem', fontWeight: '900', margin: '0 0 1rem 0' }}>EMERGENCY ALERT</h1>
                  <p style={{ fontSize: '1.2rem', color: '#7F1D1D', fontWeight: 'bold', marginBottom: '2rem' }}>"{activeEmergency.message}"</p>
                  <button onClick={handleAcknowledge} style={{ padding: '1rem 3rem', backgroundColor: '#DC2626', color: 'white', fontSize: '1.2rem', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>ACKNOWLEDGE & RESPOND</button>
              </div>
          </div>
        )}
        {/* 🚨 MODAL END */}
        
        <div style={{ 
          backgroundColor: '#FFFFFF',
          padding: '1.5rem 2rem',
          borderBottom: '3px solid #000000',
        }}>
          <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'system-ui', margin: 0, marginBottom: '0.25rem' }}>
              Warden Dashboard
            </h1>
            <p style={{ fontFamily: 'monospace', fontSize: '0.875rem', margin: 0, color: '#666' }}>
              Hostel Management & Oversight
            </p>
          </div>
        </div>

        <div style={{ padding: '1.5rem', maxWidth: '1600px', margin: '0 auto' }}>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(5, 1fr)', 
            gap: '1rem', 
            marginBottom: '1.5rem' 
          }}>
            <div style={{ backgroundColor: 'white', padding: '1rem', border: '3px solid #000000', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '0.25rem' }}>
                {stats.totalComplaints}
              </div>
              <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 'bold', textTransform: 'uppercase', color: '#666' }}>
                Total
              </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '1rem', border: '3px solid #000000', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '0.25rem' }}>
                {stats.pendingComplaints}
              </div>
              <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 'bold', textTransform: 'uppercase', color: '#666' }}>
                Pending
              </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '1rem', border: '3px solid #000000', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '0.25rem' }}>
                {stats.resolvedComplaints}
              </div>
              <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 'bold', textTransform: 'uppercase', color: '#666' }}>
                Resolved
              </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '1rem', border: '3px solid #000000', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '0.25rem' }}>
                {stats.todayComplaints}
              </div>
              <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 'bold', textTransform: 'uppercase', color: '#666' }}>
                Today
              </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '1rem', border: '3px solid #000000', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '0.25rem' }}>
                {stats.totalNotices}
              </div>
              <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 'bold', textTransform: 'uppercase', color: '#666' }}>
                Notices
              </div>
            </div>
          </div>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', fontFamily: 'system-ui', borderBottom: '3px solid #000000', paddingBottom: '0.5rem' }}>
            MANAGEMENT TOOLS
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <Link to="/complaints" style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: 'white', padding: '1.25rem', border: '3px solid #000000', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#EFF6FF';
                  e.currentTarget.style.borderColor = '#2563EB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.borderColor = '#000000';
                }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>📋</div>
                <div style={{ fontWeight: 'bold', fontFamily: 'monospace', color: '#000000', fontSize: '0.875rem' }}>
                  MANAGE COMPLAINTS
                </div>
              </div>
            </Link>

            <Link to="/notices/create" style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: 'white', padding: '1.25rem', border: '3px solid #000000', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#EFF6FF';
                  e.currentTarget.style.borderColor = '#2563EB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.borderColor = '#000000';
                }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>📢</div>
                <div style={{ fontWeight: 'bold', fontFamily: 'monospace', color: '#000000', fontSize: '0.875rem' }}>
                  CREATE NOTICE
                </div>
              </div>
            </Link>

            <Link to="/heatmap" style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: 'white', padding: '1.25rem', border: '3px solid #000000', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#EFF6FF';
                  e.currentTarget.style.borderColor = '#2563EB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.borderColor = '#000000';
                }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>🗺️</div>
                <div style={{ fontWeight: 'bold', fontFamily: 'monospace', color: '#000000', fontSize: '0.875rem' }}>
                  HEATMAP
                </div>
              </div>
            </Link>

            <Link to="/food" style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: 'white', padding: '1.25rem', border: '3px solid #000000', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#EFF6FF';
                  e.currentTarget.style.borderColor = '#2563EB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.borderColor = '#000000';
                }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>🍕</div>
                <div style={{ fontWeight: 'bold', fontFamily: 'monospace', color: '#000000', fontSize: '0.875rem' }}>
                  FOOD MANAGEMENT
                </div>
              </div>
            </Link>

            <Link to="/manage-bills" style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: 'white', padding: '1.25rem', border: '3px solid #000000', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#EFF6FF';
                  e.currentTarget.style.borderColor = '#2563EB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.borderColor = '#000000';
                }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>💰</div>
                <div style={{ fontWeight: 'bold', fontFamily: 'monospace', color: '#000000', fontSize: '0.875rem' }}>
                  MANAGE BILLS
                </div>
              </div>
            </Link>

            <Link to="/users" style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: 'white', padding: '1.25rem', border: '3px solid #000000', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#EFF6FF';
                  e.currentTarget.style.borderColor = '#2563EB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.borderColor = '#000000';
                }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>👥</div>
                <div style={{ fontWeight: 'bold', fontFamily: 'monospace', color: '#000000', fontSize: '0.875rem' }}>
                  VIEW USERS
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ADMIN / CARETAKER DASHBOARD
  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <Navbar />
      
      {/* 🚨 YAHAN BHI CHIPKAANA HAI (Admin ke liye) */}
      {activeEmergency && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(8px)' }}>
              <div style={{ backgroundColor: '#FEF2F2', border: '5px solid #DC2626', padding: '3rem', maxWidth: '600px', width: '90%', textAlign: 'center', animation: 'pulse 1.5s infinite' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚨</div>
                  <h1 style={{ color: '#DC2626', fontSize: '2.5rem', fontWeight: '900', margin: '0 0 1rem 0' }}>EMERGENCY ALERT</h1>
                  <p style={{ fontSize: '1.2rem', color: '#7F1D1D', fontWeight: 'bold', marginBottom: '2rem' }}>"{activeEmergency.message}"</p>
                  <button onClick={handleAcknowledge} style={{ padding: '1rem 3rem', backgroundColor: '#DC2626', color: 'white', fontSize: '1.2rem', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>ACKNOWLEDGE & RESPOND</button>
              </div>
          </div>
      )}
      {/* 🚨 MODAL END */}
      
      <div style={{ 
        backgroundColor: '#FFFFFF',
        padding: '1.5rem 2rem',
        borderBottom: '3px solid #000000',
      }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'system-ui', margin: 0, marginBottom: '0.25rem' }}>
            {user?.role === 'caretaker' ? 'Operator Dashboard 🛠️' : 'Admin Dashboard 👑'}
          </h1>
          <p style={{ fontFamily: 'monospace', fontSize: '0.875rem', margin: 0, color: '#666' }}>
            {user?.role === 'caretaker' ? 'My Tasks & Work Orders' : 'System Administration & Monitoring'}
          </p>
        </div>
      </div>

      <div style={{ padding: '1.5rem', maxWidth: '1600px', margin: '0 auto' }}>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(5, 1fr)', 
          gap: '1rem', 
          marginBottom: '1.5rem' 
        }}>
          <div style={{ backgroundColor: 'white', padding: '1rem', border: '3px solid #000000', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '0.25rem' }}>
              {stats.totalComplaints}
            </div>
            <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 'bold', textTransform: 'uppercase', color: '#666' }}>
              Total
            </div>
          </div>

          <div style={{ backgroundColor: 'white', padding: '1rem', border: '3px solid #000000', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '0.25rem' }}>
              {stats.pendingComplaints}
            </div>
            <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 'bold', textTransform: 'uppercase', color: '#666' }}>
              Pending
            </div>
          </div>

          <div style={{ backgroundColor: 'white', padding: '1rem', border: '3px solid #000000', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '0.25rem' }}>
              {stats.resolvedComplaints}
            </div>
            <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 'bold', textTransform: 'uppercase', color: '#666' }}>
              Resolved
            </div>
          </div>

          <div style={{ backgroundColor: 'white', padding: '1rem', border: '3px solid #000000', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '0.25rem' }}>
              {stats.todayComplaints}
            </div>
            <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 'bold', textTransform: 'uppercase', color: '#666' }}>
              Today
            </div>
          </div>

          <div style={{ backgroundColor: 'white', padding: '1rem', border: '3px solid #000000', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '0.25rem' }}>
              {stats.totalNotices}
            </div>
            <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 'bold', textTransform: 'uppercase', color: '#666' }}>
              Notices
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', fontFamily: 'system-ui', borderBottom: '3px solid #000000', paddingBottom: '0.5rem' }}>
          OPERATIONAL TOOLS
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>

          <Link to="/users" style={{ textDecoration: 'none' }}>
            <div style={{ backgroundColor: 'white', padding: '1.25rem', border: '3px solid #000000', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#EFF6FF';
                e.currentTarget.style.borderColor = '#2563EB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.borderColor = '#000000';
              }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>👥</div>
              <div style={{ fontWeight: 'bold', fontFamily: 'monospace', color: '#000000', fontSize: '0.875rem' }}>
                USER MANAGEMENT
              </div>
            </div>
          </Link>

          <Link to="/complaints" style={{ textDecoration: 'none' }}>
            <div style={{ backgroundColor: 'white', padding: '1.25rem', border: '3px solid #000000', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#EFF6FF';
                e.currentTarget.style.borderColor = '#2563EB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.borderColor = '#000000';
              }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>📋</div>
              <div style={{ fontWeight: 'bold', fontFamily: 'monospace', color: '#000000', fontSize: '0.875rem' }}>
                ALL COMPLAINTS
              </div>
            </div>
          </Link>

          <Link to="/heatmap" style={{ textDecoration: 'none' }}>
            <div style={{ backgroundColor: 'white', padding: '1.25rem', border: '3px solid #000000', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#EFF6FF';
                e.currentTarget.style.borderColor = '#2563EB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.borderColor = '#000000';
              }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>📊</div>
              <div style={{ fontWeight: 'bold', fontFamily: 'monospace', color: '#000000', fontSize: '0.875rem' }}>
                ANALYTICS
              </div>
            </div>
          </Link>

          <Link to="/food" style={{ textDecoration: 'none' }}>
            <div style={{ backgroundColor: 'white', padding: '1.25rem', border: '3px solid #000000', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#EFF6FF';
                e.currentTarget.style.borderColor = '#2563EB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.borderColor = '#000000';
              }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>🍕</div>
              <div style={{ fontWeight: 'bold', fontFamily: 'monospace', color: '#000000', fontSize: '0.875rem' }}>
                FOOD MANAGEMENT
              </div>
            </div>
          </Link>

          <Link to="/notices" style={{ textDecoration: 'none' }}>
            <div style={{ backgroundColor: 'white', padding: '1.25rem', border: '3px solid #000000', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#EFF6FF';
                e.currentTarget.style.borderColor = '#2563EB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.borderColor = '#000000';
              }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>📢</div>
              <div style={{ fontWeight: 'bold', fontFamily: 'monospace', color: '#000000', fontSize: '0.875rem' }}>
                NOTICES
              </div>
            </div>
          </Link>

          <Link to="/public-dashboard" style={{ textDecoration: 'none' }}>
            <div style={{ backgroundColor: 'white', padding: '1.25rem', border: '3px solid #000000', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#EFF6FF';
                e.currentTarget.style.borderColor = '#2563EB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.borderColor = '#000000';
              }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>🌐</div>
              <div style={{ fontWeight: 'bold', fontFamily: 'monospace', color: '#000000', fontSize: '0.875rem' }}>
                PUBLIC DASHBOARD
              </div>
            </div>
          </Link>

          {/* 🟢 CARETAKER ONLY: MY PAYOUTS */}
          {user?.role === 'caretaker' && (
            <Link to="/bills" style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: 'white', padding: '1.25rem', border: '3px solid #000000', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#EFF6FF';
                  e.currentTarget.style.borderColor = '#2563EB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.borderColor = '#000000';
                }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>💰</div>
                <div style={{ fontWeight: 'bold', fontFamily: 'monospace', color: '#000000', fontSize: '0.875rem' }}>
                  MY PAYOUTS
                </div>
              </div>
            </Link>
          )}

          {/* 🟢 ADMIN ONLY: MASTER LEDGER */}
          {user?.role === 'admin' && (
            <Link to="/manage-bills" style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: 'white', padding: '1.25rem', border: '3px solid #000000', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#EFF6FF';
                  e.currentTarget.style.borderColor = '#2563EB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.borderColor = '#000000';
                }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>💳</div>
                <div style={{ fontWeight: 'bold', fontFamily: 'monospace', color: '#000000', fontSize: '0.875rem' }}>
                  MASTER LEDGER
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;