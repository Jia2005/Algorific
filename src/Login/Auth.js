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
    <div className='main_auth'>
    <div className={`cont ${isSignup ? 's--signup' : ''}`}>
      <div className="form sign-in">
        <LoginForm />
      </div>
      <div className="sub-cont">
        <div className="img" style={{ backgroundColor: 'black' }}>
          <div className="img__text m--up">
            <h3 style={{ color: 'navy' }}>Don't have an account? Please Sign up!</h3>
          </div>
          <div className="img__text m--in">
            <h3 style={{ color: 'navy' }}>If you already have an account, just sign in.</h3>
          </div>
          <ToggleButton toggleForm={toggleForm} />
        </div>
        <div className="form sign-up" style={{ backgroundColor: '#89d0ff' }}>
          <SignupForm />
        </div>
      </div>
    </div>
    </div>
  );
}

export default Auth;
