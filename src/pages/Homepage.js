import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Homepage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sysTime, setSysTime] = useState('');
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSysTime(new Date().toISOString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleJump = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  // ==========================================
  // 1. MASSIVE DATA STRUCTURES (INFO OVERLOAD)
  // ==========================================

  const platformModules = [
    { 
      id: 'MOD-01', title: 'Command Center', subtitle: 'LIVE TELEMETRY & HEATMAP', icon: '🗺️', link: '/heatmap', 
      desc: 'Real-time infrastructure monitoring system utilizing asynchronous data streams to visualize fault densities across all physical blocks.', 
      capabilities: ['Dynamic Heat Grid', 'Chronic Fault Detection', 'Live Queue Tracking', 'SLA Breach Alerts'],
      secured: true 
    },
    { 
      id: 'MOD-02', title: 'Master Ledger', subtitle: 'FINANCIAL SETTLEMENT DB', icon: '💳', link: '/bills', 
      desc: 'Centralized, immutable financial clearinghouse processing vendor payouts, institutional fee collections, and maintenance budgets.', 
      capabilities: ['Role-Restricted Settlements', 'Transaction Auditing', 'Automated Dues Calculation', 'Ledger Export'],
      secured: true 
    },
    { 
      id: 'MOD-03', title: 'Expose Meter', subtitle: 'DEMOCRATIC PUBLIC AUDIT', icon: '📊', link: '/food', 
      desc: 'An unalterable, student-driven rating architecture for the mess facility. Aggregates daily feedback into a global performance index.', 
      capabilities: ['Daily Menu Verification', 'Sentiment Trend Analysis', 'Immutable Rating Logs', 'Read-Only Admin Access'],
      secured: true 
    },
    { 
      id: 'MOD-04', title: 'System Broadcasts', subtitle: 'DIRECTIVE TRANSMISSION', icon: '📢', link: '/notices', 
      desc: 'High-priority digital alert network replacing legacy physical notice boards. Ensures immediate delivery of administrative protocols.', 
      capabilities: ['Severity-Based Categorization', 'Timestamped Broadcasts', 'Targeted Pings', 'Mandatory Read Logs'],
      secured: true 
    },
    { 
      id: 'MOD-05', title: 'Smart Tickets', subtitle: 'MAINTENANCE QUEUE ROUTING', icon: '📋', link: '/complaints', 
      desc: 'Photo-verified maintenance tracking pipeline with automated formatting. Eliminates paper registers through accountable digital workflows.', 
      capabilities: ['Mandatory Image Uploads', 'Smart Room Formatting', 'Real-time Status Mutations', 'Caretaker Assignment'],
      secured: true 
    },
    { 
      id: 'MOD-06', title: 'Live Dashboard', subtitle: 'PUBLIC OPEN METRICS', icon: '🌐', link: '/public-dashboard', 
      desc: 'Unrestricted open metrics interface displaying real-time system health, active tickets, and global broadcast logs to all stakeholders.', 
      capabilities: ['No-Auth Public Access', 'Resolution Counters', 'Staff On-Duty Roster', 'Active Meal Plan Display'],
      secured: false 
    },
  ];

  const workflowSteps = [
    {
      step: '01', role: 'Student Resident',
      action: 'Initiates Pipeline',
      metrics: 'Permission Level: Standard | Access: Read/Write (Self)',
      details: [
        'Executes terminal access via secure password authentication.',
        'Logs infrastructure faults with mandatory photo evidence.',
        'Submits daily mess audits ensuring immutable performance tracking.',
        'Monitors personal financial dues against the Master Ledger.'
      ]
    },
    {
      step: '02', role: 'Caretaker (Ops)',
      action: 'Executes Physical Maintenance',
      metrics: 'Permission Level: Elevated | Access: Read/Write (Assigned)',
      details: [
        'Receives real-time assigned tickets in operational queue interface.',
        'Performs physical maintenance on campus adhering to SLA.',
        'Uploads "After" photos as cryptographic proof of resolution.',
        'Submits resolved tickets to trigger financial payout requests.'
      ]
    },
    {
      step: '03', role: 'Hostel Warden',
      action: 'Provides Tactical Oversight',
      metrics: 'Permission Level: Supervisory | Access: Read (All) / Write (Broadcast)',
      details: [
        'Audits caretaker submissions and cross-verifies physical resolution.',
        'Transmits official system directives and emergency digital notices.',
        'Monitors the global Command Center heatmap for chronic infrastructure faults.',
        'Oversees disciplinary actions and vendor operations.'
      ]
    },
    {
      step: '04', role: 'System Admin',
      action: 'Root Access Operations',
      metrics: 'Permission Level: Absolute | Access: Read/Write (Global)',
      details: [
        'Authorizes final financial settlements and vendor payouts in the Ledger.',
        'Maintains absolute control over institutional user data and RBAC assignments.',
        'Oversees complete campus telemetry across all functional hostels.',
        'Executes database migrations and system-wide emergency protocols.'
      ]
    }
  ];

  const systemArchitecture = [
    {
      domain: 'Core Framework & Routing',
      specs: [
        'Client: React.js (Component-Driven Architecture)',
        'Routing: React Router v6 DOM handling',
        'Server: FastAPI asynchronous ASGI framework',
        'State: Context API with Local Storage Persistence'
      ]
    },
    {
      domain: 'Database & ORM',
      specs: [
        'Engine: SQLite / PostgreSQL Relational DB',
        'ORM: SQLAlchemy Object Relational Mapper',
        'Schema: 10 Normalized Tables (3NF Strict)',
        'Storage: Base64 String Encoding for Media'
      ]
    },
    {
      domain: 'Security Protocols',
      specs: [
        'Tokens: JSON Web Tokens (JWT) HS256',
        'Hashing: bcrypt adaptive password hashing',
        'Identity: Email OTP Verification (Brevo SMTP)',
        'Access: Hierarchical Role-Based Access Control'
      ]
    }
  ];

  const faqs = [
    {
      q: "How does the Command Center Heatmap function?",
      a: "The Command Center aggregates real-time complaint data across all 7 hostels. It uses an algorithm to detect 'chronic' rooms (3+ active issues) and highlights them in critical red, allowing wardens to deploy caretakers dynamically rather than relying on manual inspection."
    },
    {
      q: "Can the administration manipulate the Expose Meter (Mess Ratings)?",
      a: "No. The Expose Meter operates on an immutable ledger principle. Once a student submits a daily mess rating, the data is pushed directly to the global calculation matrix. Administrators have strictly 'Read-Only' access to these specific database columns."
    },
    {
      q: "What happens when a caretaker resolves an issue?",
      a: "The caretaker must upload an 'After' photograph as cryptographic proof of work. This action mutates the ticket status to 'Review Pending'. The Warden then physically audits the work and clears it, which automatically generates a payout request in the Master Finance Ledger."
    },
    {
      q: "Are financial transactions processed directly on HLE?",
      a: "HLE acts as a Financial Clearinghouse and Master Ledger. It tracks all dues, vendor payouts, and fines. However, actual monetary transfers are handled via official institutional banking channels, which are then manually reconciled by the System Admin in HLE."
    }
  ];

  // ==========================================
  // 2. RENDER LOGIC & BRUTALIST UI
  // ==========================================

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', color: '#111827' }}>
      <Navbar />
      
      {/* --- TOP SERVER STATUS BAR --- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 2rem', backgroundColor: '#000', color: '#10B981', fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 'bold', borderBottom: '2px solid #374151', overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <span>STATUS: ALL SYSTEMS NOMINAL</span>
          <span>PING: 24ms</span>
          <span>ACTIVE DB: POSTGRES_PROD_01</span>
        </div>
        <div>SYS_TIME: {sysTime || 'SYNCING CLOCK...'}</div>
      </div>

      {/* --- HERO SECTION --- */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '6rem 2rem', borderBottom: '4px solid #000' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4rem' }}>
          
          <div style={{ flex: '1', minWidth: '400px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', backgroundColor: '#000', color: '#FFF', padding: '0.4rem 1.2rem', fontWeight: '900', fontFamily: 'monospace', marginBottom: '1.5rem', fontSize: '0.9rem', border: '2px solid #000', boxShadow: '4px 4px 0 #E5E7EB' }}>
              <span style={{ width: '8px', height: '8px', backgroundColor: '#10B981', borderRadius: '50%', animation: 'pulse 2s infinite' }}></span>
              NIIS INSTITUTE OF INFORMATION SCIENCE & MANAGEMENT
            </div>
            
            <h1 style={{ fontSize: '6.5rem', fontWeight: '900', margin: '0 0 1.5rem 0', lineHeight: '0.9', letterSpacing: '-3px', color: '#000', textTransform: 'uppercase' }}>
              Hostel<br/>Life<br/>Easy.
            </h1>
            
            <p style={{ fontSize: '1.15rem', color: '#374151', marginBottom: '2.5rem', lineHeight: '1.8', maxWidth: '650px', fontWeight: '600', fontFamily: 'monospace', borderLeft: '4px solid #000', paddingLeft: '1.5rem' }}>
              A proprietary, digital-first infrastructure management architecture designed exclusively for the NIIS Institute. Operating on an asynchronous backend, HLE eliminates institutional bottlenecks, accelerates infrastructure maintenance, and enforces strict public transparency through an immutable database ledger.
            </p>

            <div style={{ backgroundColor: '#F9FAFB', border: '4px solid #000', padding: '1.5rem', display: 'inline-block', boxShadow: '8px 8px 0 #E5E7EB' }}>
              <div style={{ fontWeight: '900', fontFamily: 'monospace', color: '#000', marginBottom: '1rem', textTransform: 'uppercase', borderBottom: '2px solid #000', paddingBottom: '0.5rem' }}>
                Quick System Index Navigation
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={(e) => handleJump(e, 'architecture')} style={{ padding: '0.6rem 1.2rem', backgroundColor: '#FFF', color: '#000', border: '2px solid #000', fontWeight: '900', fontFamily: 'monospace', cursor: 'pointer', transition: 'all 0.1s' }} onMouseDown={(e) => {e.currentTarget.style.backgroundColor = '#000'; e.currentTarget.style.color = '#FFF'}}>
                  [01] ARCHITECTURE
                </button>
                <button onClick={(e) => handleJump(e, 'workflow')} style={{ padding: '0.6rem 1.2rem', backgroundColor: '#FFF', color: '#000', border: '2px solid #000', fontWeight: '900', fontFamily: 'monospace', cursor: 'pointer', transition: 'all 0.1s' }} onMouseDown={(e) => {e.currentTarget.style.backgroundColor = '#000'; e.currentTarget.style.color = '#FFF'}}>
                  [02] WORKFLOWS
                </button>
                <button onClick={(e) => handleJump(e, 'modules')} style={{ padding: '0.6rem 1.2rem', backgroundColor: '#FFF', color: '#000', border: '2px solid #000', fontWeight: '900', fontFamily: 'monospace', cursor: 'pointer', transition: 'all 0.1s' }} onMouseDown={(e) => {e.currentTarget.style.backgroundColor = '#000'; e.currentTarget.style.color = '#FFF'}}>
                  [03] PLATFORM MODULES
                </button>
              </div>
            </div>
          </div>

          {/* Right Hero - Enterprise Scale Data */}
          <div style={{ flex: '0.8', display: 'flex', flexDirection: 'column', gap: '2rem', minWidth: '350px' }}>
            <div style={{ padding: '2.5rem', border: '4px solid #000', backgroundColor: '#F9FAFB', boxShadow: '12px 12px 0 #000' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '900', fontFamily: 'system-ui', margin: '0 0 1.5rem 0', textTransform: 'uppercase', borderBottom: '4px solid #000', paddingBottom: '0.5rem' }}>Network Capacity Limits</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', fontFamily: 'monospace' }}>
                <div>
                  <div style={{ fontSize: '0.9rem', color: '#6B7280', fontWeight: '900', textTransform: 'uppercase' }}>MAX USERS</div>
                  <div style={{ fontSize: '3rem', fontWeight: '900', color: '#000', lineHeight: '1' }}>840+</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', color: '#6B7280', fontWeight: '900', textTransform: 'uppercase' }}>TRACKED ROOMS</div>
                  <div style={{ fontSize: '3rem', fontWeight: '900', color: '#000', lineHeight: '1' }}>280</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', color: '#6B7280', fontWeight: '900', textTransform: 'uppercase' }}>ACTIVE HOSTELS</div>
                  <div style={{ fontSize: '3rem', fontWeight: '900', color: '#000', lineHeight: '1' }}>07</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', color: '#6B7280', fontWeight: '900', textTransform: 'uppercase' }}>RESOLUTION SLA</div>
                  <div style={{ fontSize: '3rem', fontWeight: '900', color: '#000', lineHeight: '1' }}>24H</div>
                </div>
              </div>
            </div>
            
            <div style={{ padding: '2rem', border: '4px solid #000', backgroundColor: '#000', color: '#FFF', fontFamily: 'monospace', boxShadow: '12px 12px 0 #E5E7EB' }}>
              <div style={{ fontSize: '1rem', fontWeight: '900', color: '#10B981', marginBottom: '1rem', borderBottom: '1px solid #374151', paddingBottom: '0.5rem' }}>// DEPLOYMENT_LOGS</div>
              <div style={{ fontSize: '0.95rem', lineHeight: '1.8', color: '#D1D5DB' }}>
                <span style={{ color: '#FBBF24' }}>&gt;</span> Initiating JWT Handshake... <br/>
                <span style={{ color: '#FBBF24' }}>&gt;</span> Mounting 7 Hostel Schemas... <br/>
                <span style={{ color: '#FBBF24' }}>&gt;</span> Base64 Image Processors Online. <br/>
                <span style={{ color: '#10B981' }}>&gt; SYSTEM FULLY OPERATIONAL.</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- THE PARADIGM SHIFT & ARCHITECTURE --- */}
      <div id="architecture" style={{ padding: '8rem 2rem', backgroundColor: '#F9FAFB', borderBottom: '4px solid #000' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          <div style={{ marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '4rem', fontWeight: '900', margin: '0 0 1rem 0', textTransform: 'uppercase', letterSpacing: '-2px' }}>The Paradigm Shift</h2>
            <div style={{ fontFamily: 'monospace', fontSize: '1.2rem', color: '#4B5563', fontWeight: 'bold', maxWidth: '900px', lineHeight: '1.6' }}>
              Traditional hostel management relies on fragmented, analog processes resulting in critical data loss, delayed maintenance, and lack of accountability. HLE enforces a strict digital-first policy, converting physical bottlenecks into measurable, actionable data points.
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem', marginBottom: '5rem' }}>
            {/* Legacy Box */}
            <div style={{ padding: '3rem', border: '4px solid #000', backgroundColor: '#FFF', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-18px', left: '30px', backgroundColor: '#000', color: '#FFF', padding: '0.4rem 1.5rem', fontWeight: '900', fontFamily: 'monospace', fontSize: '1rem', border: '2px solid #000' }}>
                LEGACY SYSTEM [ FAILURES ]
              </div>
              <ul style={{ listStyleType: 'none', padding: 0, margin: '2rem 0 0 0', fontFamily: 'monospace', fontSize: '1.05rem', fontWeight: '600', color: '#4B5563', lineHeight: '2.2' }}>
                {legacyFailures.map((item, i) => (
                  <li key={i} style={{ marginBottom: '1rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '1rem', display: 'flex', gap: '1rem' }}>
                    <span style={{ color: '#DC2626', fontWeight: '900' }}>[X]</span> <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* HLE Box */}
            <div style={{ padding: '3rem', border: '4px solid #000', backgroundColor: '#FFF', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-18px', left: '30px', backgroundColor: '#10B981', color: '#FFF', padding: '0.4rem 1.5rem', fontWeight: '900', fontFamily: 'monospace', fontSize: '1rem', border: '3px solid #000' }}>
                HLE ARCHITECTURE [ SOLUTIONS ]
              </div>
              <ul style={{ listStyleType: 'none', padding: 0, margin: '2rem 0 0 0', fontFamily: 'monospace', fontSize: '1.05rem', fontWeight: '600', color: '#111827', lineHeight: '2.2' }}>
                {hleSolutions.map((item, i) => (
                  <li key={i} style={{ marginBottom: '1rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '1rem', display: 'flex', gap: '1rem' }}>
                    <span style={{ color: '#10B981', fontWeight: '900' }}>[+]</span> <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Technical Specs Breakdown */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            {systemArchitecture.map((section, idx) => (
              <div key={idx} style={{ padding: '2rem', border: '3px solid #000', backgroundColor: '#000', color: '#FFF' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase', marginBottom: '1.5rem', paddingBottom: '0.8rem', borderBottom: '2px solid #374151', color: '#38BDF8' }}>
                  // {section.domain}
                </h3>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0, fontFamily: 'system-ui', fontSize: '0.95rem', fontWeight: '500', color: '#D1D5DB', lineHeight: '1.8' }}>
                  {section.specs.map((item, i) => (
                    <li key={i} style={{ marginBottom: '0.8rem', display: 'flex', gap: '0.8rem' }}>
                      <span style={{ color: '#FBBF24', fontWeight: '900' }}>&gt;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* --- EXECUTION PIPELINE --- */}
      <div id="workflow" style={{ padding: '8rem 2rem', backgroundColor: '#000', color: '#FFF', borderBottom: '4px solid #000' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          <div style={{ marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '4rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-2px', color: '#FFF', margin: '0 0 1rem 0' }}>
              Execution Pipeline
            </h2>
            <div style={{ fontFamily: 'monospace', fontSize: '1.2rem', color: '#9CA3AF', fontWeight: 'bold' }}>
              HIERARCHICAL ROLE-BASED ACCESS CONTROL (RBAC) WORKFLOWS
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {workflowSteps.map((step, index) => (
              <div key={index} style={{ backgroundColor: '#111827', padding: '3.5rem', border: '3px solid #374151', display: 'flex', gap: '4rem', alignItems: 'flex-start', flexWrap: 'wrap', position: 'relative', overflow: 'hidden' }}>
                
                {/* Big Background Number */}
                <div style={{ fontSize: '12rem', fontWeight: '900', color: '#1F2937', position: 'absolute', top: '-40px', right: '10px', lineHeight: '1', zIndex: '0', opacity: '0.5' }}>
                  {step.step}
                </div>
                
                <div style={{ minWidth: '300px', position: 'relative', zIndex: '1' }}>
                  <div style={{ fontSize: '1.1rem', fontFamily: 'monospace', fontWeight: '900', color: '#9CA3AF', marginBottom: '1rem', letterSpacing: '2px' }}>[ STAGE {step.step} ]</div>
                  <h3 style={{ fontSize: '2.5rem', fontWeight: '900', textTransform: 'uppercase', margin: '0 0 1rem 0', color: '#FFF', letterSpacing: '-1px' }}>
                    {step.role}
                  </h3>
                  <div style={{ display: 'inline-block', backgroundColor: '#FFF', color: '#000', padding: '0.4rem 1rem', fontFamily: 'monospace', fontWeight: '900', fontSize: '0.9rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                    {step.action}
                  </div>
                  <p style={{ fontFamily: 'monospace', fontSize: '0.95rem', color: '#10B981', fontWeight: 'bold', margin: 0 }}>
                    {step.metrics}
                  </p>
                </div>
                
                <div style={{ flex: 1, minWidth: '350px', position: 'relative', zIndex: '1' }}>
                  <div style={{ fontSize: '1rem', fontFamily: 'monospace', fontWeight: '900', color: '#6B7280', marginBottom: '1.5rem', borderBottom: '2px solid #374151', paddingBottom: '0.8rem', textTransform: 'uppercase' }}>
                    Authorized Operations:
                  </div>
                  <ul style={{ listStyleType: 'none', padding: 0, margin: 0, fontFamily: 'system-ui', fontSize: '1.1rem', color: '#E5E7EB', lineHeight: '2', fontWeight: '500' }}>
                    {step.details.map((detail, idx) => (
                      <li key={idx} style={{ display: 'flex', gap: '1rem', marginBottom: '0.8rem' }}>
                        <span style={{ color: '#38BDF8', fontWeight: '900' }}>+</span>
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

      {/* --- PLATFORM MODULES (STRICT MONOCHROME BRUTALISM) --- */}
      <div id="modules" style={{ backgroundColor: '#FFF', padding: '8rem 2rem', borderBottom: '4px solid #000' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          <div style={{ marginBottom: '6rem' }}>
            <h2 style={{ fontSize: '4rem', fontWeight: '900', margin: '0 0 1rem 0', textTransform: 'uppercase', letterSpacing: '-2px' }}>
              System Modules
            </h2>
            <p style={{ fontFamily: 'monospace', fontSize: '1.2rem', color: '#4B5563', fontWeight: 'bold', maxWidth: '900px', lineHeight: '1.6' }}>
              The core architectural components of HLE. Each module operates independently via decoupled React components but shares a centralized PostgreSQL/SQLite database schema to ensure absolute data integrity.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
            {platformModules.map((item, index) => (
              <div 
                key={index}
                onClick={() => navigate(item.secured && !user ? '/login' : item.link)}
                style={{
                  backgroundColor: '#FFF',
                  border: '4px solid #000',
                  padding: '3.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease-in-out',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000';
                  e.currentTarget.style.color = '#FFF';
                  e.currentTarget.style.transform = 'translate(-6px, -6px)';
                  e.currentTarget.style.boxShadow = '12px 12px 0 #D1D5DB';
                  e.currentTarget.querySelector('.sub').style.color = '#FFF';
                  e.currentTarget.querySelector('.sub').style.borderBottom = '2px solid #FFF';
                  e.currentTarget.querySelector('.desc').style.color = '#D1D5DB';
                  e.currentTarget.querySelectorAll('.cap-list').forEach(el => el.style.color = '#9CA3AF');
                  e.currentTarget.querySelector('.badge').style.backgroundColor = '#FFF';
                  e.currentTarget.querySelector('.badge').style.color = '#000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFF';
                  e.currentTarget.style.color = '#000';
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.querySelector('.sub').style.color = '#000';
                  e.currentTarget.querySelector('.sub').style.borderBottom = '2px solid #000';
                  e.currentTarget.querySelector('.desc').style.color = '#374151';
                  e.currentTarget.querySelectorAll('.cap-list').forEach(el => el.style.color = '#4B5563');
                  e.currentTarget.querySelector('.badge').style.backgroundColor = item.secured ? '#000' : '#FFF';
                  e.currentTarget.querySelector('.badge').style.color = item.secured ? '#FFF' : '#000';
                }}
              >
                {/* Security Badge */}
                <div className="badge" style={{ position: 'absolute', top: '20px', right: '20px', backgroundColor: item.secured ? '#000' : '#FFF', color: item.secured ? '#FFF' : '#000', padding: '0.4rem 1rem', border: item.secured ? 'none' : '3px solid #000', fontSize: '0.8rem', fontWeight: '900', fontFamily: 'monospace', letterSpacing: '1px', transition: 'all 0.15s' }}>
                  {item.secured ? 'LOCKED : AUTH REQ' : 'OPEN : PUBLIC ACCESS'}
                </div>

                <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '2.5rem', fontWeight: '900', margin: '0 0 0.5rem 0', textTransform: 'uppercase', letterSpacing: '-1px' }}>
                  {item.title}
                </h3>
                
                <div className="sub" style={{ fontSize: '1rem', fontFamily: 'monospace', fontWeight: '900', color: '#000', borderBottom: '2px solid #000', paddingBottom: '1rem', marginBottom: '2rem', transition: 'all 0.15s' }}>
                  [ {item.subtitle} ]
                </div>
                
                <p className="desc" style={{ fontFamily: 'system-ui', fontSize: '1.1rem', fontWeight: '500', color: '#374151', margin: '0 0 2.5rem 0', lineHeight: '1.7', transition: 'color 0.15s' }}>
                  {item.desc}
                </p>

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontFamily: 'monospace', fontWeight: '900', marginBottom: '1rem', textTransform: 'uppercase' }}>CORE CAPABILITIES:</div>
                  <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {item.capabilities.map((cap, i) => (
                      <li key={i} className="cap-list" style={{ fontFamily: 'monospace', fontSize: '0.95rem', fontWeight: 'bold', color: '#4B5563', display: 'flex', gap: '0.8rem', transition: 'color 0.15s' }}>
                        <span>+</span> <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- KNOWLEDGE BASE / FAQS (NEW SECTION) --- */}
      <div style={{ backgroundColor: '#F3F4F6', padding: '8rem 2rem', borderBottom: '4px solid #000' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: '900', margin: '0 0 4rem 0', textTransform: 'uppercase', letterSpacing: '-1px', textAlign: 'center' }}>
            System Knowledge Base
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {faqs.map((faq, index) => (
              <div key={index} style={{ border: '4px solid #000', backgroundColor: '#FFF' }}>
                <button 
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  style={{ width: '100%', padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontSize: '1.3rem', fontWeight: '900', fontFamily: 'system-ui', color: '#000', paddingRight: '2rem' }}>
                    {faq.q}
                  </span>
                  <span style={{ fontSize: '2rem', fontWeight: '900', fontFamily: 'monospace' }}>
                    {activeFaq === index ? '-' : '+'}
                  </span>
                </button>
                
                {activeFaq === index && (
                  <div style={{ padding: '0 2rem 2rem 2rem', fontFamily: 'monospace', fontSize: '1.1rem', lineHeight: '1.8', color: '#4B5563', fontWeight: '500', borderTop: '2px dashed #E5E7EB', paddingTop: '2rem', margin: '0 2rem' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- TERMINAL INITIATION (CALL TO ACTION) --- */}
      {!user && (
        <div style={{ backgroundColor: '#2563EB', padding: '8rem 2rem', textAlign: 'center', backgroundImage: 'radial-gradient(#1E40AF 3px, transparent 3px)', backgroundSize: '40px 40px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', backgroundColor: '#FFF', padding: '5rem 3rem', border: '6px solid #000', boxShadow: '20px 20px 0 #000' }}>
            
            <div style={{ fontSize: '1rem', fontFamily: 'monospace', fontWeight: '900', color: '#6B7280', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
              // Authentication Gateway
            </div>

            <h2 style={{ fontSize: '4.5rem', fontWeight: '900', color: '#000', margin: '0 0 1.5rem 0', textTransform: 'uppercase', letterSpacing: '-2px', lineHeight: '1' }}>
              Initiate System Access
            </h2>
            
            <p style={{ fontFamily: 'monospace', fontSize: '1.25rem', fontWeight: 'bold', color: '#4B5563', marginBottom: '4rem', maxWidth: '700px', margin: '0 auto 4rem auto', lineHeight: '1.6' }}>
              Access to the HLE internal network requires strict identity verification. Please select your operational pathway below to authenticate.
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <button style={{ padding: '1.5rem 3rem', fontSize: '1.2rem', fontWeight: '900', fontFamily: 'monospace', border: '4px solid #000', backgroundColor: '#000', color: '#FFF', cursor: 'pointer', textTransform: 'uppercase', transition: 'all 0.1s', boxShadow: '8px 8px 0 #FBBF24' }} onMouseDown={(e) => {e.currentTarget.style.transform='translate(4px,4px)'; e.currentTarget.style.boxShadow='none'}} onMouseUp={(e) => {e.currentTarget.style.transform='translate(0,0)'; e.currentTarget.style.boxShadow='8px 8px 0 #FBBF24'}}>
                  GENERATE PROFILE
                </button>
              </Link>
              
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <button style={{ padding: '1.5rem 3rem', fontSize: '1.2rem', fontWeight: '900', fontFamily: 'monospace', border: '4px solid #000', backgroundColor: '#FFF', color: '#000', cursor: 'pointer', textTransform: 'uppercase', transition: 'all 0.1s', boxShadow: '8px 8px 0 #E5E7EB' }} onMouseDown={(e) => {e.currentTarget.style.transform='translate(4px,4px)'; e.currentTarget.style.boxShadow='none'}} onMouseUp={(e) => {e.currentTarget.style.transform='translate(0,0)'; e.currentTarget.style.boxShadow='8px 8px 0 #E5E7EB'}}>
                  AUTHORIZED LOGIN
                </button>
              </Link>
            </div>

          </div>
        </div>
      )}

      <Footer />
      
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Homepage;