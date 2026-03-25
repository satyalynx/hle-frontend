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
    department: '',
    room_number: '', // 🟢 NEW: Added Room Number field
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // 🟢 FIXED: CUTM's Actual 7 Hostels
  const hostels = [
    { id: 1, name: 'Biju Patnaik Boys Hostel - Block A' },
    { id: 2, name: 'Biju Patnaik Boys Hostel - Block B' },
    { id: 3, name: 'Biju Patnaik Boys Hostel - Block C' },
    { id: 4, name: 'Jagannath Girls Hostel' },
    { id: 5, name: 'Balabhadra Girls Hostel' },
    { id: 6, name: 'Annapurna Girls Hostel' },
    { id: 7, name: 'Subhadra Girls Hostel' },
  ];

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

  // 🟢 NEW: Enterprise Grade Smart Room Normalizer
  const validateAndFormatRoom = (rawInput, hostelId) => {
    if (!rawInput) return null;
    
    // 1. Extract only numbers from whatever garbage the user typed (e.g. "a-001" -> "001")
    let digits = rawInput.replace(/\D/g, '');
    if (!digits) return null;
    
    let num = parseInt(digits, 10);
    let formatted = "";

    // 2. Validate Ranges & Format to 3 digits
    if (num >= 1 && num <= 10) {
      // Formats 1 to 001, 10 to 010
      formatted = `0${num < 10 ? '0' + num : num}`; 
    } else if (
      (num >= 101 && num <= 110) ||
      (num >= 201 && num <= 210) ||
      (num >= 301 && num <= 310)
    ) {
      formatted = num.toString();
    } else {
      return null; // Invalid range (e.g., 15, 405)
    }

    // 3. Apply Hostel Prefix Logic
    const hId = String(hostelId);
    if (hId === '1') return `A-${formatted}`; // Biju Block A
    if (hId === '2') return `B-${formatted}`; // Biju Block B
    if (hId === '3') return `C-${formatted}`; // Biju Block C
    
    return formatted; // Girls Hostels (No prefix)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let finalRoomNumber = null;

    // 🟢 Apply Smart Validation for Students
    if (formData.role === 'student') {
      finalRoomNumber = validateAndFormatRoom(formData.room_number, formData.hostel_id);
      if (!finalRoomNumber) {
        setError("[ INVALID ROOM NUMBER ] Valid floors are: Ground (001-010), 1st (101-110), 2nd (201-210), and 3rd (301-310).");
        setLoading(false);
        return;
      }
    }

    const submitData = {
      ...formData,
      hostel_id: formData.hostel_id ? parseInt(formData.hostel_id) : null,
      room_number: finalRoomNumber // Pass the cleanly formatted room
    };

    try {
      await axiosInstance.post('/auth/register/', submitData);
      
      const loginData = {
        identifier: submitData.email,
        password: submitData.password
      };
      
      const loginResponse = await axiosInstance.post('/auth/login/', loginData);
      
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
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage.toUpperCase());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#F3F4F6', padding: '2rem' }}>
      <div style={{ backgroundColor: 'white', padding: '2.5rem', border: '4px solid #000000', width: '100%', maxWidth: '550px', boxShadow: '12px 12px 0 #E5E7EB' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '0.5rem', fontFamily: 'system-ui', textTransform: 'uppercase', letterSpacing: '-1px' }}>
          Terminal Access
        </h1>
        <p style={{ color: '#000', backgroundColor: '#E5E7EB', display: 'inline-block', padding: '0.3rem 0.8rem', border: '2px solid #000', fontFamily: 'monospace', fontWeight: 'bold', marginBottom: '2rem' }}>
          INITIALIZE NEW USER PROFILE
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase' }}>
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '1rem', border: '3px solid #000000', borderRadius: '0', fontFamily: 'monospace', fontWeight: 'bold', boxSizing: 'border-box' }}
              placeholder="Enter your legal name"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase' }}>
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '1rem', border: '3px solid #000000', borderRadius: '0', fontFamily: 'monospace', fontWeight: 'bold', boxSizing: 'border-box' }}
              placeholder="your.email@example.com"
            />
          </div>

          <div style={{ marginBottom: '0.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase' }}>
              Security Key (Password) *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                style={{ width: '100%', padding: '1rem', paddingRight: '3rem', border: '3px solid #000000', borderRadius: '0', fontFamily: 'monospace', fontWeight: 'bold', boxSizing: 'border-box' }}
                placeholder="Minimum 8 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem' }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {formData.password && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: '#6B7280', fontWeight: 'bold' }}>STRENGTH:</span>
                <span style={{ fontSize: '0.8rem', fontFamily: 'monospace', fontWeight: '900', color: passwordStrength.color, textTransform: 'uppercase', borderBottom: `2px solid ${passwordStrength.color}` }}>
                  {passwordStrength.strength}
                </span>
              </div>
            </div>
          )}

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase' }}>
              Communication Comms (Phone) *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              style={{ width: '100%', padding: '1rem', border: '3px solid #000000', borderRadius: '0', fontFamily: 'monospace', fontWeight: 'bold', boxSizing: 'border-box' }}
              placeholder="10-digit mobile number"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase' }}>
              System Role *
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '1rem', border: '3px solid #000000', borderRadius: '0', fontFamily: 'monospace', backgroundColor: 'white', fontWeight: '900', cursor: 'pointer' }}
            >
              <option value="student">STUDENT RESIDENT</option>
              <option value="warden">WARDEN (ADMINISTRATION)</option>
              <option value="caretaker">CARETAKER (MAINTENANCE)</option>
              <option value="admin">SYSTEM ADMINISTRATOR</option>
            </select>
          </div>

          {(formData.role === 'student' || formData.role === 'caretaker' || formData.role === 'warden') && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase' }}>
                Base Location (Hostel) *
              </label>
              <select
                name="hostel_id"
                value={formData.hostel_id}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '1rem', border: '3px solid #000000', borderRadius: '0', fontFamily: 'monospace', backgroundColor: '#F9FAFB', fontWeight: '900', cursor: 'pointer' }}
              >
                <option value="">-- SELECT ASSIGNED HOSTEL --</option>
                {hostels.map((hostel) => (
                  <option key={hostel.id} value={hostel.id}>
                    {hostel.name.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 🟢 NEW: Room Number Field for Students */}
          {formData.role === 'student' && formData.hostel_id && (
            <div style={{ marginBottom: '1.5rem', backgroundColor: '#EFF6FF', padding: '1rem', border: '3px dashed #2563EB' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase', color: '#1E3A8A' }}>
                Room Assignment *
              </label>
              <input
                type="text"
                name="room_number"
                value={formData.room_number}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '1rem', border: '3px solid #2563EB', borderRadius: '0', fontFamily: 'monospace', fontWeight: '900', boxSizing: 'border-box' }}
                placeholder="e.g. 101, A-101, or 1"
              />
              <p style={{ fontSize: '0.8rem', color: '#1D4ED8', fontFamily: 'monospace', marginTop: '0.8rem', fontWeight: 'bold', lineHeight: '1.4', margin: '0.8rem 0 0 0' }}>
                * AI FORMATTER ACTIVE: Just type the digits (e.g. "1" or "105"). The system will automatically detect the floor and apply your hostel block prefix.
              </p>
            </div>
          )}

          {formData.role === 'caretaker' && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase' }}>
                Operational Department *
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '1rem', border: '3px solid #000000', borderRadius: '0', fontFamily: 'monospace', backgroundColor: 'white', fontWeight: '900', cursor: 'pointer' }}
              >
                <option value="">-- SELECT DEPARTMENT --</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          )}

          {formData.role === 'student' && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase' }}>
                Registration / Roll Number *
              </label>
              <input
                type="text"
                name="admission_number"
                value={formData.admission_number}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '1rem', border: '3px solid #000000', borderRadius: '0', fontFamily: 'monospace', fontWeight: 'bold', boxSizing: 'border-box' }}
                placeholder="University Roll Number"
              />
            </div>
          )}

          {(formData.role === 'warden' || formData.role === 'admin' || formData.role === 'caretaker') && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase' }}>
                Employee ID *
              </label>
              <input
                type="text"
                name="employee_id"
                value={formData.employee_id}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '1rem', border: '3px solid #000000', borderRadius: '0', fontFamily: 'monospace', fontWeight: 'bold', boxSizing: 'border-box' }}
                placeholder="Institutional Employee ID"
              />
            </div>
          )}

          {error && (
            <div style={{ padding: '1rem', backgroundColor: '#FEF2F2', color: '#DC2626', border: '3px solid #DC2626', marginBottom: '1.5rem', fontFamily: 'monospace', fontWeight: '900' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: loading ? '#9CA3AF' : '#000000',
              color: 'white',
              border: '4px solid #000000',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '900',
              marginBottom: '1.5rem',
              fontFamily: 'monospace',
              fontSize: '1.1rem',
              textTransform: 'uppercase',
              boxShadow: loading ? 'none' : '6px 6px 0 #E5E7EB',
              transition: 'transform 0.1s'
            }}
            onMouseDown={(e) => { if(!loading) e.currentTarget.style.transform = 'translate(2px, 2px)' }}
            onMouseUp={(e) => { if(!loading) e.currentTarget.style.transform = 'translate(0, 0)' }}
          >
            {loading ? 'INITIALIZING...' : 'EXECUTE REGISTRATION'}
          </button>

          <div style={{ textAlign: 'center', fontFamily: 'monospace', fontWeight: 'bold' }}>
            <Link to="/login" style={{ color: '#2563EB', textDecoration: 'none', borderBottom: '2px solid #2563EB' }}>
              ALREADY HAVE CLEARANCE? INITIATE LOGIN
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;