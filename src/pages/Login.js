import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// 🟢 axiosInstance yahan se hata diya kyunki ab saari calls useAuth (AuthContext) sambhalega

const Login = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    otp: ''
  });
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // 🟢 FIXED: Yahan verifyOtp ko bhi AuthContext se import kar liya
  const { login, verifyOtp } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation();

  // 🟢 FIXED: Registration se aate waqt password ko bhi save karega
  useEffect(() => {
    if (location.state?.email && location.state?.autoLogin) {
      setEmail(location.state.email);
      setFormData(prev => ({
        ...prev,
        identifier: location.state.email,
        password: location.state.password || '' // password yahan save ho gaya
      }));
      setStep(2);
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOTPChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 6) {
      setFormData({ ...formData, otp: value });
    }
  };

  const handleStep1Submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 🟢 FIXED: AuthContext wala login() call kiya hai. (Isme token save nahi hota, sirf OTP jata hai)
      const data = await login(formData.identifier, formData.password);

      if (data.require_otp) {
        setEmail(data.email);
        setStep(2);
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 🟢 FIXED: AuthContext wala verifyOtp() call kiya. (Ye token save karega aur user set karega)
      await verifyOtp(email, formData.otp);

      // Agar sab sahi raha toh Dashboard pe bhej do
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  // 🟢 FIXED: Ab Resend dabane par password gayab nahi hoga
  const handleResendOTP = async () => {
    setLoading(true);
    setError('');
    try {
      await login(formData.identifier || email, formData.password);
      alert('✅ A new OTP has been sent to your registered email.');
      setFormData({ ...formData, otp: '' });
    } catch (err) {
      setError('Failed to resend OTP. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  if (step === 1) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#F3F4F6', padding: '2rem' }}>
        <div style={{ backgroundColor: 'white', padding: '2rem', border: '3px solid #000000', width: '100%', maxWidth: '450px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', fontFamily: 'system-ui' }}>
            Log in to HLE
          </h1>
          <p style={{ color: '#6B7280', marginBottom: '2rem', fontFamily: 'monospace' }}>
            Enter your credentials
          </p>

          <form onSubmit={handleStep1Submit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontFamily: 'monospace' }}>
                Email / Phone / ID *
              </label>
              <input
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.75rem', border: '2px solid #000000', borderRadius: '0', fontFamily: 'monospace' }}
                placeholder="Enter email, phone, or admission/employee ID"
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontFamily: 'monospace' }}>
                Password *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '0.75rem', paddingRight: '3rem', border: '2px solid #000000', borderRadius: '0', fontFamily: 'monospace' }}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.25rem',
                    padding: '0.5rem',
                  }}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ padding: '0.75rem', backgroundColor: '#FEE2E2', color: '#DC2626', border: '2px solid #DC2626', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: loading ? '#9CA3AF' : '#000000',
                color: 'white',
                border: '2px solid #000000',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                marginBottom: '1rem',
                fontFamily: 'monospace',
              }}
            >
              {loading ? 'Checking...' : 'Continue'}
            </button>

            <div style={{ textAlign: 'center', fontFamily: 'monospace' }}>
              <Link to="/register" style={{ color: '#000000', textDecoration: 'underline' }}>
                Don't have an account? Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#F3F4F6', padding: '2rem' }}>
      <div style={{ backgroundColor: 'white', padding: '2rem', border: '3px solid #000000', width: '100%', maxWidth: '450px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', fontFamily: 'system-ui' }}>
          Enter OTP
        </h1>
        <p style={{ color: '#6B7280', marginBottom: '1.5rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>
          A 6-digit code has been generated for<br/><strong>{email}</strong>
        </p>

        <form onSubmit={handleOTPSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontFamily: 'monospace' }}>
              OTP Code *
            </label>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleOTPChange}
              required
              maxLength={6}
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                border: '2px solid #000000', 
                borderRadius: '0', 
                fontFamily: 'monospace',
                fontSize: '1.5rem',
                letterSpacing: '0.5rem',
                textAlign: 'center'
              }}
              placeholder="000000"
            />
          </div>

          {error && (
            <div style={{ padding: '0.75rem', backgroundColor: '#FEE2E2', color: '#DC2626', border: '2px solid #DC2626', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || formData.otp.length !== 6}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: (loading || formData.otp.length !== 6) ? '#9CA3AF' : '#000000',
              color: 'white',
              border: '2px solid #000000',
              cursor: (loading || formData.otp.length !== 6) ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              marginBottom: '1rem',
              fontFamily: 'monospace',
            }}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: '0.875rem' }}>
            <button
              type="button"
              onClick={() => setStep(1)}
              style={{ background: 'none', border: 'none', color: '#000000', textDecoration: 'underline', cursor: 'pointer' }}
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={loading}
              style={{ background: 'none', border: 'none', color: '#000000', textDecoration: 'underline', cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              Resend OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;