import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Food = () => {
  const { user } = useAuth();
  const [menu, setMenu] = useState([]);
  const [polls, setPolls] = useState([]);
  const [actions, setActions] = useState([]); 
  const [loading, setLoading] = useState(true);
  
  // States for Admin creating a new poll
  const [showPollModal, setShowPollModal] = useState(false);
  const [newPollQuestion, setNewPollQuestion] = useState('');

  // States for Admin creating a new Action
  const [showActionModal, setShowActionModal] = useState(false);
  const [newActionTitle, setNewActionTitle] = useState('');

  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todayAvgRating = 2.4; 

  useEffect(() => {
    fetchMenu();
    fetchPolls();
    fetchActions(); 
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await axiosInstance.get('/mess/menu/today');
      setMenu(response.data);
    } catch (error) {
      console.error('Failed to fetch menu:', error);
    }
  };

  const fetchPolls = async () => {
    try {
      const response = await axiosInstance.get(`/polls/?user_id=${user?.id || 0}`);
      setPolls(response.data);
    } catch (error) {
      console.error('Failed to fetch polls:', error);
    } finally {
      setLoading(false);
    }
  };

  // 🟢 FIXED: Fetch Actions with user_id to know their verification votes
  const fetchActions = async () => {
    try {
      const response = await axiosInstance.get(`/mess/actions/?user_id=${user?.id || 0}`);
      setActions(response.data);
    } catch (error) {
      console.error('Failed to fetch actions:', error);
    }
  };

  const handleVote = async (pollId, voteType) => {
    if (user?.role !== 'student') {
      alert("Only students can vote!");
      return;
    }
    
    try {
      await axiosInstance.post(`/polls/${pollId}/vote`, {
        user_id: user.id,
        vote_type: voteType
      });
      fetchPolls(); 
    } catch (error) {
      console.error('Failed to cast vote:', error);
    }
  };

  const handleCreatePoll = async (e) => {
    e.preventDefault();
    if (!newPollQuestion.trim()) return;

    try {
      await axiosInstance.post('/polls/', { question: newPollQuestion });
      setNewPollQuestion('');
      setShowPollModal(false);
      fetchPolls();
      alert("✅ New poll dropped successfully!");
    } catch (error) {
      console.error('Failed to create poll:', error);
    }
  };

  // 🟢 FIXED: Handle Action Creation with direct click (No Form bug)
  const handleCreateAction = async () => {
    if (!newActionTitle.trim()) {
      alert("Please enter a task title!");
      return;
    }

    try {
      await axiosInstance.post('/mess/actions/', { title: newActionTitle });
      setNewActionTitle('');
      setShowActionModal(false);
      fetchActions();
      alert("✅ Action item added to the board!");
    } catch (error) {
      console.error('Failed to create action:', error);
      alert("Error: " + (error.response?.data?.detail || error.message));
    }
  };

  // Handle Action Status Update (For Admin/Warden)
  const handleStatusChange = async (actionId, newStatus) => {
    try {
      await axiosInstance.put(`/mess/actions/${actionId}/status`, { status: newStatus });
      fetchActions();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  // 🟢 NEW: Handle Public Audit Voting
  const handleVerifyAction = async (actionId, voteType) => {
    if (user?.role !== 'student') {
      alert("Only students can verify the management claims!");
      return;
    }
    
    try {
      await axiosInstance.post(`/mess/actions/${actionId}/verify`, {
        user_id: user.id,
        vote_type: voteType
      });
      fetchActions(); // Refresh to see if it got auto-reverted!
    } catch (error) {
      console.error('Failed to cast verification vote:', error);
    }
  };

  const getMealIcon = (mealType) => {
    const icons = { breakfast: '🌅', lunch: '☀️', snacks: '☕', dinner: '🌙' };
    return icons[mealType] || '🍽️';
  };

  if (loading) return <div><Navbar /><div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'monospace' }}>Loading Food Hub...</div></div>;

  return (
    <div style={{ backgroundColor: '#F3F4F6', minHeight: '100vh', paddingBottom: '3rem' }}>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'system-ui', margin: 0 }}>🍕 Food Hub</h1>
            <p style={{ fontFamily: 'monospace', color: '#6B7280', fontSize: '1.1rem' }}>Weekly Timetable, Polling & Public Accountability</p>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {user?.role === 'student' && (
              <Link to="/my-feedback">
                <button style={{ padding: '0.75rem 1.5rem', backgroundColor: '#10B981', color: 'white', border: '2px solid #000', fontWeight: 'bold', fontFamily: 'monospace', cursor: 'pointer', boxShadow: '2px 2px 0 #000' }}>
                  MY FEEDBACK
                </button>
              </Link>
            )}

            {/* WARDEN & ADMIN SHARED BUTTONS */}
            {(user?.role === 'warden' || user?.role === 'admin') && (
              <>
                <button onClick={() => setShowPollModal(true)} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#F59E0B', color: '#000', border: '2px solid #000', fontWeight: 'bold', fontFamily: 'monospace', cursor: 'pointer', boxShadow: '2px 2px 0 #000' }}>
                  ➕ DROP NEW POLL
                </button>
                <Link to="/mess-analytics">
                  <button style={{ padding: '0.75rem 1.5rem', backgroundColor: '#7C3AED', color: 'white', border: '2px solid #000', fontWeight: 'bold', fontFamily: 'monospace', cursor: 'pointer', boxShadow: '2px 2px 0 #000' }}>
                    📊 ANALYTICS
                  </button>
                </Link>
              </>
            )}

            {/* 🟢 STRICTLY ADMIN ONLY BUTTONS */}
            {user?.role === 'admin' && (
              <>
                <button onClick={() => setShowActionModal(true)} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#FFF', color: '#000', border: '2px solid #000', fontWeight: 'bold', fontFamily: 'monospace', cursor: 'pointer', boxShadow: '2px 2px 0 #000' }}>
                  ➕ ADD ACTION
                </button>
                <Link to="/upload-menu">
                  <button style={{ padding: '0.75rem 1.5rem', backgroundColor: '#2563EB', color: 'white', border: '2px solid #000', fontWeight: 'bold', fontFamily: 'monospace', cursor: 'pointer', boxShadow: '2px 2px 0 #000' }}>
                    UPDATE TIMETABLE
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>

        <div style={{ backgroundColor: todayAvgRating >= 3 ? '#D1FAE5' : '#FEE2E2', border: `3px solid ${todayAvgRating >= 3 ? '#10B981' : '#DC2626'}`, padding: '1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '4px 4px 0 #000' }}>
          <div>
            <h2 style={{ margin: 0, fontFamily: 'system-ui', color: todayAvgRating >= 3 ? '#065F46' : '#991B1B' }}>
              🚨 Public Expose Meter (Today's Quality)
            </h2>
            <p style={{ fontFamily: 'monospace', color: todayAvgRating >= 3 ? '#065F46' : '#991B1B', margin: '0.5rem 0 0 0' }}>
              Based on real-time student ratings. Admin cannot hide this.
            </p>
          </div>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', fontFamily: 'monospace', color: todayAvgRating >= 3 ? '#10B981' : '#DC2626' }}>
            {todayAvgRating} / 5 ⭐
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          
          {/* LEFT COLUMN: MENU */}
          <div style={{ flex: '2', minWidth: '350px' }}>
            <h2 style={{ fontFamily: 'system-ui', fontWeight: 'bold', marginBottom: '1rem', borderBottom: '3px solid #000', paddingBottom: '0.5rem' }}>
              Routine for Today ({currentDay})
            </h2>
            
            {menu.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'white', border: '3px solid #000', boxShadow: '4px 4px 0 #000' }}>
                <p style={{ fontSize: '1.25rem', color: '#6B7280', fontFamily: 'monospace' }}>No routine found for {currentDay}.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {menu.map((meal) => (
                  <div key={meal.id} style={{ backgroundColor: 'white', padding: '1.5rem', border: '3px solid #000', boxShadow: '4px 4px 0 #000' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{getMealIcon(meal.meal_type)}</div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', textTransform: 'capitalize', margin: '0 0 1rem 0', fontFamily: 'system-ui' }}>
                          {meal.meal_type}
                        </h3>
                      </div>
                      {user?.role === 'student' && (
                        <Link to={`/rate-meal/${meal.id}`}>
                          <button style={{ padding: '0.5rem 1rem', backgroundColor: '#000', color: 'white', border: 'none', fontWeight: 'bold', fontFamily: 'monospace', cursor: 'pointer' }}>
                            RATE / EXPOSE
                          </button>
                        </Link>
                      )}
                    </div>
                    <div style={{ color: '#374151', fontFamily: 'monospace', fontSize: '1.1rem', marginTop: user?.role !== 'student' ? '1rem' : '0' }}>
                      {meal.items.split(',').map((item, index) => (
                        <div key={index} style={{ padding: '0.5rem 0', borderBottom: index < meal.items.split(',').length - 1 ? '1px dashed #D1D5DB' : 'none' }}>
                          🍽️ {item.trim()}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: POLLS & PROMISES */}
          <div style={{ flex: '1', minWidth: '350px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* DEMOCRATIC POLLING */}
            <div style={{ backgroundColor: 'white', padding: '1.5rem', border: '3px solid #000', boxShadow: '4px 4px 0 #000' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, fontFamily: 'system-ui', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  🗳️ Live Polling
                </h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#6B7280', fontFamily: 'monospace', marginBottom: '1rem' }}>Admin decisions based on student votes.</p>
              
              {polls.length === 0 ? (
                 <p style={{ fontFamily: 'monospace', color: '#6B7280', textAlign: 'center', padding: '1rem', backgroundColor: '#F9FAFB', border: '2px dashed #D1D5DB' }}>No active polls right now.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {polls.map(poll => {
                    const totalVotes = poll.upvotes + poll.downvotes;
                    const upPercent = totalVotes > 0 ? Math.round((poll.upvotes / totalVotes) * 100) : 0;
                    const downPercent = totalVotes > 0 ? Math.round((poll.downvotes / totalVotes) * 100) : 0;

                    return (
                      <div key={poll.id} style={{ padding: '1rem', border: '2px solid #000', backgroundColor: '#F9FAFB' }}>
                        <p style={{ fontWeight: 'bold', fontFamily: 'monospace', marginBottom: '1rem', fontSize: '1rem' }}>{poll.question}</p>
                        
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          <button 
                            onClick={() => handleVote(poll.id, 'upvote')}
                            style={{ 
                              flex: 1, padding: '0.5rem', 
                              backgroundColor: poll.user_voted === 'upvote' ? '#10B981' : '#D1FAE5', 
                              color: poll.user_voted === 'upvote' ? 'white' : '#065F46', 
                              border: '2px solid #10B981', fontWeight: 'bold', 
                              cursor: user?.role === 'student' ? 'pointer' : 'not-allowed',
                              opacity: user?.role !== 'student' ? 0.7 : 1
                            }}>
                            👍 {poll.upvotes}
                          </button>
                          
                          <button 
                            onClick={() => handleVote(poll.id, 'downvote')}
                            style={{ 
                              flex: 1, padding: '0.5rem', 
                              backgroundColor: poll.user_voted === 'downvote' ? '#DC2626' : '#FEE2E2', 
                              color: poll.user_voted === 'downvote' ? 'white' : '#991B1B', 
                              border: '2px solid #DC2626', fontWeight: 'bold', 
                              cursor: user?.role === 'student' ? 'pointer' : 'not-allowed',
                              opacity: user?.role !== 'student' ? 0.7 : 1
                            }}>
                            👎 {poll.downvotes}
                          </button>
                        </div>
                        
                        <div style={{ display: 'flex', height: '8px', width: '100%', backgroundColor: '#E5E7EB', overflow: 'hidden', border: '1px solid #000' }}>
                          <div style={{ width: `${upPercent}%`, backgroundColor: '#10B981', transition: 'width 0.3s ease' }}></div>
                          <div style={{ width: `${downPercent}%`, backgroundColor: '#DC2626', transition: 'width 0.3s ease' }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 🟢 ACTION BOARD WITH PUBLIC AUDIT */}
            <div style={{ backgroundColor: 'white', padding: '1.5rem', border: '3px solid #000', boxShadow: '4px 4px 0 #000' }}>
              <h3 style={{ margin: '0 0 1rem 0', fontFamily: 'system-ui', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🛠️ Action Board
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#6B7280', fontFamily: 'monospace', marginBottom: '1rem' }}>Live tracking of management initiatives.</p>
              
              {actions.length === 0 ? (
                 <p style={{ fontFamily: 'monospace', color: '#6B7280', textAlign: 'center', padding: '1rem', backgroundColor: '#F9FAFB', border: '2px dashed #D1D5DB' }}>No active improvement tasks right now.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {actions.map(action => {
                    // Logic for Status Colors
                    let statusColor = '#9CA3AF'; // Under Review
                    let statusIcon = '📝';
                    if (action.status === 'In Progress') { statusColor = '#3B82F6'; statusIcon = '⚙️'; }
                    else if (action.status === 'Claimed Resolved') { statusColor = '#F59E0B'; statusIcon = '⏳'; }

                    return (
                      <div key={action.id} style={{ padding: '1rem', border: `2px solid ${statusColor}`, borderLeft: `8px solid ${statusColor}`, backgroundColor: '#F9FAFB' }}>
                        <p style={{ fontWeight: 'bold', margin: '0 0 0.5rem 0', fontFamily: 'system-ui' }}>{action.title}</p>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                          <span style={{ color: statusColor === '#9CA3AF' ? '#4B5563' : statusColor, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {statusIcon} {action.status}
                          </span>
                          
                          {/* Admin controls to update status */}
                          {(user?.role === 'admin' || user?.role === 'warden') && (
                            <select 
                              value={action.status}
                              onChange={(e) => handleStatusChange(action.id, e.target.value)}
                              style={{ padding: '0.25rem', fontFamily: 'monospace', border: '2px solid #000', cursor: 'pointer', outline: 'none' }}
                            >
                              <option value="Under Review">Under Review</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Claimed Resolved">Claimed Resolved</option>
                            </select>
                          )}
                        </div>

                        {/* 🟢 THE AUDIT BOX: Shows up only when Admin claims it's resolved */}
                        {action.status === 'Claimed Resolved' && (
                          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#FFFBEB', border: '2px dashed #F59E0B' }}>
                            <p style={{ margin: '0 0 0.5rem 0', fontFamily: 'monospace', fontWeight: 'bold', color: '#B45309', fontSize: '0.85rem' }}>
                              Management claims this is fixed. Verify?
                            </p>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <button 
                                onClick={() => handleVerifyAction(action.id, 'yes')}
                                style={{ 
                                  flex: 1, padding: '0.5rem', 
                                  backgroundColor: action.user_voted === 'yes' ? '#10B981' : '#D1FAE5', 
                                  color: action.user_voted === 'yes' ? 'white' : '#065F46', 
                                  border: '2px solid #10B981', fontWeight: 'bold', fontSize: '0.8rem',
                                  cursor: user?.role === 'student' ? 'pointer' : 'not-allowed',
                                  opacity: user?.role !== 'student' ? 0.7 : 1
                                }}>
                                👍 Yes ({action.yes_votes})
                              </button>
                              
                              <button 
                                onClick={() => handleVerifyAction(action.id, 'no')}
                                style={{ 
                                  flex: 1, padding: '0.5rem', 
                                  backgroundColor: action.user_voted === 'no' ? '#DC2626' : '#FEE2E2', 
                                  color: action.user_voted === 'no' ? 'white' : '#991B1B', 
                                  border: '2px solid #DC2626', fontWeight: 'bold', fontSize: '0.8rem',
                                  cursor: user?.role === 'student' ? 'pointer' : 'not-allowed',
                                  opacity: user?.role !== 'student' ? 0.7 : 1
                                }}>
                                👎 Fake ({action.no_votes})
                              </button>
                            </div>
                            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.7rem', color: '#6B7280', fontFamily: 'monospace', textAlign: 'center' }}>
                              If 5 students vote 'Fake', this reverts to In Progress.
                            </p>
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* MODAL: DROP POLL */}
      {showPollModal && (
        <div 
          onClick={() => setShowPollModal(false)} 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ backgroundColor: 'white', padding: '2rem', border: '4px solid #000', width: '90%', maxWidth: '500px', boxShadow: '8px 8px 0 #000', position: 'relative', pointerEvents: 'auto' }}
          >
            <h2 style={{ fontFamily: 'system-ui', margin: '0 0 1rem 0' }}>Drop a New Poll</h2>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'monospace', fontWeight: 'bold' }}>Question / Proposal:</label>
              <textarea 
                value={newPollQuestion}
                onChange={(e) => setNewPollQuestion(e.target.value)}
                placeholder="e.g., Should we replace Sunday Chowmein with Biryani?"
                rows={4}
                required
                style={{ width: '100%', boxSizing: 'border-box', padding: '0.75rem', border: '2px solid #000', fontFamily: 'monospace', marginBottom: '1.5rem', resize: 'none' }}
              />
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={handleCreatePoll} style={{ flex: 1, padding: '0.75rem', backgroundColor: '#10B981', color: 'white', border: '2px solid #000', fontWeight: 'bold', cursor: 'pointer' }}>
                  PUBLISH POLL
                </button>
                <button type="button" onClick={() => setShowPollModal(false)} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#FFF', color: '#000', border: '2px solid #000', fontWeight: 'bold', cursor: 'pointer' }}>
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD ACTION */}
      {showActionModal && (
        <div 
          onClick={() => setShowActionModal(false)} 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ backgroundColor: 'white', padding: '2rem', border: '4px solid #000', width: '90%', maxWidth: '500px', boxShadow: '8px 8px 0 #000', position: 'relative', pointerEvents: 'auto' }}
          >
            <h2 style={{ fontFamily: 'system-ui', margin: '0 0 1rem 0' }}>Add Improvement Task</h2>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'monospace', fontWeight: 'bold' }}>Task Title / Objective:</label>
              <input 
                type="text"
                value={newActionTitle}
                onChange={(e) => setNewActionTitle(e.target.value)}
                placeholder="e.g., Quality check for rice vendor"
                style={{ width: '100%', boxSizing: 'border-box', padding: '0.75rem', border: '2px solid #000', fontFamily: 'monospace', marginBottom: '1.5rem' }}
              />
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={handleCreateAction} style={{ flex: 1, padding: '0.75rem', backgroundColor: '#3B82F6', color: 'white', border: '2px solid #000', fontWeight: 'bold', cursor: 'pointer' }}>
                  ADD TASK
                </button>
                <button type="button" onClick={() => setShowActionModal(false)} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#FFF', color: '#000', border: '2px solid #000', fontWeight: 'bold', cursor: 'pointer' }}>
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Food;