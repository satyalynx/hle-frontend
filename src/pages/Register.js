import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'student',
    admission_number: '',
    employee_id: '',
    hostel_id: '',
    department: '', // 🟢 NEW: Added department for caretaker
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const hostels = [
    { id: 1, name: 'Boys Hostel A' },
    { id: 2, name: 'Boys Hostel B' },
    { id: 3, name: 'Girls Hostel A' },
    { id: 4, name: 'Girls Hostel B' },
  ];

  // 🟢 NEW: Departments list for caretakers
  const departments = [
    { id: 'electrical', name: 'Electrical' },
    { id: 'plumbing', name: 'Plumbing' },
    { id: 'carpentry', name: 'Carpentry' },
    { id: 'cleaning', name: 'Cleaning & Housekeeping' },
    { id: 'internet', name: 'IT & Internet' },
    { id: 'furniture', name: 'Furniture & Maintenance' },
    { id: 'other', name: 'Other Support' },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { strength: 'Weak', color: '#DC2626' };
    if (strength <= 4) return { strength: 'Medium', color: '#F59E0B' };
    return { strength: 'Strong', color: '#10B981' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const submitData = {
      ...formData,
      hostel_id: formData.hostel_id ? parseInt(formData.hostel_id) : null
    };

    try {
      // Register user
      await axiosInstance.post('/auth/register/', submitData);
      
      // Auto-login after registration
      const loginData = {
        identifier: submitData.email,
        password: submitData.password
      };
      
      const loginResponse = await axiosInstance.post('/auth/login/', loginData);
      
      // 🟢 NAYA CODE: Ab hum password bhi parde ke piche bhej rahe hain
      alert('✅ Registration successful! OTP sent to your email.');
      navigate('/login', { state: { email: loginResponse.data.email, password: submitData.password, autoLogin: true } });
      
    } catch (err) {
      console.error('Registration error:', err);
      
      let errorMessage = 'Registration failed. Please try again.';
      
      if (err.response?.data?.detail) {
        if (typeof err.response.data.detail === 'string') {
          errorMessage = err.response.data.detail;
        } else if (Array.isArray(err.response.data.detail)) {
          errorMessage = err.response.data.detail.map(e => e.msg).join(', ');
        } else {
          errorMessage = 'Validation error. Please check all fields.';
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#F3F4F6', padding: '2rem' }}>
      <div style={{ backgroundColor: 'white', padding: '2rem', border: '3px solid #000000', width: '100%', maxWidth: '500px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', fontFamily: 'system-ui' }}>
          Sign up for HLE
        </h1>
        <p style={{ color: '#6B7280', marginBottom: '2rem', fontFamily: 'monospace' }}>
          Create your hostel account
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontFamily: 'monospace' }}>
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.75rem', border: '2px solid #000000', borderRadius: '0', fontFamily: 'monospace' }}
              placeholder="Enter your full name"
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontFamily: 'monospace' }}>
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.75rem', border: '2px solid #000000', borderRadius: '0', fontFamily: 'monospace' }}
              placeholder="your.email@example.com"
            />
          </div>

          <div style={{ marginBottom: '0.5rem' }}>
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
                minLength={8}
                style={{ width: '100%', padding: '0.75rem', paddingRight: '3rem', border: '2px solid #000000', borderRadius: '0', fontFamily: 'monospace' }}
                placeholder="Min 8 characters"
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

          {formData.password && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#6B7280' }}>
                  Strength:
                </span>
                <span style={{ 
                  fontSize: '0.75rem', 
                  fontFamily: 'monospace', 
                  fontWeight: 'bold',
                  color: passwordStrength.color 
                }}>
                  {passwordStrength.strength}
                </span>
              </div>
              <div style={{ fontSize: '0.7rem', color: '#6B7280', fontFamily: 'monospace', lineHeight: '1.4' }}>
                Password should contain:
                <br/>• At least 8 characters (12+ recommended)
                <br/>• Uppercase & lowercase letters
                <br/>• Numbers (0-9)
                <br/>• Special characters (!@#$%^&*)
              </div>
            </div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontFamily: 'monospace' }}>
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              style={{ width: '100%', padding: '0.75rem', border: '2px solid #000000', borderRadius: '0', fontFamily: 'monospace' }}
              placeholder="10-digit mobile number"
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontFamily: 'monospace' }}>
              Role *
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.75rem', border: '2px solid #000000', borderRadius: '0', fontFamily: 'monospace', backgroundColor: 'white' }}
            >
              <option value="student">Student</option>
              <option value="warden">Warden</option>
              <option value="caretaker">Caretaker</option> {/* 🟢 NEW: Caretaker option */}
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* 🟢 FIXED: Warden, Caretaker, and Student need to select a hostel */}
          {(formData.role === 'student' || formData.role === 'caretaker' || formData.role === 'warden') && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontFamily: 'monospace' }}>
                Select Hostel *
              </label>
              <select
                name="hostel_id"
                value={formData.hostel_id}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.75rem', border: '2px solid #000000', borderRadius: '0', fontFamily: 'monospace', backgroundColor: 'white' }}
              >
                <option value="">-- Select your hostel --</option>
                {hostels.map((hostel) => (
                  <option key={hostel.id} value={hostel.id}>
                    {hostel.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 🟢 NEW: Department selection only for caretaker */}
          {formData.role === 'caretaker' && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontFamily: 'monospace' }}>
                Select Department *
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.75rem', border: '2px solid #000000', borderRadius: '0', fontFamily: 'monospace', backgroundColor: 'white' }}
              >
                <option value="">-- Select your department --</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {formData.role === 'student' && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontFamily: 'monospace' }}>
                Admission Number *
              </label>
              <input
                type="text"
                name="admission_number"
                value={formData.admission_number}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.75rem', border: '2px solid #000000', borderRadius: '0', fontFamily: 'monospace' }}
                placeholder="Your admission/roll number"
              />
            </div>
          )}

          {/* 🟢 FIXED: Employee ID is needed for Caretaker too */}
          {(formData.role === 'warden' || formData.role === 'admin' || formData.role === 'caretaker') && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontFamily: 'monospace' }}>
                Employee ID *
              </label>
              <input
                type="text"
                name="employee_id"
                value={formData.employee_id}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.75rem', border: '2px solid #000000', borderRadius: '0', fontFamily: 'monospace' }}
                placeholder="Your employee ID"
              />
            </div>
          )}

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
            {loading ? 'Creating account...' : 'Sign up'}
          </button>

          <div style={{ textAlign: 'center', fontFamily: 'monospace' }}>
            <Link to="/login" style={{ color: '#000000', textDecoration: 'underline' }}>
              Already have an account? Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;