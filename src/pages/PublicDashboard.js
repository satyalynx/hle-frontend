import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';

const PublicDashboard = () => {
  const [data, setData] = useState({
    stats: { total: 0, resolved: 0, pending: 0 },
    complaints: [],
    notices: [],
    todays_menu: [],
    staff_on_duty: {},
    poll: null
  });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    fetchData();
    const dataInterval = setInterval(fetchData, 5000); 
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000); 
    return () => { clearInterval(dataInterval); clearInterval(timeInterval); };
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/public/live-dashboard/');
      setData(response.data);
    } catch (error) {
      console.error('Live Dashboard Sync Error:', error);
    }
  };

  const getStatusColor = (status) => {
    const s = status.toUpperCase();
    if (s.includes('RESOLVED') || s.includes('CLOSED')) return '#10B981'; 
    if (s.includes('ASSIGNED') || s.includes('PROGRESS')) return '#3B82F6'; 
    return '#F59E0B'; 
  };

  const resolutionRate = data.stats.total > 0 ? Math.round((data.stats.resolved / data.stats.total) * 100) : 0;

  // Poll calculation
  const totalVotes = data.poll ? data.poll.upvotes + data.poll.downvotes : 0;
  const upPercent = totalVotes > 0 ? Math.round((data.poll.upvotes / totalVotes) * 100) : 50;
  const downPercent = totalVotes > 0 ? Math.round((data.poll.downvotes / totalVotes) * 100) : 50;

  return (
    <div style={{ backgroundColor: '#0B0F19', minHeight: '100vh', color: 'white', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column' }}>
      
      {/* SCROLLING SYSTEM NOTICE */}
      {data.notices.length > 0 && (
        <div style={{ backgroundColor: '#1E293B', color: '#94A3B8', padding: '0.5rem', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#0F172A', color: '#38BDF8', padding: '0.2rem 1rem', marginRight: '1rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold', border: '1px solid #38BDF8' }}>
            SYSTEM NOTICE
          </div>
          <marquee style={{ flex: 1, fontSize: '1rem', letterSpacing: '1px', fontFamily: 'monospace' }}>
            {data.notices.map((n, i) => `▪ [${n.category.toUpperCase()}] ${n.title} \u00A0\u00A0\u00A0\u00A0\u00A0`).join(' | \u00A0\u00A0\u00A0\u00A0\u00A0')}
          </marquee>
        </div>
      )}

      <div style={{ padding: '1.5rem 2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: '#10B981', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '900', margin: 0, letterSpacing: '1px', color: '#F8FAFC' }}>
              HOSTEL COMMAND CENTER
            </h1>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'monospace', color: '#38BDF8', lineHeight: '1' }}>
              {currentTime.toLocaleTimeString()}
            </div>
            <div style={{ fontSize: '1rem', color: '#94A3B8', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '4px' }}>
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>

        {/* 3-COLUMN DASHBOARD GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', flex: 1 }}>
          
          {/* COLUMN 1: LIVE OPERATIONS (COMPLAINTS) */}
          <div style={{ backgroundColor: '#1E293B', borderRadius: '12px', border: '1px solid #334155', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ backgroundColor: '#0F172A', padding: '1rem', borderBottom: '2px solid #38BDF8', fontWeight: 'bold', fontSize: '1.2rem', color: '#38BDF8', display: 'flex', justifyContent: 'space-between' }}>
              <span>📡 LIVE OPERATIONS</span>
              <span style={{color: '#94A3B8'}}>{data.complaints.length} Active</span>
            </div>
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
              {data.complaints.map((c, i) => (
                <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem', backgroundColor: '#0F172A', borderRadius: '6px', borderLeft: `4px solid ${getStatusColor(c.status)}` }}>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', gap: '8px' }}>
                      <span style={{color: '#F8FAFC'}}>{c.room_number}</span>
                      <span style={{color: '#94A3B8'}}>|</span>
                      <span style={{color: '#E2E8F0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px'}}>{c.title}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748B', fontFamily: 'monospace', marginTop: '4px' }}>{c.time} • {c.category}</div>
                  </div>
                  <div style={{ fontSize: '0.7rem', padding: '4px 8px', backgroundColor: `${getStatusColor(c.status)}20`, color: getStatusColor(c.status), borderRadius: '4px', fontWeight: 'bold', letterSpacing: '1px' }}>
                    {c.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 2: HOSTEL STATUS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Resolution Meter */}
            <div style={{ backgroundColor: '#1E293B', borderRadius: '12px', border: '1px solid #334155', padding: '1.5rem' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#F8FAFC', fontSize: '1.2rem' }}>⚡ RESOLUTION METRICS</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#F59E0B', fontFamily: 'monospace' }}>{data.stats.pending}</div>
                  <div style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 'bold' }}>PENDING</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10B981', fontFamily: 'monospace' }}>{data.stats.resolved}</div>
                  <div style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 'bold' }}>RESOLVED</div>
                </div>
              </div>
              <div style={{ width: '100%', height: '12px', backgroundColor: '#0F172A', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${resolutionRate}%`, backgroundColor: '#10B981', boxShadow: '0 0 10px #10B981' }}></div>
              </div>
            </div>

            {/* Quick Zones (Visual Eye-candy) */}
            <div style={{ backgroundColor: '#1E293B', borderRadius: '12px', border: '1px solid #334155', padding: '1.5rem', flex: 1 }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#F8FAFC', fontSize: '1.2rem' }}>🏢 ZONE STATUS</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {['BLOCK A', 'BLOCK B', 'BLOCK C', 'COMMON AREA'].map((zone, i) => (
                  <div key={zone} style={{ padding: '0.8rem 1rem', backgroundColor: '#0F172A', borderRadius: '8px', border: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', color: '#CBD5E1', fontSize: '0.85rem' }}>{zone}</span>
                    <span style={{ width: '12px', height: '12px', backgroundColor: i === 1 ? '#F59E0B' : '#10B981', borderRadius: '50%', boxShadow: `0 0 8px ${i === 1 ? '#F59E0B' : '#10B981'}` }}></span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Staff on Duty - 🟢 FIXED: REAL-TIME FALLBACK ADDED HERE */}
            <div style={{ backgroundColor: '#1E293B', borderRadius: '12px', border: '1px solid #334155', padding: '1.5rem' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#F8FAFC', fontSize: '1.2rem' }}>👮 ON DUTY NOW</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #334155', paddingBottom: '0.5rem' }}>
                  <span style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Warden</span>
                  <span style={{ fontWeight: 'bold', color: data.staff_on_duty?.warden ? '#F8FAFC' : '#EF4444', fontSize: '0.9rem', fontStyle: data.staff_on_duty?.warden ? 'normal' : 'italic' }}>
                    {data.staff_on_duty?.warden || 'Not Assigned'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #334155', paddingBottom: '0.5rem' }}>
                  <span style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Caretaker</span>
                  <span style={{ fontWeight: 'bold', color: data.staff_on_duty?.caretaker ? '#F8FAFC' : '#EF4444', fontSize: '0.9rem', fontStyle: data.staff_on_duty?.caretaker ? 'normal' : 'italic' }}>
                    {data.staff_on_duty?.caretaker || 'Not Assigned'}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* COLUMN 3: FOOD HUB & POLL ONLY */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Live Menu */}
            <div style={{ backgroundColor: '#1E293B', borderRadius: '12px', border: '1px solid #334155', display: 'flex', flexDirection: 'column' }}>
              <div style={{ backgroundColor: '#0F172A', padding: '1rem', borderBottom: '2px solid #F59E0B', fontWeight: 'bold', fontSize: '1.2rem', color: '#F59E0B' }}>
                🍕 TODAY'S MENU
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {data.todays_menu.length === 0 ? (
                  <div style={{ color: '#94A3B8', textAlign: 'center' }}>Menu not updated for today</div>
                ) : (
                  data.todays_menu.map((m, i) => (
                    <div key={i}>
                      <div style={{ color: '#F59E0B', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '2px' }}>{m.meal}</div>
                      <div style={{ color: '#F8FAFC', fontSize: '1rem', fontWeight: '500' }}>{m.items}</div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* 🔥 Janta Ki Awaaz (Live Poll) - Flex: 1 so it fills the rest of the column beautifully */}
            <div style={{ flex: 1, backgroundColor: '#0F172A', border: '2px solid #8B5CF6', padding: '2rem', borderRadius: '12px', boxShadow: '0 0 15px rgba(139, 92, 246, 0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '1.2rem', color: '#A78BFA', fontWeight: '900', marginBottom: '1.5rem', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🗳️ LIVE STUDENT POLL
              </div>
              {data.poll ? (
                <div>
                  <div style={{ color: '#F8FAFC', fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1.5rem', lineHeight: '1.4' }}>
                    "{data.poll.question}"
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '1rem' }}>
                    <span style={{ color: '#10B981' }}>👍 {upPercent}% ({data.poll.upvotes})</span>
                    <span style={{ color: '#EF4444' }}>👎 {downPercent}% ({data.poll.downvotes})</span>
                  </div>
                  <div style={{ display: 'flex', height: '16px', width: '100%', backgroundColor: '#1E293B', borderRadius: '8px', overflow: 'hidden' }}>
                    <div style={{ width: `${upPercent}%`, backgroundColor: '#10B981', transition: 'width 0.5s ease' }}></div>
                    <div style={{ width: `${downPercent}%`, backgroundColor: '#EF4444', transition: 'width 0.5s ease' }}></div>
                  </div>
                </div>
              ) : (
                <div style={{ color: '#64748B', fontStyle: 'italic', textAlign: 'center', fontSize: '1.1rem' }}>No active polls right now.</div>
              )}
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default PublicDashboard;