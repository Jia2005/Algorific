import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const auth = getAuth();
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/linkedlist');
    } catch (error) {
      const errorCode = error.code;

      if (errorCode === 'auth/invalid-email') {
        window.alert('The email address is badly formatted.');
      } else if (errorCode === 'auth/user-not-found') {
        window.alert('No user found with this email address.');
      } else if (errorCode === 'auth/wrong-password') {
        window.alert('Incorrect password. Please try again.');
      } else if (errorCode === 'auth/user-disabled') {
        window.alert('Your account has been disabled. Please contact support.');
      } else {
        window.alert('Login failed');
      }
    }
  };

  return (
    <div>
      <form name="login" onSubmit={handleSubmit} className='logform'>
        <br /><br />
        <h1 align="center" style={{ color: 'white' }}>Login</h1>
        <label>
          <span style={{ color: 'white' }}>Email</span>
          <input
            className='in'
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email Address"
            style={{ fontSize: '16px' }}
          />
        </label>
        <label>
          <span style={{ color: 'white' }}>Password</span>
          <input
            className='in'
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            style={{ fontSize: '16px' }}
          />
        </label>
        <div>
          <button type="submit" className="submit btn" style={{ backgroundColor: '#000000', color: 'rgb(255, 255, 255)' }}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
