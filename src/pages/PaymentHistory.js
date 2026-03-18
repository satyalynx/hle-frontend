import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { API_ENDPOINTS } from '../api/config';
import Navbar from '../components/Navbar';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.MY_BILLS);
      const paidBills = response.data.filter(b => b.payment_status === 'paid');
      setPayments(paidBills);
    } catch (error) {
      console.error('Failed to fetch payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMonthName = (month) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month - 1];
  };

  if (loading) return <div><Navbar /><div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div></div>;

  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem' }}>💳 Payment History</h1>

        {payments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'white', borderRadius: '8px' }}>
            <p style={{ fontSize: '1.25rem', color: '#6B7280' }}>No payment history yet</p>
          </div>
        ) : (
          <>
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                <div style={{ padding: '1rem', backgroundColor: '#D1FAE5', borderRadius: '4px' }}>
                  <div style={{ fontSize: '0.875rem', color: '#065F46', marginBottom: '0.25rem' }}>Total Paid</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#065F46' }}>
                    ₹{payments.reduce((sum, p) => sum + parseFloat(p.amount), 0).toFixed(2)}
                  </div>
                </div>
                <div style={{ padding: '1rem', backgroundColor: '#DBEAFE', borderRadius: '4px' }}>
                  <div style={{ fontSize: '0.875rem', color: '#1E40AF', marginBottom: '0.25rem' }}>Transactions</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1E40AF' }}>
                    {payments.length}
                  </div>
                </div>
                <div style={{ padding: '1rem', backgroundColor: '#FEF3C7', borderRadius: '4px' }}>
                  <div style={{ fontSize: '0.875rem', color: '#92400E', marginBottom: '0.25rem' }}>Avg Payment</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#92400E' }}>
                    ₹{(payments.reduce((sum, p) => sum + parseFloat(p.amount), 0) / payments.length).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: '#F9FAFB' }}>
                  <tr>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Month</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Year</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Amount</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Payment Date</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => (
                    <tr key={payment.id} style={{ borderTop: index > 0 ? '1px solid #E5E7EB' : 'none' }}>
                      <td style={{ padding: '1rem' }}>{getMonthName(payment.month)}</td>
                      <td style={{ padding: '1rem' }}>{payment.year}</td>
                      <td style={{ padding: '1rem', fontWeight: '600', color: '#10B981' }}>
                        ₹{parseFloat(payment.amount).toFixed(2)}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {payment.payment_date ? new Date(payment.payment_date).toLocaleDateString() : 'N/A'}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          backgroundColor: '#D1FAE5',
                          color: '#065F46',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          textTransform: 'uppercase',
                        }}>
                          ✓ PAID
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
