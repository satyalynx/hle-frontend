import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { API_ENDPOINTS } from '../api/config';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const UpdateComplaintStatus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); 
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [originalComplaint, setOriginalComplaint] = useState(null);
  
  const [formData, setFormData] = useState({
    status: 'in_progress',
    resolution_note: '',
  });

  useEffect(() => {
    const fetchComplaintData = async () => {
      try {
        const res = await axiosInstance.get(`${API_ENDPOINTS.COMPLAINTS}${id}`);
        setOriginalComplaint(res.data);
        
        // 🟢 SECURITY: If Caretaker opens an unassigned ticket, kick them out
        if (user?.role === 'caretaker' && String(res.data.assigned_to) !== String(user.id)) {
          alert("SECURITY BREACH: You can only update complaints assigned to you.");
          navigate('/complaints');
          return;
        }

        setFormData(prev => ({ 
          ...prev, 
          status: res.data.status === 'raised' || res.data.status === 'assigned' ? 'in_progress' : res.data.status 
        }));
      } catch (err) {
        setError('Failed to fetch ticket data.');
      } finally {
        setLoading(false);
      }
    };
    fetchComplaintData();
  }, [id, user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 🟢 MINIMUM 0.5 MB CHECK (Same as CreateComplaint)
      if (file.size < 0.5 * 1024 * 1024) {
        alert('File size must be at least 0.5MB (500KB) for clarity');
        return;
      }
      // 🟢 MAXIMUM 20 MB CHECK (Same as CreateComplaint)
      if (file.size > 20 * 1024 * 1024) {
        alert('File size must be less than 20MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        // PREVIEW AUR BASE64 DATA YAHI HAI
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasBeforeImage = !!originalComplaint?.image_url;
    
    // 🟢 SMART LOGIC: Proof is MANDATORY when Caretaker requests review or Warden resolves
    if (formData.status === 'review_pending' || formData.status === 'resolved') {
      if (hasBeforeImage && !imagePreview && !originalComplaint?.resolution_photo) {
        setError('❌ A resolution photo is MANDATORY. Please upload proof of completion.');
        return;
      }
    }

    setSubmitLoading(true);
    setError('');

    try {
      // 🟢 SENDING BASE64 PREVIEW DIRECTLY TO BACKEND
      const submitData = {
        ...formData,
        resolution_photo: imagePreview || null 
      };

      await axiosInstance.put(`${API_ENDPOINTS.COMPLAINTS}${id}/status`, submitData);
      alert('✅ Ticket updated successfully!');
      navigate(`/complaints/${id}`);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update system.');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <div><Navbar /><div style={{ padding: '4rem', textAlign: 'center', fontFamily: 'monospace', fontWeight: '900', fontSize: '1.5rem' }}>[LOADING_INTERFACE...]</div></div>;

  const hasBeforeImage = !!originalComplaint?.image_url;
  const isResolving = formData.status === 'review_pending' || formData.status === 'resolved';
  const isPhotoMandatory = isResolving && hasBeforeImage;

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Navbar />
      <div style={{ padding: '3rem 2rem', maxWidth: '700px', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'inline-block', backgroundColor: '#000', color: '#FFF', padding: '0.2rem 0.8rem', fontFamily: 'monospace', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            OPERATOR: {user?.role.toUpperCase()}
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-1px', color: '#111827' }}>Update Status</h1>
          <p style={{ color: '#6B7280', fontFamily: 'monospace', fontWeight: '600' }}>TICKET #{id} | {originalComplaint?.title}</p>
        </div>

        <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '2.5rem', border: '4px solid #000000', boxShadow: '8px 8px 0 #000000' }}>
          
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase', fontSize: '0.9rem' }}>Current State</label>
            <select name="status" value={formData.status} onChange={handleChange} required style={{ width: '100%', padding: '1rem', border: '3px solid #000000', borderRadius: '0', fontFamily: 'monospace', backgroundColor: '#F9FAFB', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>
              
              {/* 🟢 FIXED: Caretaker can ONLY select In Progress or Request Review */}
              {user?.role === 'caretaker' && (
                <>
                  <option value="in_progress">In Progress (Working on it)</option>
                  <option value="review_pending">Request Warden Verification</option>
                </>
              )}

              {/* Admin & Warden full powers */}
              {(user?.role === 'admin' || user?.role === 'warden') && (
                <>
                  <option value="assigned">Assigned</option>
                  <option value="in_progress">In Progress</option>
                  <option value="review_pending">Review Pending</option>
                  <option value="resolved">Mark Resolved (Verified)</option>
                  <option value="closed">Closed Permanently</option>
                  <option value="rejected">Rejected (Invalid)</option>
                </>
              )}
            </select>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase', fontSize: '0.9rem' }}>Action / Resolution Note</label>
            <textarea name="resolution_note" value={formData.resolution_note} onChange={handleChange} rows={5} placeholder="Document your actions, delays, or resolution steps here..." style={{ width: '100%', padding: '1rem', border: '3px solid #000000', borderRadius: '0', fontFamily: 'monospace', backgroundColor: '#F9FAFB', fontSize: '1rem', resize: 'vertical' }} />
          </div>

          {/* SMART UPLOADER UI */}
          {isResolving && (
            <div style={{ marginBottom: '2.5rem', padding: '1.5rem', backgroundColor: isPhotoMandatory ? '#FEF2F2' : '#F0FDF4', border: `3px dashed ${isPhotoMandatory ? '#DC2626' : '#10B981'}` }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase', color: isPhotoMandatory ? '#DC2626' : '#059669' }}>
                Completion Evidence {isPhotoMandatory ? '(*MANDATORY)' : '(OPTIONAL)'}
              </label>
              
              <div style={{ marginBottom: '1rem', fontSize: '0.85rem', color: '#4B5563', fontFamily: 'monospace', fontWeight: '600', backgroundColor: '#FFF', padding: '0.5rem', border: '1px solid #D1D5DB' }}>
                {isPhotoMandatory 
                  ? "⚠️ System protocol requires an 'After' photo to submit this for resolution. (Min 0.5MB, Max 20MB)" 
                  : "💡 You may upload an 'After' photo for transparency. (Min 0.5MB, Max 20MB)"}
              </div>

              <input type="file" accept="image/*" onChange={handleImageChange} style={{ width: '100%', padding: '0.8rem', fontFamily: 'monospace', backgroundColor: 'white', border: '2px solid #000000', cursor: 'pointer' }} />
              
              {imagePreview && (
                <div style={{ marginTop: '1.5rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: '#000', color: '#FFF', padding: '0.2rem 0.5rem', fontWeight: 'bold', fontSize: '0.7rem', fontFamily: 'monospace' }}>PREVIEW</div>
                  <img src={imagePreview} alt="Completion Preview" style={{ width: '100%', maxHeight: '300px', border: '3px solid #000000', objectFit: 'contain', backgroundColor: '#E5E7EB' }} />
                </div>
              )}
            </div>
          )}

          {error && <div style={{ padding: '1rem', backgroundColor: '#000', color: '#EF4444', border: '3px solid #EF4444', marginBottom: '1.5rem', fontFamily: 'monospace', fontWeight: 'bold' }}>{error}</div>}

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" disabled={submitLoading} style={{ flex: 2, padding: '1rem', backgroundColor: submitLoading ? '#9CA3AF' : '#10B981', color: 'white', border: '3px solid #000000', fontWeight: '900', fontFamily: 'monospace', fontSize: '1.1rem', cursor: submitLoading ? 'not-allowed' : 'pointer', boxShadow: submitLoading ? 'none' : '4px 4px 0 #000' }}>
              {submitLoading ? 'PROCESSING...' : 'CONFIRM_EXECUTION'}
            </button>
            <button type="button" onClick={() => navigate(`/complaints/${id}`)} style={{ flex: 1, padding: '1rem', backgroundColor: '#FFFFFF', color: '#000000', border: '3px solid #000000', fontWeight: '900', fontFamily: 'monospace', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '4px 4px 0 #000' }}>
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateComplaintStatus;