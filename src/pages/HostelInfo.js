import React from 'react';
import Navbar from '../components/Navbar';

const HostelInfo = () => {
  return (
    <div style={{ backgroundColor: '#F3F4F6', minHeight: '100vh', paddingBottom: '3rem' }}>
      <Navbar />
      
      <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem 2rem', borderBottom: '3px solid #000000', marginBottom: '2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'system-ui', margin: 0 }}>
            Hostel Info & Guidelines 📖
          </h1>
          <p style={{ fontFamily: 'monospace', fontSize: '0.875rem', margin: '0.25rem 0 0 0', color: '#666' }}>
            Official Fee Structure, Rules, and Fine Policies for the Academic Year 2025-26
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* 💰 FEE STRUCTURE SECTION */}
        <div style={{ backgroundColor: 'white', border: '3px solid #000', borderRadius: '8px', overflow: 'hidden', boxShadow: '4px 4px 0px #000' }}>
          <div style={{ backgroundColor: '#DBEAFE', padding: '1rem 1.5rem', borderBottom: '3px solid #000' }}>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'system-ui', color: '#1E3A8A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>💰</span> Annual Fee Structure
            </h2>
          </div>
          <div style={{ padding: '1.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'monospace', fontSize: '0.9rem' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <td style={{ padding: '1rem 0', fontWeight: 'bold' }}>Accommodation (Room Rent)</td>
                  <td style={{ padding: '1rem 0', textAlign: 'right' }}>₹ 45,000 / year</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <td style={{ padding: '1rem 0', fontWeight: 'bold' }}>Mess Charges (4 Meals/Day)</td>
                  <td style={{ padding: '1rem 0', textAlign: 'right' }}>₹ 38,000 / year</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <td style={{ padding: '1rem 0', fontWeight: 'bold' }}>Maintenance & Internet</td>
                  <td style={{ padding: '1rem 0', textAlign: 'right' }}>₹ 5,000 / year</td>
                </tr>
                <tr style={{ borderBottom: '2px solid #000' }}>
                  <td style={{ padding: '1rem 0', fontWeight: 'bold', color: '#DC2626' }}>Refundable Security Deposit</td>
                  <td style={{ padding: '1rem 0', textAlign: 'right', color: '#DC2626' }}>₹ 10,000 (One time)</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem 0', fontWeight: '900', fontSize: '1.2rem', fontFamily: 'system-ui' }}>TOTAL ANNUAL FEE</td>
                  <td style={{ padding: '1rem 0', textAlign: 'right', fontWeight: '900', fontSize: '1.2rem', color: '#2563EB' }}>₹ 98,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ⚖️ FINES & PENALTIES */}
        <div style={{ backgroundColor: 'white', border: '3px solid #000', borderRadius: '8px', overflow: 'hidden', boxShadow: '4px 4px 0px #000' }}>
          <div style={{ backgroundColor: '#FEE2E2', padding: '1rem 1.5rem', borderBottom: '3px solid #000' }}>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'system-ui', color: '#991B1B', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>⚠️</span> Disciplinary Fines
            </h2>
          </div>
          <div style={{ padding: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', fontFamily: 'monospace' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#F9FAFB', border: '1px solid #D1D5DB' }}>
                <div><strong style={{ color: '#000' }}>Late Entry</strong><br/><span style={{ color: '#666', fontSize: '0.8rem' }}>Entering after 10:00 PM without prior permission</span></div>
                <div style={{ fontWeight: 'bold', color: '#DC2626', fontSize: '1.1rem' }}>₹ 500</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#F9FAFB', border: '1px solid #D1D5DB' }}>
                <div><strong style={{ color: '#000' }}>Using Banned Appliances</strong><br/><span style={{ color: '#666', fontSize: '0.8rem' }}>Electric heaters, induction plates, etc.</span></div>
                <div style={{ fontWeight: 'bold', color: '#DC2626', fontSize: '1.1rem' }}>₹ 1,500</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#F9FAFB', border: '1px solid #D1D5DB' }}>
                <div><strong style={{ color: '#000' }}>Property Damage</strong><br/><span style={{ color: '#666', fontSize: '0.8rem' }}>Breaking furniture, fixtures, or defacing walls</span></div>
                <div style={{ fontWeight: 'bold', color: '#DC2626', fontSize: '1.1rem' }}>Actual Cost + ₹ 2000</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#F9FAFB', border: '1px solid #D1D5DB' }}>
                <div><strong style={{ color: '#000' }}>Substance Abuse / Smoking</strong><br/><span style={{ color: '#666', fontSize: '0.8rem' }}>Found consuming alcohol, smoking, etc. in premises</span></div>
                <div style={{ fontWeight: 'bold', color: '#DC2626', fontSize: '1.1rem' }}>Strict Disciplinary Action</div>
              </div>

            </div>
          </div>
        </div>

        {/* ✅❌ DOS AND DON'TS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          
          {/* DOS */}
          <div style={{ backgroundColor: 'white', border: '3px solid #000', borderRadius: '8px', overflow: 'hidden', boxShadow: '4px 4px 0px #000' }}>
            <div style={{ backgroundColor: '#DCFCE7', padding: '1rem', borderBottom: '3px solid #000' }}>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'system-ui', color: '#166534', textAlign: 'center' }}>✅ DO's</h2>
            </div>
            <ul style={{ padding: '1.5rem 1.5rem 1.5rem 2.5rem', margin: 0, fontFamily: 'monospace', lineHeight: '1.6', color: '#374151' }}>
              <li style={{ marginBottom: '0.5rem' }}>Keep your room and common areas clean.</li>
              <li style={{ marginBottom: '0.5rem' }}>Always carry your Hostel ID card.</li>
              <li style={{ marginBottom: '0.5rem' }}>Turn off lights and fans before leaving the room.</li>
              <li style={{ marginBottom: '0.5rem' }}>Report maintenance issues immediately via the app.</li>
              <li>Sign the movement register while going out.</li>
            </ul>
          </div>

          {/* DON'TS */}
          <div style={{ backgroundColor: 'white', border: '3px solid #000', borderRadius: '8px', overflow: 'hidden', boxShadow: '4px 4px 0px #000' }}>
            <div style={{ backgroundColor: '#FEE2E2', padding: '1rem', borderBottom: '3px solid #000' }}>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'system-ui', color: '#991B1B', textAlign: 'center' }}>❌ DON'Ts</h2>
            </div>
            <ul style={{ padding: '1.5rem 1.5rem 1.5rem 2.5rem', margin: 0, fontFamily: 'monospace', lineHeight: '1.6', color: '#374151' }}>
              <li style={{ marginBottom: '0.5rem' }}>Do not play loud music after 10:30 PM.</li>
              <li style={{ marginBottom: '0.5rem' }}>Do not bring unauthorized day-scholars/guests.</li>
              <li style={{ marginBottom: '0.5rem' }}>Do not swap rooms without Warden's permission.</li>
              <li style={{ marginBottom: '0.5rem' }}>Do not feed stray animals inside the campus.</li>
              <li>Do not waste food in the mess.</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};

export default HostelInfo;