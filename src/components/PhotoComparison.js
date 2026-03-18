import React, { useState } from 'react';

const PhotoComparison = ({ beforePhoto, afterPhoto }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  if (!beforePhoto || !afterPhoto) {
    return (
      <div style={{ padding: '2rem', backgroundColor: '#F9FAFB', borderRadius: '8px', textAlign: 'center' }}>
        <p style={{ color: '#6B7280' }}>No comparison photos available</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 'bold' }}>Before/After Comparison</h3>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '400px',
          overflow: 'hidden',
          borderRadius: '8px',
          cursor: 'ew-resize',
        }}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          src={afterPhoto}
          alt="After"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: `${sliderPosition}%`,
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <img
            src={beforePhoto}
            alt="Before"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            left: `${sliderPosition}%`,
            top: 0,
            bottom: 0,
            width: '4px',
            backgroundColor: 'white',
            cursor: 'ew-resize',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            ⟷
          </div>
        </div>
        <div style={{ position: 'absolute', top: '1rem', left: '1rem', padding: '0.5rem 1rem', backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', borderRadius: '4px', fontWeight: 'bold' }}>
          BEFORE
        </div>
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.5rem 1rem', backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', borderRadius: '4px', fontWeight: 'bold' }}>
          AFTER
        </div>
      </div>
      <p style={{ marginTop: '1rem', textAlign: 'center', color: '#6B7280', fontSize: '0.875rem' }}>
        Drag the slider to compare before and after photos
      </p>
    </div>
  );
};

export default PhotoComparison;
