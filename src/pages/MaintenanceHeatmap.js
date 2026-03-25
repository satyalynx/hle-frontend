import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const MaintenanceHeatmap = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [heatmapData, setHeatmapData] = useState({});
  const [caretakerStats, setCaretakerStats] = useState(null); 
  
  // 🟢 SMART 7-HOSTEL STATE
  const [selectedHostel, setSelectedHostel] = useState('1'); 
  const [filter, setFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('30');
  const [selectedRoom, setSelectedRoom] = useState(null); 
  const navigate = useNavigate();

  // 🟢 ACTUAL CUTM HOSTELS CONFIGURATION
  const hostelsConfig = [
    { id: '1', name: 'BIJU PATNAIK (BOYS) - BLOCK A', prefix: 'A-' },
    { id: '2', name: 'BIJU PATNAIK (BOYS) - BLOCK B', prefix: 'B-' },
    { id: '3', name: 'BIJU PATNAIK (BOYS) - BLOCK C', prefix: 'C-' },
    { id: '4', name: 'JAGANNATH GIRLS HOSTEL', prefix: '' },
    { id: '5', name: 'BALABHADRA GIRLS HOSTEL', prefix: '' },
    { id: '6', name: 'ANNAPURNA GIRLS HOSTEL', prefix: '' },
    { id: '7', name: 'SUBHADRA GIRLS HOSTEL', prefix: '' },
  ];

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    if (user?.role === 'caretaker') {
      processCaretakerStats();
    } else {
      processHeatmap();
    }
  }, [complaints, selectedHostel, filter, timeRange, user]); // Dependency updated

  const fetchComplaints = async () => {
    try {
      const response = await axiosInstance.get('/complaints/');
      setComplaints(response.data);
    } catch (error) {
      console.error('Failed to fetch complaints:', error);
    }
  };

  const processCaretakerStats = () => {
    const myComplaints = complaints.filter(c => String(c.assigned_to) === String(user?.id));
    
    let stats = {
      totalAssigned: myComplaints.length,
      inProgress: 0,
      pendingVerification: 0,
      resolved: 0,
      critical: 0,
      activeTasks: []
    };

    myComplaints.forEach(c => {
      if (c.status === 'in_progress') stats.inProgress += 1;
      else if (c.status === 'review_pending') stats.pendingVerification += 1;
      else if (c.status === 'resolved' || c.status === 'closed') stats.resolved += 1;

      if ((c.priority === 'urgent' || c.priority === 'critical') && c.status !== 'resolved' && c.status !== 'closed') {
        stats.critical += 1;
      }

      if (c.status === 'in_progress' || c.status === 'assigned' || c.status === 'review_pending') {
        stats.activeTasks.push(c);
      }
    });

    setCaretakerStats(stats);
  };

  const processHeatmap = () => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - parseInt(timeRange));

    const currentHostel = hostelsConfig.find(h => h.id === selectedHostel);
    const prefix = currentHostel?.prefix || '';

    const filtered = complaints.filter(c => {
      const complaintDate = new Date(c.created_at);
      const matchesTime = complaintDate >= cutoffDate;
      const matchesFilter = filter === 'all' || c.category === filter;
      
      // 🟢 SMART BLOCK MATCHING LOGIC
      let matchesBlock = false;
      if (prefix) {
        // If it's Block A, B, or C, it must start with that prefix
        matchesBlock = c.room_number.startsWith(prefix);
      } else {
        // If it's a girls hostel (no prefix), ensure it has NO prefix at all
        matchesBlock = !c.room_number.includes('-');
      }

      return matchesTime && matchesFilter && matchesBlock;
    });

    const roomStats = {};
    
    filtered.forEach(c => {
      const room = c.room_number;
      if (!roomStats[room]) {
        roomStats[room] = { count: 0, activeCount: 0, criticalCount: 0, chronic: false, list: [] };
      }
      
      roomStats[room].list.push(c);
      roomStats[room].count += 1;
      
      if (c.status !== 'resolved' && c.status !== 'closed') {
        roomStats[room].activeCount += 1;
        if (c.priority === 'critical' || c.priority === 'urgent') {
          roomStats[room].criticalCount += 1;
        }
      }
    });

    Object.keys(roomStats).forEach(room => {
      if (roomStats[room].count >= 3) {
        roomStats[room].chronic = true;
      }
    });

    setHeatmapData(roomStats);
  };

  const getHeatColor = (stats) => {
    if (!stats || stats.activeCount === 0) return '#10B981'; 
    if (stats.criticalCount > 0) return '#991B1B'; 
    if (stats.activeCount >= 3) return '#DC2626'; 
    if (stats.activeCount === 2) return '#F97316'; 
    return '#FBBF24'; 
  };

  const buildingFloors = [
    { level: 3, label: '3rd Floor', start: 301, end: 310 },
    { level: 2, label: '2nd Floor', start: 201, end: 210 },
    { level: 1, label: '1st Floor', start: 101, end: 110 },
    { level: 0, label: 'Ground Floor', start: 1, end: 10 },
  ];

  // ========================================================
  // 1. CARETAKER DASHBOARD (Performance Stand)
  // ========================================================
  if (user?.role === 'caretaker') {
    if (!caretakerStats) return <div><Navbar /><div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'monospace' }}>CALCULATING PERFORMANCE METRICS...</div></div>;

    const efficiencyRate = caretakerStats.totalAssigned > 0 
      ? Math.round((caretakerStats.resolved / caretakerStats.totalAssigned) * 100) 
      : 0;

    return (
      <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', paddingBottom: '4rem', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Navbar />
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ backgroundColor: '#000', color: '#FFF', padding: '3rem', border: '4px solid #000', boxShadow: '12px 12px 0 #E5E7EB', marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: '900', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>Operator Metrics</h1>
            <p style={{ color: '#10B981', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '1.2rem' }}>
              ID: {user.name} | ACTIVE DUTY
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            <div style={{ backgroundColor: '#FFF', border: '3px solid #000', padding: '2rem', boxShadow: '6px 6px 0 #E5E7EB' }}>
              <div style={{ fontSize: '1rem', fontWeight: '900', fontFamily: 'monospace', color: '#6B7280', marginBottom: '0.5rem' }}>COMPLETION RATE</div>
              <div style={{ fontSize: '3rem', fontWeight: '900', color: efficiencyRate >= 80 ? '#10B981' : (efficiencyRate >= 50 ? '#F59E0B' : '#DC2626') }}>{efficiencyRate}%</div>
            </div>
            <div style={{ backgroundColor: '#FFF', border: '3px solid #000', padding: '2rem', boxShadow: '6px 6px 0 #E5E7EB' }}>
              <div style={{ fontSize: '1rem', fontWeight: '900', fontFamily: 'monospace', color: '#6B7280', marginBottom: '0.5rem' }}>ACTIVE TASKS</div>
              <div style={{ fontSize: '3rem', fontWeight: '900', color: '#3B82F6' }}>{caretakerStats.inProgress}</div>
            </div>
            <div style={{ backgroundColor: '#FEF3C7', border: '3px solid #F59E0B', padding: '2rem', boxShadow: '6px 6px 0 #E5E7EB' }}>
              <div style={{ fontSize: '1rem', fontWeight: '900', fontFamily: 'monospace', color: '#B45309', marginBottom: '0.5rem' }}>PENDING VERIFICATION</div>
              <div style={{ fontSize: '3rem', fontWeight: '900', color: '#D97706' }}>{caretakerStats.pendingVerification}</div>
            </div>
            <div style={{ backgroundColor: '#FEE2E2', border: '3px solid #DC2626', padding: '2rem', boxShadow: '6px 6px 0 #E5E7EB' }}>
              <div style={{ fontSize: '1rem', fontWeight: '900', fontFamily: 'monospace', color: '#991B1B', marginBottom: '0.5rem' }}>CRITICAL PRIORITY</div>
              <div style={{ fontSize: '3rem', fontWeight: '900', color: '#DC2626' }}>{caretakerStats.critical}</div>
            </div>
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: '900', fontFamily: 'system-ui', marginBottom: '1.5rem', textTransform: 'uppercase' }}>My Operational Queue</h2>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {caretakerStats.activeTasks.length > 0 ? caretakerStats.activeTasks.map(task => (
              <div key={task.id} style={{ backgroundColor: '#FFF', border: '3px solid #000', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '4px 4px 0 #E5E7EB' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '900', margin: '0 0 0.5rem 0' }}>{task.title}</h3>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#6B7280', display: 'flex', gap: '1rem', fontWeight: 'bold' }}>
                    <span>ROOM: {task.room_number}</span>
                    <span>STATUS: {task.status.replace('_', ' ').toUpperCase()}</span>
                  </div>
                </div>
                <button onClick={() => navigate(`/complaints/${task.id}/update-status`)} disabled={task.status === 'review_pending'} style={{ padding: '0.8rem 1.5rem', backgroundColor: task.status === 'review_pending' ? '#E5E7EB' : '#000', color: task.status === 'review_pending' ? '#9CA3AF' : '#FFF', border: '2px solid #000', fontWeight: '900', fontFamily: 'monospace', cursor: task.status === 'review_pending' ? 'not-allowed' : 'pointer' }}>
                  {task.status === 'review_pending' ? 'AWAITING WARDEN' : 'PROCESS WORK'}
                </button>
              </div>
            )) : (
              <div style={{ padding: '3rem', backgroundColor: '#FFF', border: '3px dashed #9CA3AF', textAlign: 'center', fontFamily: 'monospace', fontWeight: 'bold', color: '#6B7280' }}>
                NO ACTIVE TASKS IN QUEUE
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ========================================================
  // 2. GLOBAL HEATMAP (Admin/Warden)
  // ========================================================
  const totalActiveIssues = Object.values(heatmapData).reduce((sum, room) => sum + room.activeCount, 0);
  const currentHostelData = hostelsConfig.find(h => h.id === selectedHostel);

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', paddingBottom: '3rem' }}>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '1440px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '3.5rem', fontWeight: '900', fontFamily: 'system-ui', marginBottom: '0.5rem', letterSpacing: '-1px' }}>
              COMMAND CENTER
            </h1>
            <p style={{ color: '#4B5563', fontFamily: 'monospace', fontSize: '1rem', fontWeight: 'bold', backgroundColor: '#E5E7EB', display: 'inline-block', padding: '0.2rem 0.5rem' }}>
              LIVE INFRASTRUCTURE MONITORING
            </p>
          </div>
        </div>

        {/* Filters Section */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', border: '3px solid #000000', marginBottom: '2rem', boxShadow: '6px 6px 0 #E5E7EB' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            
            {/* 🟢 REPLACED: Smart 7-Hostel Dropdown */}
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase' }}>Facility Location</label>
              <select value={selectedHostel} onChange={(e) => setSelectedHostel(e.target.value)} style={{ width: '100%', padding: '0.8rem', border: '2px solid #000000', borderRadius: '0', fontFamily: 'monospace', backgroundColor: 'white', fontWeight: 'bold', cursor: 'pointer', color: '#111827' }}>
                {hostelsConfig.map(h => (
                  <option key={h.id} value={h.id}>{h.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase' }}>Telemetry Overlay</label>
              <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ width: '100%', padding: '0.8rem', border: '2px solid #000000', borderRadius: '0', fontFamily: 'monospace', backgroundColor: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
                <option value="all">GLOBAL VIEW</option>
                <option value="electrical">ELECTRICAL GRID</option>
                <option value="plumbing">WATER SUPPLY</option>
                <option value="carpentry">FURNITURE STRUCTURE</option>
                <option value="cleaning">SANITATION</option>
                <option value="internet">NETWORK NODES</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '900', fontFamily: 'monospace', textTransform: 'uppercase' }}>Time Horizon</label>
              <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} style={{ width: '100%', padding: '0.8rem', border: '2px solid #000000', borderRadius: '0', fontFamily: 'monospace', backgroundColor: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
                <option value="7">LAST 7 DAYS</option>
                <option value="30">LAST 30 DAYS</option>
                <option value="90">LAST QUARTER</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          
          {/* Building Cross-Section View */}
          <div style={{ flex: '3', backgroundColor: 'white', padding: '3rem 2rem', border: '4px solid #000000', boxShadow: '10px 10px 0 #E5E7EB', overflowX: 'auto' }}>
            <h2 style={{ marginBottom: '2.5rem', fontFamily: 'monospace', fontWeight: '900', textAlign: 'center', borderBottom: '4px solid #000', paddingBottom: '1rem', fontSize: '2rem' }}>
              {currentHostelData?.name}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: '800px' }}>
              {buildingFloors.map((floor) => (
                <div key={floor.level} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  
                  {/* Floor Label */}
                  <div style={{ width: '120px', fontWeight: '900', fontFamily: 'monospace', textAlign: 'right', paddingRight: '1.5rem', borderRight: '4px solid #000', fontSize: '1.1rem' }}>
                    {floor.label.toUpperCase()}
                  </div>

                  {/* Rooms Grid for this floor */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '0.5rem', flex: 1 }}>
                    {Array.from({ length: 10 }, (_, i) => {
                      
                      // 🟢 SMART ROOM NUMBER FORMATTER FOR GRID
                      const rawNumber = floor.start + i;
                      const formattedNum = rawNumber < 10 ? `00${rawNumber}` : (rawNumber === 10 ? `010` : rawNumber);
                      const roomNum = `${currentHostelData?.prefix}${formattedNum}`;
                      
                      const stats = heatmapData[roomNum];
                      const bgColor = getHeatColor(stats);
                      const isChronic = stats?.chronic;

                      return (
                        <div
                          key={roomNum}
                          onClick={() => setSelectedRoom({ roomNum, stats })}
                          style={{
                            position: 'relative', aspectRatio: '1/1', backgroundColor: bgColor, border: '3px solid #000',
                            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer',
                            color: bgColor === '#FBBF24' ? '#000' : '#FFF', transition: 'all 0.1s',
                            boxShadow: isChronic ? '0 0 10px rgba(220, 38, 38, 0.5)' : 'none'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-2px, -2px)'; e.currentTarget.style.boxShadow = '4px 4px 0 #000'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translate(0, 0)'; e.currentTarget.style.boxShadow = isChronic ? '0 0 10px rgba(220, 38, 38, 0.5)' : 'none'; }}
                        >
                          <span style={{ fontSize: '0.85rem', fontWeight: '900', fontFamily: 'monospace' }}>
                            {currentHostelData?.prefix}{formattedNum}
                          </span>
                          
                          {stats?.activeCount > 0 && (
                            <span style={{ fontSize: '1.5rem', fontWeight: '900', marginTop: '0.2rem', fontFamily: 'system-ui' }}>
                              {stats.activeCount}
                            </span>
                          )}

                          {isChronic && (
                            <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '24px', height: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.8rem', fontWeight: '900', color: '#DC2626', animation: 'pulse 1.5s infinite', backgroundColor: '#FFF', borderRadius: '50%', border: '2px solid #000' }}>
                              !
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div style={{ marginTop: '4rem', padding: '1.5rem', backgroundColor: '#F9FAFB', border: '3px solid #000', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', fontFamily: 'monospace', fontWeight: '900', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '20px', height: '20px', backgroundColor: '#10B981', border: '2px solid #000' }}></div> CLEAN (0)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '20px', height: '20px', backgroundColor: '#FBBF24', border: '2px solid #000' }}></div> MINOR (1)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '20px', height: '20px', backgroundColor: '#F97316', border: '2px solid #000' }}></div> WARNING (2)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '20px', height: '20px', backgroundColor: '#DC2626', border: '2px solid #000' }}></div> SEVERE (3+)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '20px', height: '20px', backgroundColor: '#991B1B', border: '2px solid #000' }}></div> CRITICAL</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '20px', height: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '900', color: '#DC2626', backgroundColor: '#FFF', borderRadius: '50%', border: '2px solid #000' }}>!</div> CHRONIC NODE</div>
            </div>
          </div>

          {/* Quick Insights Sidebar */}
          <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ backgroundColor: '#000', color: '#FFF', padding: '2rem', border: '4px solid #000', boxShadow: '8px 8px 0 #E5E7EB' }}>
              <h3 style={{ fontFamily: 'monospace', fontWeight: '900', borderBottom: '2px solid #374151', paddingBottom: '0.8rem', marginBottom: '1.5rem', color: '#10B981', letterSpacing: '1px' }}>
                TELEMETRY SUMMARY
              </h3>
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.8rem', color: '#9CA3AF', fontFamily: 'monospace', fontWeight: 'bold' }}>ACTIVE FAULTS DETECTED</div>
                <div style={{ fontSize: '3.5rem', fontWeight: '900', color: '#EF4444', lineHeight: '1' }}>{totalActiveIssues}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#9CA3AF', fontFamily: 'monospace', fontWeight: 'bold' }}>CHRONIC NODES (!)</div>
                <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#F59E0B', lineHeight: '1' }}>
                  {Object.values(heatmapData).filter(r => r.chronic).length}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Room Action Modal (Admin/Warden ONLY) */}
      {selectedRoom && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '3rem', border: '4px solid #000', width: '90%', maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto', boxShadow: '12px 12px 0 #000' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '4px solid #000', paddingBottom: '1rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', fontFamily: 'monospace', margin: 0 }}>
                NODE {selectedRoom.roomNum}
              </h2>
              <button onClick={() => setSelectedRoom(null)} style={{ background: 'none', border: 'none', fontSize: '2rem', fontWeight: '900', cursor: 'pointer' }}>×</button>
            </div>

            {(!selectedRoom.stats || selectedRoom.stats.activeCount === 0) ? (
              <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#ECFDF5', border: '4px solid #10B981', color: '#065F46', fontWeight: '900', fontFamily: 'monospace', fontSize: '1.2rem' }}>
                NO FAULTS DETECTED IN SECTOR
              </div>
            ) : (
              <div>
                {selectedRoom.stats.chronic && (
                  <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#000', color: '#FBBF24', border: '3px solid #F59E0B', fontWeight: 'bold', fontFamily: 'monospace' }}>
                    <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem', fontWeight: '900' }}>! CHRONIC ALERT</span>
                    This sector has reported {selectedRoom.stats.count} total issues in the selected timeframe. Root-cause analysis recommended.
                  </div>
                )}
                
                <h3 style={{ fontFamily: 'monospace', marginBottom: '1.5rem', fontWeight: '900', fontSize: '1.2rem', color: '#4B5563' }}>ACTIVE TICKETS ({selectedRoom.stats.activeCount})</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {selectedRoom.stats.list.filter(c => c.status !== 'resolved' && c.status !== 'closed').map(complaint => (
                    <div key={complaint.id} style={{ border: '3px solid #000', padding: '1.5rem', backgroundColor: '#F9FAFB' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span style={{ fontWeight: '900', fontSize: '1.2rem', fontFamily: 'monospace' }}>#{complaint.id} {complaint.category.toUpperCase()}</span>
                        <span style={{ padding: '0.2rem 0.5rem', backgroundColor: complaint.priority === 'critical' || complaint.priority === 'urgent' ? '#DC2626' : '#10B981', color: 'white', fontSize: '0.8rem', fontWeight: '900', fontFamily: 'monospace', border: '2px solid #000' }}>
                          {complaint.priority.toUpperCase()}
                        </span>
                      </div>
                      <p style={{ fontFamily: 'system-ui', color: '#111827', marginBottom: '1.5rem', fontWeight: '500', fontSize: '1.1rem' }}>{complaint.title}</p>
                      
                      <button onClick={() => navigate(`/complaints/${complaint.id}`)} style={{ width: '100%', padding: '0.8rem', backgroundColor: '#000', color: 'white', border: 'none', fontWeight: '900', fontFamily: 'monospace', cursor: 'pointer', fontSize: '1rem' }}>
                        OPEN TICKET INTERFACE →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default MaintenanceHeatmap;