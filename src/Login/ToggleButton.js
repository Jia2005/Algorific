import React from 'react';

function ToggleButton({ toggleForm }) {
  return (
    <div className="img__btn" style={{ color: 'rgb(0, 0, 0)' }} onClick={toggleForm}>
      <span className="m--up">Sign Up</span>
      <span className="m--in">Login</span>
    </div>
  );
}

export default ToggleButton;
