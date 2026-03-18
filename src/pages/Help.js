import React from 'react';
import Navbar from '../components/Navbar';

const Help = () => {
  const faqs = [
    { q: 'How do I raise a complaint?', a: 'Go to Complaints → Click + New Complaint → Fill the form with details and submit.' },
    { q: 'How long does it take to resolve complaints?', a: 'Normal complaints are resolved within 2-3 days. Urgent complaints within 24 hours.' },
    { q: 'Can I see my mess bill?', a: 'Yes! Go to Bills section to see all your mess bills and payment status.' },
    { q: 'How do I rate mess food?', a: 'Go to Mess Menu → Click Rate This Meal → Give stars and optional feedback.' },
    { q: 'Who can I contact for emergencies?', a: 'Contact your hostel warden immediately. Their number is displayed on the dashboard.' },
  ];

  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem' }}>Help & FAQ</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, index) => (
            <div key={index} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#2563EB' }}>
                {faq.q}
              </h3>
              <p style={{ color: '#374151' }}>{faq.a}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '3rem', backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '1rem' }}>Need More Help?</h2>
          <p style={{ color: '#6B7280', marginBottom: '1rem' }}>
            Contact your hostel office or email support@hle.edu.in
          </p>
          <p style={{ color: '#6B7280' }}>
            Office Hours: Monday - Friday, 9 AM - 5 PM
          </p>
        </div>
      </div>
    </div>
  );
};

export default Help;
