import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ 
      backgroundColor: '#000000',
      color: '#FFFFFF',
      borderTop: '3px solid #000000',
      marginTop: 'auto',
    }}>
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '3rem 2rem 2rem 2rem',
      }}>
        
        {/* MAIN FOOTER CONTENT */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '3rem',
          marginBottom: '3rem',
        }}>
          
          {/* COLUMN 1 - ABOUT */}
          <div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              fontFamily: 'system-ui',
              marginBottom: '1rem',
            }}>
              HLE.
            </h3>
            <p style={{ 
              fontFamily: 'monospace', 
              fontSize: '0.875rem',
              lineHeight: '1.6',
              color: '#D1D5DB',
            }}>
              Digital-first hostel management system built to eliminate paperwork and optimize hostel life.
            </p>
          </div>

          {/* COLUMN 2 - QUICK LINKS */}
          <div>
            <h4 style={{ 
              fontSize: '0.875rem', 
              fontWeight: 'bold', 
              fontFamily: 'monospace',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              color: '#9CA3AF',
            }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link to="/dashboard" style={footerLinkStyle}>Dashboard</Link>
              <Link to="/complaints" style={footerLinkStyle}>Complaints</Link>
              <Link to="/food" style={footerLinkStyle}>Food Hub</Link>
              <Link to="/notices" style={footerLinkStyle}>Notices</Link>
              <Link to="/heatmap" style={footerLinkStyle}>Heatmap</Link>
              <Link to="/public-dashboard" style={footerLinkStyle}>Public Dashboard</Link>
            </div>
          </div>

          {/* COLUMN 3 - SUPPORT */}
          <div>
            <h4 style={{ 
              fontSize: '0.875rem', 
              fontWeight: 'bold', 
              fontFamily: 'monospace',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              color: '#9CA3AF',
            }}>
              Support
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link to="/about" style={footerLinkStyle}>About Us</Link>
              <Link to="/help" style={footerLinkStyle}>Help & FAQ</Link>
              <a href="mailto:support@hle.edu.in" style={footerLinkStyle}>Contact</a>
              <Link to="/emergency-sos" style={footerLinkStyle}>Emergency SOS</Link>
            </div>
          </div>

          {/* COLUMN 4 - LEGAL */}
          <div>
            <h4 style={{ 
              fontSize: '0.875rem', 
              fontWeight: 'bold', 
              fontFamily: 'monospace',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              color: '#9CA3AF',
            }}>
              Legal
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href="#" style={footerLinkStyle}>Privacy Policy</a>
              <a href="#" style={footerLinkStyle}>Terms of Service</a>
              <a href="#" style={footerLinkStyle}>Cookie Policy</a>
              <a href="#" style={footerLinkStyle}>Data Security</a>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div style={{ 
          borderTop: '1px solid #374151',
          paddingTop: '2rem',
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}>
            {/* COPYRIGHT */}
            <div style={{ 
              fontFamily: 'monospace', 
              fontSize: '0.875rem',
              color: '#9CA3AF',
            }}>
              © {currentYear} HostelLife Easy. All rights reserved.
            </div>

            {/* TECH BADGE */}
            <div style={{ 
              fontFamily: 'monospace', 
              fontSize: '0.75rem',
              color: '#6B7280',
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
            }}>
              <span>Built with</span>
              <span style={{ color: '#3B82F6' }}>React</span>
              <span>•</span>
              <span style={{ color: '#10B981' }}>FastAPI</span>
              <span>•</span>
              <span style={{ color: '#8B5CF6' }}>PostgreSQL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const footerLinkStyle = {
  color: '#D1D5DB',
  textDecoration: 'none',
  fontFamily: 'monospace',
  fontSize: '0.875rem',
  transition: 'color 0.2s',
};

// Add hover effect
if (typeof window !== 'undefined') {
  document.addEventListener('mouseover', (e) => {
    if (e.target.style.color === 'rgb(209, 213, 219)') {
      e.target.style.color = '#FFFFFF';
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.style.color === 'rgb(255, 255, 255)' && e.target.style.fontSize === '0.875rem') {
      e.target.style.color = '#D1D5DB';
    }
  });
}

export default Footer;