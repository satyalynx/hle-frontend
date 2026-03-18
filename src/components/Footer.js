import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#000000',
      color: 'white',
      padding: '48px 24px 24px',
      marginTop: '0',
      borderTop: '3px solid #000000',
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
          gap: '48px',
          marginBottom: '48px',
        }}>
          
          <div>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              marginBottom: '16px',
              fontFamily: 'monospace',
            }}>
              Get the app
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'monospace' }}>
              <a href="#" style={{ color: 'white', textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}>
                iOS
              </a>
              <a href="#" style={{ color: 'white', textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}>
                Android
              </a>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', fontFamily: 'monospace' }}>
              Quick links
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'monospace' }}>
              <Link to="/complaints" style={{ color: 'white', textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}>
                Complaints
              </Link>
              <Link to="/heatmap" style={{ color: 'white', textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}>
                Heatmap
              </Link>
              <Link to="/mess-menu" style={{ color: 'white', textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}>
                Mess Menu
              </Link>
              <Link to="/help" style={{ color: 'white', textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}>
                Help Centre
              </Link>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', fontFamily: 'monospace' }}>
              Policies
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'monospace' }}>
              <Link to="/about" style={{ color: 'white', textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}>
                Terms of Service
              </Link>
              <Link to="/about" style={{ color: 'white', textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}>
                Privacy Policy
              </Link>
            </div>
          </div>

        </div>

        <div style={{ borderTop: '2px solid #2D2D2D', paddingTop: '24px' }}>
          <p style={{ color: 'white', fontSize: '16px', fontFamily: 'monospace', margin: 0 }}>
            © 2026 HLE - Hostel Life Easy
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
