import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { API_ENDPOINTS } from '../api/config';
import Navbar from '../components/Navbar';

const VoiceComplaint = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    room_number: '',
    priority: 'normal',
  });
  const recognitionRef = useRef(null);

  const startRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition not supported in this browser. Please use Chrome.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onstart = () => {
      setIsRecording(true);
      setError('');
    };

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPart = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPart + ' ';
        } else {
          interimTranscript += transcriptPart;
        }
      }

      setTranscript(finalTranscript || interimTranscript);
    };

    recognitionRef.current.onerror = (event) => {
      setError(`Error: ${event.error}`);
      setIsRecording(false);
    };

    recognitionRef.current.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      processTranscript();
    }
  };

  const processTranscript = () => {
    const lowerTranscript = transcript.toLowerCase();
    
    let detectedCategory = 'other';
    if (lowerTranscript.includes('light') || lowerTranscript.includes('fan') || lowerTranscript.includes('ac') || lowerTranscript.includes('electrical')) {
      detectedCategory = 'electrical';
    } else if (lowerTranscript.includes('tap') || lowerTranscript.includes('water') || lowerTranscript.includes('leak') || lowerTranscript.includes('plumbing')) {
      detectedCategory = 'plumbing';
    } else if (lowerTranscript.includes('door') || lowerTranscript.includes('window') || lowerTranscript.includes('furniture') || lowerTranscript.includes('broken')) {
      detectedCategory = 'carpentry';
    } else if (lowerTranscript.includes('clean') || lowerTranscript.includes('dirty')) {
      detectedCategory = 'cleaning';
    } else if (lowerTranscript.includes('wifi') || lowerTranscript.includes('internet') || lowerTranscript.includes('network')) {
      detectedCategory = 'internet';
    }

    let detectedPriority = 'normal';
    if (lowerTranscript.includes('urgent') || lowerTranscript.includes('emergency') || lowerTranscript.includes('immediate')) {
      detectedPriority = 'urgent';
    } else if (lowerTranscript.includes('critical') || lowerTranscript.includes('dangerous')) {
      detectedPriority = 'critical';
    }

    const words = transcript.split(' ');
    const generatedTitle = words.slice(0, 5).join(' ') + (words.length > 5 ? '...' : '');

    setFormData({
      ...formData,
      category: detectedCategory,
      title: generatedTitle,
      description: transcript,
      priority: detectedPriority,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axiosInstance.post(API_ENDPOINTS.COMPLAINTS, formData);
      alert('Voice complaint submitted successfully!');
      navigate('/complaints');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to submit complaint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem' }}>🎤 Voice Complaint</h1>

        <div style={{ backgroundColor: '#EFF6FF', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', borderLeft: '4px solid #2563EB' }}>
          <h3 style={{ color: '#1E40AF', marginBottom: '0.5rem' }}>How it works:</h3>
          <ol style={{ color: '#374151', fontSize: '0.875rem', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
            <li>Click "Start Recording" and describe your complaint</li>
            <li>AI will auto-detect category and priority</li>
            <li>Review and edit the auto-generated form</li>
            <li>Submit your complaint!</li>
          </ol>
        </div>

        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '8rem', marginBottom: '1rem' }}>
              {isRecording ? '🔴' : '🎤'}
            </div>
            {!isRecording ? (
              <button onClick={startRecording} style={{ padding: '1rem 2rem', backgroundColor: '#DC2626', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.25rem', fontWeight: 'bold', cursor: 'pointer', animation: isRecording ? 'none' : 'pulse 2s infinite' }}>
                🎤 Start Recording
              </button>
            ) : (
              <button onClick={stopRecording} style={{ padding: '1rem 2rem', backgroundColor: '#2563EB', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.25rem', fontWeight: 'bold', cursor: 'pointer' }}>
                ⏹️ Stop Recording
              </button>
            )}
            {isRecording && (
              <div style={{ marginTop: '1rem', color: '#DC2626', fontWeight: 'bold', animation: 'pulse 1s infinite' }}>
                🔴 Listening...
              </div>
            )}
          </div>

          {transcript && (
            <div style={{ padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '4px', marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>Transcription:</p>
              <p style={{ color: '#374151' }}>{transcript}</p>
            </div>
          )}

          {error && (
            <div style={{ padding: '0.75rem', backgroundColor: '#FEE2E2', color: '#DC2626', borderRadius: '4px', marginBottom: '1rem' }}>
              {error}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '1rem' }}>Review & Submit</h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Category (Auto-detected)</label>
            <select name="category" value={formData.category} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px' }}>
              <option value="">Select Category</option>
              <option value="electrical">Electrical</option>
              <option value="plumbing">Plumbing</option>
              <option value="carpentry">Carpentry</option>
              <option value="cleaning">Cleaning</option>
              <option value="internet">Internet</option>
              <option value="furniture">Furniture</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required minLength={5} style={{ width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px' }} />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required minLength={10} rows={5} style={{ width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px' }} />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Room Number</label>
            <input type="text" name="room_number" value={formData.room_number} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px' }} />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Priority (Auto-detected)</label>
            <select name="priority" value={formData.priority} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px' }}>
              <option value="normal">Normal</option>
              <option value="urgent">Urgent</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" disabled={loading} style={{ flex: 1, padding: '0.75rem', backgroundColor: loading ? '#9CA3AF' : '#10B981', color: 'white', border: 'none', borderRadius: '4px', fontWeight: '500' }}>
              {loading ? 'Submitting...' : '✅ Submit Complaint'}
            </button>
            <button type="button" onClick={() => navigate('/complaints')} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#E5E7EB', color: '#374151', border: 'none', borderRadius: '4px' }}>
              Cancel
            </button>
          </div>
        </form>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default VoiceComplaint;
