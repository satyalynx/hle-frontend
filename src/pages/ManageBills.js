import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { API_ENDPOINTS } from '../api/config';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const ManageBills = () => {
  const { user } = useAuth();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterMode, setFilterMode] = useState('all');

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await axiosInstance.get('/bills/'); 
      setBills(response.data);
    } catch (error) {
      console.error('Failed to fetch ledger:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsPaid = async (id) => {
    if (user?.role !== 'admin') {
      alert("UNAUTHORIZED: Only Admin Accounts can settle finances.");
      return;
    }
    if (!window.confirm("CONFIRMATION: Settle this amount in the master ledger?")) return;

    try {
      await axiosInstance.put(`/bills/${id}/status`, { 
        payment_status: 'paid'
      });
      fetchBills();
      alert('✅ Account Settled Successfully');
    } catch (error) {
      alert('❌ Failed to update ledger');
    }
  };

  if (loading) return <div><Navbar /><div style={{ padding: '4rem', textAlign: 'center', fontFamily: 'monospace', fontWeight: '900', fontSize: '1.5rem', textTransform: 'uppercase' }}>[ LOADING MASTER LEDGER... ]</div></div>;

  const isAdmin = user?.role === 'admin';

  // Basic filtering to simulate Student Dues vs Caretaker Payouts
  const displayRecords = bills.filter(b => {
    if (filterMode === 'pending') return b.payment_status !== 'paid';
    if (filterMode === 'settled') return b.payment_status === 'paid';
    return true;
  });

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', paddingBottom: '4rem', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Navbar />
      <div style={{ padding: '3rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', borderBottom: '4px solid #000', paddingBottom: '1rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '3rem', fontWeight: '900', margin: '0 0 0.5rem 0', textTransform: 'uppercase', letterSpacing: '-1px' }}>
              Master Finance Ledger
            </h1>
            <p style={{ color: '#4B5563', fontFamily: 'monospace', fontWeight: 'bold', backgroundColor: '#E5E7EB', display: 'inline-block', padding: '0.2rem 0.5rem' }}>
              CLEARANCE LEVEL: {user?.role.toUpperCase()}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={() => setFilterMode('all')} style={{ padding: '0.5rem 1.5rem', backgroundColor: filterMode === 'all' ? '#000' : '#FFF', color: filterMode === 'all' ? '#FFF' : '#000', border: '3px solid #000', fontWeight: '900', fontFamily: 'monospace', cursor: 'pointer', boxShadow: filterMode === 'all' ? 'none' : '4px 4px 0 #000', transform: filterMode === 'all' ? 'translate(2px, 2px)' : 'none' }}>ALL</button>
            <button onClick={() => setFilterMode('pending')} style={{ padding: '0.5rem 1.5rem', backgroundColor: filterMode === 'pending' ? '#F59E0B' : '#FFF', color: filterMode === 'pending' ? '#FFF' : '#000', border: '3px solid #000', fontWeight: '900', fontFamily: 'monospace', cursor: 'pointer', boxShadow: filterMode === 'pending' ? 'none' : '4px 4px 0 #000', transform: filterMode === 'pending' ? 'translate(2px, 2px)' : 'none' }}>PENDING</button>
            <button onClick={() => setFilterMode('settled')} style={{ padding: '0.5rem 1.5rem', backgroundColor: filterMode === 'settled' ? '#10B981' : '#FFF', color: filterMode === 'settled' ? '#FFF' : '#000', border: '3px solid #000', fontWeight: '900', fontFamily: 'monospace', cursor: 'pointer', boxShadow: filterMode === 'settled' ? 'none' : '4px 4px 0 #000', transform: filterMode === 'settled' ? 'translate(2px, 2px)' : 'none' }}>SETTLED</button>
          </div>
        </div>

        {/* SECURITY WARNING FOR WARDEN */}
        {!isAdmin && (
          <div style={{ backgroundColor: '#FEF3C7', padding: '1.5rem', border: '3px dashed #F59E0B', marginBottom: '2rem', fontFamily: 'monospace', fontWeight: 'bold', color: '#92400E', textTransform: 'uppercase' }}>
            [ VIEW ONLY MODE ]: Wardens can view disciplinary fines and vendor payouts, but only the Admin can officially settle amounts.
          </div>
        )}

        {/* 🟢 THE HEAVY DATA TABLE */}
        <div style={{ backgroundColor: '#FFF', border: '4px solid #000', boxShadow: '8px 8px 0 #E5E7EB', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontFamily: 'monospace' }}>
            <thead style={{ backgroundColor: '#000', color: '#FFF' }}>
              <tr>
                <th style={{ padding: '1.5rem', fontWeight: '900', textTransform: 'uppercase' }}>TXN ID</th>
                <th style={{ padding: '1.5rem', fontWeight: '900', textTransform: 'uppercase' }}>TARGET USER ID</th>
                <th style={{ padding: '1.5rem', fontWeight: '900', textTransform: 'uppercase' }}>BILLING CYCLE</th>
                <th style={{ padding: '1.5rem', fontWeight: '900', textTransform: 'uppercase' }}>AMOUNT (₹)</th>
                <th style={{ padding: '1.5rem', fontWeight: '900', textTransform: 'uppercase' }}>STATUS</th>
                {isAdmin && <th style={{ padding: '1.5rem', fontWeight: '900', textAlign: 'right', textTransform: 'uppercase' }}>AUTHORIZATION</th>}
              </tr>
            </thead>
            <tbody>
              {displayRecords.map((bill, index) => {
                const isPaid = bill.payment_status === 'paid';
                return (
                  <tr key={bill.id} style={{ borderBottom: '2px solid #E5E7EB', backgroundColor: isPaid ? '#F0FDF4' : '#FFF' }}>
                    <td style={{ padding: '1.5rem', fontWeight: 'bold' }}>#{bill.id}</td>
                    <td style={{ padding: '1.5rem', fontWeight: 'bold', fontSize: '1.1rem' }}>
                      USER {bill.user_id}
                    </td>
                    <td style={{ padding: '1.5rem', color: '#6B7280' }}>
                      {bill.month}/{bill.year}
                    </td>
                    <td style={{ padding: '1.5rem', fontWeight: '900', fontSize: '1.2rem', color: isPaid ? '#059669' : '#DC2626' }}>
                      ₹{parseFloat(bill.amount).toFixed(2)}
                    </td>
                    <td style={{ padding: '1.5rem' }}>
                      <span style={{ 
                        padding: '0.4rem 0.8rem', 
                        backgroundColor: isPaid ? '#10B981' : '#F59E0B', 
                        color: isPaid ? '#FFF' : '#000', 
                        border: '2px solid #000', 
                        fontWeight: '900', 
                        textTransform: 'uppercase', 
                        fontSize: '0.8rem' 
                      }}>
                        {bill.payment_status}
                      </span>
                    </td>
                    
                    {/* 🟢 ADMIN ONLY: PAYMENT SETTLEMENT ACTION */}
                    {isAdmin && (
                      <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                        {!isPaid ? (
                          <button onClick={() => markAsPaid(bill.id)} style={{ padding: '0.6rem 1.2rem', backgroundColor: '#000', color: '#FFF', border: '2px solid #000', fontWeight: '900', fontFamily: 'monospace', cursor: 'pointer', transition: 'transform 0.1s' }} onMouseDown={(e) => e.currentTarget.style.transform = 'translate(2px, 2px)'} onMouseUp={(e) => e.currentTarget.style.transform = 'translate(0, 0)'}>
                            SETTLE ACCOUNT
                          </button>
                        ) : (
                          <span style={{ color: '#10B981', fontWeight: '900', textTransform: 'uppercase' }}>[ CLEARED ]</span>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
              
              {displayRecords.length === 0 && (
                <tr>
                  <td colSpan={isAdmin ? "6" : "5"} style={{ padding: '4rem', textAlign: 'center', fontWeight: '900', color: '#6B7280', fontFamily: 'monospace', fontSize: '1.1rem', textTransform: 'uppercase' }}>
                    [ NO RECORDS FOUND IN LEDGER ]
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBills;