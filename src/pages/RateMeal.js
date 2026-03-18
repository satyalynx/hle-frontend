import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { useAuth } from '../context/AuthContext'; // 🟢 ADDED: To get the logged-in user's ID
import Navbar from '../components/Navbar';

const RateMeal = () => {
  const { menuId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // 🟢 ADDED: Pulling user info from context
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a rating to expose/appreciate the food.');
      return;
    }

    if (!user || !user.id) {
       setError('Authentication error! Please login again to rate.');
       return;
    }

    setLoading(true);
    setError('');

    try {
      await axiosInstance.post('/mess/feedback/', {
        user_id: user.id, // 🟢 FIXED: Sending user_id to stop spamming
        menu_id: parseInt(menuId),
        rating: rating,
        comment: comment || null,
      });
      alert('Feedback submitted publicly!');
      navigate('/food'); // Redirects to Food hub
    } catch (err) {
      // 🟢 FIXED: This will catch our "You have already rated this meal today" error from backend
      setError(err.response?.data?.detail || 'Failed to submit rating. You might have already rated this meal today!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#F3F4F6', minHeight: '100vh', paddingBottom: '3rem' }}>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'system-ui', fontWeight: 'bold' }}>Rate / Expose This Meal</h1>
        <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '2rem', border: '3px solid #000', boxShadow: '6px 6px 0 #000', marginTop: '2rem' }}>
          
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 'bold', fontFamily: 'monospace', textAlign: 'center', fontSize: '1.2rem' }}>
              How was the food? Be brutally honest.
            </label>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  style={{
                    fontSize: '3.5rem',
                    cursor: 'pointer',
                    color: star <= (hoveredRating || rating) ? (rating <= 2 && hoveredRating === 0 ? '#DC2626' : '#F59E0B') : '#E5E7EB',
                    transition: 'color 0.2s',
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <p style={{ textAlign: 'center', marginTop: '1rem', color: '#000', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '1.2rem' }}>
              {rating === 0 && 'Click to rate'}
              {rating > 0 && `${rating} - ${['', 'Disgusting 🤮', 'Barely Edible 😕', 'It was okay 😐', 'Good Tasty 😋', 'God Tier 🤯'][rating]}`}
            </p>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontFamily: 'monospace' }}>
              Public Comment (Optional but recommended)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="What exactly was wrong or right? E.g., 'Dal was mostly water', 'Chicken was perfectly cooked!'"
              style={{ width: '100%', boxSizing: 'border-box', padding: '0.75rem', border: '2px solid #000', borderRadius: '0', fontFamily: 'monospace' }}
            />
          </div>
          
          {error && (
            <div style={{ padding: '0.75rem', backgroundColor: '#FEE2E2', color: '#DC2626', border: '2px solid #DC2626', fontWeight: 'bold', fontFamily: 'monospace', marginBottom: '1rem' }}>
              🚨 {error}
            </div>
          )}
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" disabled={loading} style={{ flex: 1, padding: '1rem', backgroundColor: loading ? '#9CA3AF' : '#000', color: 'white', border: '2px solid #000', fontWeight: 'bold', fontFamily: 'monospace', cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'SUBMITTING...' : 'SUBMIT EXPOSE'}
            </button>
            <button type="button" onClick={() => navigate('/food')} style={{ padding: '1rem 1.5rem', backgroundColor: '#FFFFFF', color: '#000', border: '2px solid #000', fontWeight: 'bold', fontFamily: 'monospace', cursor: 'pointer' }}>
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RateMeal;