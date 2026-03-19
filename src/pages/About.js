import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  const teamMembers = [
    {
      name: 'Satya Ranjan Rana',
      role: 'Project Lead & Full-Stack Developer',
      image: '/team/satya.jpg', // Replace with actual image path
      description: 'Architected the complete system infrastructure and led end-to-end development of HLE.',
      skills: 'React • FastAPI • PostgreSQL • System Design',
    },
    {
      name: 'Soumya Srikant Majhi',
      role: 'Backend Developer',
      image: '/team/soumya.jpg', // Replace with actual image path
      description: 'Developed robust backend APIs and implemented real-time complaint tracking systems.',
      skills: 'FastAPI • WebSockets • API Development',
    },
    {
      name: 'Krushna Chandra Sahoo',
      role: 'Frontend Developer',
      image: '/team/krushna.jpg', // Replace with actual image path
      description: 'Built responsive user interfaces and implemented interactive dashboard components.',
      skills: 'React • JavaScript • UI Components',
    },
    {
      name: 'Subhransu Biswal',
      role: 'UI/UX Designer & Database Architect',
      image: '/team/subhransu.jpg', // Replace with actual image path
      description: 'Designed the modern retro aesthetic and architected the PostgreSQL database schema.',
      skills: 'Database Design • UI/UX • System Architecture',
    },
  ];

  const features = [
    {
      icon: '🗺️',
      title: 'Maintenance Heatmap',
      description: 'Visual mapping of problem areas across hostel blocks with color-coded zones identifying maintenance hotspots and recurring issues.',
    },
    {
      icon: '🎤',
      title: 'Voice Complaints',
      description: 'AI-powered speech-to-text technology enabling students to report issues in Hindi or English, making the system accessible to everyone.',
    },
    {
      icon: '📸',
      title: 'Photo Verification',
      description: 'Mandatory before/after photo system ensuring accountability and providing visual proof of completed maintenance work.',
    },
    {
      icon: '🌐',
      title: 'Live Public Dashboard',
      description: 'Real-time complaint tracking visible to all stakeholders with auto-refresh capabilities ensuring complete transparency.',
    },
    {
      icon: '📊',
      title: 'AI Mess Analytics',
      description: 'Sentiment analysis of food feedback with automatic categorization helping mess committees improve food quality based on data.',
    },
  ];

  const stats = [
    { number: '100%', label: 'Paperwork Eliminated' },
    { number: '78+', label: 'Features Implemented' },
    { number: '< 24 Hrs', label: 'Avg. Resolution Time' },
    { number: '13', label: 'Core Modules' },
  ];

  const techStack = [
    { category: 'Frontend', items: 'React • JavaScript • CSS' },
    { category: 'Backend', items: 'FastAPI • Python • JWT Auth' },
    { category: 'Database', items: 'PostgreSQL • SQLAlchemy' },
    { category: 'Real-time', items: 'WebSockets • Live Updates' },
    { category: 'Cloud', items: 'Cloudinary • Media Storage' },
    { category: 'Security', items: 'OTP Auth • Role-Based Access' },
  ];

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <Navbar />

      {/* HERO SECTION */}
      <div style={{ 
        backgroundColor: '#FFFFFF',
        padding: '4rem 2rem',
        borderBottom: '3px solid #000000',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: '4rem', 
            fontWeight: 'bold', 
            fontFamily: 'system-ui',
            margin: 0,
            marginBottom: '1rem',
          }}>
            HostelLife Easy
          </h1>
          <div style={{ 
            fontSize: '1.5rem',
            fontFamily: 'monospace',
            marginBottom: '2rem',
            color: '#666',
          }}>
            Digital-First Hostel Management System
          </div>
          <p style={{ 
            fontSize: '1.1rem',
            fontFamily: 'monospace',
            lineHeight: '1.8',
            maxWidth: '900px',
            margin: '0 auto',
            color: '#000',
          }}>
            A comprehensive, enterprise-grade hostel management platform built to eliminate paperwork, 
            speed up maintenance, and optimize hostel life through data-driven decision making and 
            complete digital accountability.
          </p>
        </div>
      </div>

      {/* STATS BANNER */}
      <div style={{ 
        backgroundColor: '#000000',
        padding: '2rem',
        borderBottom: '3px solid #000000',
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2rem',
          textAlign: 'center',
        }}>
          {stats.map((stat, index) => (
            <div key={index}>
              <div style={{ 
                fontSize: '3rem', 
                fontWeight: 'bold', 
                fontFamily: 'system-ui', 
                color: '#FFFFFF',
                marginBottom: '0.5rem' 
              }}>
                {stat.number}
              </div>
              <div style={{ 
                fontSize: '0.875rem', 
                fontFamily: 'monospace', 
                fontWeight: 'bold', 
                textTransform: 'uppercase',
                color: '#FFFFFF',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 2rem' }}>

        {/* MISSION SECTION */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            fontFamily: 'system-ui',
            marginBottom: '2rem',
            borderBottom: '3px solid #000000',
            paddingBottom: '1rem',
          }}>
            Our Mission
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            <div style={{ backgroundColor: 'white', padding: '2rem', border: '3px solid #000000' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '1rem' }}>
                The Problem
              </h3>
              <p style={{ fontFamily: 'monospace', lineHeight: '1.8', color: '#333', margin: 0 }}>
                Traditional hostel management relies on manual register books, physical complaint forms, 
                and warden office visits. This creates bottlenecks, delays resolution, lacks accountability, 
                and provides no data for informed decision-making. Students face long wait times, 
                wardens struggle with tracking, and administrations operate without visibility into 
                recurring maintenance issues.
              </p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '2rem', border: '3px solid #000000' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '1rem' }}>
                Our Solution
              </h3>
              <p style={{ fontFamily: 'monospace', lineHeight: '1.8', color: '#333', margin: 0 }}>
                HLE digitizes the entire hostel management workflow with real-time complaint tracking, 
                photo verification, voice-enabled reporting, and AI-powered analytics. Every action is 
                logged, tracked, and made visible to relevant stakeholders. The system identifies problem 
                patterns through heatmaps, ensures accountability through mandatory photo verification, 
                and provides complete transparency through a live public dashboard.
              </p>
            </div>
          </div>
        </div>

        {/* KEY FEATURES */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            fontFamily: 'system-ui',
            marginBottom: '2rem',
            borderBottom: '3px solid #000000',
            paddingBottom: '1rem',
          }}>
            Key Features
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
            {features.map((feature, index) => (
              <div 
                key={index} 
                style={{ 
                  backgroundColor: 'white', 
                  padding: '2rem', 
                  border: '3px solid #000000',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#EFF6FF';
                  e.currentTarget.style.borderColor = '#2563EB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.borderColor = '#000000';
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '1rem' }}>
                  {feature.title}
                </h3>
                <p style={{ fontFamily: 'monospace', lineHeight: '1.7', color: '#333', margin: 0, fontSize: '0.95rem' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* TEAM SECTION */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            fontFamily: 'system-ui',
            marginBottom: '1rem',
            borderBottom: '3px solid #000000',
            paddingBottom: '1rem',
          }}>
            Meet The Team
          </h2>
          <p style={{ 
            fontFamily: 'monospace', 
            fontSize: '1rem', 
            marginBottom: '2rem',
            color: '#666',
          }}>
            BCA 3rd Year Students • Batch 2023-2026 • CUTM Paralakhemundi
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                style={{ 
                  backgroundColor: 'white', 
                  border: '3px solid #000000',
                  overflow: 'hidden',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '8px 8px 0 #000000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* IMAGE PLACEHOLDER */}
                <div style={{ 
                  width: '100%', 
                  height: '300px', 
                  backgroundColor: '#F3F4F6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottom: '3px solid #000000',
                }}>
                  <div style={{ 
                    fontSize: '5rem',
                    fontFamily: 'monospace',
                    color: '#000000',
                  }}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 'bold', 
                    fontFamily: 'system-ui', 
                    marginBottom: '0.5rem' 
                  }}>
                    {member.name}
                  </h3>
                  <div style={{ 
                    fontSize: '0.875rem', 
                    fontFamily: 'monospace', 
                    fontWeight: 'bold',
                    color: '#2563EB',
                    marginBottom: '1rem',
                  }}>
                    {member.role}
                  </div>
                  <p style={{ 
                    fontFamily: 'monospace', 
                    fontSize: '0.875rem', 
                    lineHeight: '1.6',
                    color: '#333',
                    marginBottom: '1rem',
                  }}>
                    {member.description}
                  </p>
                  <div style={{ 
                    fontSize: '0.75rem', 
                    fontFamily: 'monospace', 
                    color: '#666',
                    padding: '0.5rem',
                    backgroundColor: '#F9FAFB',
                    border: '2px solid #E5E7EB',
                  }}>
                    {member.skills}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TECH STACK */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            fontFamily: 'system-ui',
            marginBottom: '2rem',
            borderBottom: '3px solid #000000',
            paddingBottom: '1rem',
          }}>
            Technology Stack
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {techStack.map((tech, index) => (
              <div key={index} style={{ backgroundColor: 'white', padding: '1.5rem', border: '3px solid #000000' }}>
                <div style={{ 
                  fontSize: '0.875rem', 
                  fontFamily: 'monospace', 
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  color: '#666',
                  marginBottom: '0.75rem',
                }}>
                  {tech.category}
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.95rem', color: '#000' }}>
                  {tech.items}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SYSTEM ARCHITECTURE */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            fontFamily: 'system-ui',
            marginBottom: '2rem',
            borderBottom: '3px solid #000000',
            paddingBottom: '1rem',
          }}>
            System Architecture
          </h2>
          <div style={{ backgroundColor: 'white', padding: '2rem', border: '3px solid #000000' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '1rem' }}>
                  Core Modules
                </h3>
                <ul style={{ fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                  <li>Complaint Management System</li>
                  <li>User Authentication & Authorization</li>
                  <li>Role-Based Access Control</li>
                  <li>Food Management & Analytics</li>
                  <li>Notice Broadcast System</li>
                  <li>Bill Management & Tracking</li>
                  <li>Emergency SOS System</li>
                  <li>Maintenance Heatmap</li>
                </ul>
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '1rem' }}>
                  Database Design
                </h3>
                <ul style={{ fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                  <li>10 Normalized Tables</li>
                  <li>Relational Schema Design</li>
                  <li>Foreign Key Constraints</li>
                  <li>Optimized Indexing</li>
                  <li>Transaction Management</li>
                  <li>Data Integrity Rules</li>
                  <li>Backup & Recovery System</li>
                </ul>
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '1rem' }}>
                  Security Features
                </h3>
                <ul style={{ fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                  <li>JWT Token Authentication</li>
                  <li>Email OTP Verification</li>
                  <li>Password Hashing (bcrypt)</li>
                  <li>CORS Protection</li>
                  <li>SQL Injection Prevention</li>
                  <li>XSS Attack Mitigation</li>
                  <li>Rate Limiting</li>
                  <li>Secure Session Management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* PROJECT SCOPE */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            fontFamily: 'system-ui',
            marginBottom: '2rem',
            borderBottom: '3px solid #000000',
            paddingBottom: '1rem',
          }}>
            Project Scope & Scale
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ backgroundColor: 'white', padding: '2rem', border: '3px solid #000000' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '1rem' }}>
                Development Timeline
              </h3>
              <ul style={{ fontFamily: 'monospace', fontSize: '0.95rem', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                <li><strong>Phase 1:</strong> System Architecture & Database Design (2 weeks)</li>
                <li><strong>Phase 2:</strong> Backend API Development (3 weeks)</li>
                <li><strong>Phase 3:</strong> Frontend UI Implementation (3 weeks)</li>
                <li><strong>Phase 4:</strong> Integration & Testing (2 weeks)</li>
                <li><strong>Phase 5:</strong> Deployment & Documentation (1 week)</li>
              </ul>
            </div>
            <div style={{ backgroundColor: 'white', padding: '2rem', border: '3px solid #000000' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '1rem' }}>
                Technical Metrics
              </h3>
              <ul style={{ fontFamily: 'monospace', fontSize: '0.95rem', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                <li><strong>Lines of Code:</strong> 15,000+</li>
                <li><strong>API Endpoints:</strong> 50+</li>
                <li><strong>Database Tables:</strong> 10</li>
                <li><strong>UI Components:</strong> 40+</li>
                <li><strong>Total Features:</strong> 78+</li>
                <li><strong>User Roles:</strong> 3 (Student, Warden, Admin)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FUTURE ROADMAP */}
        <div>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            fontFamily: 'system-ui',
            marginBottom: '2rem',
            borderBottom: '3px solid #000000',
            paddingBottom: '1rem',
          }}>
            Future Roadmap
          </h2>
          <div style={{ backgroundColor: 'white', padding: '2rem', border: '3px solid #000000' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '0.75rem' }}>
                  v2.0 Features
                </h4>
                <ul style={{ fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                  <li>Mobile App (iOS & Android)</li>
                  <li>Push Notifications</li>
                  <li>WhatsApp Integration</li>
                  <li>Multi-Language Support</li>
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '0.75rem' }}>
                  AI Enhancements
                </h4>
                <ul style={{ fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                  <li>Predictive Maintenance Analytics</li>
                  <li>Automated Priority Assignment</li>
                  <li>Smart Room Allocation</li>
                  <li>Sentiment Trend Analysis</li>
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '0.75rem' }}>
                  Scalability
                </h4>
                <ul style={{ fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                  <li>Multi-Hostel Support</li>
                  <li>University-Wide Deployment</li>
                  <li>Cloud Infrastructure</li>
                  <li>Performance Optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default About;