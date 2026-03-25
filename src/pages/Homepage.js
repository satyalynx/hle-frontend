import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Homepage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // 🟢 1. Jump to sections - Search bar replace
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  // 🟢 2. ALL Platform Modules (12+ modules)
  const allModules = [
    { title: 'Smart Complaints', icon: '📋', link: '/complaints', desc: 'Raise, track, and resolve maintenance issues instantly.' },
    { title: 'Food Hub', icon: '🍕', link: '/food', desc: 'Daily menu, meal ratings, food analytics dashboard.' },
    { title: 'Broadcast Notices', icon: '📢', link: '/notices', desc: 'Instant official announcements and updates.' },
    { title: 'Digital Bills', icon: '💳', link: '/bills', desc: 'Track dues, payment history, PDF clearance reports.' },
    { title: 'Live Public Dashboard', icon: '🌐', link: '/public-dashboard', desc: 'Open metrics and transparency for everyone.' },
    { title: 'Issue Heatmap', icon: '🗺️', link: '/heatmap', desc: 'Visualise maintenance hotspots across blocks.' },
    { title: 'Warden Dashboard', icon: '👮', link: '/warden-dashboard', desc: 'Complete oversight of all hostel operations.' },
    { title: 'Admin Control Panel', icon: '⚙️', link: '/admin', desc: 'Full system configuration and user management.' },
    { title: 'Visitor Management', icon: '🚪', link: '/visitors', desc: 'Digital visitor logs and approval workflow.' },
    { title: 'Room Allocation', icon: '🏠', link: '/rooms', desc: 'Automated room assignment and vacancy tracking.' },
    { title: 'Attendance Tracker', icon: '📊', link: '/attendance', desc: 'Digital roll calls and absentee reports.' },
    { title: 'Inventory Management', icon: '📦', link: '/inventory', desc: 'Track hostel assets and maintenance supplies.' },
    { title: 'Feedback System', icon: '⭐', link: '/feedback', desc: 'Collect and analyze student satisfaction data.' },
    { title: 'Event Calendar', icon: '📅', link: '/events', desc: 'Hostel events, holidays, and important dates.' },
  ];

  // 🟢 3. Enterprise-level Why HLE? (Detailed)
  const enterpriseFeatures = [
    {
      icon: '🔒', title: 'Role-Based Access Control', 
      desc: 'Granular permissions for Students, Wardens, Admins, and Super Admins with audit trails.'
    },
    {
      icon: '⚡', title: 'Real-time Notifications', 
      desc: 'Push notifications, SMS alerts, and in-app messaging for instant communication.'
    },
    {
      icon: '📊', title: 'Advanced Analytics', 
      desc: '50+ KPI dashboards, predictive maintenance, and operational efficiency metrics.'
    },
    {
      icon: '🔄', title: 'Multi-block Support', 
      desc: 'Scale across 100+ blocks with centralized control and decentralized operations.'
    },
    {
      icon: '🛡️', title: 'Enterprise Security', 
      desc: 'End-to-end encryption, 2FA, GDPR compliance, and SOC 2 Type II ready.'
    },
    {
      icon: '🌐', title: 'Multi-campus Ready', 
      desc: 'Single platform for multiple hostels/campuses with unified reporting.'
    }
  ];

  // 🟢 4. Detailed How It Works (6 Steps)
  const howItWorksSteps = [
    { num: '01', title: 'Onboard Users', desc: 'Bulk import students/wardens or self-register with college ID verification.', color: '#2563EB' },
    { num: '02', title: 'Role Assignment', desc: 'Auto-assign roles based on hostel/block and verify via OTP.', color: '#3B82F6' },
    { num: '03', title: 'Daily Operations', desc: 'Complaints → Food voting → Bill payments → Notice broadcasts.', color: '#1D4ED8' },
    { num: '04', title: 'Escalation Engine', desc: 'Auto-escalate unresolved issues with SLA tracking and warden alerts.', color: '#DC2626' },
    { num: '05', title: 'Analytics & Reports', desc: 'Real-time dashboards update every 5 mins with drill-down capabilities.', color: '#F59E0B' },
    { num: '06', title: 'Continuous Improvement', desc: 'AI-driven insights suggest preventive maintenance and optimize operations.', color: '#000000' }
  ];

  // Auth check wrapper
  const handleModuleClick = (link) => {
    if (user) {
      navigate(link);
    } else {
      navigate('/login');
    }
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <Navbar />
      
      {/* 1. HERO SECTION - Search → Jump To */}
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '100px 2rem 80px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '60px',
        alignItems: 'center',
      }}>
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
            NIIS Institute of Information Science and Management
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
            Hostel-Life<br/>Easy (HLE)
          </h1>
          
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#374151',
            marginBottom: '2.5rem',
            lineHeight: '1.6',
            maxWidth: '500px',
            fontWeight: '500'
          }}>
            Enterprise-grade hostel management system eliminating paperwork, 
            automating workflows, and providing real-time operational insights.
          </p>

          {/* 🟢 Jump To Section */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Why HLE?', id: 'why-hle', color: '#10B981' },
              { label: 'How it Works', id: 'how-works', color: '#3B82F6' },
              { label: 'Modules', id: 'modules', color: '#F59E0B' },
              { label: 'Features', id: 'features', color: '#8B5CF6' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                style={{
                  padding: '1rem 1.5rem',
                  backgroundColor: item.color,
                  color: 'white',
                  border: '3px solid #000000',
                  boxShadow: '4px 4px 0 #000000',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.95rem',
                  fontFamily: 'monospace',
                  transition: 'all 0.1s'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

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
              width: '140px', height: '140px',
              border: '3px solid #000000',
              backgroundColor: '#2563EB',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '3rem', fontWeight: 'bold', color: 'white',
              marginBottom: '1rem',
              boxShadow: '4px 4px 0 #000000'
            }}>
              HLE
            </div>
            <p style={{ fontWeight: 'bold', fontFamily: 'monospace', fontSize: '1rem' }}>
              NIIS Institute<br/>Hostel System
            </p>
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
            { label: 'Active Students', value: '500+' },
            { label: 'Avg Resolution', value: '< 18 Hrs' },
            { label: 'Modules Live', value: '15+' },
            { label: 'Blocks Covered', value: '6+' }
          ].map((stat, idx) => (
            <div key={idx} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: '900', color: '#000000', fontFamily: 'monospace' }}>{stat.value}</div>
              <div style={{ fontSize: '1rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 🟢 3. WHY HLE? - Enterprise Level (id="why-hle") */}
      <div id="why-hle" style={{ padding: '120px 2rem 80px', backgroundColor: '#F3F4F6' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '4rem', fontWeight: '900', marginBottom: '4rem', letterSpacing: '-1px', textAlign: 'center' }}>
            Why Choose HLE? Enterprise Architecture
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            {enterpriseFeatures.map((feature, idx) => (
              <div key={idx} style={{ 
                backgroundColor: 'white', 
                padding: '3rem 2.5rem', 
                border: '4px solid #000', 
                boxShadow: '8px 8px 0 #000',
                height: '100%'
              }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1rem', color: '#000' }}>{feature.title}</h3>
                <p style={{ fontSize: '1.1rem', fontWeight: '500', fontFamily: 'monospace', lineHeight: '1.6', color: '#374151' }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🟢 4. HOW IT WORKS - Detailed 6 Steps (id="how-works") */}
      <div id="how-works" style={{ padding: '120px 2rem', backgroundColor: '#FFFFFF', borderTop: '4px solid #000' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '4rem', fontWeight: '900', marginBottom: '5rem', letterSpacing: '-1px' }}>
            Complete Workflow
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {howItWorksSteps.map((step, idx) => (
              <div key={idx} style={{ 
                textAlign: 'left', 
                padding: '3rem 2rem', 
                border: `4px solid ${step.color}`,
                backgroundColor: idx % 2 ? '#F8FAFC' : 'white',
                position: 'relative'
              }}>
                <div style={{ 
                  position: 'absolute', 
                  top: '-20px', left: '2rem',
                  backgroundColor: step.color, 
                  color: 'white',
                  padding: '0.5rem 1.5rem',
                  fontSize: '1.5rem',
                  fontWeight: '900',
                  fontFamily: 'monospace'
                }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '1rem', color: '#000' }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: 'monospace', color: '#4B5563', fontSize: '1rem', lineHeight: '1.6' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🟢 5. ALL PLATFORM MODULES (id="modules") */}
      <div id="modules" style={{ backgroundColor: '#E5E7EB', padding: '120px 2rem', borderTop: '4px solid #000000' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '3rem', 
            fontWeight: '900', 
            marginBottom: '3rem', 
            textAlign: 'center',
            textTransform: 'uppercase',
            backgroundColor: '#FBBF24',
            display: 'inline-block',
            padding: '1rem 3rem',
            border: '4px solid #000'
          }}>
            Complete Platform Modules (15+)
          </h2>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}>
            {allModules.map((item, idx) => (
              <div
                key={item.title}
                onClick={() => handleModuleClick(item.link)}
                style={{
                  backgroundColor: 'white',
                  border: '3px solid #000000',
                  padding: '2.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  height: '100%',
                  boxSizing: 'border-box',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FBBF24';
                  e.currentTarget.style.transform = 'translate(-6px, -6px)';
                  e.currentTarget.style.boxShadow = '12px 12px 0 #000000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {!user && (
                  <div style={{
                    position: 'absolute',
                    top: '1rem', right: '1rem',
                    backgroundColor: '#EF4444',
                    color: 'white',
                    padding: '0.3rem 0.8rem',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    borderRadius: '4px',
                    fontFamily: 'monospace'
                  }}>
                    LOGIN REQUIRED
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'start', gap: '1.5rem' }}>
                  <div style={{ fontSize: '3rem', minWidth: '60px' }}>{item.icon}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      fontSize: '1.6rem', 
                      fontWeight: '900', 
                      marginBottom: '0.8rem', 
                      color: '#000000',
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem'
                    }}>
                      {item.title} <span style={{ fontSize: '1.3rem' }}>→</span>
                    </h3>
                    <p style={{ color: '#111827', fontSize: '1rem', fontFamily: 'monospace', fontWeight: '500', lineHeight: '1.5' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🟢 6. BIG CTA */}
      {!user && (
        <div style={{ backgroundColor: '#2563EB', padding: '100px 2rem', textAlign: 'center', borderTop: '4px solid #000' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '3.5rem', fontWeight: '900', color: 'white', marginBottom: '2.5rem' }}>
              Ready to transform your hostel operations?
            </h2>
            <p style={{ fontSize: '1.3rem', color: '#DBEAFE', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
              Join 500+ students already using HLE for seamless hostel management
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              <Link to="/register">
                <button style={{ 
                  padding: '1.4rem 3.5rem', 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold', 
                  border: '4px solid #000', 
                  backgroundColor: '#FBBF24', 
                  cursor: 'pointer', 
                  boxShadow: '8px 8px 0 #000',
                  fontFamily: 'monospace',
                  textTransform: 'uppercase'
                }}>
                  🚀 Get Started
                </button>
              </Link>
              <Link to="/login">
                <button style={{ 
                  padding: '1.4rem 3.5rem', 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold', 
                  border: '4px solid #000', 
                  backgroundColor: '#FFF', 
                  cursor: 'pointer', 
                  boxShadow: '8px 8px 0 #000',
                  fontFamily: 'monospace',
                  textTransform: 'uppercase'
                }}>
                  🔑 Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 🟢 FOOTER - Added back */}
      <Footer />
    </div>
  );
};

export default Homepage;