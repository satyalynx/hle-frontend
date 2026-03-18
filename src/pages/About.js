import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#2563EB' }}>HLE</h1>
          <p style={{ fontSize: '1.25rem', color: '#6B7280', marginBottom: '2rem' }}>Hostel Life Easy</p>
          
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>About the Platform</h2>
            <p style={{ color: '#374151', lineHeight: '1.6', marginBottom: '1rem' }}>
              HLE is a comprehensive hostel management system designed to streamline hostel operations and improve student experience. 
              The platform connects students, wardens, and caretakers in a unified digital ecosystem.
            </p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Key Features</h2>
            <ul style={{ color: '#374151', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
              <li>Complaint Management with photo documentation</li>
              <li>Digital Notice Board for announcements</li>
              <li>Mess Menu & Feedback System</li>
              <li>Monthly Bill Tracking</li>
              <li>Role-based Access Control</li>
              <li>Real-time Status Updates</li>
            </ul>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Contact Information</h2>
            <p style={{ color: '#374151', lineHeight: '1.6' }}>
              <strong>Email:</strong> support@hle.edu.in<br/>
              <strong>Phone:</strong> +91 1234567890<br/>
              <strong>Address:</strong> Utkal University, Bhubaneswar, Odisha
            </p>
          </div>

          <div style={{ padding: '1rem', backgroundColor: '#EFF6FF', borderRadius: '4px', borderLeft: '4px solid #2563EB' }}>
            <p style={{ fontSize: '0.875rem', color: '#1E40AF' }}>
              © 2026 HLE - Hostel Life Easy. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
