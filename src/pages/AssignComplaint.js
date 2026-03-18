import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { API_ENDPOINTS } from '../api/config';
import Navbar from '../components/Navbar';

const AssignComplaint = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [caretakers, setCaretakers] = useState([]);
  
  const [assignedTo, setAssignedTo] = useState('');
  const [payoutAmount, setPayoutAmount] = useState(''); // 🟢 NEW: Budget State

  useEffect(() => {
    fetchCaretakers();
  }, []);

  const fetchCaretakers = async () => {
    try {
      const response = await axiosInstance.get('/auth/users/');
      const allUsers = response.data;
      setCaretakers(allUsers.filter(u => u.role === 'caretaker'));
    } catch (error) {
      console.error('Failed to fetch caretakers:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!assignedTo) {
      setError('Please select an operator.');
      return;
    }
    if (!payoutAmount || isNaN(payoutAmount) || Number(payoutAmount) < 0) {
      setError('Please enter a valid payout amount.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 🟢 SMART LOGIC: Sending the assigned person AND the budget for the task
      await axiosInstance.put(`${API_ENDPOINTS.COMPLAINTS}${id}/assign`, {
        assigned_to: parseInt(assignedTo),
        payout_amount: parseFloat(payoutAmount) // Ensure your backend accepts this field!
      });
      alert('✅ Work Order Generated & Assigned Successfully!');
      navigate(`/complaints/${id}`);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to assign task.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Navbar />
      <div style={{ padding: '4rem 2rem', maxWidth: '700px', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'inline-block', backgroundColor: '#000', color: '#FFF', padding: '0.2rem 0.8rem', fontFamily: 'monospace', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            TICKET #{id}
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-1px', margin: 0, textTransform: 'uppercase' }}>
            Generate Work Order
          </h1>
          <p style={{ color: '#6B7280', fontFamily: 'monospace', fontWeight: '600', marginTop: '0.5rem' }}>
            Assign operator and allocate task budget.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ backgroundColor: '#FFF', padding: '3rem', border: '4px solid #000', boxShadow: '12px 12px 0 #E5E7EB' }}>
          
          {/* OPERATOR SELECTION */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase', fontSize: '0.9rem' }}>
              Assign Operator (Caretaker)
            </label>
            <select 
              value={assignedTo} 
              onChange={(e) => setAssignedTo(e.target.value)} 
              required 
              style={{ width: '100%', padding: '1rem', border: '3px solid #000', borderRadius: '0', fontFamily: 'monospace', backgroundColor: '#F9FAFB', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}
            >
              <option value="">-- SELECT AVAILABLE OPERATOR --</option>
              {caretakers.map((ct) => (
                <option key={ct.id} value={ct.id}>
                  {ct.name} {ct.department ? `[${ct.department.toUpperCase()}]` : '[GENERAL]'}
                </option>
              ))}
            </select>
          </div>

          {/* 🟢 NEW: BUDGET ALLOCATION */}
          <div style={{ marginBottom: '2.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase', fontSize: '0.9rem', color: '#059669' }}>
              Task Budget / Payout Amount (₹)
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem', fontWeight: '900', color: '#6B7280' }}>₹</span>
              <input 
                type="number" 
                min="0"
                step="0.01"
                value={payoutAmount} 
                onChange={(e) => setPayoutAmount(e.target.value)} 
                placeholder="e.g. 500.00"
                required 
                style={{ width: '100%', padding: '1rem 1rem 1rem 2.5rem', border: '3px solid #059669', borderRadius: '0', fontFamily: 'monospace', backgroundColor: '#ECFDF5', fontSize: '1.2rem', fontWeight: '900', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>
            <p style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#6B7280', marginTop: '0.5rem', fontWeight: 'bold' }}>
              *This amount will be credited to the operator's ledger ONLY AFTER the resolution is verified by you.
            </p>
          </div>

          {error && (
            <div style={{ padding: '1rem', backgroundColor: '#000', color: '#EF4444', border: '3px solid #EF4444', marginBottom: '1.5rem', fontFamily: 'monospace', fontWeight: 'bold' }}>
              [ERROR]: {error}
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              type="submit" 
              disabled={loading} 
              style={{ flex: 2, padding: '1rem', backgroundColor: loading ? '#9CA3AF' : '#7C3AED', color: 'white', border: '3px solid #000', fontWeight: '900', fontFamily: 'monospace', fontSize: '1.1rem', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: loading ? 'none' : '4px 4px 0 #000', transition: 'transform 0.1s' }}
              onMouseDown={(e) => !loading && (e.currentTarget.style.transform = 'translate(4px, 4px)')} 
              onMouseUp={(e) => !loading && (e.currentTarget.style.transform = 'translate(0, 0)')}
            >
              {loading ? 'PROCESSING...' : 'AUTHORIZE & ASSIGN'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate(`/complaints/${id}`)} 
              style={{ flex: 1, padding: '1rem', backgroundColor: '#FFFFFF', color: '#000000', border: '3px solid #000000', fontWeight: '900', fontFamily: 'monospace', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '4px 4px 0 #000', transition: 'transform 0.1s' }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'translate(4px, 4px)'} 
              onMouseUp={(e) => e.currentTarget.style.transform = 'translate(0, 0)'}
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignComplaint;