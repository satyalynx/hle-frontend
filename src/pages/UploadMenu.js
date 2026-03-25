import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import Navbar from '../components/Navbar';

const UploadMenu = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // 🟢 FIXED: Snacks hata diya bhai, sirf 3 real meals!
  const meals = ['breakfast', 'lunch', 'dinner'];

  // Initialize a 2D state object for the entire week
  const initialState = {};
  days.forEach(day => {
    initialState[day] = { breakfast: '', lunch: '', dinner: '' };
  });

  const [menuData, setMenuData] = useState(initialState);

  const handleCellChange = (day, meal, value) => {
    setMenuData(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [meal]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Loop sequentially to prevent SQLite "database is locked" errors on multiple quick writes
      for (const day of days) {
        for (const meal of meals) {
          const items = menuData[day][meal].trim();
          
          // Only send API request if the admin typed something in this specific cell
          if (items) {
            await axiosInstance.post('/mess/menu/', {
              day_of_week: day,
              meal_type: meal,
              items: items
            });
          }
        }
      }

      alert('[SYSTEM UPDATE] Weekly timetable updated successfully.');
      navigate('/food'); 
    } catch (err) {
      setError(err.response?.data?.detail || 'FAILED TO UPDATE WEEKLY TIMETABLE. PLEASE RETRY.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', paddingBottom: '3rem' }}>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h1 style={{ fontFamily: 'monospace', fontWeight: '900', margin: 0, fontSize: '2.5rem', textTransform: 'uppercase', letterSpacing: '-1px' }}>
              Master Timetable Configuration
            </h1>
            <p style={{ fontFamily: 'monospace', color: '#4B5563', fontSize: '1.1rem', marginTop: '0.5rem', fontWeight: 'bold' }}>
              DEFINE WEEKLY MESS ROUTINE. BLANK CELLS WILL RETAIN PREVIOUS DATA.
            </p>
          </div>
          <button 
            onClick={handleSubmit} 
            disabled={loading}
            style={{ 
              padding: '1rem 2.5rem', 
              backgroundColor: loading ? '#9CA3AF' : '#000000', 
              color: 'white', 
              border: '4px solid #000', 
              fontWeight: '900', 
              fontFamily: 'monospace', 
              cursor: loading ? 'not-allowed' : 'pointer', 
              fontSize: '1.2rem', 
              boxShadow: loading ? 'none' : '6px 6px 0 #000',
              textTransform: 'uppercase',
              transition: 'all 0.1s'
            }}
            onMouseDown={(e) => { if(!loading) e.target.style.transform = 'translate(2px, 2px)'; }}
            onMouseUp={(e) => { if(!loading) e.target.style.transform = 'translate(0, 0)'; }}
          >
            {loading ? 'EXECUTING...' : 'PUBLISH OVERRIDE'}
          </button>
        </div>

        {error && (
          <div style={{ padding: '1.5rem', backgroundColor: '#FEF2F2', color: '#DC2626', border: '4px solid #DC2626', fontWeight: '900', fontFamily: 'monospace', marginBottom: '2.5rem', fontSize: '1.1rem', textTransform: 'uppercase' }}>
            [ERROR]: {error}
          </div>
        )}

        <div style={{ backgroundColor: 'white', border: '4px solid #000', boxShadow: '8px 8px 0 #000', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'monospace' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '4px solid #000', borderRight: '4px solid #000', padding: '1.5rem', backgroundColor: '#000', color: 'white', width: '150px', fontSize: '1.2rem', fontWeight: '900', textTransform: 'uppercase' }}>DAY</th>
                <th style={{ borderBottom: '4px solid #000', borderRight: '4px solid #000', padding: '1.5rem', backgroundColor: '#F9FAFB', color: '#000', fontSize: '1.2rem', fontWeight: '900', textTransform: 'uppercase' }}>[ BREAKFAST ]</th>
                <th style={{ borderBottom: '4px solid #000', borderRight: '4px solid #000', padding: '1.5rem', backgroundColor: '#F9FAFB', color: '#000', fontSize: '1.2rem', fontWeight: '900', textTransform: 'uppercase' }}>[ LUNCH ]</th>
                <th style={{ borderBottom: '4px solid #000', padding: '1.5rem', backgroundColor: '#F9FAFB', color: '#000', fontSize: '1.2rem', fontWeight: '900', textTransform: 'uppercase' }}>[ DINNER ]</th>
              </tr>
            </thead>
            <tbody>
              {days.map((day, rowIndex) => (
                <tr key={day} style={{ borderBottom: rowIndex === days.length - 1 ? 'none' : '4px solid #000' }}>
                  <td style={{ borderRight: '4px solid #000', padding: '1.5rem', fontWeight: '900', fontSize: '1.2rem', backgroundColor: '#F3F4F6', textAlign: 'center', textTransform: 'uppercase' }}>
                    {day}
                  </td>
                  {meals.map((meal, colIndex) => (
                    <td key={`${day}-${meal}`} style={{ borderRight: colIndex === meals.length - 1 ? 'none' : '4px solid #000', padding: '0', verticalAlign: 'top', backgroundColor: '#FFF' }}>
                      <textarea
                        value={menuData[day][meal]}
                        onChange={(e) => handleCellChange(day, meal, e.target.value)}
                        placeholder={`Input ${meal} items...`}
                        rows={4}
                        style={{
                          width: '100%',
                          height: '100%',
                          boxSizing: 'border-box',
                          padding: '1rem',
                          border: 'none',
                          resize: 'none',
                          fontFamily: 'monospace',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          backgroundColor: 'transparent',
                          outline: 'none',
                          color: '#111827'
                        }}
                        onFocus={(e) => { e.target.style.backgroundColor = '#EFF6FF'; }}
                        onBlur={(e) => { e.target.style.backgroundColor = 'transparent'; }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default UploadMenu;