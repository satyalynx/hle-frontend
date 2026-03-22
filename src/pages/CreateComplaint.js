import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { API_ENDPOINTS } from '../api/config';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const CreateComplaint = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    room_number: '',
    priority: 'normal',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        // Ye base64 string set kar raha hai, jisko hum direct backend bhejenge
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported. Please use Chrome browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setFormData({ ...formData, description: formData.description + ' ' + transcript });
      setIsRecording(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      alert(`Voice input error: ${event.error}`);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let finalBase64 = null;

      // 🟢 GOD MODE: Bypassing React state entirely and snatching file from HTML directly!
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput && fileInput.files.length > 0) {
        const actualFile = fileInput.files[0];
        finalBase64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(actualFile);
        });
      }

      const payload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        room_number: formData.room_number,
        priority: formData.priority,
        user_id: user?.id ? Number(user.id) : 0,
        photo_base64: finalBase64 // Ab ye 1000% jayega
      };

      await axiosInstance.post(API_ENDPOINTS.COMPLAINTS, payload);
      
      alert('Complaint raised successfully!');
      navigate('/complaints');
    } catch (err) {
      console.error(err);
      setError('Failed to create complaint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ 
          marginBottom: '2rem', 
          fontSize: '2.5rem',
          fontFamily: 'system-ui',
          fontWeight: 'bold',
        }}>
          Raise New Complaint
        </h1>
        
        <form onSubmit={handleSubmit} style={{ 
          backgroundColor: 'white', 
          padding: '2rem', 
          border: '3px solid #000000',
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '500',
              fontFamily: 'monospace',
            }}>
              Title
            </label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              required 
              minLength={5} 
              placeholder="Brief description of the issue" 
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                border: '2px solid #000000', 
                borderRadius: '0',
                fontFamily: 'monospace',
              }} 
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '500',
              fontFamily: 'monospace',
            }}>
              Description
            </label>
            <div style={{ position: 'relative' }}>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                required 
                minLength={10} 
                rows={5} 
                placeholder="Detailed description of the problem (or use voice input)" 
                style={{ 
                  width: '100%', 
                  padding: '0.75rem', 
                  paddingRight: '3.5rem',
                  border: '2px solid #000000', 
                  borderRadius: '0',
                  fontFamily: 'monospace',
                  resize: 'vertical',
                }} 
              />
              {/* Voice Input Button */}
              <button
                type="button"
                onClick={handleVoiceInput}
                disabled={isRecording}
                style={{
                  position: 'absolute',
                  right: '8px',
                  bottom: '8px',
                  padding: '0.5rem 0.75rem',
                  backgroundColor: isRecording ? '#DC2626' : '#000000',
                  color: 'white',
                  border: '2px solid #000000',
                  cursor: isRecording ? 'not-allowed' : 'pointer',
                  fontSize: '1.25rem',
                  transition: 'all 0.2s',
                }}
                title="Voice input"
              >
                {isRecording ? '🔴' : '🎤'}
              </button>
            </div>
            <p style={{ 
              fontSize: '0.75rem', 
              color: '#6B7280', 
              marginTop: '0.25rem', 
              fontFamily: 'monospace' 
            }}>
              {isRecording ? '🔴 Listening... Speak now!' : 'Click 🎤 for voice input or type manually'}
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '500',
              fontFamily: 'monospace',
            }}>
              Category
            </label>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              required 
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                border: '2px solid #000000', 
                borderRadius: '0',
                fontFamily: 'monospace',
                backgroundColor: 'white',
              }}
            >
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
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '500',
              fontFamily: 'monospace',
            }}>
              Room Number
            </label>
            <input 
              type="text" 
              name="room_number" 
              value={formData.room_number} 
              onChange={handleChange} 
              required 
              placeholder="e.g., A-204" 
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                border: '2px solid #000000', 
                borderRadius: '0',
                fontFamily: 'monospace',
              }} 
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '500',
              fontFamily: 'monospace',
            }}>
              Upload Photo (Optional)
            </label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                border: '2px solid #000000', 
                borderRadius: '0',
                fontFamily: 'monospace',
                backgroundColor: 'white',
              }} 
            />
            <p style={{ 
              fontSize: '0.75rem', 
              color: '#6B7280', 
              marginTop: '0.25rem',
              fontFamily: 'monospace',
            }}>
              Upload a photo of the problem (max 5MB)
            </p>
            {imagePreview && (
              <div style={{ marginTop: '1rem' }}>
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  style={{ 
                    maxWidth: '200px', 
                    maxHeight: '200px', 
                    border: '3px solid #000000',
                  }} 
                />
              </div>
            )}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '500',
              fontFamily: 'monospace',
            }}>
              Priority
            </label>
            <select 
              name="priority" 
              value={formData.priority} 
              onChange={handleChange} 
              required 
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                border: '2px solid #000000', 
                borderRadius: '0',
                fontFamily: 'monospace',
                backgroundColor: 'white',
              }}
            >
              <option value="normal">Normal</option>
              <option value="urgent">Urgent</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          {error && (
            <div style={{ 
              padding: '0.75rem', 
              backgroundColor: '#FEE2E2', 
              color: '#DC2626', 
              border: '2px solid #DC2626',
              marginBottom: '1rem',
              fontFamily: 'monospace',
            }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              type="submit" 
              disabled={loading} 
              style={{ 
                flex: 1, 
                padding: '0.75rem', 
                backgroundColor: loading ? '#9CA3AF' : '#000000', 
                color: 'white', 
                border: '2px solid #000000', 
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = '#374151';
                  e.target.style.transform = 'translate(-2px, -2px)';
                  e.target.style.boxShadow = '2px 2px 0 #000000';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = '#000000';
                  e.target.style.transform = 'translate(0, 0)';
                  e.target.style.boxShadow = 'none';
                }
              }}
              onMouseDown={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = '#DBEAFE';
                  e.target.style.color = '#000000';
                }
              }}
              onMouseUp={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = '#374151';
                  e.target.style.color = 'white';
                }
              }}
            >
              {loading ? 'Submitting...' : 'Submit Complaint'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/complaints')} 
              style={{ 
                padding: '0.75rem 1.5rem', 
                backgroundColor: '#FFFFFF', 
                color: '#000000', 
                border: '2px solid #000000',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#F3F4F6';
                e.target.style.transform = 'translate(-2px, -2px)';
                e.target.style.boxShadow = '2px 2px 0 #000000';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#FFFFFF';
                e.target.style.transform = 'translate(0, 0)';
                e.target.style.boxShadow = 'none';
              }}
              onMouseDown={(e) => {
                e.target.style.backgroundColor = '#DBEAFE';
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateComplaint;