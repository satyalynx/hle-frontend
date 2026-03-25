import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Homepage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  // 🟢 FIXED: 6 Balanced Modules
  const quickLinks = [
    { title: 'Smart Complaints', icon: '📋', link: '/complaints', desc: 'Raise, track, and resolve maintenance issues.' },
    { title: 'Food Hub', icon: '🍕', link: '/food', desc: 'Check the daily menu, rate meals, and view analytics.' },
    { title: 'Broadcast Notices', icon: '📢', link: '/notices', desc: 'Get instant official announcements and updates.' },
    { title: 'Digital Bills', icon: '💳', link: '/bills', desc: 'Track monthly dues, view history, and manage payments.' },
    { title: 'Live Public Dashboard', icon: '🌐', link: '/public-dashboard', desc: 'Open metrics and transparency for everyone.' },
    { title: 'Issue Heatmap', icon: '🗺️', link: '/heatmap', desc: 'Visualise maintenance hotspots across blocks.' },
  ];

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '100px 2rem 80px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '60px',
        alignItems: 'center',
      }}>
        
        {/* Left Side */}
        <div>
          <div style={{ 
            display: 'inline-block', 
            backgroundColor: '#FBBF24', 
            padding: '0.2rem 1rem', 
            border: '2px solid #000', 
            fontWeight: 'bold', 
            fontFamily: 'monospace',
            marginBottom: '1rem',
            transform: 'rotate(-2deg)'
          }}>
            #1 HOSTEL SYSTEM
          </div>
          <h1 style={{ 
            fontSize: '5rem', 
            fontWeight: '900', 
            marginBottom: '1rem',
            lineHeight: '1',
            letterSpacing: '-2px',
            color: '#000000',
            textShadow: '4px 4px 0px #E5E7EB'
          }}>
            Hello.<br/>I'm HLE.
          </h1>
          
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#374151',
            marginBottom: '2.5rem',
            lineHeight: '1.6',
            maxWidth: '500px',
            fontWeight: '500'
          }}>
            A comprehensive, digital-first hostel management system built to eliminate paperwork, speed up maintenance, and optimize hostel life.
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <form onSubmit={handleSearch} style={{ flex: 1, position: 'relative' }}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search complaints, notices..."
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  border: '3px solid #000000',
                  borderRadius: '0',
                  fontSize: '1rem',
                  fontFamily: 'monospace',
                  outline: 'none',
                  boxShadow: '4px 4px 0 #000000',
                  transition: 'transform 0.1s',
                }}
              />
              <button
                type="submit"
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  padding: '0.6rem 1.2rem',
                  backgroundColor: '#000000',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'monospace',
                  fontWeight: 'bold'
                }}
              >
                GO →
              </button>
            </form>
            
            <Link to="/emergency-sos">
              <button style={{
                padding: '1rem 1.5rem',
                backgroundColor: '#DC2626',
                color: 'white',
                border: '3px solid #000000',
                boxShadow: '4px 4px 0 #000000',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem',
                whiteSpace: 'nowrap',
                fontFamily: 'monospace',
                transition: 'transform 0.1s, boxShadow 0.1s'
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translate(4px, 4px)';
                e.currentTarget.style.boxShadow = '0 0 0 #000000';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = '4px 4px 0 #000000';
              }}
              >
                🚨 SOS
              </button>
            </Link>
          </div>
        </div>

        {/* Right Side - Logo Tie-up */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '2rem',
          padding: '3rem 2rem',
          border: '4px solid #000000',
          backgroundColor: '#DBEAFE',
          boxShadow: '8px 8px 0 #000000',
          transform: 'rotate(1deg)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '120px', height: '120px',
              border: '3px solid #000000',
              backgroundColor: '#2563EB',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2.5rem', fontWeight: 'bold', color: 'white',
              marginBottom: '1rem',
              boxShadow: '4px 4px 0 #000000'
            }}>
              HLE
            </div>
            <p style={{ fontWeight: 'bold', fontFamily: 'monospace', fontSize: '0.9rem' }}>SYSTEM</p>
          </div>

          <div style={{ fontSize: '2.5rem', fontWeight: '900' }}>+</div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '120px', height: '120px',
              border: '3px solid #000000',
              backgroundColor: '#FFFFFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '3rem',
              marginBottom: '1rem',
              boxShadow: '4px 4px 0 #000000'
            }}>
              🏛️
            </div>
            <p style={{ fontWeight: 'bold', fontFamily: 'monospace', fontSize: '0.9rem' }}>UTKAL UNIV</p>
          </div>
        </div>
      </div>

      {/* 2. STATS MARQUEE */}
      <div style={{ 
        borderTop: '4px solid #000000', 
        borderBottom: '4px solid #000000', 
        backgroundColor: '#FBBF24',
        padding: '2rem 0',
        overflow: 'hidden'
      }}>
        <div style={{ 
          maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem', padding: '0 2rem'
        }}>
          {[
            { label: 'Paperwork Eliminated', value: '100%' },
            { label: 'Active Students', value: '30+' },
            { label: 'Avg. Resolution Time', value: '< 24 Hrs' },
            { label: 'Complaints Resolved', value: '50+' } // 🟢 FIXED: Replaced fake 10k approvals
          ].map((stat, idx) => (
            <div key={idx} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: '900', color: '#000000', fontFamily: 'monospace' }}>{stat.value}</div>
              <div style={{ fontSize: '1rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. WHY CHOOSE HLE */}
      <div style={{ padding: '80px 2rem', backgroundColor: '#F3F4F6' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '3rem', letterSpacing: '-1px' }}>Why HLE?</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            <div style={{ backgroundColor: '#10B981', padding: '3rem', border: '4px solid #000', boxShadow: '8px 8px 0 #000' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
              <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Instant Complaints</h3>
              <p style={{ fontSize: '1.1rem', fontWeight: '500', fontFamily: 'monospace', lineHeight: '1.5' }}>Skip the warden's office. Log maintenance issues, electrical faults, or plumbing requests directly from your phone.</p>
            </div>

            <div style={{ backgroundColor: '#A78BFA', padding: '3rem', border: '4px solid #000', boxShadow: '8px 8px 0 #000' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍕</div>
              <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Food Hub & Analytics</h3>
              <p style={{ fontSize: '1.1rem', fontWeight: '500', fontFamily: 'monospace', lineHeight: '1.5' }}>Know what's cooking before you reach the mess. Rate meals daily and view hostel-wide food preference analytics.</p>
            </div>

            <div style={{ backgroundColor: '#FBCFE8', padding: '3rem', border: '4px solid #000', boxShadow: '8px 8px 0 #000' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💳</div>
              <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Clear Billing</h3>
              <p style={{ fontSize: '1.1rem', fontWeight: '500', fontFamily: 'monospace', lineHeight: '1.5' }}>No more register books. Track your monthly dues, view detailed payment history, and generate PDF clearance reports.</p>
            </div>

          </div>
        </div>
      </div>

      {/* 4. HOW IT WORKS */}
      <div style={{ padding: '80px 2rem', backgroundColor: '#FFFFFF', borderTop: '4px solid #000' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '4rem', letterSpacing: '-1px' }}>How it works.</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', position: 'relative' }}>
            
            <div style={{ textAlign: 'left', padding: '2rem', border: '3px solid #000' }}>
              <div style={{ fontSize: '2rem', fontWeight: '900', color: '#2563EB', fontFamily: 'monospace', marginBottom: '1rem' }}>01.</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Login securely</h3>
              <p style={{ fontFamily: 'monospace', color: '#4B5563' }}>Access your personalized dashboard based on your role (Student, Warden, or Admin).</p>
            </div>

            <div style={{ textAlign: 'left', padding: '2rem', border: '3px solid #000' }}>
              <div style={{ fontSize: '2rem', fontWeight: '900', color: '#DC2626', fontFamily: 'monospace', marginBottom: '1rem' }}>02.</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Take Action</h3>
              <p style={{ fontFamily: 'monospace', color: '#4B5563' }}>Raise a ticket, vote on the food menu, or check hostel-wide broadcast notices.</p>
            </div>

            <div style={{ textAlign: 'left', padding: '2rem', border: '3px solid #000', backgroundColor: '#000', color: '#FFF' }}>
              <div style={{ fontSize: '2rem', fontWeight: '900', color: '#FBBF24', fontFamily: 'monospace', marginBottom: '1rem' }}>03.</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Get Resolved</h3>
              <p style={{ fontFamily: 'monospace', color: '#D1D5DB' }}>Caretakers fix the issue and update the status. You get real-time tracking.</p>
            </div>

          </div>
        </div>
      </div>

      {/* 5. QUICK LINKS (Platform Modules) */}
      <div style={{ backgroundColor: '#E5E7EB', padding: '80px 2rem', borderTop: '4px solid #000000' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '2rem', textTransform: 'uppercase' }}>
            Platform Modules
          </h2>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            {quickLinks.map((item) => (
              <Link key={item.title} to={item.link === '/public-dashboard' ? '/public-dashboard' : '/login'} style={{ textDecoration: 'none' }}>
                <div style={{
                  backgroundColor: 'white',
                  border: '3px solid #000000',
                  padding: '2rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  height: '100%',
                  boxSizing: 'border-box'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FBBF24';
                  e.currentTarget.style.transform = 'translate(-4px, -4px)';
                  e.currentTarget.style.boxShadow = '8px 8px 0 #000000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                    <div style={{ fontSize: '2.5rem' }}>{item.icon}</div>
                    <div>
                      <h3 style={{ 
                        fontSize: '1.5rem', fontWeight: '900', marginBottom: '0.5rem', color: '#000000', display: 'flex', alignItems: 'center', gap: '0.5rem',
                      }}>
                        {item.title} <span style={{ fontSize: '1.2rem' }}>↗</span>
                      </h3>
                      <p style={{ color: '#111827', fontSize: '0.9rem', fontFamily: 'monospace', fontWeight: '500' }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 6. BIG CALL TO ACTION BEFORE FOOTER */}
      {!user && (
        <div style={{ backgroundColor: '#2563EB', padding: '80px 2rem', textAlign: 'center', borderTop: '4px solid #000' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: '900', color: 'white', marginBottom: '2rem' }}>Ready to upgrade your hostel experience?</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <Link to="/register">
              <button style={{ padding: '1.2rem 3rem', fontSize: '1.2rem', fontWeight: 'bold', border: '3px solid #000', backgroundColor: '#FBBF24', cursor: 'pointer', boxShadow: '6px 6px 0 #000' }}>
                Create Account
              </button>
            </Link>
            <Link to="/login">
              <button style={{ padding: '1.2rem 3rem', fontSize: '1.2rem', fontWeight: 'bold', border: '3px solid #000', backgroundColor: '#FFF', cursor: 'pointer', boxShadow: '6px 6px 0 #000' }}>
                Login
              </button>
            </Link>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Homepage;