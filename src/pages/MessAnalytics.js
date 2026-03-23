import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axiosInstance from '../api/axios';

const MessAnalytics = () => {
  const [data, setData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    avg_ratings: [0, 0, 0, 0, 0, 0, 0],
    top_food: 'Loading...',
    worst_food: 'Loading...',
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
      // Backend ke smart-summary route se data la rahe hain
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

  // Trading Theme Colors
  const bgDark = '#0B0E11'; // Binance dark
  const panelBg = '#181A20';
  const neonGreen = '#0ECB81';
  const neonRed = '#F6465D';
  const textMain = '#EAECEF';
  const textMuted = '#848E9C';
  const borderCol = '#2B3139';

  // Calculate overall average for the big ticker
  const overallAvg = data.avg_ratings.length > 0 
    ? (data.avg_ratings.reduce((a, b) => a + b, 0) / data.avg_ratings.length).toFixed(2)
    : "0.00";
  
  const isPositive = parseFloat(overallAvg) >= 3.0;

  return (
    <div style={{ backgroundColor: bgDark, minHeight: '100vh', color: textMain, fontFamily: 'monospace', overflow: 'hidden' }}>
      <Navbar />
      
      {/* MAIN TERMINAL CONTAINER - FIXED HEIGHT, NO SCROLL */}
      <div style={{ padding: '1rem', height: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {/* TOP HEADER BAR (TICKER STYLE) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: panelBg, padding: '1rem', border: `1px solid ${borderCol}`, borderRadius: '4px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.2rem', color: textMuted, letterSpacing: '2px' }}>MESS PERFORMANCE INDEX (MPI)</h1>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginTop: '0.5rem' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: isPositive ? neonGreen : neonRed }}>
                {overallAvg}
              </span>
              <span style={{ fontSize: '1rem', color: isPositive ? neonGreen : neonRed }}>
                {isPositive ? '▲ +BULLISH' : '▼ -BEARISH'}
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
                  backgroundColor: timeframe === tf ? '#2B3139' : 'transparent',
                  color: timeframe === tf ? '#FCD535' : textMuted, // Yellow accent for active
                  border: `1px solid ${timeframe === tf ? '#FCD535' : borderCol}`,
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* MIDDLE SECTION: 3-COLUMN LAYOUT */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '1rem', flex: 1 }}>
          
          {/* LEFT COLUMN: MARKET MOVERS (Top/Worst) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ backgroundColor: panelBg, border: `1px solid ${borderCol}`, padding: '1rem', flex: 1, borderRadius: '4px' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: textMuted, fontSize: '0.9rem', borderBottom: `1px solid ${borderCol}`, paddingBottom: '0.5rem' }}>🔥 TOP GAINER (BEST FOOD)</h3>
              <p style={{ fontSize: '1.5rem', color: neonGreen, margin: 0, fontWeight: 'bold' }}>{data.top_food}</p>
              <p style={{ color: textMuted, fontSize: '0.8rem', marginTop: '0.5rem' }}>Highest rated by students</p>
            </div>
            
            <div style={{ backgroundColor: panelBg, border: `1px solid ${borderCol}`, padding: '1rem', flex: 1, borderRadius: '4px' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: textMuted, fontSize: '0.9rem', borderBottom: `1px solid ${borderCol}`, paddingBottom: '0.5rem' }}>🩸 TOP LOSER (WORST FOOD)</h3>
              <p style={{ fontSize: '1.5rem', color: neonRed, margin: 0, fontWeight: 'bold' }}>{data.worst_food}</p>
              <p style={{ color: textMuted, fontSize: '0.8rem', marginTop: '0.5rem' }}>Needs immediate action</p>
            </div>
          </div>

          {/* CENTER COLUMN: THE "CANDLESTICK" CHART (Using CSS Bars) */}
          <div style={{ backgroundColor: panelBg, border: `1px solid ${borderCol}`, padding: '1rem', borderRadius: '4px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: textMuted, fontSize: '0.9rem' }}>📊 SENTIMENT VOLUME CHART</h3>
            
            {loading ? (
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#FCD535' }}>Syncing node data...</div>
            ) : (
              <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '1rem 0', borderBottom: `1px solid ${borderCol}` }}>
                {data.avg_ratings.map((rating, index) => {
                  const heightPercent = (rating / 5) * 100;
                  const isGood = rating >= 3;
                  return (
                    <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: '10%' }}>
                      <span style={{ fontSize: '0.8rem', color: isGood ? neonGreen : neonRed }}>{rating.toFixed(1)}</span>
                      {/* THE BAR */}
                      <div style={{ 
                        width: '100%', 
                        height: `${heightPercent}%`, 
                        minHeight: '10px',
                        backgroundColor: isGood ? neonGreen : neonRed,
                        opacity: 0.8,
                        boxShadow: `0 0 10px ${isGood ? neonGreen : neonRed}` // Glow effect
                      }}></div>
                      <span style={{ fontSize: '0.8rem', color: textMuted }}>{data.labels[index]}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: ORDER BOOK (CRITICAL REPORTS) */}
          <div style={{ backgroundColor: panelBg, border: `1px solid ${borderCol}`, padding: '1rem', borderRadius: '4px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: textMuted, fontSize: '0.9rem', borderBottom: `1px solid ${borderCol}`, paddingBottom: '0.5rem' }}>⚠️ CRITICAL ALERTS (ORDER BOOK)</h3>
            
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {data.critical_reports.length === 0 ? (
                <p style={{ color: textMuted, fontSize: '0.9rem', textAlign: 'center', marginTop: '2rem' }}>No critical issues detected.</p>
              ) : (
                data.critical_reports.map((report, idx) => (
                  <div key={idx} style={{ 
                    padding: '0.75rem', 
                    borderBottom: `1px solid ${borderCol}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: neonRed, fontSize: '0.8rem', fontWeight: 'bold' }}>SELL / REJECT</span>
                      <span style={{ color: textMain, fontSize: '0.8rem' }}>{report.meal}</span>
                    </div>
                    <span style={{ color: textMuted, fontSize: '0.85rem' }}>"{report.comment}"</span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MessAnalytics;