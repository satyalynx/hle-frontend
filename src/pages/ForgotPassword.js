import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#F3F4F6' }}>
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563EB', marginBottom: '0.5rem' }}>Forgot Password?</h1>
        <p style={{ color: '#6B7280', marginBottom: '2rem' }}>Enter your email to reset password</p>

        {!sent ? (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px' }}
                placeholder="your.email@example.com"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: loading ? '#9CA3AF' : '#2563EB',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontWeight: '500',
                marginBottom: '1rem',
              }}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
            <div style={{ textAlign: 'center' }}>
              <Link to="/login" style={{ color: '#2563EB', textDecoration: 'none', fontSize: '0.875rem' }}>
                ← Back to Login
              </Link>
            </div>
          </form>
        ) : (
          <div>
            <div style={{ padding: '1rem', backgroundColor: '#D1FAE5', borderRadius: '4px', marginBottom: '1.5rem' }}>
              <p style={{ color: '#065F46', fontSize: '0.875rem' }}>
                ✓ Password reset link sent to <strong>{email}</strong>
              </p>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '1rem' }}>
              Check your email and click the link to reset your password.
            </p>
            <Link to="/login">
              <button style={{ width: '100%', padding: '0.75rem', backgroundColor: '#2563EB', color: 'white', border: 'none', borderRadius: '4px', fontWeight: '500' }}>
                Go to Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
