import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { API_ENDPOINTS } from '../api/config';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const ComplaintDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🟢 NEW: State for Budget Revision Modal
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [newBudget, setNewBudget] = useState('');
  const [updatingBudget, setUpdatingBudget] = useState(false);

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  const fetchComplaint = async () => {
    try {
      const response = await axiosInstance.get(`${API_ENDPOINTS.COMPLAINTS}${id}`);
      setComplaint(response.data);
      setNewBudget(response.data.payout_amount || ''); // Set initial value if exists
    } catch (error) {
      console.error('Failed to fetch complaint:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this ticket?')) return;
    try {
      await axiosInstance.delete(`/complaints/${id}`);
      alert('✅ Ticket deleted successfully!');
      navigate('/complaints');
    } catch (error) {
      alert('❌ Failed to delete ticket');
    }
  };

  // 🟢 NEW: 1-Click Verify & Payout
  const handleVerifyAndResolve = async () => {
    if (!window.confirm('Confirm resolution and release payout to operator?')) return;
    try {
      await axiosInstance.put(`${API_ENDPOINTS.COMPLAINTS}${id}/status`, {
        status: 'resolved', // STRICTLY sending exactly what backend needs
        resolution_note: 'Task visually verified by Warden. Payout authorized.'
      });
      alert('✅ Task Verified & Payout Generated!');
      fetchComplaint(); // Refresh page automatically
    } catch (error) {
      alert('❌ Error resolving ticket');
    }
  };

  const canDeleteComplaint = () => {
    if (!user || !complaint) return false;
    if (String(complaint.user_id) !== String(user.id)) return false;
    
    const createdAt = new Date(complaint.created_at);
    const now = new Date();
    const hoursDiff = (now - createdAt) / (1000 * 60 * 60);
    return hoursDiff <= 24;
  };

  // 🟢 NEW: Budget Update Logic
  const handleReviseBudget = async (e) => {
    e.preventDefault();
    if (!newBudget || isNaN(newBudget) || Number(newBudget) < 0) {
      alert("Please enter a valid amount.");
      return;
    }
    
    setUpdatingBudget(true);
    try {
      // Backend should have a route to just update the payout amount
      // E.g., PUT /complaints/:id/budget -> { payout_amount: 1500 }
      await axiosInstance.put(`${API_ENDPOINTS.COMPLAINTS}${id}/budget`, {
        payout_amount: parseFloat(newBudget)
      });
      alert('✅ Budget Revised Successfully!');
      setShowBudgetModal(false);
      fetchComplaint(); // Refresh to see new budget
    } catch (error) {
      alert('❌ Failed to revise budget. Check backend route /budget');
      console.error(error);
    } finally {
      setUpdatingBudget(false);
    }
  };

  // Progress Bar Checkpoints
  const progressStages = ['raised', 'assigned', 'in_progress', 'resolved'];
  
  const getStageIndex = (currentStatus) => {
    if (currentStatus === 'closed') return 3; 
    if (currentStatus === 'rejected') return -1;
    return progressStages.indexOf(currentStatus);
  };

  const renderProgressBar = () => {
    const currentIndex = getStageIndex(complaint.status);
    
    if (complaint.status === 'rejected') {
      return (
        <div style={{ padding: '1rem', backgroundColor: '#FEE2E2', border: '3px solid #DC2626', color: '#DC2626', textAlign: 'center', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase' }}>
          [STATUS: REJECTED] - This ticket has been nullified.
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '3rem 0', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', height: '6px', backgroundColor: '#E5E7EB', zIndex: 1, transform: 'translateY(-50%)', borderTop: '1px solid #000', borderBottom: '1px solid #000' }}></div>
        
        <div style={{ position: 'absolute', top: '50%', left: '0', width: `${(currentIndex / (progressStages.length - 1)) * 100}%`, height: '6px', backgroundColor: '#10B981', zIndex: 1, transform: 'translateY(-50%)', transition: 'width 0.4s ease', borderTop: '1px solid #000', borderBottom: '1px solid #000' }}></div>

        {progressStages.map((stage, index) => {
          const isCompleted = index <= currentIndex;
          const isActive = index === currentIndex;
          return (
            <div key={stage} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                backgroundColor: isCompleted ? '#10B981' : '#FFFFFF',
                border: '3px solid #000000',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                color: isCompleted ? 'white' : 'transparent',
                fontWeight: '900', transition: 'all 0.3s ease',
                boxShadow: isActive ? '0 0 0 6px rgba(16, 185, 129, 0.2)' : (isCompleted ? '4px 4px 0 #000' : 'none'),
                transform: isActive ? 'scale(1.1)' : 'scale(1)'
              }}>
                {isCompleted ? '✓' : ''}
              </div>
              <span style={{ marginTop: '0.75rem', fontSize: '0.8rem', fontWeight: isActive ? '900' : 'bold', color: isCompleted ? '#059669' : '#6B7280', textTransform: 'uppercase', fontFamily: 'monospace', backgroundColor: '#FFF', padding: '0 0.5rem' }}>
                {stage.replace('_', ' ')}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  const renderEvidencePanel = () => {
    // 🟢 HYBRID CHECK: Check for both URL and Base64 fields
    const hasBefore = !!(complaint.photo_url || complaint.photo_base64);
    const hasAfter = !!(complaint.after_photo || complaint.resolution_photo);

    // 🟢 INTELLIGENT URL BUILDER: Base64 ko ignore karega, normal path ko build karega
    const getFullImageUrl = (path) => {
      if (!path) return null;
      // Agar direct Base64 data hai, toh waisa hi rehne do
      if (path.startsWith('data:image')) return path;
      // Agar full URL hai, toh waisa hi rehne do
      if (path.startsWith('http')) return path;
      // Agar sirf path hai, toh backend link jodo
      return `https://hle-backend.onrender.com${path.startsWith('/') ? '' : '/'}${path}`;
    };

    if (!hasBefore && !hasAfter) {
      return (
        <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#F9FAFB', border: '3px dashed #D1D5DB', textAlign: 'center', fontFamily: 'monospace' }}>
          <span style={{ fontSize: '1.5rem' }}>📸</span>
          <p style={{ fontWeight: 'bold', color: '#6B7280', marginTop: '0.5rem' }}>NO VISUAL EVIDENCE ATTACHED</p>
          <p style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>This ticket was processed without photographic proof.</p>
        </div>
      );
    }

    return (
      <div style={{ marginTop: '2.5rem', border: '3px solid #000', backgroundColor: '#FFF', boxShadow: '8px 8px 0 #000' }}>
        <div style={{ backgroundColor: '#000', color: '#FFF', padding: '1rem', fontWeight: '900', fontFamily: 'monospace', display: 'flex', justifyContent: 'space-between' }}>
          <span>// EVIDENCE_LOGS</span>
          <span style={{ color: '#10B981' }}>[AUDIT_TRAIL_ACTIVE]</span>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0' }}>
          {/* 🟢 BEFORE PHOTO SECTION */}
          <div style={{ padding: '1.5rem', borderRight: hasAfter ? '3px solid #000' : 'none', display: 'flex', flexDirection: 'column' }}>
            <h4 style={{ fontWeight: '900', textTransform: 'uppercase', marginBottom: '1rem', color: '#DC2626', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: '#DC2626', borderRadius: '50%' }}></span>
              Before (Issue Logged)
            </h4>
            {hasBefore ? (
              <div style={{ flex: 1, backgroundColor: '#F3F4F6', border: '2px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img 
                  src={getFullImageUrl(complaint.photo_base64 || complaint.photo_url)} 
                  alt="Before Issue" 
                  style={{ width: '100%', height: '300px', objectFit: 'contain' }} 
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found'; }}
                />
              </div>
            ) : (
              <div style={{ flex: 1, backgroundColor: '#F9FAFB', border: '2px dashed #9CA3AF', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px', color: '#9CA3AF', fontFamily: 'monospace', fontWeight: 'bold' }}>
                NO_INITIAL_PHOTO
              </div>
            )}
          </div>

          {/* 🟢 AFTER PHOTO SECTION */}
          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <h4 style={{ fontWeight: '900', textTransform: 'uppercase', marginBottom: '1rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: '#10B981', borderRadius: '50%' }}></span>
              After (Resolution Proof)
            </h4>
            {hasAfter ? (
              <div style={{ flex: 1, backgroundColor: '#F3F4F6', border: '2px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#10B981', color: '#FFF', padding: '0.2rem 0.5rem', fontWeight: 'bold', fontSize: '0.7rem', border: '2px solid #000', fontFamily: 'monospace' }}>VERIFIED</div>
                <img 
                  src={getFullImageUrl(complaint.resolution_photo || complaint.after_photo)} 
                  alt="After Resolution" 
                  style={{ width: '100%', height: '300px', objectFit: 'contain' }} 
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Result+Image+Missing'; }}
                />
              </div>
            ) : (
              <div style={{ flex: 1, backgroundColor: '#F9FAFB', border: '2px dashed #9CA3AF', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px', color: '#9CA3AF', fontFamily: 'monospace', fontWeight: 'bold', textAlign: 'center', padding: '1rem' }}>
                {complaint.status === 'resolved' || complaint.status === 'closed' ? 'RESOLVED_WITHOUT_PHOTO' : 'AWAITING_RESOLUTION'}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div><Navbar /><div style={{ padding: '4rem', textAlign: 'center', fontFamily: 'monospace', fontWeight: '900', fontSize: '1.5rem' }}>[LOADING_TICKET_DATA...]</div></div>;
  if (!complaint) return <div><Navbar /><div style={{ padding: '4rem', textAlign: 'center', fontFamily: 'monospace', fontWeight: '900', fontSize: '1.5rem', color: '#DC2626' }}>[ERROR: TICKET_NOT_FOUND]</div></div>;

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', paddingBottom: '4rem' }}>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <button onClick={() => navigate('/complaints')} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#FFFFFF', border: '3px solid #000', fontWeight: '900', cursor: 'pointer', fontFamily: 'monospace', boxShadow: '4px 4px 0 #000', transition: 'transform 0.1s' }} onMouseDown={(e) => e.currentTarget.style.transform = 'translate(2px, 2px)'} onMouseUp={(e) => e.currentTarget.style.transform = 'translate(0, 0)'}>
            ← RETURN_TO_QUEUE
          </button>
          
          {canDeleteComplaint() && (
            <button onClick={handleDelete} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#DC2626', color: 'white', border: '3px solid #000', cursor: 'pointer', fontWeight: '900', fontFamily: 'monospace', boxShadow: '4px 4px 0 #000' }}>
              DELETE_TICKET
            </button>
          )}
        </div>

        {/* MAIN TICKET CARD */}
        <div style={{ backgroundColor: 'white', padding: '3rem', border: '4px solid #000000', boxShadow: '12px 12px 0 #E5E7EB' }}>
          
          {/* Header Info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '4px solid #000', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ display: 'inline-block', backgroundColor: '#000', color: '#FFF', padding: '0.25rem 0.75rem', fontWeight: 'bold', fontFamily: 'monospace', marginBottom: '0.5rem' }}>
                TICKET #{complaint.id}
              </div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '900', textTransform: 'uppercase', lineHeight: '1.2' }}>{complaint.title}</h1>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ display: 'block', padding: '0.5rem 1rem', backgroundColor: complaint.status === 'resolved' ? '#10B981' : (complaint.status === 'in_progress' ? '#F59E0B' : '#3B82F6'), color: '#FFF', fontWeight: '900', border: '3px solid #000', textTransform: 'uppercase', fontFamily: 'monospace', boxShadow: '4px 4px 0 #000' }}>
                {complaint.status}
              </span>
            </div>
          </div>

          {renderProgressBar()}

          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '900', textTransform: 'uppercase', color: '#6B7280', marginBottom: '0.5rem', fontFamily: 'monospace' }}>Issue Description:</h3>
            <p style={{ color: '#111827', fontSize: '1.1rem', lineHeight: '1.6', fontWeight: '500', backgroundColor: '#F9FAFB', padding: '1.5rem', border: '2px solid #E5E7EB' }}>
              {complaint.description}
            </p>
          </div>

          {/* 🟢 FIXED: Metadata Grid with Budget */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', padding: '1.5rem', backgroundColor: '#000', color: '#FFF', border: '3px solid #000' }}>
            <div><p style={{ fontSize: '0.75rem', color: '#9CA3AF', fontFamily: 'monospace', fontWeight: 'bold', margin: '0 0 0.2rem 0' }}>LOCATION</p><p style={{ fontWeight: '900', fontSize: '1.2rem', margin: 0 }}>RM-{complaint.room_number}</p></div>
            <div><p style={{ fontSize: '0.75rem', color: '#9CA3AF', fontFamily: 'monospace', fontWeight: 'bold', margin: '0 0 0.2rem 0' }}>CATEGORY</p><p style={{ fontWeight: '900', fontSize: '1.2rem', textTransform: 'uppercase', margin: 0 }}>{complaint.category}</p></div>
            <div><p style={{ fontSize: '0.75rem', color: '#9CA3AF', fontFamily: 'monospace', fontWeight: 'bold', margin: '0 0 0.2rem 0' }}>PRIORITY</p><p style={{ fontWeight: '900', fontSize: '1.2rem', textTransform: 'uppercase', color: complaint.priority === 'urgent' ? '#F59E0B' : (complaint.priority === 'critical' ? '#EF4444' : '#10B981'), margin: 0 }}>{complaint.priority}</p></div>
            
            {/* 🟢 NEW: BUDGET BOX */}
            <div style={{ backgroundColor: '#1F2937', padding: '0.5rem', border: '1px dashed #4B5563' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontSize: '0.75rem', color: '#10B981', fontFamily: 'monospace', fontWeight: 'bold', margin: '0 0 0.2rem 0' }}>WORK BUDGET</p>
                {(user?.role === 'warden' || user?.role === 'admin') && complaint.status !== 'resolved' && complaint.status !== 'closed' && complaint.status !== 'raised' && (
                  <button onClick={() => setShowBudgetModal(true)} style={{ background: 'none', border: 'none', color: '#60A5FA', fontSize: '0.7rem', cursor: 'pointer', fontFamily: 'monospace', fontWeight: 'bold', textDecoration: 'underline' }}>REVISE</button>
                )}
              </div>
              <p style={{ fontWeight: '900', fontSize: '1.2rem', margin: 0, color: complaint.payout_amount ? '#FFF' : '#6B7280' }}>
                {complaint.payout_amount ? `₹${parseFloat(complaint.payout_amount).toFixed(2)}` : '[PENDING_ASSIGNMENT]'}
              </p>
            </div>
          </div>

          {renderEvidencePanel()}

          {complaint.resolution_note && (
            <div style={{ marginTop: '2.5rem', padding: '1.5rem', backgroundColor: '#ECFDF5', border: '3px solid #059669', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-12px', left: '1rem', backgroundColor: '#059669', color: '#FFF', padding: '0.1rem 0.5rem', fontSize: '0.75rem', fontWeight: '900', fontFamily: 'monospace' }}>OFFICIAL_REMARK</div>
              <p style={{ color: '#065F46', fontWeight: '600', fontSize: '1.1rem', marginTop: '0.5rem' }}>{complaint.resolution_note}</p>
            </div>
          )}

          {complaint.status === 'review_pending' && (
            <div style={{ marginTop: '2.5rem', padding: '1.5rem', backgroundColor: '#FFFBEB', border: '4px dashed #F59E0B', textAlign: 'center' }}>
              <h3 style={{ margin: 0, color: '#B45309', fontFamily: 'monospace', fontWeight: '900', fontSize: '1.2rem' }}>
                ⏳ AWAITING WARDEN VERIFICATION
              </h3>
              <p style={{ color: '#92400E', fontWeight: 'bold', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Caretaker claims this issue is fixed. Ground level verification is required by Warden.
              </p>
            </div>
          )}

          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '4px dashed #E5E7EB', display: 'flex', gap: '1.5rem' }}>
            
            {/* ASSIGN WORKER */}
            {(user?.role === 'warden' || user?.role === 'admin') && (
              complaint.status === 'raised' ? (
                <Link to={`/complaints/${id}/assign`} style={{ flex: 1 }}>
                  <button style={{ width: '100%', padding: '1rem', backgroundColor: '#7C3AED', color: 'white', border: '3px solid #000', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '6px 6px 0 #000', fontFamily: 'monospace', transition: 'transform 0.1s' }}>
                    ASSIGN_WORKER
                  </button>
                </Link>
              ) : (
                <div style={{ flex: 1, padding: '1rem', backgroundColor: '#F3F4F6', color: '#6B7280', border: '3px dashed #9CA3AF', fontWeight: '900', fontSize: '1.1rem', textAlign: 'center', fontFamily: 'monospace' }}>
                  [ALREADY_ASSIGNED]
                </div>
              )
            )}

            {/* 🟢 FIXED: UPDATE STATUS & RESOLVE */}
            {((user?.role === 'warden' || user?.role === 'admin') || 
             (user?.role === 'caretaker' && String(complaint.assigned_to) === String(user.id))) && 
             complaint.status !== 'closed' && complaint.status !== 'resolved' && (
              <div style={{ flex: 1, display: 'flex' }}>
                {complaint.status === 'review_pending' && user?.role !== 'caretaker' ? (
                  /* Warden Direct Action Button */
                  <button onClick={handleVerifyAndResolve} style={{ width: '100%', padding: '1rem', backgroundColor: '#10B981', color: 'white', border: '3px solid #000', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '6px 6px 0 #000', fontFamily: 'monospace' }}>
                    ✅ VERIFY & RELEASE PAYOUT
                  </button>
                ) : (
                  /* Normal Update Page for Caretakers */
                  <Link to={`/complaints/${id}/update-status`} style={{ width: '100%', textDecoration: 'none' }}>
                    <button style={{ width: '100%', padding: '1rem', backgroundColor: '#3B82F6', color: 'white', border: '3px solid #000', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '6px 6px 0 #000', fontFamily: 'monospace' }}>
                      PROCESS_UPDATE
                    </button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🟢 NEW: BUDGET REVISION MODAL */}
      {showBudgetModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
          <form onSubmit={handleReviseBudget} style={{ backgroundColor: 'white', padding: '2.5rem', border: '4px solid #000', width: '90%', maxWidth: '400px', boxShadow: '12px 12px 0 #000' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '900', textTransform: 'uppercase', margin: '0 0 1rem 0' }}>
              Revise Budget
            </h2>
            <p style={{ fontFamily: 'monospace', color: '#4B5563', marginBottom: '2rem', fontWeight: 'bold' }}>
              Update the payout amount for this task post-negotiation.
            </p>
            <div style={{ marginBottom: '2rem', position: 'relative' }}>
              <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem', fontWeight: '900' }}>₹</span>
              <input 
                type="number" min="0" step="0.01" value={newBudget} onChange={(e) => setNewBudget(e.target.value)} required
                style={{ width: '100%', padding: '1rem 1rem 1rem 2.5rem', border: '3px solid #000', fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: '900', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" disabled={updatingBudget} style={{ flex: 1, padding: '1rem', backgroundColor: '#10B981', color: '#FFF', border: '3px solid #000', fontWeight: '900', cursor: updatingBudget ? 'not-allowed' : 'pointer', fontFamily: 'monospace' }}>
                {updatingBudget ? 'SAVING...' : 'UPDATE'}
              </button>
              <button type="button" onClick={() => setShowBudgetModal(false)} style={{ padding: '1rem 2rem', backgroundColor: '#FFF', color: '#000', border: '3px solid #000', fontWeight: '900', cursor: 'pointer', fontFamily: 'monospace' }}>
                CANCEL
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

export default ComplaintDetail;