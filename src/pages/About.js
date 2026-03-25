import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  // ==========================================
  // DATA STRUCTURES (HEAVY DOCUMENTATION)
  // ==========================================

  const teamMembers = [
    {
      name: 'Satya Ranjan Rana',
      role: 'Project Lead & Backend Architect',
      image: 'S', 
      description: 'Engineered the core REST API, JWT cryptographic security layers, database schema, and asynchronous live telemetry endpoints.',
      responsibilities: ['API Gateway Design', 'Auth Flow (OTP/JWT)', 'Database Migration', 'System Deployment'],
      skills: 'FastAPI • Python • SQLite/PostgreSQL • System Architecture',
      borderColor: '#DC2626',
      bgColor: '#FEF2F2'
    },
    {
      name: 'Soumya Srikant Majhi',
      role: 'UI/UX & System Documentation',
      image: 'M',
      description: 'Designed the brutalist enterprise interface guidelines and compiled comprehensive technical documentation for the entire project lifecycle.',
      responsibilities: ['Wireframing', 'Brutalist UI Guidelines', 'User Flow Optimization', 'Technical Docs'],
      skills: 'UI/UX Design • Figma • Technical Writing • Human-Computer Interaction',
      borderColor: '#2563EB',
      bgColor: '#EFF6FF'
    },
    {
      name: 'Krushna Chandra Sahoo',
      role: 'Frontend Development',
      image: 'K',
      description: 'Implemented modular React components, complex state management, and integrated secure backend APIs with the client interface.',
      responsibilities: ['Component Architecture', 'State Management (Context API)', 'Axios Interceptors', 'Routing'],
      skills: 'React.js • JavaScript (ES6+) • CSS/Inline Styling • DOM Manipulation',
      borderColor: '#10B981',
      bgColor: '#ECFDF5'
    },
    {
      name: 'Subhransu Biswal',
      role: 'Database & Network Ops',
      image: 'B',
      description: 'Managed relational database modeling, complex query optimization, cloud hosting deployments, and network routing policies.',
      responsibilities: ['Schema Normalization', 'Index Optimization', 'Server Maintenance', 'Vercel/Render CI/CD'],
      skills: 'Relational Databases • Cloud Ops • CI/CD Pipelines • Network Security',
      borderColor: '#F59E0B',
      bgColor: '#FFFBEB'
    },
  ];

  const features = [
    {
      id: 'MOD-01',
      title: 'LIVE COMMAND CENTER',
      subtitle: 'Real-time Infrastructure Telemetry',
      description: 'A live telemetry heatmap that actively monitors infrastructure faults across all building blocks. It flags chronic issues through algorithmic detection and tracks the operational queue of maintenance staff in real-time, ensuring strict SLAs (Service Level Agreements) are met.',
    },
    {
      id: 'MOD-02',
      title: 'MASTER FINANCE LEDGER',
      subtitle: 'Secure Institutional Accounting',
      description: 'A secure financial clearinghouse handling vendor payouts, maintenance budgets, and institutional fee records. Features strict role-based clearance levels, restricting final settlement authorization exclusively to High-Level System Administrators to prevent financial discrepancies.',
    },
    {
      id: 'MOD-03',
      title: 'PUBLIC EXPOSE METER',
      subtitle: 'Immutable Public Audit System',
      description: 'An immutable, real-time public rating system for the mess and catering facility. It aggregates daily student feedback into a global performance metric (Mess Performance Index). This data is strictly read-only for administrators, enforcing absolute transparency and quality compliance.',
    },
    {
      id: 'MOD-04',
      title: 'SYSTEM BROADCASTS',
      subtitle: 'Emergency & Routine Directives',
      description: 'An official directive transmission network. Replaces legacy physical notice boards with high-priority digital alerts. Broadcasts are categorized by severity (General, Urgent, Maintenance) and instantly pushed to all registered client terminals to ensure critical information delivery.',
    },
  ];

  const securityProtocols = [
    {
      title: 'CRYPTOGRAPHIC AUTHENTICATION',
      detail: 'Utilization of JSON Web Tokens (JWT) with HS256 algorithm for stateless, secure session management. Passwords are salted and hashed using bcrypt before persistence.'
    },
    {
      title: 'MULTI-FACTOR VERIFICATION',
      detail: 'Integration of Brevo SMTP engine to deliver time-sensitive, one-time passwords (OTP) for identity verification during terminal access attempts.'
    },
    {
      title: 'ROLE-BASED ACCESS CONTROL (RBAC)',
      detail: 'Strict architectural segregation between Student, Caretaker, Warden, and Admin privileges. Route guarding at both the React Router layer and FastAPI endpoint layer.'
    },
    {
      title: 'DATA INTEGRITY',
      detail: 'Implementation of SQLAlchemy ORM to prevent SQL Injection attacks. Strict schema validation using Pydantic models to ensure payload consistency.'
    }
  ];

  const apiInfrastructure = [
    { route: '/auth/*', method: 'POST', purpose: 'Identity verification, JWT generation, and OTP dispatch.' },
    { route: '/complaints/*', method: 'GET/POST/PUT', purpose: 'CRUD operations for maintenance tickets and status mutations.' },
    { route: '/mess/analytics/*', method: 'GET', purpose: 'Aggregation of feedback data for the Public Expose Meter.' },
    { route: '/bills/*', method: 'GET/PUT', purpose: 'Financial ledger retrieval and administrative settlement execution.' },
    { route: '/public/live-dashboard/*', method: 'GET', purpose: 'Asynchronous fetch of real-time telemetry for the Command Center.' },
  ];

  const stats = [
    { number: '100%', label: 'DIGITAL TELEMETRY' },
    { number: 'ZERO', label: 'LEGACY PAPERWORK' },
    { number: 'LIVE', label: 'PUBLIC AUDIT CAPABILITY' },
    { number: 'RBAC', label: 'SECURE ACCESS CONTROL' },
  ];

  // ==========================================
  // RENDER LOGIC
  // ==========================================

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Navbar />

      {/* HERO SECTION - ENTERPRISE HEADER */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '6rem 2rem', borderBottom: '4px solid #000000', textAlign: 'center', backgroundImage: 'linear-gradient(#F3F4F6 1px, transparent 1px), linear-gradient(90deg, #F3F4F6 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', backgroundColor: '#FFF', padding: '2rem', border: '4px solid #000', boxShadow: '12px 12px 0 #000' }}>
          <div style={{ display: 'inline-block', backgroundColor: '#000', color: '#FFF', padding: '0.4rem 1rem', fontSize: '1rem', fontFamily: 'monospace', fontWeight: '900', marginBottom: '1.5rem', letterSpacing: '2px' }}>
            VERSION 1.0.0-STABLE
          </div>
          <h1 style={{ fontSize: '4.5rem', fontWeight: '900', fontFamily: 'system-ui', margin: '0 0 1.5rem 0', textTransform: 'uppercase', letterSpacing: '-2px', lineHeight: '1' }}>
            Hostel Life Easy
          </h1>
          <p style={{ fontSize: '1.2rem', fontFamily: 'monospace', lineHeight: '1.8', maxWidth: '900px', margin: '0 auto', color: '#111827', fontWeight: 'bold' }}>
            A centralized, robust facility management architecture engineered to bridge the operational gap between institutional administration and student residents. HLE digitizes infrastructure monitoring, financial settlements, and resource allocation into a single, cohesive command center.
          </p>
        </div>
      </div>

      {/* DATA TELEMETRY BANNER */}
      <div style={{ backgroundColor: '#000000', padding: '3rem 2rem', borderBottom: '4px solid #000000' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          {stats.map((stat, index) => (
            <div key={index} style={{ borderRight: index !== stats.length - 1 ? '2px solid #374151' : 'none' }}>
              <div style={{ fontSize: '4rem', fontWeight: '900', fontFamily: 'system-ui', color: '#FFFFFF', marginBottom: '0.5rem', lineHeight: '1' }}>
                {stat.number}
              </div>
              <div style={{ fontSize: '0.9rem', fontFamily: 'monospace', fontWeight: '900', textTransform: 'uppercase', color: '#38BDF8', letterSpacing: '1px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '4rem 2rem' }}>

        {/* CORE MODULES SECTION */}
        <div style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem', borderBottom: '4px solid #000000', paddingBottom: '1rem' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#000' }}></div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', fontFamily: 'system-ui', margin: 0, textTransform: 'uppercase', letterSpacing: '-1px' }}>
              System Architecture & Modules
            </h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2.5rem' }}>
            {features.map((feature, index) => (
              <div key={index} style={{ backgroundColor: 'white', padding: '2.5rem', border: '4px solid #000000', boxShadow: '8px 8px 0 #E5E7EB', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <span style={{ backgroundColor: '#000', color: '#FFF', padding: '0.3rem 0.6rem', fontFamily: 'monospace', fontWeight: '900', fontSize: '0.8rem' }}>
                    {feature.id}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '900', fontFamily: 'system-ui', margin: '0 0 0.5rem 0', color: '#000' }}>
                  {feature.title}
                </h3>
                <h4 style={{ fontSize: '1rem', fontWeight: '900', fontFamily: 'monospace', margin: '0 0 1.5rem 0', color: '#6B7280', textTransform: 'uppercase' }}>
                  // {feature.subtitle}
                </h4>
                <p style={{ fontFamily: 'monospace', lineHeight: '1.8', color: '#111827', margin: 0, fontSize: '1rem', fontWeight: '500', flex: 1 }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECURITY & API INFRASTRUCTURE (HEAVY TECH DOCS) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '3rem', marginBottom: '6rem' }}>
          
          {/* Security Protocols */}
          <div style={{ backgroundColor: '#000', color: '#FFF', padding: '3rem', border: '4px solid #000', boxShadow: '12px 12px 0 #E5E7EB' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '900', fontFamily: 'system-ui', margin: '0 0 2rem 0', textTransform: 'uppercase', color: '#10B981', borderBottom: '2px solid #374151', paddingBottom: '1rem' }}>
              Security & Compliance
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {securityProtocols.map((protocol, idx) => (
                <div key={idx}>
                  <h3 style={{ fontSize: '1.1rem', fontFamily: 'monospace', fontWeight: '900', margin: '0 0 0.5rem 0', color: '#FFF' }}>
                    [ {protocol.title} ]
                  </h3>
                  <p style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#9CA3AF', margin: 0, lineHeight: '1.6' }}>
                    {protocol.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* API Infrastructure */}
          <div style={{ backgroundColor: '#FFF', padding: '3rem', border: '4px solid #000', boxShadow: '12px 12px 0 #E5E7EB' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '900', fontFamily: 'system-ui', margin: '0 0 2rem 0', textTransform: 'uppercase', color: '#000', borderBottom: '4px solid #000', paddingBottom: '1rem' }}>
              REST API Endpoints
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {apiInfrastructure.map((api, idx) => (
                <div key={idx} style={{ borderBottom: idx !== apiInfrastructure.length - 1 ? '2px dashed #E5E7EB' : 'none', paddingBottom: idx !== apiInfrastructure.length - 1 ? '1.5rem' : '0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <span style={{ backgroundColor: api.method.includes('GET') ? '#DBEAFE' : (api.method.includes('POST') ? '#D1FAE5' : '#FEF3C7'), color: '#000', padding: '0.2rem 0.5rem', fontFamily: 'monospace', fontWeight: '900', fontSize: '0.8rem', border: '2px solid #000' }}>
                      {api.method}
                    </span>
                    <span style={{ fontFamily: 'monospace', fontWeight: '900', fontSize: '1.1rem' }}>{api.route}</span>
                  </div>
                  <p style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#4B5563', margin: 0, fontWeight: 'bold' }}>
                    {api.purpose}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RELEASE NOTES / CHANGELOG */}
        <div style={{ marginBottom: '6rem', backgroundColor: '#FFF', padding: '3rem', border: '4px solid #000' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '900', fontFamily: 'system-ui', margin: '0 0 2rem 0', textTransform: 'uppercase', borderBottom: '4px solid #000', paddingBottom: '1rem' }}>
            Official Release Notes
          </h2>
          <div style={{ fontFamily: 'monospace' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#2563EB', marginBottom: '1rem' }}>v1.0.0-STABLE (Production Launch)</h3>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, lineHeight: '2', fontWeight: 'bold', color: '#111827', fontSize: '1rem' }}>
              <li>[+] Initialized core SQLite/PostgreSQL database schema with 10 normalized tables.</li>
              <li>[+] Deployed Brutalist Enterprise UI using React.js and dynamic CSS grid structures.</li>
              <li>[+] Integrated Brevo SMTP engine for secure OTP dispatch protocols.</li>
              <li>[+] Activated Live Command Center with auto-refreshing telemetry logic.</li>
              <li>[+] Executed Role-Based Access Control (RBAC) across all frontend views and backend routers.</li>
              <li>[-] Deprecated legacy voice-complaint modules to enforce strict structural data integrity.</li>
            </ul>
          </div>
        </div>

        {/* TEAM SECTION (EXPANDED) */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', borderBottom: '4px solid #000000', paddingBottom: '1rem' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#000' }}></div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', fontFamily: 'system-ui', margin: 0, textTransform: 'uppercase', letterSpacing: '-1px' }}>
              Engineering Team
            </h2>
          </div>
          <p style={{ fontFamily: 'monospace', fontSize: '1rem', marginBottom: '3rem', color: '#4B5563', fontWeight: 'bold', textTransform: 'uppercase' }}>
            ACADEMIC IDENTIFICATION: BCA 3RD YEAR • BATCH 2023-2026 • CUTM PARALAKHEMUNDI
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {teamMembers.map((member, index) => (
              <div key={index} style={{ backgroundColor: 'white', border: '4px solid #000000', borderTop: `8px solid ${member.borderColor}`, boxShadow: '8px 8px 0 #E5E7EB', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '2rem', flex: 1 }}>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: '900', fontFamily: 'system-ui', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>
                    {member.name}
                  </h3>
                  <div style={{ fontSize: '0.85rem', fontFamily: 'monospace', fontWeight: '900', color: member.borderColor, marginBottom: '1.5rem', backgroundColor: member.bgColor, display: 'inline-block', padding: '0.4rem 0.8rem', border: `2px solid ${member.borderColor}` }}>
                    [ {member.role.toUpperCase()} ]
                  </div>
                  <p style={{ fontFamily: 'monospace', fontSize: '0.95rem', lineHeight: '1.6', color: '#111827', margin: '0 0 1.5rem 0', fontWeight: 'bold' }}>
                    {member.description}
                  </p>
                  
                  {/* Detailed Responsibilities List */}
                  <div style={{ marginTop: '1.5rem' }}>
                    <strong style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#6B7280', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Core Operations:</strong>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0, fontFamily: 'monospace', fontSize: '0.85rem', fontWeight: 'bold', color: '#111827', lineHeight: '1.8' }}>
                      {member.responsibilities.map((resp, i) => (
                        <li key={i}>&gt; {resp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div style={{ backgroundColor: '#000', padding: '1.5rem', borderTop: '4px solid #000', fontFamily: 'monospace', fontSize: '0.85rem', fontWeight: 'bold', color: '#FFF' }}>
                  STACK: {member.skills}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default About;