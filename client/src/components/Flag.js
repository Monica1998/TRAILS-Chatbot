import React, { useState } from 'react';
import './Flag.css';

const Flag = ({ onFlag }) => {
  const [flagged, setFlagged] = useState(false);

  const handleClick = () => {
    setFlagged(true);
    onFlag();
  };

  return (
    <button
      className="flag-button"
      style={{ backgroundColor: flagged ? '#f39c12' : '#e74c3c' }}
      onClick={handleClick}
    >
      Flag
    </button>
  );
};

export default Flag;
