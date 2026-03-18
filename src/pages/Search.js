import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { API_ENDPOINTS } from '../api/config';
import Navbar from '../components/Navbar';
import Fuse from 'fuse.js'; // 🔥 ENTERPRISE SEARCH IMPORT

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ complaints: [], notices: [] });
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const q = searchParams.get('q');
    if (q) {
      setQuery(q);
      executeSearch(q);
    }
  }, [location.search]);

  const executeSearch = async (searchQuery) => {
    if (!searchQuery || !searchQuery.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    
    try {
      const [complaintsRes, noticesRes] = await Promise.all([
        axiosInstance.get(API_ENDPOINTS?.COMPLAINTS || '/complaints/'),
        axiosInstance.get(API_ENDPOINTS?.NOTICES || '/notices/'),
      ]);
      
      const lowerQuery = searchQuery.toLowerCase().trim();
      
      const complaintsData = Array.isArray(complaintsRes.data) ? complaintsRes.data : (complaintsRes.data?.data || []);
      const noticesData = Array.isArray(noticesRes.data) ? noticesRes.data : (noticesRes.data?.data || []);
      
      // 🧠 SMART INTERCEPTOR: Agar user ne "all", "complaint", ya "notice" likha hai, toh sab dikha do
      const magicWords = ['all', 'complaints', 'complaint', 'notices', 'notice', 'everything'];
      if (magicWords.includes(lowerQuery)) {
        setResults({ complaints: complaintsData, notices: noticesData });
        setLoading(false);
        return;
      }

      // 🔥 ENTERPRISE FUZZY SEARCH LOGIC
      const fuseOptionsComplaints = {
        keys: ['title', 'description', 'room_number', 'category', 'status'],
        threshold: 0.4, // 0.0 is exact match, 1.0 is anything. 0.4 is the sweet spot for typos!
        distance: 100,
      };
      
      const fuseOptionsNotices = {
        keys: ['title', 'content', 'category'],
        threshold: 0.4,
      };

      const fuseComplaints = new Fuse(complaintsData, fuseOptionsComplaints);
      const fuseNotices = new Fuse(noticesData, fuseOptionsNotices);

      // Fuse.js returns data in { item: {...} } format, so we map it back
      const matchedComplaints = fuseComplaints.search(searchQuery).map(res => res.item);
      const matchedNotices = fuseNotices.search(searchQuery).map(res => res.item);
      
      setResults({ complaints: matchedComplaints, notices: matchedNotices });
      
    } catch (error) {
      console.error('Search failed - Error Details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleManualSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <Navbar />
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 2rem' }}>
        
        {/* BIG SEARCH HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#111827', marginBottom: '1.5rem' }}>
            What are you looking for?
          </h1>
          
          <form onSubmit={handleManualSearch} style={{ display: 'flex', gap: '0.5rem', maxWidth: '700px', margin: '0 auto' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem', color: '#9CA3AF' }}>🔍</span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by room, issue, or keyword..."
                style={{ 
                  width: '100%', 
                  padding: '1rem 1rem 1rem 3rem', 
                  border: '2px solid #E5E7EB', 
                  borderRadius: '12px', 
                  fontSize: '1.1rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  backgroundColor: '#FFFFFF'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3B82F6';
                  e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E5E7EB';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <button 
              type="submit" 
              disabled={loading} 
              style={{ 
                padding: '0 2rem', 
                backgroundColor: '#111827', 
                color: 'white', 
                border: 'none', 
                borderRadius: '12px', 
                fontWeight: 'bold',
                fontSize: '1.1rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s',
                opacity: loading ? 0.7 : 1
              }}
              onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#374151')}
              onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#111827')}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>

        {/* RESULTS SECTION */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#6B7280', fontSize: '1.2rem' }}>
            <div style={{ animation: 'pulse 1.5s infinite' }}>Scanning database...</div>
          </div>
        ) : (
          hasSearched && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              
              {/* COMPLAINTS RESULTS */}
              {results.complaints.length > 0 && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem', borderBottom: '2px solid #E5E7EB', paddingBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>📋</span>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                      Complaints ({results.complaints.length})
                    </h2>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }}>
                    {results.complaints.map((c) => (
                      <Link key={c.id} to={`/complaints/${c.id}`} style={{ textDecoration: 'none' }}>
                        <div style={{ 
                          backgroundColor: 'white', 
                          padding: '1.5rem', 
                          borderRadius: '12px', 
                          border: '1px solid #E5E7EB',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                          transition: 'transform 0.2s, box-shadow 0.2s',
                          height: '100%',
                          boxSizing: 'border-box'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                        }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#4B5563', backgroundColor: '#F3F4F6', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                              Room {c.room_number || 'N/A'}
                            </span>
                            <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: c.status === 'resolved' ? '#10B981' : '#F59E0B', textTransform: 'uppercase' }}>
                              {c.status}
                            </span>
                          </div>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#111827', margin: '0 0 0.5rem 0' }}>{c.title || 'Untitled Issue'}</h3>
                          <p style={{ color: '#6B7280', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>
                            {c.description ? (c.description.length > 80 ? c.description.substring(0, 80) + '...' : c.description) : 'No description provided.'}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* NOTICES RESULTS */}
              {results.notices.length > 0 && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem', borderBottom: '2px solid #E5E7EB', paddingBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>📢</span>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                      Notices ({results.notices.length})
                    </h2>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }}>
                    {results.notices.map((n) => (
                      <div key={n.id} style={{ 
                        backgroundColor: '#FFFBEB', 
                        padding: '1.5rem', 
                        borderRadius: '12px', 
                        border: '1px solid #FCD34D',
                        boxShadow: '0 1px 3px rgba(252, 211, 77, 0.2)'
                      }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#D97706', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                          {n.category || 'Announcement'}
                        </div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#92400E', margin: '0 0 0.5rem 0' }}>{n.title || 'Untitled Notice'}</h3>
                        <p style={{ color: '#B45309', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>
                          {n.content ? (n.content.length > 100 ? n.content.substring(0, 100) + '...' : n.content) : 'No content available.'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* EMPTY STATE (No Results) */}
              {results.complaints.length === 0 && results.notices.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: 'white', borderRadius: '12px', border: '1px dashed #D1D5DB' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👻</div>
                  <h3 style={{ fontSize: '1.2rem', color: '#111827', marginBottom: '0.5rem' }}>No results found</h3>
                  <p style={{ color: '#6B7280' }}>We couldn't find any complaints or notices matching "<strong>{query}</strong>".</p>
                </div>
              )}
            </div>
          )
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Search;