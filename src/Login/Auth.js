import React, { useState } from 'react';
import './Style.css';
import LoginForm from './Login';
import SignupForm from './Signup';
import ToggleButton from './ToggleButton';

function Auth() {
  const [isSignup, setIsSignup] = useState(false);

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className={`cont ${isSignup ? 's--signup' : ''}`}>
      <div className="form sign-in">
        <LoginForm />
      </div>
      <div className="sub-cont">
        <div className="img" style={{ backgroundColor: 'black' }}>
          <div className="img__text m--up">
            <h3 style={{ color: '#6a0dad' }}>Don't have an account? Please Sign up!</h3>
          </div>
          <div className="img__text m--in">
            <h3 style={{ color: '#6a0dad' }}>If you already have an account, just sign in.</h3>
          </div>
          <ToggleButton toggleForm={toggleForm} />
        </div>
        <div className="form sign-up" style={{ backgroundColor: '#6a0dad' }}>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}

export default Auth;
