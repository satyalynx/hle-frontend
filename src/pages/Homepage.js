import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Homepage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // 🟢 SMOOTH SCROLL LOGIC (Replaces Search)
  const handleJump = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // ==========================================
  // MASSIVE DATA STRUCTURES (ADDS HEAVY LOC & DETAIL)
  // ==========================================

  const platformModules = [
    { 
      id: 'MOD-01', title: 'Command Center', subtitle: 'LIVE TELEMETRY MAP', icon: '🗺️', link: '/heatmap', 
      desc: 'Real-time heatmap tracking infrastructure faults, active caretaker assignments, and chronic issues across all 7 institutional hostels.', 
      secured: true, color: '#38BDF8' 
    },
    { 
      id: 'MOD-02', title: 'Master Ledger', subtitle: 'SECURE FINANCE DB', icon: '💳', link: '/bills', 
      desc: 'Centralized financial clearinghouse for vendor payouts and fee records. Features strict authorization limits for Admin personnel.', 
      secured: true, color: '#10B981' 
    },
    { 
      id: 'MOD-03', title: 'Expose Meter', subtitle: 'PUBLIC AUDIT SYSTEM', icon: '📊', link: '/food', 
      desc: 'Immutable, democratic rating system for the mess facility. Aggregates student feedback into a global, unalterable performance metric.', 
      secured: true, color: '#F59E0B' 
    },
    { 
      id: 'MOD-04', title: 'System Broadcasts', subtitle: 'OFFICIAL DIRECTIVES', icon: '📢', link: '/notices', 
      desc: 'High-priority digital alerts replacing legacy notice boards. Instantly pushes administrative protocols to all registered terminals.', 
      secured: true, color: '#A78BFA' 
    },
    { 
      id: 'MOD-05', title: 'Smart Tickets', subtitle: 'MAINTENANCE QUEUE', icon: '📋', link: '/complaints', 
      desc: 'Photo-verified maintenance tracking with automated formatting. Replaces paper registers with accountable digital workflows.', 
      secured: true, color: '#F472B6' 
    },
    { 
      id: 'MOD-06', title: 'Live Dashboard', subtitle: 'OPEN TRANSPARENCY', icon: '🌐', link: '/public-dashboard', 
      desc: 'Unrestricted open metrics and system status visible to all public stakeholders. Ensures complete institutional transparency.', 
      secured: false, color: '#FCD34D' 
    },
  ];

  const workflowSteps = [
    {
      step: '01', role: 'Student Resident', color: '#2563EB',
      action: 'Initiates Pipeline',
      details: [
        'Logs infrastructure faults with mandatory photo evidence.',
        'Submits daily mess audits via the Expose Meter.',
        'Tracks personal financial dues and fee receipts.'
      ]
    },
    {
      step: '02', role: 'Caretaker (Ops)', color: '#F59E0B',
      action: 'Executes Task',
      details: [
        'Receives real-time assigned tickets in operational queue.',
        'Performs physical maintenance on campus.',
        'Uploads "After" photos as proof of resolution for payouts.'
      ]
    },
    {
      step: '03', role: 'Hostel Warden', color: '#10B981',
      action: 'Provides Oversight',
      details: [
        'Audits caretaker submissions and verifies physical resolution.',
        'Broadcasts official system directives and emergency notices.',
        'Monitors the global Command Center for chronic faults.'
      ]
    },
    {
      step: '04', role: 'System Admin', color: '#DC2626',
      action: 'Root Access',
      details: [
        'Authorizes final financial settlements in the Master Ledger.',
        'Maintains absolute control over institutional user data.',
        'Oversees complete campus telemetry across all 7 hostels.'
      ]
    }
  ];

  const legacyFailures = [
    'Manual paper-based complaint registers prone to data loss.',
    'Zero visibility on maintenance staff operational queues.',
    'No photographic verification for completed infrastructure work.',
    'Mess feedback easily manipulated or ignored by administration.',
    'Disorganized, untrackable fine collections and pending dues.',
    'Delayed communication via physical notice boards.'
  ];

  const hleSolutions = [
    '100% Digital Telemetry & Automated Ticket Generation.',
    'Live Heatmap monitoring staff task queues in real-time.',
    'Mandatory Before/After photo evidence policies enforced.',
    'Immutable, public mess rating database for total transparency.',
    'Centralized Finance Ledger with strict Role-Based Access Control.',
    'Instant Digital Broadcasts to all registered user terminals.'
  ];

  const securityFeatures = [
    { title: 'JWT Cryptography', desc: 'Stateless, secure session management using JSON Web Tokens (HS256).' },
    { title: 'SMTP OTP Auth', desc: 'Multi-factor email verification via Brevo Engine for identity proofing.' },
    { title: 'Strict RBAC', desc: 'Hardcoded architectural segregation preventing cross-role data leaks.' },
    { title: 'Base64 Processing', desc: 'Direct image-to-string encoding for seamless media database storage.' }
  ];

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Navbar />
      
      {/* =========================================================
          1. HERO SECTION (NIIS BRANDING & JUMP TO)
          ========================================================= */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '6rem 2rem', borderBottom: '4px solid #000' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '4rem' }}>
          
          {/* Left Hero Content */}
          <div style={{ flex: '1', minWidth: '350px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', backgroundColor: '#000', color: '#FFF', padding: '0.5rem 1.2rem', border: '3px solid #000', fontWeight: '900', fontFamily: 'monospace', marginBottom: '2rem', letterSpacing: '1px', boxShadow: '4px 4px 0 #E5E7EB' }}>
              <span style={{ width: '10px', height: '10px', backgroundColor: '#10B981', borderRadius: '50%', animation: 'pulse 2s infinite' }}></span>
              NIIS INSTITUTE OF INFORMATION SCIENCE & MANAGEMENT
            </div>
            
            <h1 style={{ fontSize: '5.5rem', fontWeight: '900', margin: '0 0 1.5rem 0', lineHeight: '1.1', letterSpacing: '-2px', color: '#000', textTransform: 'uppercase' }}>
              Hostel<br/>Life Easy.
            </h1>
            
            <p style={{ fontSize: '1.25rem', color: '#374151', marginBottom: '3rem', lineHeight: '1.6', maxWidth: '650px', fontWeight: 'bold', fontFamily: 'monospace' }}>
              A proprietary, digital-first infrastructure management architecture built specifically to eliminate institutional bottlenecks, accelerate maintenance, and enforce strict public transparency.
            </p>

            {/* 🟢 NEW: System Index / Jump To (Replaces Search) */}
            <div style={{ backgroundColor: '#FFF', border: '4px solid #000', padding: '1.5rem', display: 'inline-block', boxShadow: '8px 8px 0 #E5E7EB' }}>
              <div style={{ fontWeight: '900', fontFamily: 'monospace', color: '#6B7280', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                // Quick System Index
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={(e) => handleJump(e, 'architecture')} style={{ padding: '0.6rem 1.2rem', backgroundColor: '#FEF2F2', color: '#DC2626', border: '2px solid #DC2626', fontWeight: '900', fontFamily: 'monospace', cursor: 'pointer', transition: 'transform 0.1s' }} onMouseDown={(e) => e.currentTarget.style.transform = 'translate(2px, 2px)'} onMouseUp={(e) => e.currentTarget.style.transform = 'translate(0, 0)'}>
                  [ ARCHITECTURE ]
                </button>
                <button onClick={(e) => handleJump(e, 'workflow')} style={{ padding: '0.6rem 1.2rem', backgroundColor: '#EFF6FF', color: '#2563EB', border: '2px solid #2563EB', fontWeight: '900', fontFamily: 'monospace', cursor: 'pointer', transition: 'transform 0.1s' }} onMouseDown={(e) => e.currentTarget.style.transform = 'translate(2px, 2px)'} onMouseUp={(e) => e.currentTarget.style.transform = 'translate(0, 0)'}>
                  [ WORKFLOW ]
                </button>
                <button onClick={(e) => handleJump(e, 'modules')} style={{ padding: '0.6rem 1.2rem', backgroundColor: '#ECFDF5', color: '#10B981', border: '2px solid #10B981', fontWeight: '900', fontFamily: 'monospace', cursor: 'pointer', transition: 'transform 0.1s' }} onMouseDown={(e) => e.currentTarget.style.transform = 'translate(2px, 2px)'} onMouseUp={(e) => e.currentTarget.style.transform = 'translate(0, 0)'}>
                  [ MODULES ]
                </button>
              </div>
            </div>
          </div>

          {/* Right Hero Logo/Branding Block */}
          <div style={{ flex: '0.8', display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', padding: '4rem 3rem', border: '4px solid #000000', backgroundColor: '#DBEAFE', boxShadow: '16px 16px 0 #000000', transform: 'rotate(2deg)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '120px', height: '120px', border: '4px solid #000000', backgroundColor: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: '900', color: 'white', marginBottom: '1rem', boxShadow: '6px 6px 0 #000000' }}>
                  HLE
                </div>
                <p style={{ fontWeight: '900', fontFamily: 'monospace', fontSize: '1rem', margin: 0, letterSpacing: '2px' }}>SYSTEM</p>
              </div>

              <div style={{ fontSize: '3rem', fontWeight: '900' }}>+</div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '120px', height: '120px', border: '4px solid #000000', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem', marginBottom: '1rem', boxShadow: '6px 6px 0 #000000' }}>
                  🏛️
                </div>
                <p style={{ fontWeight: '900', fontFamily: 'monospace', fontSize: '1rem', margin: 0, letterSpacing: '2px' }}>NIIS INST.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================
          2. ENTERPRISE SCALE MARQUEE (STATISTICS)
          ========================================================= */}
      <div style={{ borderBottom: '4px solid #000', backgroundColor: '#000', padding: '4rem 0', color: '#FFF' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', padding: '0 2rem' }}>
          {[
            { label: 'ACTIVE HOSTELS', value: '07' },
            { label: 'TOTAL ROOM CAPACITY', value: '280' },
            { label: 'REGISTERED USERS', value: '840+' },
            { label: 'SYSTEM RESOLUTION', value: '<24H' }
          ].map((stat, idx) => (
            <div key={idx} style={{ textAlign: 'center', borderRight: idx !== 3 ? '2px solid #374151' : 'none' }}>
              <div style={{ fontSize: '4.5rem', fontWeight: '900', fontFamily: 'system-ui', lineHeight: '1', color: '#FBBF24', marginBottom: '1rem' }}>{stat.value}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '900', fontFamily: 'monospace', letterSpacing: '2px', color: '#D1D5DB' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================
          3. THE PARADIGM SHIFT (WHY HLE?)
          ========================================================= */}
      <div id="architecture" style={{ padding: '8rem 2rem', backgroundColor: '#FFF', borderBottom: '4px solid #000' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          <div style={{ marginBottom: '5rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '4rem', fontWeight: '900', margin: '0 0 1rem 0', textTransform: 'uppercase', letterSpacing: '-2px' }}>The Paradigm Shift</h2>
            <div style={{ display: 'inline-block', backgroundColor: '#E5E7EB', color: '#000', padding: '0.5rem 1.5rem', fontWeight: '900', fontFamily: 'monospace', fontSize: '1.2rem', border: '3px solid #000' }}>
              OPERATIONAL BOTTLENECKS VS. HLE DIGITAL ARCHITECTURE
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem' }}>
            
            {/* Legacy Box */}
            <div style={{ padding: '3rem', border: '4px solid #DC2626', backgroundColor: '#FEF2F2', boxShadow: '12px 12px 0 #FCA5A5', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-20px', left: '30px', backgroundColor: '#DC2626', color: '#FFF', padding: '0.4rem 1.5rem', fontWeight: '900', fontFamily: 'monospace', fontSize: '1.1rem', border: '3px solid #000', textTransform: 'uppercase' }}>
                Legacy System [ Failures ]
              </div>
              <ul style={{ listStyleType: 'none', padding: 0, margin: '2rem 0 0 0', fontFamily: 'monospace', fontSize: '1.15rem', fontWeight: 'bold', color: '#991B1B', lineHeight: '2.2' }}>
                {legacyFailures.map((item, i) => (
                  <li key={i} style={{ marginBottom: '1rem', borderBottom: '2px dashed #FCA5A5', paddingBottom: '1rem' }}>❌ {item}</li>
                ))}
              </ul>
            </div>

            {/* HLE Box */}
            <div style={{ padding: '3rem', border: '4px solid #10B981', backgroundColor: '#ECFDF5', boxShadow: '12px 12px 0 #6EE7B7', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-20px', left: '30px', backgroundColor: '#10B981', color: '#FFF', padding: '0.4rem 1.5rem', fontWeight: '900', fontFamily: 'monospace', fontSize: '1.1rem', border: '3px solid #000', textTransform: 'uppercase' }}>
                HLE Architecture [ Solutions ]
              </div>
              <ul style={{ listStyleType: 'none', padding: 0, margin: '2rem 0 0 0', fontFamily: 'monospace', fontSize: '1.15rem', fontWeight: 'bold', color: '#065F46', lineHeight: '2.2' }}>
                {hleSolutions.map((item, i) => (
                  <li key={i} style={{ marginBottom: '1rem', borderBottom: '2px dashed #6EE7B7', paddingBottom: '1rem' }}>✅ {item}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* =========================================================
          4. ROLE-BASED EXECUTION PIPELINE (HOW IT WORKS)
          ========================================================= */}
      <div id="workflow" style={{ padding: '8rem 2rem', backgroundColor: '#F3F4F6', borderBottom: '4px solid #000' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          <h2 style={{ fontSize: '4rem', fontWeight: '900', marginBottom: '5rem', textTransform: 'uppercase', letterSpacing: '-2px', textAlign: 'center' }}>
            Role-Based Execution Pipeline
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            {workflowSteps.map((step, index) => (
              <div key={index} style={{ backgroundColor: '#FFF', padding: '3rem', border: '4px solid #000', borderTop: `12px solid ${step.color}`, boxShadow: '12px 12px 0 #E5E7EB', position: 'relative' }}>
                
                <div style={{ fontSize: '5rem', fontWeight: '900', color: '#F3F4F6', position: 'absolute', top: '10px', right: '20px', lineHeight: '1', zIndex: '0' }}>
                  {step.step}
                </div>
                
                <div style={{ position: 'relative', zIndex: '1' }}>
                  <h3 style={{ fontSize: '2rem', fontWeight: '900', textTransform: 'uppercase', marginBottom: '0.5rem', color: '#000' }}>
                    {step.role}
                  </h3>
                  <div style={{ display: 'inline-block', backgroundColor: step.color, color: '#FFF', padding: '0.3rem 0.8rem', fontFamily: 'monospace', fontWeight: '900', fontSize: '0.9rem', marginBottom: '2rem', border: '2px solid #000' }}>
                    {step.action.toUpperCase()}
                  </div>
                  
                  <ul style={{ listStyleType: 'none', padding: 0, margin: 0, fontFamily: 'monospace', fontWeight: 'bold', color: '#4B5563', lineHeight: '1.8', fontSize: '1rem' }}>
                    {step.details.map((detail, idx) => (
                      <li key={idx} style={{ display: 'flex', gap: '0.8rem', marginBottom: '1rem' }}>
                        <span style={{ color: step.color }}>&gt;</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* =========================================================
          5. PLATFORM MODULES (SECURED GRID)
          ========================================================= */}
      <div id="modules" style={{ backgroundColor: '#FFF', padding: '8rem 2rem', borderBottom: '4px solid #000' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          <div style={{ marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '4rem', fontWeight: '900', margin: '0 0 1rem 0', textTransform: 'uppercase', letterSpacing: '-2px' }}>
              System Modules
            </h2>
            <p style={{ fontFamily: 'monospace', fontSize: '1.2rem', color: '#4B5563', fontWeight: 'bold' }}>
              SELECT A MODULE BELOW TO INITIATE SEQUENCE
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
            {platformModules.map((item, index) => (
              <div 
                key={index}
                onClick={() => navigate(item.secured && !user ? '/login' : item.link)}
                style={{
                  backgroundColor: '#F9FAFB',
                  border: '4px solid #000',
                  padding: '3rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000';
                  e.currentTarget.style.color = '#FFF';
                  e.currentTarget.style.transform = 'translate(-6px, -6px)';
                  e.currentTarget.style.boxShadow = `12px 12px 0 ${item.color}`;
                  e.currentTarget.querySelector('.sub').style.color = item.color;
                  e.currentTarget.querySelector('.desc').style.color = '#D1D5DB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#F9FAFB';
                  e.currentTarget.style.color = '#000';
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.querySelector('.sub').style.color = '#6B7280';
                  e.currentTarget.querySelector('.desc').style.color = '#111827';
                }}
              >
                {/* Security Clearance Badge */}
                <div style={{ position: 'absolute', top: '20px', right: '20px', backgroundColor: item.secured ? '#FEF2F2' : '#ECFDF5', color: item.secured ? '#DC2626' : '#10B981', padding: '0.4rem 0.8rem', border: '3px solid #000', fontSize: '0.85rem', fontWeight: '900', fontFamily: 'monospace' }}>
                  {item.secured ? '🔒 REQUIRES CLEARANCE' : '🔓 PUBLIC ACCESS'}
                </div>

                <div style={{ fontSize: '4.5rem', marginBottom: '2rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '2.2rem', fontWeight: '900', margin: '0 0 0.5rem 0', textTransform: 'uppercase', letterSpacing: '-1px' }}>
                  {item.title}
                </h3>
                <div className="sub" style={{ fontSize: '1rem', fontFamily: 'monospace', fontWeight: '900', color: '#6B7280', marginBottom: '2rem', transition: 'color 0.2s', letterSpacing: '1px' }}>
                  // {item.subtitle}
                </div>
                <p className="desc" style={{ fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 'bold', color: '#111827', margin: 0, lineHeight: '1.6', transition: 'color 0.2s' }}>
                  {item.desc}
                </p>
                <div style={{ marginTop: '2rem', fontFamily: 'monospace', fontWeight: '900', fontSize: '1rem', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  ACCESS MODULE <span style={{ fontSize: '1.5rem' }}>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================
          6. NEW: CORE INFRASTRUCTURE & COMPLIANCE (ADDS BULK)
          ========================================================= */}
      <div style={{ padding: '8rem 2rem', backgroundColor: '#000', color: '#FFF', borderBottom: '4px solid #000' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: '4rem' }}>
            <div>
              <h2 style={{ fontSize: '3.5rem', fontWeight: '900', margin: '0 0 1rem 0', textTransform: 'uppercase', letterSpacing: '-1px' }}>Security & Infra</h2>
              <p style={{ fontFamily: 'monospace', fontSize: '1.2rem', color: '#9CA3AF', fontWeight: 'bold', margin: 0 }}>TECHNICAL SPECIFICATIONS FOR ENTERPRISE DEPLOYMENT</p>
            </div>
            <div style={{ backgroundColor: '#111827', padding: '1rem 2rem', border: '3px solid #374151', fontFamily: 'monospace', fontWeight: '900', color: '#10B981' }}>
              SYSTEM STATUS: HEALTHY & SECURE
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {securityFeatures.map((feat, index) => (
              <div key={index} style={{ border: '3px solid #374151', padding: '2rem', backgroundColor: '#111827' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '900', fontFamily: 'monospace', color: '#38BDF8', marginBottom: '1rem', textTransform: 'uppercase' }}>
                  {feat.title}
                </h3>
                <p style={{ fontFamily: 'system-ui', fontSize: '1.05rem', color: '#D1D5DB', lineHeight: '1.7', margin: 0, fontWeight: '500' }}>
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================
          7. BIG CALL TO ACTION (CTA)
          ========================================================= */}
      {!user && (
        <div style={{ backgroundColor: '#2563EB', padding: '8rem 2rem', textAlign: 'center', backgroundImage: 'radial-gradient(#1E40AF 3px, transparent 3px)', backgroundSize: '40px 40px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', backgroundColor: '#FFF', padding: '5rem 3rem', border: '6px solid #000', boxShadow: '20px 20px 0 #000' }}>
            
            <h2 style={{ fontSize: '4rem', fontWeight: '900', color: '#000', margin: '0 0 1.5rem 0', textTransform: 'uppercase', letterSpacing: '-2px', lineHeight: '1' }}>
              Initiate System Access
            </h2>
            
            <p style={{ fontFamily: 'monospace', fontSize: '1.25rem', fontWeight: 'bold', color: '#4B5563', marginBottom: '4rem' }}>
              SELECT YOUR ASSIGNED CLEARANCE LEVEL TO BEGIN OPERATIONS IN THE NIIS NETWORK.
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <button style={{ padding: '1.5rem 3.5rem', fontSize: '1.3rem', fontWeight: '900', fontFamily: 'monospace', border: '5px solid #000', backgroundColor: '#000', color: '#FFF', cursor: 'pointer', boxShadow: '8px 8px 0 #FBBF24', textTransform: 'uppercase', transition: 'transform 0.1s' }} onMouseDown={(e) => e.currentTarget.style.transform = 'translate(4px,4px)'} onMouseUp={(e) => e.currentTarget.style.transform = 'translate(0,0)'}>
                  REQUEST CLEARANCE
                </button>
              </Link>
              
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <button style={{ padding: '1.5rem 3.5rem', fontSize: '1.3rem', fontWeight: '900', fontFamily: 'monospace', border: '5px solid #000', backgroundColor: '#FFF', color: '#000', cursor: 'pointer', boxShadow: '8px 8px 0 #E5E7EB', textTransform: 'uppercase', transition: 'transform 0.1s' }} onMouseDown={(e) => e.currentTarget.style.transform = 'translate(4px,4px)'} onMouseUp={(e) => e.currentTarget.style.transform = 'translate(0,0)'}>
                  AUTHORIZED LOGIN
                </button>
              </Link>
            </div>

          </div>
        </div>
      )}

      <Footer />
      
      {/* Required for pulsing animation */}
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Homepage;