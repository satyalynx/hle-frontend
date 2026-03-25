import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Homepage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sysTime, setSysTime] = useState('');

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
  // DENSE INFORMATION STRUCTURES
  // ==========================================

  const platformModules = [
    { 
      id: 'MOD-01', title: 'Command Center', subtitle: 'LIVE TELEMETRY & HEATMAP', icon: '🗺️', link: '/heatmap', 
      desc: 'Real-time infrastructure monitoring system utilizing asynchronous data streams to visualize fault densities across all 7 physical blocks.', 
      capabilities: ['Dynamic Color-Coded Heat Grid', 'Chronic Fault Auto-Detection', 'Live Caretaker Queue Tracking', 'SLA Breach Alerts'],
      secured: true 
    },
    { 
      id: 'MOD-02', title: 'Master Ledger', subtitle: 'FINANCIAL SETTLEMENT DB', icon: '💳', link: '/bills', 
      desc: 'Centralized, immutable financial clearinghouse processing vendor payouts, institutional fee collections, and maintenance budgets.', 
      capabilities: ['Role-Restricted Settlement Actions', 'Transaction History Auditing', 'Automated Pending Dues Calculation', 'PDF Ledger Export'],
      secured: true 
    },
    { 
      id: 'MOD-03', title: 'Expose Meter', subtitle: 'DEMOCRATIC PUBLIC AUDIT', icon: '📊', link: '/food', 
      desc: 'An unalterable, student-driven rating architecture for the mess facility. Aggregates daily feedback into a global performance index.', 
      capabilities: ['Daily Menu Verification', 'Sentiment Trend Analysis', 'Anonymous Rating Protocols', 'Admin Read-Only Access Restrictions'],
      secured: true 
    },
    { 
      id: 'MOD-04', title: 'System Broadcasts', subtitle: 'DIRECTIVE TRANSMISSION', icon: '📢', link: '/notices', 
      desc: 'High-priority digital alert network replacing legacy physical notice boards. Ensures immediate delivery of administrative protocols.', 
      capabilities: ['Severity-Based Categorization', 'Timestamped Broadcast Logs', 'Targeted Block-Level Pings', 'Mandatory Read Receipts'],
      secured: true 
    },
    { 
      id: 'MOD-05', title: 'Smart Tickets', subtitle: 'MAINTENANCE QUEUE ROUTING', icon: '📋', link: '/complaints', 
      desc: 'Photo-verified maintenance tracking pipeline with automated formatting. Eliminates paper registers through accountable digital workflows.', 
      capabilities: ['Mandatory Image Uploads', 'Smart Room Number Regex Auto-Formatting', 'Real-time Status Mutations', 'Direct Caretaker Assignment'],
      secured: true 
    },
    { 
      id: 'MOD-06', title: 'Live Dashboard', subtitle: 'PUBLIC OPEN METRICS', icon: '🌐', link: '/public-dashboard', 
      desc: 'Unrestricted open metrics interface displaying real-time system health, active tickets, and global broadcast logs to all stakeholders.', 
      capabilities: ['No-Auth Public Access', 'Live Ticket Resolution Counters', 'Current Staff On-Duty Roster', 'Active Meal Plan Display'],
      secured: false 
    },
  ];

  const workflowSteps = [
    {
      step: '01', role: 'Student Resident',
      action: 'Initiates Pipeline',
      metrics: 'Permission Level: Standard | Access: Read/Write (Self)',
      details: [
        'Executes terminal access via secure OTP authentication.',
        'Logs infrastructure faults with mandatory Base64 photo evidence.',
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
        'Performs physical maintenance on campus adhering to 24H SLA.',
        'Uploads "After" photos as cryptographic proof of resolution.',
        'Submits resolved tickets to trigger automated financial payout requests.'
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
        'Oversees complete campus telemetry across all 7 functional hostels.',
        'Executes database migrations and system-wide emergency protocols.'
      ]
    }
  ];

  const technicalSpecs = [
    {
      domain: 'Core Architecture',
      specs: [
        'Framework: React.js 18.2 with custom React Router v6 DOM handling.',
        'Server: FastAPI asynchronous ASGI framework processing 10k+ req/sec.',
        'Runtime: Python 3.10+ utilizing advanced type hinting and Pydantic validation.',
        'State Management: Context API coupled with local storage persistence.'
      ]
    },
    {
      domain: 'Database & Data Modeling',
      specs: [
        'Engine: SQLite / PostgreSQL with SQLAlchemy Object Relational Mapper (ORM).',
        'Schema: 10 strictly normalized tables (3NF) preventing data redundancy.',
        'Integrity: Hardcoded foreign key constraints with cascading deletion rules.',
        'Asset Storage: Base64 string encoding for direct-to-database image persistence.'
      ]
    },
    {
      domain: 'Security & Compliance',
      specs: [
        'Auth Standard: JSON Web Tokens (JWT) utilizing HS256 cryptographic algorithms.',
        'Identity Verification: Time-sensitive SMTP-based One-Time Passwords (OTP) via Brevo.',
        'Data Protection: bcrypt password hashing with unique salt generation per user.',
        'Access Control: Strict Role-Based Access Control (RBAC) across UI and API boundaries.'
      ]
    }
  ];

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', color: '#111827' }}>
      <Navbar />
      
      {/* =========================================================
          1. HERO SECTION (HIGH DENSITY TEXT & BRANDING)
          ========================================================= */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '5rem 2rem', borderBottom: '4px solid #000' }}>
        
        {/* Terminal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #E5E7EB', paddingBottom: '1rem', marginBottom: '3rem', fontFamily: 'monospace', fontSize: '0.85rem', fontWeight: 'bold', color: '#6B7280' }}>
          <div>SERVER: CONNECTED (24ms ping)</div>
          <div>UTC TIMESTEMP: {sysTime || 'SYNCING...'}</div>
          <div>DEPLOYMENT: NIIS_PRODUCTION_V1</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4rem' }}>
          
          {/* Left Hero Content */}
          <div style={{ flex: '1', minWidth: '400px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', backgroundColor: '#000', color: '#FFF', padding: '0.4rem 1.2rem', fontWeight: '900', fontFamily: 'monospace', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              <span style={{ width: '8px', height: '8px', backgroundColor: '#10B981', borderRadius: '50%' }}></span>
              NIIS INSTITUTE OF INFORMATION SCIENCE & MANAGEMENT
            </div>
            
            <h1 style={{ fontSize: '6rem', fontWeight: '900', margin: '0 0 1.5rem 0', lineHeight: '0.9', letterSpacing: '-3px', color: '#000', textTransform: 'uppercase' }}>
              Hostel<br/>Life<br/>Easy.
            </h1>
            
            <p style={{ fontSize: '1.1rem', color: '#374151', marginBottom: '2.5rem', lineHeight: '1.8', maxWidth: '650px', fontWeight: '500', fontFamily: 'monospace', borderLeft: '4px solid #000', paddingLeft: '1.5rem' }}>
              A proprietary, digital-first infrastructure management architecture designed exclusively for the NIIS Institute. Operating on an asynchronous backend, HLE eliminates institutional bottlenecks, accelerates infrastructure maintenance, and enforces strict public transparency through an immutable ledger.
            </p>

            {/* Quick System Index */}
            <div style={{ backgroundColor: '#F9FAFB', border: '3px solid #000', padding: '1.5rem', display: 'inline-block' }}>
              <div style={{ fontWeight: '900', fontFamily: 'monospace', color: '#000', marginBottom: '1rem', textTransform: 'uppercase', borderBottom: '2px solid #000', paddingBottom: '0.5rem' }}>
                Quick System Index Navigation
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={(e) => handleJump(e, 'architecture')} style={{ padding: '0.6rem 1.2rem', backgroundColor: '#FFF', color: '#000', border: '2px solid #000', fontWeight: '900', fontFamily: 'monospace', cursor: 'pointer', transition: 'all 0.1s' }} onMouseDown={(e) => {e.currentTarget.style.backgroundColor = '#000'; e.currentTarget.style.color = '#FFF'}}>
                  [01] SYSTEM ARCHITECTURE
                </button>
                <button onClick={(e) => handleJump(e, 'workflow')} style={{ padding: '0.6rem 1.2rem', backgroundColor: '#FFF', color: '#000', border: '2px solid #000', fontWeight: '900', fontFamily: 'monospace', cursor: 'pointer', transition: 'all 0.1s' }} onMouseDown={(e) => {e.currentTarget.style.backgroundColor = '#000'; e.currentTarget.style.color = '#FFF'}}>
                  [02] EXECUTION WORKFLOW
                </button>
                <button onClick={(e) => handleJump(e, 'modules')} style={{ padding: '0.6rem 1.2rem', backgroundColor: '#FFF', color: '#000', border: '2px solid #000', fontWeight: '900', fontFamily: 'monospace', cursor: 'pointer', transition: 'all 0.1s' }} onMouseDown={(e) => {e.currentTarget.style.backgroundColor = '#000'; e.currentTarget.style.color = '#FFF'}}>
                  [03] PLATFORM MODULES
                </button>
              </div>
            </div>
          </div>

          {/* Right Hero Data Block (Replaces colorful branding with brutalist data) */}
          <div style={{ flex: '0.8', display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: '350px' }}>
            <div style={{ padding: '2rem', border: '4px solid #000', backgroundColor: '#F9FAFB' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '900', fontFamily: 'system-ui', margin: '0 0 1rem 0', textTransform: 'uppercase', borderBottom: '2px solid #000', paddingBottom: '0.5rem' }}>Network Capacity Limits</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', fontFamily: 'monospace' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 'bold' }}>MAX USERS</div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#000' }}>840+</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 'bold' }}>TRACKED ROOMS</div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#000' }}>280</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 'bold' }}>ACTIVE HOSTELS</div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#000' }}>07</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 'bold' }}>RESOLUTION SLA</div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#000' }}>24H</div>
                </div>
              </div>
            </div>
            
            <div style={{ padding: '1.5rem', border: '4px solid #000', backgroundColor: '#000', color: '#FFF', fontFamily: 'monospace' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#10B981', marginBottom: '0.5rem' }}>// LIVE_DATABASE_STATUS</div>
              <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                &gt; Establishing connection to NIIS Core... <br/>
                &gt; Authentication protocols engaged... <br/>
                &gt; Heatmap telemetry online. <br/>
                &gt; System fully operational.
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================
          2. THE PARADIGM SHIFT (DENSE ARCHITECTURE DETAILS)
          ========================================================= */}
      <div id="architecture" style={{ padding: '6rem 2rem', backgroundColor: '#F9FAFB', borderBottom: '4px solid #000' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: '900', margin: '0 0 1rem 0', textTransform: 'uppercase', letterSpacing: '-1px' }}>The Paradigm Shift</h2>
            <div style={{ fontFamily: 'monospace', fontSize: '1rem', color: '#4B5563', fontWeight: 'bold', maxWidth: '800px', lineHeight: '1.6' }}>
              Traditional hostel management relies on fragmented, analog processes resulting in critical data loss and lack of accountability. HLE enforces a strict digital-first policy, converting physical bottlenecks into measurable data points.
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
            
            {/* Technical Specs Array */}
            {technicalSpecs.map((section, idx) => (
              <div key={idx} style={{ padding: '2.5rem', border: '3px solid #000', backgroundColor: '#FFF' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase', marginBottom: '1.5rem', paddingBottom: '0.8rem', borderBottom: '2px solid #000', color: '#000' }}>
                  [{section.domain}]
                </h3>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0, fontFamily: 'monospace', fontSize: '0.95rem', fontWeight: '500', color: '#374151', lineHeight: '1.8' }}>
                  {section.specs.map((item, i) => (
                    <li key={i} style={{ marginBottom: '1rem', display: 'flex', gap: '0.8rem' }}>
                      <span style={{ color: '#000', fontWeight: '900' }}>&gt;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* =========================================================
          3. ROLE-BASED EXECUTION PIPELINE (HEAVY WORKFLOW DETAILS)
          ========================================================= */}
      <div id="workflow" style={{ padding: '6rem 2rem', backgroundColor: '#000', color: '#FFF', borderBottom: '4px solid #000' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-1px', color: '#FFF', margin: '0 0 1rem 0' }}>
              Execution Pipeline
            </h2>
            <div style={{ fontFamily: 'monospace', fontSize: '1rem', color: '#9CA3AF', fontWeight: 'bold' }}>
              HIERARCHICAL ROLE-BASED ACCESS CONTROL (RBAC) WORKFLOWS
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {workflowSteps.map((step, index) => (
              <div key={index} style={{ backgroundColor: '#111827', padding: '3rem', border: '2px solid #374151', display: 'flex', gap: '3rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                
                <div style={{ minWidth: '250px' }}>
                  <div style={{ fontSize: '1rem', fontFamily: 'monospace', fontWeight: '900', color: '#4B5563', marginBottom: '0.5rem' }}>STAGE {step.step}</div>
                  <h3 style={{ fontSize: '2rem', fontWeight: '900', textTransform: 'uppercase', margin: '0 0 0.5rem 0', color: '#FFF' }}>
                    {step.role}
                  </h3>
                  <div style={{ display: 'inline-block', backgroundColor: '#FFF', color: '#000', padding: '0.3rem 0.8rem', fontFamily: 'monospace', fontWeight: '900', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    {step.action.toUpperCase()}
                  </div>
                  <p style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#10B981', fontWeight: 'bold', margin: 0 }}>
                    {step.metrics}
                  </p>
                </div>
                
                <div style={{ flex: 1, minWidth: '300px' }}>
                  <div style={{ fontSize: '0.9rem', fontFamily: 'monospace', fontWeight: '900', color: '#6B7280', marginBottom: '1rem', borderBottom: '1px solid #374151', paddingBottom: '0.5rem' }}>AUTHORIZED OPERATIONS:</div>
                  <ul style={{ listStyleType: 'none', padding: 0, margin: 0, fontFamily: 'system-ui', fontSize: '1rem', color: '#D1D5DB', lineHeight: '1.8', fontWeight: '500' }}>
                    {step.details.map((detail, idx) => (
                      <li key={idx} style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                        <span style={{ color: '#4B5563' }}>—</span>
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
          4. PLATFORM MODULES (STRICT MONOCHROME BRUTALISM)
          ========================================================= */}
      <div id="modules" style={{ backgroundColor: '#FFF', padding: '6rem 2rem', borderBottom: '4px solid #000' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          <div style={{ marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '3.5rem', fontWeight: '900', margin: '0 0 1rem 0', textTransform: 'uppercase', letterSpacing: '-1px' }}>
              System Modules
            </h2>
            <p style={{ fontFamily: 'monospace', fontSize: '1.1rem', color: '#4B5563', fontWeight: 'bold', maxWidth: '800px', lineHeight: '1.6' }}>
              The core components comprising the HLE architecture. Each module operates independently but shares a centralized PostgreSQL/SQLite database for unified data integrity.
            </p>
          </div>

          {/* NO RAINBOW COLORS. PURE ENTERPRISE MONOCHROME */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
            {platformModules.map((item, index) => (
              <div 
                key={index}
                onClick={() => navigate(item.secured && !user ? '/login' : item.link)}
                style={{
                  backgroundColor: '#FFF',
                  border: '4px solid #000',
                  padding: '3rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease-in-out',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000';
                  e.currentTarget.style.color = '#FFF';
                  e.currentTarget.style.transform = 'translate(-4px, -4px)';
                  e.currentTarget.style.boxShadow = '8px 8px 0 #D1D5DB'; // Simple gray shadow
                  e.currentTarget.querySelector('.sub').style.color = '#FFF';
                  e.currentTarget.querySelector('.sub').style.borderBottom = '2px solid #FFF';
                  e.currentTarget.querySelector('.desc').style.color = '#D1D5DB';
                  e.currentTarget.querySelectorAll('.cap-list').forEach(el => el.style.color = '#9CA3AF');
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
                }}
              >
                {/* Strict B&W Security Badge */}
                <div style={{ position: 'absolute', top: '20px', right: '20px', backgroundColor: item.secured ? '#000' : '#FFF', color: item.secured ? '#FFF' : '#000', padding: '0.3rem 0.8rem', border: item.secured ? 'none' : '2px solid #000', fontSize: '0.75rem', fontWeight: '900', fontFamily: 'monospace', letterSpacing: '1px' }}>
                  {item.secured ? 'LOCKED : AUTH REQ' : 'OPEN : PUBLIC'}
                </div>

                <div style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '2.2rem', fontWeight: '900', margin: '0 0 0.5rem 0', textTransform: 'uppercase', letterSpacing: '-1px' }}>
                  {item.title}
                </h3>
                
                <div className="sub" style={{ fontSize: '0.9rem', fontFamily: 'monospace', fontWeight: '900', color: '#000', borderBottom: '2px solid #000', paddingBottom: '0.8rem', marginBottom: '1.5rem', transition: 'all 0.15s' }}>
                  {item.subtitle}
                </div>
                
                <p className="desc" style={{ fontFamily: 'system-ui', fontSize: '1.05rem', fontWeight: '500', color: '#374151', margin: '0 0 2rem 0', lineHeight: '1.7', transition: 'color 0.15s' }}>
                  {item.desc}
                </p>

                {/* Highly detailed capabilities list inside the card */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.8rem', fontFamily: 'monospace', fontWeight: '900', marginBottom: '0.8rem' }}>CORE CAPABILITIES:</div>
                  <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {item.capabilities.map((cap, i) => (
                      <li key={i} className="cap-list" style={{ fontFamily: 'monospace', fontSize: '0.85rem', fontWeight: 'bold', color: '#4B5563', display: 'flex', gap: '0.5rem', transition: 'color 0.15s' }}>
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

      {/* =========================================================
          5. TERMINAL INITIATION (CALL TO ACTION)
          ========================================================= */}
      {!user && (
        <div style={{ backgroundColor: '#F3F4F6', padding: '6rem 2rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', backgroundColor: '#FFF', padding: '4rem 2rem', border: '4px solid #000' }}>
            
            <div style={{ fontSize: '0.9rem', fontFamily: 'monospace', fontWeight: '900', color: '#6B7280', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
              // Authentication Gateway
            </div>

            <h2 style={{ fontSize: '3.5rem', fontWeight: '900', color: '#000', margin: '0 0 1.5rem 0', textTransform: 'uppercase', letterSpacing: '-1px', lineHeight: '1' }}>
              Initiate System Access
            </h2>
            
            <p style={{ fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: '500', color: '#4B5563', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 4rem auto', lineHeight: '1.6' }}>
              Access to the HLE internal network requires strict identity verification. Please select your operational pathway below.
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <button style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem', fontWeight: '900', fontFamily: 'monospace', border: '4px solid #000', backgroundColor: '#000', color: '#FFF', cursor: 'pointer', textTransform: 'uppercase', transition: 'all 0.1s' }} onMouseEnter={(e) => {e.currentTarget.style.backgroundColor='#FFF'; e.currentTarget.style.color='#000'}} onMouseLeave={(e) => {e.currentTarget.style.backgroundColor='#000'; e.currentTarget.style.color='#FFF'}}>
                  GENERATE PROFILE
                </button>
              </Link>
              
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <button style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem', fontWeight: '900', fontFamily: 'monospace', border: '4px solid #000', backgroundColor: '#FFF', color: '#000', cursor: 'pointer', textTransform: 'uppercase', transition: 'all 0.1s' }} onMouseEnter={(e) => {e.currentTarget.style.backgroundColor='#000'; e.currentTarget.style.color='#FFF'}} onMouseLeave={(e) => {e.currentTarget.style.backgroundColor='#FFF'; e.currentTarget.style.color='#000'}}>
                  AUTHORIZED LOGIN
                </button>
              </Link>
            </div>

          </div>
        </div>
      )}

      <Footer />
      
    </div>
  );
};

export default Homepage;