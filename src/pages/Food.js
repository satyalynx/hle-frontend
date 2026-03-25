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
  
  // 🟢 NEW: Real-time Expose Meter State
  const [todayAvgRating, setTodayAvgRating] = useState(null);
  
  // States for Admin creating a new poll
  const [showPollModal, setShowPollModal] = useState(false);
  const [newPollQuestion, setNewPollQuestion] = useState('');

  // States for Admin creating a new Action
  const [showActionModal, setShowActionModal] = useState(false);
  const [newActionTitle, setNewActionTitle] = useState('');

  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  useEffect(() => {
    fetchMenu();
    fetchPolls();
    fetchActions(); 
    fetchTodayRating(); // 🟢 Fetching real-time rating
  }, []);

  const fetchTodayRating = async () => {
    try {
      // Re-using the analytics endpoint for a single day to get real-time average
      const response = await axiosInstance.get('/mess/analytics/smart-summary?range=day');
      if (response.data && response.data.avg_ratings && response.data.avg_ratings.length > 0) {
        const rating = response.data.avg_ratings[0];
        setTodayAvgRating(rating > 0 ? rating.toFixed(1) : null);
      }
    } catch (error) {
      console.error('Failed to fetch today rating:', error);
      setTodayAvgRating(null);
    }
  };

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
      alert("UNAUTHORIZED: Only students are permitted to participate in polls.");
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
      alert("POLL PUBLISHED SUCCESSFULLY.");
    } catch (error) {
      console.error('Failed to create poll:', error);
    }
  };

  const handleCreateAction = async () => {
    if (!newActionTitle.trim()) {
      alert("REQUIREMENT MISSING: Enter a task title.");
      return;
    }

    try {
      await axiosInstance.post('/mess/actions/', { title: newActionTitle });
      setNewActionTitle('');
      setShowActionModal(false);
      fetchActions();
      alert("ACTION ITEM ADDED.");
    } catch (error) {
      console.error('Failed to create action:', error);
    }
  };

  const handleStatusChange = async (actionId, newStatus) => {
    try {
      await axiosInstance.put(`/mess/actions/${actionId}/status`, { status: newStatus });
      fetchActions();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleVerifyAction = async (actionId, voteType) => {
    if (user?.role !== 'student') {
      alert("UNAUTHORIZED: Only students are permitted to execute verification audits.");
      return;
    }
    
    try {
      await axiosInstance.post(`/mess/actions/${actionId}/verify`, {
        user_id: user.id,
        vote_type: voteType
      });
      fetchActions(); 
    } catch (error) {
      console.error('Failed to cast verification vote:', error);
    }
  };

  if (loading) return <div><Navbar /><div style={{ padding: '4rem', textAlign: 'center', fontFamily: 'monospace', fontWeight: 'bold' }}>[SYSTEM SYNCING DATA...]</div></div>;

  // Rating Theme Logic
  const ratingIsCritical = todayAvgRating !== null && todayAvgRating < 3;
  const ratingColor = todayAvgRating === null ? '#4B5563' : (ratingIsCritical ? '#DC2626' : '#2563EB');
  const ratingBg = todayAvgRating === null ? '#F3F4F6' : (ratingIsCritical ? '#FEF2F2' : '#EFF6FF');

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', paddingBottom: '3rem' }}>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '900', fontFamily: 'system-ui', margin: 0, textTransform: 'uppercase', letterSpacing: '-1px' }}>Food Hub</h1>
            <p style={{ fontFamily: 'monospace', color: '#6B7280', fontSize: '1rem', marginTop: '0.2rem' }}>TIMETABLE | POLLING | PUBLIC ACCOUNTABILITY</p>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {user?.role === 'student' && (
              <Link to="/my-feedback">
                <button style={{ padding: '0.75rem 1.5rem', backgroundColor: '#2563EB', color: 'white', border: '3px solid #000', fontWeight: '900', fontFamily: 'monospace', cursor: 'pointer', boxShadow: '4px 4px 0 #000' }}>
                  MY FEEDBACK
                </button>
              </Link>
            )}

            {(user?.role === 'warden' || user?.role === 'admin') && (
              <>
                <button onClick={() => setShowPollModal(true)} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#FACC15', color: '#000', border: '3px solid #000', fontWeight: '900', fontFamily: 'monospace', cursor: 'pointer', boxShadow: '4px 4px 0 #000' }}>
                  CREATE POLL
                </button>
                <Link to="/mess-analytics">
                  <button style={{ padding: '0.75rem 1.5rem', backgroundColor: '#000', color: 'white', border: '3px solid #000', fontWeight: '900', fontFamily: 'monospace', cursor: 'pointer', boxShadow: '4px 4px 0 #4B5563' }}>
                    SYSTEM ANALYTICS
                  </button>
                </Link>
              </>
            )}

            {user?.role === 'admin' && (
              <>
                <button onClick={() => setShowActionModal(true)} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#FFF', color: '#000', border: '3px solid #000', fontWeight: '900', fontFamily: 'monospace', cursor: 'pointer', boxShadow: '4px 4px 0 #000' }}>
                  NEW ACTION ITEM
                </button>
                <Link to="/upload-menu">
                  <button style={{ padding: '0.75rem 1.5rem', backgroundColor: '#FFF', color: '#000', border: '3px solid #000', fontWeight: '900', fontFamily: 'monospace', cursor: 'pointer', boxShadow: '4px 4px 0 #000' }}>
                    UPDATE TIMETABLE
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* 🟢 REAL-TIME EXPOSE METER */}
        <div style={{ backgroundColor: ratingBg, border: `4px solid ${ratingColor}`, padding: '1.5rem 2rem', marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: `6px 6px 0 ${ratingColor}` }}>
          <div>
            <h2 style={{ margin: 0, fontFamily: 'monospace', fontWeight: '900', color: ratingColor, textTransform: 'uppercase' }}>
              PUBLIC EXPOSE METER
            </h2>
            <p style={{ fontFamily: 'monospace', color: '#4B5563', margin: '0.5rem 0 0 0', fontWeight: 'bold' }}>
              REAL-TIME CUMULATIVE STUDENT RATING. UNFILTERED.
            </p>
          </div>
          <div style={{ fontSize: '3rem', fontWeight: '900', fontFamily: 'monospace', color: ratingColor }}>
            {todayAvgRating === null ? '[AWAITING DATA]' : `${todayAvgRating} / 5`}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          
          {/* LEFT COLUMN: MENU */}
          <div style={{ flex: '2', minWidth: '350px' }}>
            <h2 style={{ fontFamily: 'monospace', fontWeight: '900', marginBottom: '1.5rem', textTransform: 'uppercase', backgroundColor: '#000', color: '#FFF', padding: '0.5rem 1rem', display: 'inline-block' }}>
              ROUTINE: {currentDay}
            </h2>
            
            {menu.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'white', border: '4px solid #000', boxShadow: '6px 6px 0 #000' }}>
                <p style={{ fontSize: '1.2rem', color: '#6B7280', fontFamily: 'monospace', fontWeight: 'bold' }}>NO ACTIVE ROUTINE LOGGED FOR TODAY.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {menu.map((meal) => (
                  <div key={meal.id} style={{ backgroundColor: 'white', padding: '1.5rem', border: '4px solid #000', boxShadow: '6px 6px 0 #000' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '900', textTransform: 'uppercase', margin: '0 0 1rem 0', fontFamily: 'monospace', color: '#111827' }}>
                          [{meal.meal_type}]
                        </h3>
                      </div>
                      {user?.role === 'student' && (
                        <Link to={`/rate-meal/${meal.id}`}>
                          <button style={{ padding: '0.5rem 1.5rem', backgroundColor: '#000', color: 'white', border: '2px solid #000', fontWeight: '900', fontFamily: 'monospace', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#DC2626'; e.target.style.borderColor = '#DC2626'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = '#000'; e.target.style.borderColor = '#000'; }}>
                            SUBMIT AUDIT
                          </button>
                        </Link>
                      )}
                    </div>
                    <div style={{ color: '#374151', fontFamily: 'monospace', fontSize: '1.1rem', marginTop: user?.role !== 'student' ? '1rem' : '0' }}>
                      {meal.items.split(',').map((item, index) => (
                        <div key={index} style={{ padding: '0.5rem 0', borderBottom: index < meal.items.split(',').length - 1 ? '2px dashed #E5E7EB' : 'none', fontWeight: 'bold' }}>
                          - {item.trim()}
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
            <div style={{ backgroundColor: 'white', padding: '1.5rem', border: '4px solid #000', boxShadow: '6px 6px 0 #000' }}>
              <h3 style={{ margin: '0 0 1rem 0', fontFamily: 'monospace', fontWeight: '900', textTransform: 'uppercase' }}>
                ACTIVE POLLING
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#4B5563', fontFamily: 'monospace', marginBottom: '1.5rem', fontWeight: 'bold' }}>SYSTEM: DEMOCRATIC RESOURCE ALLOCATION</p>
              
              {polls.length === 0 ? (
                 <p style={{ fontFamily: 'monospace', color: '#6B7280', textAlign: 'center', padding: '1.5rem', backgroundColor: '#F9FAFB', border: '2px dashed #9CA3AF', fontWeight: 'bold' }}>NO ACTIVE POLLS.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {polls.map(poll => {
                    const totalVotes = poll.upvotes + poll.downvotes;
                    const upPercent = totalVotes > 0 ? Math.round((poll.upvotes / totalVotes) * 100) : 0;
                    const downPercent = totalVotes > 0 ? Math.round((poll.downvotes / totalVotes) * 100) : 0;

                    return (
                      <div key={poll.id} style={{ padding: '1.5rem', border: '3px solid #000', backgroundColor: '#F9FAFB' }}>
                        <p style={{ fontWeight: '900', fontFamily: 'system-ui', marginBottom: '1.5rem', fontSize: '1.1rem' }}>{poll.question}</p>
                        
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                          <button 
                            onClick={() => handleVote(poll.id, 'upvote')}
                            style={{ 
                              flex: 1, padding: '0.75rem', 
                              backgroundColor: poll.user_voted === 'upvote' ? '#000' : '#FFF', 
                              color: poll.user_voted === 'upvote' ? '#FFF' : '#000', 
                              border: '3px solid #000', fontWeight: '900', fontFamily: 'monospace',
                              cursor: user?.role === 'student' ? 'pointer' : 'not-allowed',
                              opacity: user?.role !== 'student' ? 0.5 : 1
                            }}>
                            AGREE ({poll.upvotes})
                          </button>
                          
                          <button 
                            onClick={() => handleVote(poll.id, 'downvote')}
                            style={{ 
                              flex: 1, padding: '0.75rem', 
                              backgroundColor: poll.user_voted === 'downvote' ? '#000' : '#FFF', 
                              color: poll.user_voted === 'downvote' ? '#FFF' : '#000', 
                              border: '3px solid #000', fontWeight: '900', fontFamily: 'monospace',
                              cursor: user?.role === 'student' ? 'pointer' : 'not-allowed',
                              opacity: user?.role !== 'student' ? 0.5 : 1
                            }}>
                            DISAGREE ({poll.downvotes})
                          </button>
                        </div>
                        
                        <div style={{ display: 'flex', height: '10px', width: '100%', backgroundColor: '#E5E7EB', overflow: 'hidden', border: '2px solid #000' }}>
                          <div style={{ width: `${upPercent}%`, backgroundColor: '#2563EB', transition: 'width 0.3s ease' }}></div>
                          <div style={{ width: `${downPercent}%`, backgroundColor: '#DC2626', transition: 'width 0.3s ease' }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ACTION BOARD WITH PUBLIC AUDIT */}
            <div style={{ backgroundColor: 'white', padding: '1.5rem', border: '4px solid #000', boxShadow: '6px 6px 0 #000' }}>
              <h3 style={{ margin: '0 0 1rem 0', fontFamily: 'monospace', fontWeight: '900', textTransform: 'uppercase' }}>
                ACTION BOARD
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#4B5563', fontFamily: 'monospace', marginBottom: '1.5rem', fontWeight: 'bold' }}>TRACKING INITIATIVE EXECUTION</p>
              
              {actions.length === 0 ? (
                 <p style={{ fontFamily: 'monospace', color: '#6B7280', textAlign: 'center', padding: '1.5rem', backgroundColor: '#F9FAFB', border: '2px dashed #9CA3AF', fontWeight: 'bold' }}>NO ACTIVE INITIATIVES.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {actions.map(action => {
                    let statusColor = '#000'; // Default Brutalist
                    if (action.status === 'In Progress') statusColor = '#2563EB'; // Blue
                    else if (action.status === 'Claimed Resolved') statusColor = '#FACC15'; // Yellow Warning

                    return (
                      <div key={action.id} style={{ padding: '1.25rem', border: '3px solid #000', borderLeft: `8px solid ${statusColor}`, backgroundColor: '#F9FAFB' }}>
                        <p style={{ fontWeight: '900', margin: '0 0 1rem 0', fontFamily: 'system-ui', fontSize: '1.1rem' }}>{action.title}</p>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', fontFamily: 'monospace' }}>
                          <span style={{ color: statusColor, fontWeight: '900', textTransform: 'uppercase' }}>
                            [{action.status}]
                          </span>
                          
                          {(user?.role === 'admin' || user?.role === 'warden') && (
                            <select 
                              value={action.status}
                              onChange={(e) => handleStatusChange(action.id, e.target.value)}
                              style={{ padding: '0.4rem', fontFamily: 'monospace', border: '2px solid #000', cursor: 'pointer', outline: 'none', fontWeight: 'bold' }}
                            >
                              <option value="Under Review">Under Review</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Claimed Resolved">Claimed Resolved</option>
                            </select>
                          )}
                        </div>

                        {/* THE AUDIT BOX */}
                        {action.status === 'Claimed Resolved' && (
                          <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#FFF', border: '3px dashed #000' }}>
                            <p style={{ margin: '0 0 1rem 0', fontFamily: 'monospace', fontWeight: '900', color: '#000', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                              SYSTEM AUDIT REQUIRED. VERIFY EXECUTION?
                            </p>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                              <button 
                                onClick={() => handleVerifyAction(action.id, 'yes')}
                                style={{ 
                                  flex: 1, padding: '0.6rem', 
                                  backgroundColor: action.user_voted === 'yes' ? '#000' : '#FFF', 
                                  color: action.user_voted === 'yes' ? '#FFF' : '#000', 
                                  border: '2px solid #000', fontWeight: '900', fontSize: '0.85rem', fontFamily: 'monospace',
                                  cursor: user?.role === 'student' ? 'pointer' : 'not-allowed',
                                  opacity: user?.role !== 'student' ? 0.5 : 1
                                }}>
                                VERIFY ({action.yes_votes})
                              </button>
                              
                              <button 
                                onClick={() => handleVerifyAction(action.id, 'no')}
                                style={{ 
                                  flex: 1, padding: '0.6rem', 
                                  backgroundColor: action.user_voted === 'no' ? '#DC2626' : '#FFF', 
                                  color: action.user_voted === 'no' ? '#FFF' : '#DC2626', 
                                  border: `2px solid ${action.user_voted === 'no' ? '#DC2626' : '#000'}`, fontWeight: '900', fontSize: '0.85rem', fontFamily: 'monospace',
                                  cursor: user?.role === 'student' ? 'pointer' : 'not-allowed',
                                  opacity: user?.role !== 'student' ? 0.5 : 1
                                }}>
                                REJECT ({action.no_votes})
                              </button>
                            </div>
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
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ backgroundColor: 'white', padding: '2.5rem', border: '4px solid #000', width: '90%', maxWidth: '500px', boxShadow: '12px 12px 0 #000', position: 'relative' }}
          >
            <h2 style={{ fontFamily: 'monospace', fontWeight: '900', margin: '0 0 1.5rem 0', textTransform: 'uppercase' }}>INITIALIZE POLL</h2>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'monospace', fontWeight: 'bold' }}>PROPOSAL PARAMETERS:</label>
              <textarea 
                value={newPollQuestion}
                onChange={(e) => setNewPollQuestion(e.target.value)}
                placeholder="Enter policy or menu proposal..."
                rows={4}
                required
                style={{ width: '100%', boxSizing: 'border-box', padding: '1rem', border: '3px solid #000', fontFamily: 'monospace', marginBottom: '2rem', resize: 'none', fontWeight: 'bold' }}
              />
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={handleCreatePoll} style={{ flex: 1, padding: '1rem', backgroundColor: '#000', color: 'white', border: '3px solid #000', fontWeight: '900', fontFamily: 'monospace', cursor: 'pointer' }}>
                  PUBLISH
                </button>
                <button type="button" onClick={() => setShowPollModal(false)} style={{ padding: '1rem 2rem', backgroundColor: '#FFF', color: '#000', border: '3px solid #000', fontWeight: '900', fontFamily: 'monospace', cursor: 'pointer' }}>
                  ABORT
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
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ backgroundColor: 'white', padding: '2.5rem', border: '4px solid #000', width: '90%', maxWidth: '500px', boxShadow: '12px 12px 0 #000', position: 'relative' }}
          >
            <h2 style={{ fontFamily: 'monospace', fontWeight: '900', margin: '0 0 1.5rem 0', textTransform: 'uppercase' }}>LOG ACTION ITEM</h2>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'monospace', fontWeight: 'bold' }}>OBJECTIVE IDENTIFIER:</label>
              <input 
                type="text"
                value={newActionTitle}
                onChange={(e) => setNewActionTitle(e.target.value)}
                placeholder="Enter task definition..."
                style={{ width: '100%', boxSizing: 'border-box', padding: '1rem', border: '3px solid #000', fontFamily: 'monospace', marginBottom: '2rem', fontWeight: 'bold' }}
              />
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={handleCreateAction} style={{ flex: 1, padding: '1rem', backgroundColor: '#000', color: 'white', border: '3px solid #000', fontWeight: '900', fontFamily: 'monospace', cursor: 'pointer' }}>
                  EXECUTE
                </button>
                <button type="button" onClick={() => setShowActionModal(false)} style={{ padding: '1rem 2rem', backgroundColor: '#FFF', color: '#000', border: '3px solid #000', fontWeight: '900', fontFamily: 'monospace', cursor: 'pointer' }}>
                  ABORT
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