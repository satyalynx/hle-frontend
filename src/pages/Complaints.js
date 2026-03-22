import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Complaints = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [complaints, statusFilter, categoryFilter, searchTerm, user]);

  const fetchComplaints = async () => {
    try {
      const response = await axiosInstance.get('/complaints/');
      setComplaints(response.data);
    } catch (error) {
      console.error('Failed to fetch complaints:', error);
      alert('Failed to load complaints.');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...complaints];

    // Status Filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }

    // Category Filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(c => c.category === categoryFilter);
    }

    // Search Filter
    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.room_number.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Role Filter (Hide irrelevant complaints from Student & Caretaker)
    if (user?.role === 'student') {
      filtered = filtered.filter(c => String(c.user_id) === String(user?.id));
    } else if (user?.role === 'caretaker') {
      filtered = filtered.filter(c => String(c.assigned_to) === String(user?.id));
    }

    // 72-Hours Auto-Hide Logic
    filtered = filtered.filter(c => {
      if (c.status === 'resolved' || c.status === 'closed') {
        const timestamp = new Date(c.updated_at || c.created_at);
        const now = new Date();
        const hoursDiff = (now - timestamp) / (1000 * 60 * 60);
        if (hoursDiff > 72) return false; 
      }
      return true;
    });

    setFilteredComplaints(filtered);
  };

  const canDeleteComplaint = (complaint) => {
    if (!user) return false;
    if (String(complaint.user_id) !== String(user.id)) return false;
    const createdAt = new Date(complaint.created_at);
    const now = new Date();
    const hoursDiff = (now - createdAt) / (1000 * 60 * 60);
    return hoursDiff <= 24;
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this complaint?')) {
      return;
    }
    try {
      await axiosInstance.delete(`/complaints/${id}`);
      alert('✅ Complaint deleted successfully!');
      fetchComplaints();
    } catch (error) {
      alert('❌ Failed to delete complaint');
      console.error('Delete error:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      raised: '#F59E0B', assigned: '#3B82F6', in_progress: '#8B5CF6',
      resolved: '#10B981', closed: '#6B7280', rejected: '#DC2626',
    };
    return colors[status] || '#6B7280';
  };

  const getPriorityColor = (priority) => {
    const colors = { normal: '#10B981', urgent: '#F59E0B', critical: '#DC2626' };
    return colors[priority] || '#6B7280';
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ padding: '5rem', textAlign: 'center', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '1.5rem' }}>
          [PULLING_SYSTEM_LOGS...]
        </div>
      </div>
    );
  }

  const getPageTitle = () => {
    if (user?.role === 'student') return 'My Tickets';
    if (user?.role === 'caretaker') return 'Work Queue';
    return 'Master Log';
  };

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Navbar />
      <div style={{ padding: '3rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', borderBottom: '4px solid #000', paddingBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-1px', color: '#111827', margin: 0, lineHeight: '1' }}>
              {getPageTitle()}
            </h1>
            <p style={{ color: '#4B5563', fontFamily: 'monospace', fontWeight: 'bold', marginTop: '0.5rem', backgroundColor: '#E5E7EB', display: 'inline-block', padding: '0.2rem 0.5rem' }}>
              TOTAL_RECORDS: {filteredComplaints.length}
            </p>
          </div>
          {user?.role === 'student' && (
            <Link to="/complaints/create">
              <button style={{ padding: '1rem 2rem', backgroundColor: '#000000', color: 'white', border: '3px solid #000000', cursor: 'pointer', fontWeight: '900', fontFamily: 'monospace', fontSize: '1.1rem', boxShadow: '6px 6px 0 #E5E7EB', transition: 'transform 0.1s' }} onMouseDown={(e) => e.currentTarget.style.transform = 'translate(2px,2px)'} onMouseUp={(e) => e.currentTarget.style.transform = 'translate(0,0)'}>
                + RAISE_TICKET
              </button>
            </Link>
          )}
        </div>

        {/* Filters Section */}
        <div style={{ backgroundColor: 'white', padding: '2rem', border: '3px solid #000000', marginBottom: '3rem', boxShadow: '8px 8px 0 #E5E7EB' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase' }}>Search Query</label>
              <input type="text" placeholder="Keywords, Room No..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '0.8rem', border: '2px solid #000000', borderRadius: '0', fontFamily: 'monospace', fontWeight: 'bold' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase' }}>Status Filter</label>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ width: '100%', padding: '0.8rem', border: '2px solid #000000', borderRadius: '0', fontFamily: 'monospace', backgroundColor: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
                <option value="all">ALL_STATES</option>
                <option value="raised">RAISED</option>
                <option value="assigned">ASSIGNED</option>
                <option value="in_progress">IN_PROGRESS</option>
                <option value="resolved">RESOLVED</option>
                <option value="closed">CLOSED</option>
                <option value="rejected">REJECTED</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase' }}>Category Filter</label>
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} style={{ width: '100%', padding: '0.8rem', border: '2px solid #000000', borderRadius: '0', fontFamily: 'monospace', backgroundColor: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
                <option value="all">ALL_DOMAINS</option>
                <option value="electrical">ELECTRICAL</option>
                <option value="plumbing">PLUMBING</option>
                <option value="carpentry">CARPENTRY</option>
                <option value="cleaning">CLEANING</option>
                <option value="internet">NETWORK</option>
                <option value="furniture">FURNITURE</option>
                <option value="other">MISC</option>
              </select>
            </div>
          </div>
        </div>

        {/* List Section */}
        {filteredComplaints.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem', backgroundColor: 'white', border: '3px dashed #9CA3AF' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>📭</span>
            <p style={{ fontSize: '1.25rem', color: '#4B5563', fontFamily: 'monospace', fontWeight: 'bold' }}>
              {complaints.length === 0 ? 'DATABASE_EMPTY' : 'NO_MATCHING_RECORDS_FOUND'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {filteredComplaints.map((complaint) => (
              <div key={complaint.id} style={{ backgroundColor: 'white', padding: '2rem', border: '3px solid #000000', transition: 'transform 0.2s', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#111827', margin: 0 }}>{complaint.title}</h3>
                      {/* 🟢 NEW: Visual Evidence Indicator */}
                      {(complaint.photo_url || complaint.after_photo) && (
                        <span style={{ backgroundColor: '#F3F4F6', border: '1px solid #000', padding: '0.2rem 0.5rem', fontSize: '0.7rem', fontWeight: 'bold', fontFamily: 'monospace' }}>📸 HAS_EVIDENCE</span>
                      )}
                    </div>
                    <p style={{ color: '#4B5563', fontSize: '0.9rem', marginBottom: '1rem', fontFamily: 'monospace', fontWeight: '600' }}>
                      LOC: RM-{complaint.room_number} | CAT: {complaint.category.toUpperCase()} | ID: #{complaint.id}
                    </p>
                    <p style={{ color: '#111827', marginBottom: '0', fontSize: '1rem', lineHeight: '1.5' }}>
                      {complaint.description.length > 150 ? complaint.description.substring(0, 150) + '...' : complaint.description}
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column', alignItems: 'flex-end', minWidth: '120px' }}>
                    <span style={{ width: '100%', textAlign: 'center', padding: '0.4rem 0.8rem', backgroundColor: getStatusColor(complaint.status), color: 'white', fontSize: '0.8rem', fontWeight: '900', textTransform: 'uppercase', fontFamily: 'monospace', border: '2px solid #000000' }}>
                      {complaint.status}
                    </span>
                    <span style={{ width: '100%', textAlign: 'center', padding: '0.4rem 0.8rem', backgroundColor: getPriorityColor(complaint.priority), color: 'white', fontSize: '0.8rem', fontWeight: '900', textTransform: 'uppercase', fontFamily: 'monospace', border: '2px solid #000000' }}>
                      {complaint.priority}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '2px solid #F3F4F6', paddingTop: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link to={`/complaints/${complaint.id}`}>
                      <button style={{ padding: '0.6rem 1.5rem', backgroundColor: '#000', color: '#FFF', border: '2px solid #000000', cursor: 'pointer', fontFamily: 'monospace', fontWeight: '900' }}>
                        OPEN_TICKET →
                      </button>
                    </Link>

                    {canDeleteComplaint(complaint) && (
                      <button
                        onClick={() => handleDelete(complaint.id)}
                        style={{ padding: '0.6rem 1.5rem', backgroundColor: '#FFF', color: '#DC2626', border: '2px solid #DC2626', cursor: 'pointer', fontFamily: 'monospace', fontWeight: '900' }}
                      >
                        VOID (24H)
                      </button>
                    )}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#9CA3AF', fontFamily: 'monospace', fontWeight: 'bold' }}>
                    LOGGED: {new Date(complaint.created_at).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Complaints;