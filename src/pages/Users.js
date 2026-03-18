import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const Users = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals State
  const [actionModal, setActionModal] = useState({ show: false, targetUser: null, actionType: '' });
  const [actionReason, setActionReason] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [users, roleFilter, searchTerm]);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/auth/users/');
      
      // 🟢 SIMULATION: Mocking warning_count and status for UI demonstration.
      // Remove this mapping when your backend naturally returns these fields.
      const mappedData = response.data.map(u => ({
        ...u,
        warning_count: u.warning_count || 0,
        status: u.status || 'active'
      }));
      
      setUsers(mappedData);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...users];
    if (roleFilter !== 'all') {
      filtered = filtered.filter(u => u.role === roleFilter);
    }
    if (searchTerm) {
      filtered = filtered.filter(u => 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredUsers(filtered);
  };

  // 🟢 DISCIPLINARY ACTION LOGIC
  const handleDisciplinaryAction = async (e) => {
    e.preventDefault();
    if (!actionReason.trim()) {
      alert("A reason must be provided for audit trails.");
      return;
    }

    const { targetUser, actionType } = actionModal;
    
    // Optimistic UI Update (Mocking the backend call)
    try {
      // IN REALITY: await axiosInstance.post(`/auth/users/${targetUser.id}/discipline`, { action: actionType, reason: actionReason });
      
      setUsers(prevUsers => prevUsers.map(u => {
        if (u.id === targetUser.id) {
          if (actionType === 'warn') {
            const newCount = u.warning_count + 1;
            return { ...u, warning_count: newCount, status: newCount >= 5 ? 'suspended' : 'active' };
          }
          if (actionType === 'suspend' || actionType === 'revoke') {
            return { ...u, status: 'suspended' };
          }
        }
        return u;
      }));

      alert(`[AUDIT_LOG_SAVED]: Action '${actionType.toUpperCase()}' executed successfully.`);
      setActionModal({ show: false, targetUser: null, actionType: '' });
      setActionReason('');
    } catch (error) {
      console.error("Action failed", error);
      alert("Failed to execute disciplinary action.");
    }
  };

  // UI Helpers
  const renderStrikeBar = (count) => {
    return (
      <div style={{ display: 'flex', gap: '4px', marginTop: '0.5rem' }}>
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{
            width: '12px', height: '12px', border: '1px solid #000',
            backgroundColor: i < count ? '#DC2626' : '#FFF'
          }}></div>
        ))}
      </div>
    );
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return { bg: '#000', text: '#FFF' };
      case 'warden': return { bg: '#7C3AED', text: '#FFF' };
      case 'caretaker': return { bg: '#F59E0B', text: '#000' };
      default: return { bg: '#E5E7EB', text: '#000' };
    }
  };

  if (loading) return <div><Navbar /><div style={{ padding: '5rem', textAlign: 'center', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '1.5rem' }}>[LOADING_DIRECTORY...]</div></div>;

  const isAdminOrWarden = currentUser?.role === 'admin' || currentUser?.role === 'warden';

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* HEADER SECTION */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', borderBottom: '4px solid #000', paddingBottom: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '3rem', fontWeight: '900', margin: '0 0 0.5rem 0', letterSpacing: '-1px' }}>
              {isAdminOrWarden ? 'Access & Security Control' : 'Hostel Directory'}
            </h1>
            <p style={{ color: '#4B5563', fontFamily: 'monospace', fontWeight: 'bold' }}>
              TOTAL_RECORDS: {filteredUsers.length} | ACTIVE_VIEWER: {currentUser?.role.toUpperCase()}
            </p>
          </div>
        </div>

        {/* FILTER BAR */}
        <div style={{ backgroundColor: '#FFF', padding: '1.5rem', border: '3px solid #000', marginBottom: '2rem', boxShadow: '6px 6px 0 #E5E7EB', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '2', minWidth: '250px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase' }}>Query Identifier</label>
            <input type="text" placeholder="Search by name, email, or ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '2px solid #000', fontFamily: 'monospace', fontWeight: 'bold' }} />
          </div>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase' }}>Filter by Role</label>
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '2px solid #000', fontFamily: 'monospace', fontWeight: 'bold', cursor: 'pointer' }}>
              <option value="all">ALL_PERSONNEL</option>
              <option value="student">STUDENTS</option>
              <option value="warden">WARDENS</option>
              <option value="caretaker">CARETAKERS</option>
              <option value="admin">ADMINISTRATORS</option>
            </select>
          </div>
        </div>

        {/* 🟢 THE HEAVY DATA TABLE */}
        <div style={{ backgroundColor: '#FFF', border: '4px solid #000', boxShadow: '8px 8px 0 #E5E7EB', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontFamily: 'monospace' }}>
            <thead style={{ backgroundColor: '#000', color: '#FFF' }}>
              <tr>
                <th style={{ padding: '1.5rem', fontWeight: '900' }}>IDENTIFIER (NAME/EMAIL)</th>
                <th style={{ padding: '1.5rem', fontWeight: '900' }}>ROLE_CLASS</th>
                <th style={{ padding: '1.5rem', fontWeight: '900' }}>SYSTEM_STATUS</th>
                {isAdminOrWarden && <th style={{ padding: '1.5rem', fontWeight: '900', textAlign: 'right' }}>EXECUTIVE_ACTION</th>}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u, index) => {
                const roleStyle = getRoleColor(u.role);
                const isSuspended = u.status === 'suspended';

                return (
                  <tr key={u.id} style={{ borderBottom: '2px solid #E5E7EB', backgroundColor: isSuspended ? '#FEF2F2' : '#FFF' }}>
                    <td style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', backgroundColor: roleStyle.bg, color: roleStyle.text, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', border: '2px solid #000' }}>
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: '900', fontSize: '1.1rem', color: isSuspended ? '#DC2626' : '#000', textDecoration: isSuspended ? 'line-through' : 'none' }}>
                            {u.name}
                          </div>
                          <div style={{ color: '#6B7280', fontSize: '0.85rem' }}>{u.email} | {u.phone || 'NO_CONTACT'}</div>
                        </div>
                      </div>
                    </td>
                    
                    <td style={{ padding: '1.5rem' }}>
                      <span style={{ backgroundColor: roleStyle.bg, color: roleStyle.text, padding: '0.2rem 0.6rem', fontWeight: 'bold', border: '2px solid #000', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                        {u.role}
                      </span>
                    </td>

                    <td style={{ padding: '1.5rem' }}>
                      {isSuspended ? (
                        <span style={{ color: '#DC2626', fontWeight: '900' }}>[ACCESS_REVOKED]</span>
                      ) : (
                        <div>
                          <span style={{ color: '#10B981', fontWeight: '900' }}>[ACTIVE_CLEARANCE]</span>
                          {u.role === 'student' && renderStrikeBar(u.warning_count)}
                          {u.role === 'student' && u.warning_count > 0 && (
                            <div style={{ fontSize: '0.7rem', color: '#DC2626', marginTop: '4px', fontWeight: 'bold' }}>STRIKES: {u.warning_count}/5</div>
                          )}
                        </div>
                      )}
                    </td>

                    {/* 🟢 ACTION CONTROLS (Only for Warden & Admin) */}
                    {isAdminOrWarden && (
                      <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                        {!isSuspended && currentUser.id !== u.id && (
                          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                            
                            {/* Warden/Admin can warn students */}
                            {u.role === 'student' && (
                              <button 
                                onClick={() => setActionModal({ show: true, targetUser: u, actionType: 'warn' })}
                                style={{ padding: '0.5rem 1rem', backgroundColor: '#F59E0B', color: '#000', border: '2px solid #000', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'monospace' }}
                              >
                                WARN
                              </button>
                            )}

                            {/* Only Admin can directly kickout anyone, Warden can only kickout students via 5th warning (handled by backend ideally) */}
                            {currentUser.role === 'admin' && (
                              <button 
                                onClick={() => setActionModal({ show: true, targetUser: u, actionType: u.role === 'student' ? 'suspend' : 'revoke' })}
                                style={{ padding: '0.5rem 1rem', backgroundColor: '#DC2626', color: '#FFF', border: '2px solid #000', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'monospace' }}
                              >
                                {u.role === 'student' ? 'KICKOUT' : 'REVOKE'}
                              </button>
                            )}
                          </div>
                        )}
                        {isSuspended && <span style={{ color: '#9CA3AF', fontWeight: 'bold' }}>LOCKED</span>}
                      </td>
                    )}
                  </tr>
                );
              })}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ padding: '3rem', textAlign: 'center', fontWeight: 'bold', color: '#6B7280' }}>NO_IDENTIFIERS_FOUND_IN_DATABASE</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🟢 DISCIPLINARY ACTION MODAL */}
      {actionModal.show && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
          <form onSubmit={handleDisciplinaryAction} style={{ backgroundColor: 'white', padding: '2.5rem', border: '4px solid #000', width: '90%', maxWidth: '500px', boxShadow: '12px 12px 0 #000' }}>
            
            <div style={{ backgroundColor: '#000', color: '#FFF', padding: '0.5rem 1rem', display: 'inline-block', fontWeight: '900', fontFamily: 'monospace', marginBottom: '1.5rem' }}>
              SECURITY_OVERRIDE_ACTIVE
            </div>
            
            <h2 style={{ fontSize: '1.8rem', fontWeight: '900', textTransform: 'uppercase', marginBottom: '0.5rem', color: actionModal.actionType === 'warn' ? '#F59E0B' : '#DC2626' }}>
              {actionModal.actionType === 'warn' ? 'Issue Formal Warning' : 'Revoke Access / Kickout'}
            </h2>
            
            <p style={{ fontFamily: 'monospace', color: '#4B5563', marginBottom: '2rem', fontWeight: 'bold' }}>
              Target: <span style={{ color: '#000' }}>{actionModal.targetUser?.name}</span> ({actionModal.targetUser?.email})
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '900', fontFamily: 'monospace' }}>Reason for Action (Mandatory Audit Log):</label>
              <textarea 
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                placeholder="Detail the infraction here. This will be permanently logged."
                rows={4} required
                style={{ width: '100%', boxSizing: 'border-box', padding: '1rem', border: '3px solid #000', fontFamily: 'monospace', fontSize: '1rem', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" style={{ flex: 1, padding: '1rem', backgroundColor: actionModal.actionType === 'warn' ? '#F59E0B' : '#DC2626', color: actionModal.actionType === 'warn' ? '#000' : '#FFF', border: '3px solid #000', fontWeight: '900', cursor: 'pointer', fontFamily: 'monospace', fontSize: '1.1rem' }}>
                EXECUTE
              </button>
              <button type="button" onClick={() => setActionModal({ show: false, targetUser: null, actionType: '' })} style={{ padding: '1rem 2rem', backgroundColor: '#FFF', color: '#000', border: '3px solid #000', fontWeight: '900', cursor: 'pointer', fontFamily: 'monospace', fontSize: '1.1rem' }}>
                ABORT
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

export default Users;