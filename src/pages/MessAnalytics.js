import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import Navbar from '../components/Navbar';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MessAnalytics = () => {
  const [filter, setFilter] = useState('week'); // Default selection: Week
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filter change hote hi naya data fetch hoga
  useEffect(() => {
    fetchAnalytics();
  }, [filter]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      // Backend se smart-summary mang rahe hain range ke sath
      const response = await axiosInstance.get(`/mess/analytics/smart-summary?range=${filter}`);
      setData(response.data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = data?.labels.map((label, index) => ({
    name: label,
    rating: data.avg_ratings[index]
  }));

  const filterButtons = [
    { id: 'day', label: 'Day' },
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'year', label: 'Year' }
  ];

  if (!data && loading) return <div><Navbar /><div style={{ padding: '3rem', textAlign: 'center', fontFamily: 'monospace' }}>Syncing Intelligence...</div></div>;

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', paddingBottom: '3rem' }}>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontFamily: 'system-ui', fontWeight: 'bold', margin: 0 }}>📊 Quality Insight</h1>
            <p style={{ fontFamily: 'monospace', color: '#6B7280', margin: 0 }}>Real-time student feedback analysis</p>
          </div>
          
          {/* DIGITAL WELLBEING STYLE SELECTOR */}
          <div style={{ display: 'flex', backgroundColor: '#E5E7EB', padding: '4px', borderRadius: '12px' }}>
            {filterButtons.map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                  backgroundColor: filter === btn.id ? 'white' : 'transparent',
                  color: filter === btn.id ? '#000' : '#6B7280',
                  boxShadow: filter === btn.id ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                  transition: '0.2s all'
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* MASTER CHART CARD */}
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '24px', border: '3px solid #000', boxShadow: '8px 8px 0 #000', marginBottom: '2rem' }}>
          <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ margin: 0, fontFamily: 'system-ui' }}>Satisfaction Index</h2>
              <p style={{ color: '#6B7280', fontFamily: 'monospace', fontSize: '0.9rem' }}>Averaging ratings over this {filter}</p>
            </div>
            {loading && <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#2563EB' }}>Updating...</span>}
          </div>

          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                <YAxis domain={[0, 5]} axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '2px solid #000', fontFamily: 'monospace', boxShadow: '4px 4px 0 #000' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="rating" 
                  stroke="#2563EB" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorRating)" 
                  animationDuration={800}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DATA BREAKDOWN GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          
          {/* TOP PERFORMER */}
          <div style={{ backgroundColor: '#D1FAE5', padding: '1.5rem', borderRadius: '24px', border: '3px solid #000', boxShadow: '4px 4px 0 #000' }}>
            <span style={{ fontWeight: 'bold', fontFamily: 'monospace', color: '#065F46', fontSize: '0.8rem' }}>⭐ TOP RATED MEAL</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', fontFamily: 'system-ui', marginTop: '10px' }}>
              {data?.top_food}
            </div>
          </div>

          {/* CRITICAL ALERTS */}
          <div style={{ backgroundColor: '#111827', color: 'white', padding: '1.5rem', borderRadius: '24px', border: '3px solid #000', boxShadow: '4px 4px 0 #2563EB' }}>
            <span style={{ fontSize: '0.8rem', color: '#9CA3AF', fontFamily: 'monospace', fontWeight: 'bold' }}>🚩 CRITICAL FEEDBACK</span>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {data?.critical_reports.length > 0 ? data.critical_reports.map((r, i) => (
                <div key={i} style={{ borderLeft: '3px solid #F87171', paddingLeft: '10px' }}>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#FCA5A5', fontWeight: 'bold' }}>{r.meal}</p>
                  <p style={{ margin: 0, fontSize: '0.8rem', fontStyle: 'italic', opacity: 0.8 }}>"{r.comment}"</p>
                </div>
              )) : (
                <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>No major issues reported in this cycle.</p>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default MessAnalytics;