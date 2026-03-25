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
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  // ==========================================
  // RETRO ANIME ENTERPRISE PALETTE (Color Grading)
  // ==========================================
  const theme = {
    bg: '#101015',        // Deep Dark Terminal
    bgSec: '#1a1b26',     // Mecha Inner Shell
    text: '#c0caf5',      // Cool Cyberspace Off-White
    textSec: '#949fb5',   // Data Stream Gray
    purp: '#bb9af7',      // Anime Aura Purple
    purpDark: '#1E1E2E',  
    teal: '#2ac3de',      // Neon Grid Teal
    pink: '#f7768e',      // Alert Pink
    orange: '#ff9e64',    // Operational Warning Orange
    border: '#374151'
  };

  // ==========================================
  // DENSE INFORMATION STRUCTURES (FAANG Density)
  // ==========================================

  const platformModules = [
    { id: 'MOD-01', title: 'Command Center', icon: '🗺️', link: '/heatmap', color: theme.purp, desc: 'Real-time telemetry architecture utilizing asynchronous WebSocket streams to visualize fault densities.', capabilities: ['WebSocket Grid', 'Auto-Fault Detection', 'Caretaker Queues', 'SLA Monitoring'], secured: true },
    { id: 'MOD-02', title: 'Master Ledger', icon: '💳', link: '/bills', color: theme.teal, desc: 'Immutable financial clearinghouse processing institutional fee collections, vendor payouts, and budgets.', capabilities: ['RBAC Authorization', 'Immutable Audit Logs', 'Auto-Dues Calculation', ' Ledger Export'], secured: true },
    { id: 'MOD-03', title: 'Expose Meter', icon: '📊', link: '/food', color: theme.pink, desc: 'Student-driven democratic auditing architecture for mess facility performance metrics.', capabilities: ['Daily Menu Verify', 'Sentiment Trends', 'Anonymous Voting', 'Read-Only Admin'], secured: true },
    { id: 'MOD-04', title: 'System Broadcasts', icon: '📢', link: '/notices', color: theme.orange, desc: 'Direct directive transmission network replacing analog notice boards for instant protocol deployment.', capabilities: ['Severity Categorization', 'Broadcast Logs', 'Block Targeted Pings', 'Read Receipts'], secured: true },
    { id: 'MOD-05', title: 'Smart Tickets', icon: '📋', link: '/complaints', color: '#c3e88d', desc: 'Photo-verified maintenance request pipeline with automatic room formatting and algorithmic routing.', capabilities: ['Base64 Photo Evidence', 'Room Regex Format', 'Status mutations', 'Staff Assignment'], secured: true },
    { id: 'MOD-06', title: 'Live Dashboard', icon: '🌐', link: '/public-dashboard', color: theme.purp, desc: 'Unrestricted open metrics interface displaying system health and operational status to public stakeholders.', capabilities: ['No-Auth Access', 'Resolution Counters', 'On-Duty Roster', 'Active Meal Plan'], secured: false },
  ];

  const workflowSteps = [
    { step: '01', role: 'Student Resident (Initialization Stage)', action: 'Raise fault tickets, audit mess facility performance, check broadcast notices.', metrics: 'Permission Level: Standard | Access: Read/Write(Self)', color: '#a9b1d6', details: ['Log maintenance requests (w/ Photo Base64 evidence). Call POST `/api/v1/complaints/create`', 'Submit daily mess ratings. Call POST `/api/v1/mess/vote`', 'Track individual dues & generate PDF clearance reports.', 'View latest directives via Broadcasting interface.'] },
    { step: '02', role: 'Caretaker (Operational Execution Stage)', action: 'Process assigned tickets, perform physical repair, upload cryptographic proof.', metrics: 'Permission Level: Elevated | Access: Read/Write(Assigned)', color: theme.teal, details: ['Monitor real-time assigned queue heatmap data. Call GET `/api/v1/complaints/assigned`', 'Execute maintenance tasks (Electrical, Plumbing, etc.) adhering to 24H SLA.', 'Take resolution photos and update ticket status. Call PUT `/api/v1/complaints/mutate/{id}`', 'Initiate financial payout requests upon validation.'] },
    { step: '03', role: 'Hostel Warden (Tactical Oversight Stage)', action: 'Validate work, deploy directives, monitor global telemetry heatmap.', metrics: 'Permission Level: Supervisory | Access: Read(All)/Write(Broadcast)', color: theme.purp, details: ['Physically audit caretaker submissions and finalize complaint resolution loops.', 'Compose and transmit institutional notices with severity rating. POST `/api/v1/notices/broadcast`', 'Monitor Command Center Heatmap for chronic fault detection & block-level metrics.', 'Oversees student disciplinary actions and mess staff operations.'] },
    { step: '04', role: 'System Admin (Root Access Operations Stage)', action: 'Manage finance ledger settlements, govern database schemas & RBAC.', metrics: 'Permission Level: Absolute | Access: Read/Write(Global)', color: theme.pink, details: ['Authorize final financial settlements in the Master Ledger gateway.', 'Maintain absolute control over institutional user data and Pydantic schema validation layers.', 'Govern relational database schema migrations (Alembic/SQLAlchemy).', 'Execute system-wide emergency protocols.'] }
  ];

  const architecturalSpecs = [
    { domain: 'CORE PLATFORM FRAMEWORK', specs: ['React.js 18.2 (Functional Component Architecture)', 'React Router v6 DOM-based navigation', 'Context API State Management w/ Local Persistence'] },
    { domain: 'BACKEND ARCHITECTURE', specs: ['FastAPI Asynchronous ASGI framework', 'Python 3.10+ pydantic validation layers', 'SQLAlchemy Object Relational Mapper (ORM)'] },
    { domain: 'DATABASE SCHEMA & INTEGRITY', specs: ['SQLite/PostgreSQL relational database engines', '10 Normalized (3NF Strict) Relational Tables', 'Base64 image encoding for media storage'] },
    { domain: 'SECURITY & ENCRYPTION', specs: ['JSON Web Tokens (JWT) HS256 stateless session management', 'Brevo SMTP engine One-Time Password (OTP) auth', 'bcrypt adaptability password hashing algorithms', 'Hierarchical Role-Based Access Control (RBAC)'] }
  ];

  const faqs = [
    { q: "How is data manipulated in the Expose Meter (Mess Ratings)?", a: "It is unalterable. The Expose Meter operates on an immutable ledger principle. Once a student resident submits daily ratings via POST `/api/v1/mess/vote`, the data is aggregated directly into the matrix. Administrators have strictly 'Read-Only' clearance to these database columns, ensuring total transparency." },
    { q: "Can two students raise a complaint for the same fault?", a: "Yes. The system allows multiple tickets. The Warden or Admin utilizes deduplication protocols in the backend, linking duplicate tickets to a single operational work order for caretakers. The Command Center heatmap reflects fault density based on unique rooms, not ticket counts." },
    { q: "What is the cryptographic proof caretakers must provide?", a: "Cryptographic proof in HLE refers to the mandated upload of an 'After' photograph. This photo is Base64 encoded and timestamped. Wardens utilize this evidence for tactical validation during physical audits before finalizing complaint settlement loops. It is not functional cryptography but strict visual audit trail policy." },
    { q: "Is role-switching possible within the HLE terminal?", a: "Switching roles requires root-level authorization clear by the System Admin. The API endpoints at the backend (FastAPI layer) perform strict RBAC token validation for every request, preventing cross-role data leaks or unauthorized interface access attempts. Students cannot switch to Warden interfaces." }
  ];

  // ==========================================
  // RENDER LOGIC
  // ==========================================

  return (
    <div style={{ backgroundColor: theme.bg, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', color: theme.text, overflow: 'hidden' }}>
      <Navbar />
      
      {/* 🟢 TOP SERVER STATUS BAR - ANIME TERMINAL VIBE */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.4rem 2rem', backgroundColor: theme.bgSec, color: theme.teal, fontFamily: 'monospace', fontSize: '0.75rem', fontWeight: 'bold', borderBottom: `2px solid ${theme.border}` }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <span>STATUS: ALL_SYSTEMS_NOMINAL</span>
          <span>PING: 24ms</span>
          <span>ACTIVE_DB: POSTGRES_PROD_01</span>
        </div>
        <div>UTC TIMESTAMP: {sysTime || 'SYNCING...'}</div>
      </div>

      {/* 1. HERO SECTION - ENTERPRISE MECHA BRANDING */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '6rem 2rem 4rem', borderBottom: `4px solid #000`, backgroundImage: `linear-gradient(${theme.bgSec} 2px, transparent 2px), linear-gradient(90deg, ${theme.bgSec} 2px, transparent 2px)`, backgroundSize: '50px 50px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4rem' }}>
          
          {/* Left Hero */}
          <div style={{ flex: '1.2', minWidth: '400px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', backgroundColor: theme.bgSec, color: theme.text, padding: '0.4rem 1.2rem', border: `3px solid ${theme.border}`, fontWeight: '900', fontFamily: 'monospace', marginBottom: '1.5rem', fontSize: '0.85rem', letterSpacing: '1px' }}>
              <span style={{ width: '8px', height: '8px', backgroundColor: '#10B981', borderRadius: '50%' }}></span>
              NIIS INSTITUTE OF INFORMATION SCIENCE & MANAGEMENT
            </div>
            
            <h1 style={{ fontSize: '5.5rem', fontWeight: '900', margin: '0 0 1.5rem 0', lineHeight: '0.9', letterSpacing: '-3px', color: '#FFF', textTransform: 'uppercase', textShadow: `0 0 10px ${theme.purp}, 0 0 20px ${theme.purp}` }}>
              Hostel<br/>Life Easy.
            </h1>
            
            <p style={{ fontSize: '1rem', color: theme.textSec, marginBottom: '2.5rem', lineHeight: '1.8', maxWidth: '650px', fontWeight: '500', fontFamily: 'monospace', borderLeft: `4px solid ${theme.purp}`, paddingLeft: '1.5rem', backgroundColor: theme.bgSec, padding: '1.5rem', border: `2px solid ${theme.border}` }}>
              A proprietary, digital-first infrastructure management architecture designed exclusively for the NIIS Institutional network. Operating on an asynchronous backend, HLE eliminates paper registers, accelerates infrastructure maintenance through live telemetry, and enforces strict public audit capabilities through immutable ledgers.
            </p>

            {/* 🟢 SMART JUMP INDEX - SMALLER ELEMENTS */}
            <div style={{ backgroundColor: theme.bgSec, border: `3px solid ${theme.border}`, padding: '1.2rem', display: 'inline-block' }}>
              <div style={{ fontWeight: '900', fontFamily: 'monospace', color: theme.textSec, marginBottom: '1rem', textTransform: 'uppercase', borderBottom: `2px solid ${theme.border}`, paddingBottom: '0.5rem', fontSize: '0.8rem' }}>
                Quick System Index Navigation
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {[ { id: 'architecture', label: 'SYSTEM ARCHITECTURE', color: theme.teal }, { id: 'workflow', label: 'EXECUTION PIPELINE', color: theme.purp }, { id: 'modules', label: 'PLATFORM MODULES', color: theme. pink } ].map(item => (
                  <button key={item.id} onClick={(e) => handleJump(e, item.id)} style={{ padding: '0.5rem 1rem', backgroundColor: theme.bg, color: theme.text, border: `2px solid ${theme.border}`, fontWeight: '900', fontFamily: 'monospace', cursor: 'pointer', fontSize: '0.75rem', transition: 'all 0.15s ease-in-out' }} onMouseEnter={(e) => { e.currentTarget.style.color = item.color; e.currentTarget.style.borderColor = item.color; }} onMouseLeave={(e) => { e.currentTarget.style.color = theme.text; e.currentTarget.style.borderColor = theme.border; }}>
                    [ {item.label} ]
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Hero - Simulated Data Readout */}
          <div style={{ flex: '0.8', display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: '350px' }}>
            <div style={{ padding: '2rem', border: `3px solid ${theme.border}`, backgroundColor: theme. bgSec, position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-15px', right: '15px', padding: '0.2rem 0.8rem', backgroundColor: theme.teal, color: theme.bg, fontWeight: '900', fontFamily: 'monospace', fontSize: '0.7rem' }}>NETWORK CAPACITY</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '900', fontFamily: 'system-ui', margin: '0 0 1.5rem 0', textTransform: 'uppercase', color: theme.teal }}>Active Environment Data</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', fontFamily: 'monospace' }}>
                {[ { label: 'MAX USERS', value: '840+', color: theme.teal }, { label: 'TRACKED ROOMS', value: '280', color: theme.teal }, { label: 'HOSTELS', value: '07', color: '#FFF' }, { label: 'SLA (HRS)', value: '24', color: theme.pink } ].map((item, idx) => (
                  <div key={idx}>
                    <div style={{ fontSize: '0.75rem', color: theme.textSec, fontWeight: 'bold' }}>{item.label}</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '900', color: item.color, lineHeight: '1' }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{ padding: '1.5rem', border: `3px solid ${theme.pink}`, backgroundColor: '#2d141e', color: theme.pink, fontFamily: 'monospace' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: '900', color: theme.pink, marginBottom: '0.8rem', borderBottom: `1px solid ${theme.pink}`, paddingBottom: '0.3rem' }}>// DEPLOYMENT_LOGS V1.0.0</div>
              <div style={{ fontSize: '0.85rem', lineHeight: '1.6', color: '#ffb3c1' }}>
                &gt; Establishing connection to NIIS Core... <span style={{color: '#8effb1'}}>[OK]</span><br/>
                &gt; Synchronizing JWT handshakes... <span style={{color: '#8effb1'}}>[OK]</span><br/>
                &gt; Mounting operational Schemas (7 hostels)... <span style={{color: '#8effb1'}}>[OK]</span><br/>
                &gt; Heatmap telemetry online. <span style={{color: theme.orange}}>[WARNING: Fault Densities Detected in Block A]</span><br/>
                <span style={{color: theme.teal}}>&gt; SYSTEM STATUS: FULLY OPERATIONAL.</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- 2. ARCHITECTURE OVERVIEW --- */}
      <div id="architecture" style={{ padding: '6rem 2rem', backgroundColor: theme.bgSec, borderBottom: `4px solid #000` }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: '900', margin: '0 0 1rem 0', textTransform: 'uppercase', letterSpacing: '-1px', color: '#FFF' }}>
              System Architecture & Legacy Disruption
            </h2>
            <div style={{ fontFamily: 'monospace', fontSize: '0.95rem', color: theme.textSec, fontWeight: 'bold', maxWidth: '800px', lineHeight: '1.6' }}>
              Traditional hostel management relies on fragmented, analog processes resulting in critical data loss and complete lack of accountability. HLE disrupts this analog workflow through an asynchronous Python/React.js pipeline.
            </div>
          </div>
          
          {/* LEGACY VS HLE TABLE-LIKE LAYOUT */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem', marginBottom: '5rem' }}>
            <div style={{ padding: '2.5rem', border: `3px solid ${theme.border}`, backgroundColor: theme.bg, position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-18px', left: '30px', backgroundColor: theme.purpDark, color: theme.purp, padding: '0.3rem 1.2rem', fontWeight: '900', fontFamily: 'monospace', fontSize: '0.85rem', border: `2px solid ${theme.border}` }}>
                LEGACY SYSTEM [FAILURES]
              </div>
              <ul style={{ listStyleType: 'none', padding: 0, margin: '1rem 0 0 0', fontFamily: 'monospace', fontSize: '0.95rem', fontWeight: 'bold', color:theme.textSec, lineHeight: '2.2' }}>
                {['Paper complaint registers prone to data loss.', 'No visibility on staff operational queues.', 'No photo evidence of infrastructure repair.', 'Mess ratings manipulated by administration.', ' delayed communication via physical boards.' ].map((item, i) => (
                  <li key={i} style={{ marginBottom: '1rem', borderBottom: `1px dashed ${theme.border}`, paddingBottom: '0.5rem', display: 'flex', gap: '0.8rem' }}>
                    <span style={{ color: theme.pink }}>[X]</span> <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div style={{ padding: '2.5rem', border: `3px solid ${theme.border}`, backgroundColor: theme.bg, position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-18px', left: '30px', backgroundColor: '#102a21', color: '#10B981', padding: '0.3rem 1.2rem', fontWeight: '900', fontFamily: 'monospace', fontSize: '0.85rem', border: `2px solid ${theme.border}` }}>
                HLE ARCHITECTURE [SOLUTIONS]
              </div>
              <ul style={{ listStyleType: 'none', padding: 0, margin: '1rem 0 0 0', fontFamily: 'monospace', fontSize: '0.95rem', fontWeight: 'bold', color: theme.text, lineHeight: '2.2' }}>
                {['100% Asynchronous Digital Ticket Generation.', 'Live Heatmap monitoring caretaker task queues.', 'Photo-verified maintenance resolution evidence.', 'Immutable public mess rating database (auditable).', 'SMTP Engine OTP verification gateway.'].map((item, i) => (
                  <li key={i} style={{ marginBottom: '1rem', borderBottom: `1px dashed ${theme.border}`, paddingBottom: '0.5rem', display: 'flex', gap: '0.8rem' }}>
                    <span style={{ color: '#10B981' }}>[+]</span> <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* DENSE TECHNICAL SPECS BREAKDOWN */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {architecturalSpecs.map((section, idx) => (
              <div key={idx} style={{ padding: '1.5rem', border: `2px solid ${theme.border}`, backgroundColor: theme.purpDark }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase', marginBottom: '1.2rem', paddingBottom: '0.5rem', borderBottom: `1px solid ${theme.border}`, color: theme.purp }}>
                  // {section.domain}
                </h3>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0, fontFamily: 'monospace', fontSize: '0.85rem', fontWeight: 'bold', color: theme.textSec, lineHeight: '1.8' }}>
                  {section.specs.map((item, i) => (
                    <li key={i} style={{ marginBottom: '0.6rem', display: 'flex', gap: '0.8rem' }}>
                      <span style={{ color: theme.text }}>&gt;</span> <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* --- 3. EXECUTION PIPELINE (FAANG DETAILS) --- */}
      <div id="workflow" style={{ padding: '6rem 2rem', backgroundColor: theme.bg, color: theme.text, borderBottom: `4px solid #000` }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          <div style={{ marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-1px', color: '#FFF', margin: '0 0 1rem 0' }}>
              Relational DB Pipeline & Execution Workflow
            </h2>
            <div style={{ fontFamily: 'monospace', fontSize: '0.95rem', color: theme.textSec, fontWeight: 'bold' }}>
              HIERARCHICAL ROLE-BASED ACCESS CONTROL (RBAC) WORKFLOWS
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {workflowSteps.map((step, index) => (
              <div key={index} style={{ backgroundColor: theme.bgSec, padding: '3rem', border: `3px solid ${theme.border}`, display: 'flex', gap: '3rem', alignItems: 'flex-start', flexWrap: 'wrap', position: 'relative' }}>
                <div style={{ fontSize: '1.2rem', fontFamily: 'monospace', fontWeight: '900', color: theme.border, position: 'absolute', top: '15px', right: '15px' }}>[ STAGE {step.step} ]</div>
                
                <div style={{ minWidth: '300px' }}>
                  <h3 style={{ fontSize: '2rem', fontWeight: '900', textTransform: 'uppercase', margin: '0 0 1rem 0', color: step.color, textShadow: `0 0 8px ${step.color}` }}>
                    {step.role}
                  </h3>
                  <p style={{ fontFamily: 'system-ui', fontSize: '0.95rem', color: theme.text, fontWeight: '500', lineHeight: '1.6', margin: 0 }}>
                    {step.action}
                  </p>
                  <p style={{ fontFamily: 'monospace', fontSize: '0.85rem', color:theme.textSec, fontWeight: '900', marginTop: '1.5rem', borderTop: `1px dashed ${theme.border}`, paddingTop: '1rem' }}>
                    {step.metrics}
                  </p>
                </div>
                
                <div style={{ flex: 1, minWidth: '350px' }}>
                  <div style={{ fontSize: '0.85rem', fontFamily: 'monospace', fontWeight: '900', color: theme.textSec, marginBottom: '1rem', borderBottom: `1px solid ${theme.border}`, paddingBottom: '0.5rem' }}>AUTHORIZED OPERATIONS:</div>
                  <ul style={{ listStyleType: 'none', padding: 0, margin: 0, fontFamily: 'monospace', fontSize: '0.9rem', color: theme.text, lineHeight: '1.8', fontWeight: 'bold' }}>
                    {step.details.map((detail, idx) => (
                      <li key={idx} style={{ display: 'flex', gap: '0.8rem', marginBottom: '0.6rem' }}>
                        <span style={{ color: step.color }}>—</span>
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

      {/* --- 4. PLATFORM MODULES (MONOCHROME & DETAILED) --- */}
      <div id="modules" style={{ backgroundColor: theme.bgSec, padding: '6rem 2rem', borderBottom: `4px solid #000` }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          <div style={{ marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: '900', margin: '0 0 1rem 0', textTransform: 'uppercase', letterSpacing: '-1px', color: '#FFF' }}>
              HLE Platform Modules
            </h2>
            <p style={{ fontFamily: 'monospace', fontSize: '0.95rem', color: theme.textSec, fontWeight: 'bold', maxWidth: '800px', lineHeight: '1.6' }}>
              The core decoupling components comprising the HLE architecture. Each module operates independently but shares a centralized relational database schema to ensure absolute data integrity.
            </p>
          </div>

          {/* 🟢 SMALLER ELEMENTS, MONOCHROME, HIGH INFO */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {platformModules.map((item, index) => (
              <div 
                key={index}
                onClick={() => navigate(item.secured && !user ? '/login' : item.link)}
                style={{
                  backgroundColor: theme.bg, border: `2px solid ${theme.border}`, padding: '2.5rem', cursor: 'pointer', transition: 'all 0.15s ease-in-out', position: 'relative', display: 'flex', flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = item.color;
                  e.currentTarget.style.backgroundColor = theme.bgSec;
                  e.currentTarget.querySelector('.sub').style.color = theme.text;
                  e.currentTarget.querySelector('.desc').style.color = theme.text;
                  e.currentTarget.querySelectorAll('.cap-list').forEach(el => el.style.color = theme.text);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = theme.border;
                  e.currentTarget.style.backgroundColor = theme.bg;
                  e.currentTarget.querySelector('.sub').style.color = theme.textSec;
                  e.currentTarget.querySelector('.desc').style.color = theme.textSec;
                  e.currentTarget.querySelectorAll('.cap-list').forEach(el => el.style.color = theme.textSec);
                }}
              >
                {/* Security Badge - Monocromatic */}
                <div style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: item.secured ? theme.bgSec : '#FFF', color: item.secured ? theme.pink : theme.bg, padding: '0.2rem 0.6rem', border: item.secured ? `1px solid ${theme.pink}` : `none`, fontSize: '0.7rem', fontWeight: '900', fontFamily: 'monospace' }}>
                  {item.secured ? '🔒 AUTH REQ' : '🔓 PUBLIC'}
                </div>

                <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: '900', margin: '0 0 0.5rem 0', textTransform: 'uppercase', color: theme. text }}>
                  {item.title}
                </h3>
                
                <div className="sub" style={{ fontSize: '0.8rem', fontFamily: 'monospace', fontWeight: '900', color: theme.textSec, borderBottom: `1px solid ${theme.border}`, paddingBottom: '0.5rem', marginBottom: '1.2rem', transition: 'all 0.15s' }}>
                  [ {item.subtitle} ]
                </div>
                
                <p className="desc" style={{ fontFamily: 'monospace', fontSize: '0.85rem', fontWeight: 'bold', color: theme.textSec, margin: '0 0 1.5rem 0', lineHeight: '1.6', transition: 'color 0.15s' }}>
                  {item.desc}
                </p>

                {/* capabilities lists inside the card */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.7rem', fontFamily: 'monospace', fontWeight: '900', marginBottom: '0.8rem', textTransform: 'uppercase', color: theme.textSec }}>CORE_CAPABILITIES:</div>
                  <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {item.capabilities.map((cap, i) => (
                      <li key={i} className="cap-list" style={{ fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 'bold', color: theme.textSec, display: 'flex', gap: '0.5rem', transition: 'color 0.15s' }}>
                        <span>&gt;</span> <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- FAQ / KNOWLEDGE BASE (Accordion) --- */}
      <div style={{ backgroundColor: theme.bg, padding: '6rem 2rem', borderBottom: `4px solid #000` }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: '900', margin: '0 0 1rem 0', textTransform: 'uppercase', letterSpacing: '-1px', color: '#FFF', textAlign: 'center' }}>
            System Knowledge Base
          </h2>
          <div style={{ fontFamily: 'monospace', fontSize: '1rem', color: theme.textSec, fontWeight: 'bold', marginBottom: '4rem', textAlign: 'center' }}>
            DETAILED TECHNICAL PROTOCOLS & FAQ
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, index) => (
              <div key={index} style={{ border: `2px solid ${theme.border}`, backgroundColor: theme.bgSec }}>
                <button 
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  style={{ width: '100%', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', color: theme.text }}
                >
                  <span style={{ fontSize: '1.1rem', fontWeight: 'bold', fontFamily: 'system-ui', paddingRight: '2rem' }}>
                    {faq.q}
                  </span>
                  <span style={{ fontSize: '1.5rem', fontWeight: '900', color: theme.purp, fontFamily: 'monospace' }}>
                    {activeFaq === index ? '[-]' : '[+]'}
                  </span>
                </button>
                
                {activeFaq === index && (
                  <div style={{ padding: '0 2rem 2rem 2rem', fontFamily: 'monospace', fontSize: '1rem', lineHeight: '1.8', color: theme.textSec, fontWeight: '500', borderTop: `1px dashed ${theme.border}`, paddingTop: '1.5rem', margin: '0 1rem' }}>
                    <span style={{color: theme.purp}}>//</span> {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- 5. TERMINAL INITIATION (CALL TO ACTION) --- */}
      {!user && (
        <div style={{ backgroundColor: theme.bgSec, padding: '6rem 2rem', textAlign: 'center', borderTop: `4px solid #000`, backgroundImage: `linear-gradient(${theme.bg} 1px, transparent 1px), linear-gradient(90deg, ${theme.bg} 1px, transparent 1px)`, backgroundSize: '30px 30px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', backgroundColor: theme.bg, padding: '4rem 2rem', border: `4px solid ${theme.border}`, boxShadow: `12px 12px 0 ${theme.bg}` }}>
            
            <div style={{ fontSize: '0.9rem', fontFamily: 'monospace', fontWeight: '900', color: theme. textSec, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
              // Authentication Gateway
            </div>

            <h2 style={{ fontSize: '3.5rem', fontWeight: '900', color: '#FFF', margin: '0 0 1.5rem 0', textTransform: 'uppercase', letterSpacing: '-1px', lineHeight: '1', textShadow: `0 0 10px ${theme.teal}` }}>
              Initiate Terminal Access
            </h2>
            
            <p style={{ fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 'bold', color: theme.textSec, marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 4rem auto', lineHeight: '1.6' }}>
              Access to the HLE internal database network requires strict identity verification. Please generate your operational profile or provide authorised Clearance credentials below.
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <button style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: '900', fontFamily: 'monospace', border: `3px solid ${theme.pink}`, backgroundColor: 'transparent', color: theme.pink, cursor: 'pointer', transition: 'all 0.15s', textTransform: 'uppercase' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = theme.pink; e.currentTarget.style.color = theme.bg; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = theme.pink; }}>
                  Generate Profile
                </button>
              </Link>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <button style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: '900', fontFamily: 'monospace', border: `3px solid ${theme.teal}`, backgroundColor: 'transparent', color: theme.teal, cursor: 'pointer', transition: 'all 0.15s', textTransform: 'uppercase' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = theme.teal; e.currentTarget.style.color = theme.bg; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = theme.teal; }}>
                  Authorized Login
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