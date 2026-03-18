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

      alert('✅ Weekly Timetable updated successfully!');
      navigate('/food'); 
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update weekly timetable. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#F3F4F6', minHeight: '100vh', paddingBottom: '3rem' }}>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ fontFamily: 'system-ui', fontWeight: 'bold', margin: 0, fontSize: '2.5rem' }}>Master Timetable 📅</h1>
            <p style={{ fontFamily: 'monospace', color: '#6B7280', fontSize: '1.1rem', marginTop: '0.5rem' }}>
              Fill out the weekly mess routine. Leave cells blank if you don't want to update them right now.
            </p>
          </div>
          <button 
            onClick={handleSubmit} 
            disabled={loading}
            style={{ padding: '1rem 2rem', backgroundColor: loading ? '#9CA3AF' : '#10B981', color: 'white', border: '3px solid #000', fontWeight: 'bold', fontFamily: 'monospace', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '1.2rem', boxShadow: '4px 4px 0 #000' }}
          >
            {loading ? 'UPLOADING...' : '🚀 PUBLISH TIMETABLE'}
          </button>
        </div>

        {error && (
          <div style={{ padding: '1rem', backgroundColor: '#FEE2E2', color: '#DC2626', border: '3px solid #DC2626', fontWeight: 'bold', fontFamily: 'monospace', marginBottom: '2rem', fontSize: '1.1rem' }}>
            {error}
          </div>
        )}

        <div style={{ backgroundColor: 'white', padding: '1rem', border: '3px solid #000', boxShadow: '6px 6px 0 #000', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'monospace' }}>
            <thead>
              <tr>
                <th style={{ border: '2px solid #000', padding: '1rem', backgroundColor: '#000', color: 'white', width: '150px', fontSize: '1.2rem' }}>DAY</th>
                <th style={{ border: '2px solid #000', padding: '1rem', backgroundColor: '#F9FAFB', color: '#000', fontSize: '1.1rem' }}>🌅 Breakfast</th>
                <th style={{ border: '2px solid #000', padding: '1rem', backgroundColor: '#F9FAFB', color: '#000', fontSize: '1.1rem' }}>☀️ Lunch</th>
                <th style={{ border: '2px solid #000', padding: '1rem', backgroundColor: '#F9FAFB', color: '#000', fontSize: '1.1rem' }}>🌙 Dinner</th>
              </tr>
            </thead>
            <tbody>
              {days.map(day => (
                <tr key={day}>
                  <td style={{ border: '2px solid #000', padding: '1rem', fontWeight: 'bold', fontSize: '1.1rem', backgroundColor: '#F3F4F6', textAlign: 'center' }}>
                    {day}
                  </td>
                  {meals.map(meal => (
                    <td key={`${day}-${meal}`} style={{ border: '2px solid #000', padding: '0.5rem', verticalAlign: 'top' }}>
                      <textarea
                        value={menuData[day][meal]}
                        onChange={(e) => handleCellChange(day, meal, e.target.value)}
                        placeholder={`e.g. Idli, Sambar`}
                        rows={3}
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          border: 'none',
                          resize: 'vertical',
                          fontFamily: 'monospace',
                          backgroundColor: 'transparent',
                          outline: 'none'
                        }}
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