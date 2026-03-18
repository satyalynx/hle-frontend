import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const GenerateReport = () => {
  const [reportType, setReportType] = useState('complaints');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const handleGenerate = (format) => {
    alert(`Generating ${reportType} report (${format}) from ${dateRange.start} to ${dateRange.end}...`);
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem' }}>📊 Generate Reports</h1>
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Report Type</label>
            <select value={reportType} onChange={(e) => setReportType(e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px' }}>
              <option value="complaints">Complaints Report</option>
              <option value="mess">Mess Feedback Report</option>
              <option value="bills">Bills Summary</option>
              <option value="users">User Statistics</option>
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Start Date</label>
              <input type="date" value={dateRange.start} onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} style={{ width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>End Date</label>
              <input type="date" value={dateRange.end} onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} style={{ width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px' }} />
            </div>
          </div>
          <button onClick={() => handleGenerate('PDF')} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#DC2626', color: 'white', border: 'none', borderRadius: '4px', fontWeight: '500', marginBottom: '0.5rem' }}>
            📄 Generate PDF Report
          </button>
          <button onClick={() => handleGenerate('CSV')} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#10B981', color: 'white', border: 'none', borderRadius: '4px', fontWeight: '500' }}>
            📊 Export to CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateReport;
