import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axiosInstance from '../api/axios';

const MessAnalytics = () => {
  const [data, setData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    avg_ratings: [0, 0, 0, 0, 0, 0, 0],
    top_food: 'AWAITING DATA',
    worst_food: 'AWAITING DATA',
    critical_reports: []
  });
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('week');

  useEffect(() => {
    fetchAnalytics(timeframe);
  }, [timeframe]);

  const fetchAnalytics = async (range) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/mess/analytics/smart-summary?range=${range}`);
      if (response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Analytics fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🟢 BRUTALIST ENTERPRISE THEME
  const bgMain = '#F9FAFB';
  const panelBg = '#FFFFFF';
  const colorBlue = '#2563EB'; // Progress / Good
  const colorRed = '#DC2626'; // Alert / Bad
  const textMain = '#111827';
  const textMuted = '#6B7280';
  const borderCol = '#000000';

  const overallAvg = data.avg_ratings.length > 0 
    ? (data.avg_ratings.reduce((a, b) => a + b, 0) / data.avg_ratings.length).toFixed(2)
    : "0.00";
  
  const isPositive = parseFloat(overallAvg) >= 3.0;

  return (
    <div style={{ backgroundColor: bgMain, minHeight: '100vh', color: textMain, fontFamily: 'monospace', overflow: 'hidden' }}>
      <Navbar />
      
      <div style={{ padding: '2rem', height: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* TOP HEADER BAR */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: panelBg, padding: '1.5rem 2rem', border: `4px solid ${borderCol}`, boxShadow: `6px 6px 0 ${borderCol}` }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.2rem', color: textMuted, fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase' }}>
              System Performance Overview
            </h1>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginTop: '0.5rem' }}>
              <span style={{ fontSize: '3rem', fontWeight: '900', color: isPositive ? colorBlue : colorRed }}>
                {overallAvg}
              </span>
              <span style={{ fontSize: '1rem', fontWeight: '900', color: isPositive ? colorBlue : colorRed, backgroundColor: isPositive ? '#EFF6FF' : '#FEF2F2', padding: '0.2rem 0.5rem', border: `2px solid ${isPositive ? colorBlue : colorRed}` }}>
                {isPositive ? '[STATUS: ACCEPTABLE]' : '[STATUS: CRITICAL]'}
              </span>
            </div>
          </div>

          {/* TIMEFRAME SELECTOR */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['day', 'week', 'month'].map(tf => (
              <button 
                key={tf}
                onClick={() => setTimeframe(tf)}
                style={{
                  backgroundColor: timeframe === tf ? '#000' : '#FFF',
                  color: timeframe === tf ? '#FFF' : '#000',
                  border: `3px solid ${borderCol}`,
                  padding: '0.75rem 1.5rem',
                  cursor: 'pointer',
                  fontWeight: '900',
                  fontFamily: 'monospace',
                  textTransform: 'uppercase',
                  boxShadow: timeframe === tf ? 'none' : '4px 4px 0 #000',
                  transform: timeframe === tf ? 'translate(4px, 4px)' : 'none',
                  transition: 'all 0.1s'
                }}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* MIDDLE SECTION: 3-COLUMN LAYOUT */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '2rem', flex: 1 }}>
          
          {/* LEFT COLUMN: DATA EXTREMES */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ backgroundColor: panelBg, border: `4px solid ${borderCol}`, padding: '1.5rem', flex: 1, boxShadow: `6px 6px 0 ${borderCol}`, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#000', fontSize: '1rem', fontWeight: '900', borderBottom: `3px solid ${borderCol}`, paddingBottom: '0.5rem' }}>
                [TOP PERFORMER]
              </h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p style={{ fontSize: '1.8rem', color: colorBlue, margin: 0, fontWeight: '900', textTransform: 'uppercase', lineHeight: '1.2' }}>{data.top_food}</p>
                <p style={{ color: textMuted, fontSize: '0.85rem', marginTop: '1rem', fontWeight: 'bold' }}>// HIGHEST METRIC YIELD</p>
              </div>
            </div>
            
            <div style={{ backgroundColor: panelBg, border: `4px solid ${borderCol}`, padding: '1.5rem', flex: 1, boxShadow: `6px 6px 0 ${borderCol}`, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#000', fontSize: '1rem', fontWeight: '900', borderBottom: `3px solid ${borderCol}`, paddingBottom: '0.5rem' }}>
                [CRITICAL FAILURE]
              </h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p style={{ fontSize: '1.8rem', color: colorRed, margin: 0, fontWeight: '900', textTransform: 'uppercase', lineHeight: '1.2' }}>{data.worst_food}</p>
                <p style={{ color: textMuted, fontSize: '0.85rem', marginTop: '1rem', fontWeight: 'bold' }}>// LOWEST METRIC YIELD</p>
              </div>
            </div>
          </div>

          {/* CENTER COLUMN: INTERACTIVE DISTRIBUTION CHART */}
          <div style={{ backgroundColor: panelBg, border: `4px solid ${borderCol}`, padding: '1.5rem', boxShadow: `6px 6px 0 ${borderCol}`, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#000', fontSize: '1rem', fontWeight: '900', textTransform: 'uppercase' }}>
              RATING DISTRIBUTION MATRIX
            </h3>
            
            {loading ? (
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#000', fontWeight: '900', fontSize: '1.2rem', backgroundColor: '#F3F4F6', border: '3px dashed #000' }}>
                [FETCHING TELEMETRY...]
              </div>
            ) : (
              <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '1rem 0', borderBottom: `3px solid ${borderCol}` }}>
                {data.avg_ratings.map((rating, index) => {
                  const heightPercent = (rating / 5) * 100;
                  const isGood = rating >= 3;
                  const barColor = isGood ? colorBlue : colorRed;
                  
                  return (
                    <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: '12%', height: '100%', justifyContent: 'flex-end' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: '900', color: barColor }}>{rating.toFixed(1)}</span>
                      
                      {/* THE INTERACTIVE BAR */}
                      <div 
                        style={{ 
                          width: '100%', 
                          height: `${heightPercent}%`, 
                          minHeight: '15px',
                          backgroundColor: barColor,
                          border: '3px solid #000',
                          borderBottom: 'none',
                          transition: 'height 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s',
                          cursor: 'crosshair'
                        }}
                        onMouseEnter={(e) => { e.target.style.transform = 'scaleY(1.05)'; e.target.style.backgroundColor = '#000'; }}
                        onMouseLeave={(e) => { e.target.style.transform = 'scaleY(1)'; e.target.style.backgroundColor = barColor; }}
                        title={`${data.labels[index]}: ${rating.toFixed(1)}/5`}
                      ></div>
                      
                      <span style={{ fontSize: '0.9rem', fontWeight: '900', color: '#000', marginTop: '0.5rem', textTransform: 'uppercase' }}>{data.labels[index]}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: CRITICAL ALERTS */}
          <div style={{ backgroundColor: panelBg, border: `4px solid ${borderCol}`, padding: '1.5rem', boxShadow: `6px 6px 0 ${borderCol}`, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#000', fontSize: '1rem', fontWeight: '900', borderBottom: `3px solid ${borderCol}`, paddingBottom: '0.5rem' }}>
              [SYSTEM ALERTS]
            </h3>
            
            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }}>
              {data.critical_reports.length === 0 ? (
                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <p style={{ color: textMuted, fontSize: '0.9rem', textAlign: 'center', fontWeight: 'bold' }}>NO CRITICAL ANOMALIES DETECTED.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {data.critical_reports.map((report, idx) => (
                    <div key={idx} style={{ 
                      padding: '1rem', 
                      border: `3px solid ${borderCol}`,
                      borderLeft: `8px solid ${colorRed}`,
                      backgroundColor: '#FEF2F2',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#000', fontSize: '0.85rem', fontWeight: '900', backgroundColor: colorRed, color: '#FFF', padding: '0.2rem 0.4rem' }}>
                          ACTION REQ
                        </span>
                        <span style={{ color: '#000', fontSize: '0.85rem', fontWeight: '900', textTransform: 'uppercase' }}>{report.meal}</span>
                      </div>
                      <span style={{ color: '#000', fontSize: '0.9rem', fontWeight: 'bold' }}>"{report.comment}"</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MessAnalytics;