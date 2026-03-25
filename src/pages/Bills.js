import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { API_ENDPOINTS } from '../api/config';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const Bills = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [pendingTotal, setPendingTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Students don't need to fetch dynamic fines anymore.
    if (user?.role !== 'student') {
      fetchData();
    } else {
      setLoading(false); // Instantly load static receipt for students
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [recordsRes, totalRes] = await Promise.all([
        axiosInstance.get(`/bills/my-bills?user_id=${user.id}`), 
        axiosInstance.get(`/bills/pending-total?user_id=${user.id}`), 
      ]);
      setRecords(recordsRes.data);
      setPendingTotal(totalRes.data.total_pending || 0);
    } catch (error) {
      console.error('Failed to fetch financial records:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = { pending: '#F59E0B', paid: '#10B981', overdue: '#DC2626' };
    return colors[status] || '#6B7280';
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ padding: '4rem', textAlign: 'center', fontFamily: 'monospace', fontWeight: '900', fontSize: '1.5rem', textTransform: 'uppercase' }}>
          [ FETCHING FINANCIAL LEDGER... ]
        </div>
      </div>
    );
  }

  // ==========================================================
  // 1. STUDENT VIEW: STATIC ANNUAL FEE RECEIPT
  // ==========================================================
  if (user?.role === 'student') {
    return (
      <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', paddingBottom: '4rem' }}>
        <Navbar />
        <div style={{ padding: '3rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '900', margin: '0 0 1rem 0', textTransform: 'uppercase', letterSpacing: '-1px' }}>
            Fee Receipts
          </h1>
          
          <div style={{ backgroundColor: '#FFF', padding: '3rem', border: '4px solid #000', boxShadow: '12px 12px 0 #E5E7EB', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '25px', right: '-40px', backgroundColor: '#10B981', color: '#FFF', padding: '0.5rem 4rem', transform: 'rotate(45deg)', fontWeight: '900', fontFamily: 'monospace', border: '3px solid #000', letterSpacing: '2px' }}>
              CLEARED
            </div>
            
            <div style={{ borderBottom: '3px dashed #E5E7EB', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '900', margin: '0 0 0.5rem 0' }}>ANNUAL HOSTEL & MESS FEE</h2>
              <p style={{ color: '#6B7280', fontFamily: 'monospace', fontWeight: 'bold', margin: 0 }}>Academic Year: 2026-2027 | Student ID: {user.name.toUpperCase()}</p>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.2rem', fontFamily: 'monospace' }}>
              <span style={{ fontWeight: 'bold' }}>Accommodation (Room)</span>
              <span>₹50,000.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.2rem', fontFamily: 'monospace' }}>
              <span style={{ fontWeight: 'bold' }}>Mess & Catering</span>
              <span>₹50,000.00</span>
            </div>
            
            <div style={{ borderTop: '4px solid #000', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: '900' }}>TOTAL PAID</span>
              <span style={{ fontSize: '2.5rem', fontWeight: '900', color: '#10B981' }}>₹1,00,000</span>
            </div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#6B7280', fontFamily: 'monospace', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.9rem' }}>
            [ Note: All institutional fees are collected during the admission process. No pending monthly dues. ]
          </p>
        </div>
      </div>
    );
  }

  // ==========================================================
  // 2. CARETAKER VIEW: VENDOR PAYOUTS
  // ==========================================================
  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', paddingBottom: '4rem' }}>
      <Navbar />
      <div style={{ padding: '3rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', borderBottom: '4px solid #000', paddingBottom: '1rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '3rem', fontWeight: '900', margin: '0 0 0.5rem 0', textTransform: 'uppercase', letterSpacing: '-1px' }}>
              My Payouts
            </h1>
            <p style={{ color: '#000', backgroundColor: '#E5E7EB', display: 'inline-block', padding: '0.3rem 0.8rem', border: '2px solid #000', fontFamily: 'monospace', fontWeight: 'bold', margin: 0 }}>
              OPERATOR ID: {user?.name.toUpperCase()} | PENDING REVENUE: ₹{pendingTotal.toFixed(2)}
            </p>
          </div>
        </div>

        {records.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: '#FFF', border: '4px dashed #9CA3AF', boxShadow: '8px 8px 0 #E5E7EB' }}>
            <p style={{ fontSize: '1.2rem', color: '#6B7280', fontWeight: '900', fontFamily: 'monospace', margin: 0, textTransform: 'uppercase' }}>
              [ NO PAYOUTS GENERATED YET ]
            </p>
            <p style={{ fontSize: '0.9rem', color: '#9CA3AF', fontFamily: 'monospace', marginTop: '1rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
              Complete a task with an assigned budget to see your payouts here.
            </p>
          </div>
        ) : (
          <>
            {pendingTotal > 0 && (
              <div style={{ backgroundColor: '#FFFBEB', padding: '2rem', border: '4px solid #F59E0B', marginBottom: '3rem', boxShadow: '8px 8px 0 #E5E7EB' }}>
                <p style={{ fontSize: '1rem', color: '#B45309', marginBottom: '0.5rem', fontWeight: '900', fontFamily: 'monospace' }}>
                  PENDING PAYMENTS (AWAITING ADMIN CLEARANCE)
                </p>
                <p style={{ fontSize: '3.5rem', fontWeight: '900', color: '#D97706', margin: 0, lineHeight: '1' }}>
                  ₹{pendingTotal.toFixed(2)}
                </p>
              </div>
            )}

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {records.map((record) => (
                <div key={record.id} style={{ backgroundColor: '#FFF', padding: '2rem', border: '4px solid #000', boxShadow: '6px 6px 0 #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '0.5rem', fontFamily: 'system-ui', textTransform: 'uppercase' }}>
                      WORK ORDER #{record.id}
                    </h3>
                    <p style={{ color: '#4B5563', fontSize: '1rem', fontFamily: 'monospace', fontWeight: 'bold', margin: 0 }}>
                      LOGGED: {record.month}/{record.year}
                    </p>
                  </div>
                  
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '2.5rem', fontWeight: '900', color: '#000', margin: '0 0 0.5rem 0', lineHeight: '1' }}>
                      ₹{parseFloat(record.amount).toFixed(2)}
                    </p>
                    <span style={{
                      padding: '0.4rem 1rem',
                      backgroundColor: getStatusColor(record.payment_status),
                      color: 'white',
                      border: '3px solid #000',
                      fontSize: '0.85rem',
                      fontWeight: '900',
                      textTransform: 'uppercase',
                      fontFamily: 'monospace'
                    }}>
                      {record.payment_status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Bills;