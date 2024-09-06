import React, { useState } from 'react';
import { db, collection, addDoc } from './../firebase';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // 'success' or 'error'

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setAlertMessage("Passwords do not match.");
      setAlertType('error');
      return;
    }

    try {
      await addDoc(collection(db, 'users'), {
        name,
        email,
        password
      });
      setAlertMessage("User added successfully.");
      setAlertType('success');
      // Reset form
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error("Error adding document: ", error);
      setAlertMessage("Error adding user. Please try again.");
      setAlertType('error');
    }
  };

  return (
    <div>
      <form name="sign-up" onSubmit={handleSubmit}>
        <br /><br />
        <h1 align="center" style={{ color: 'white' }}>Create your Account</h1>
        <label>
          <span style={{ color: 'white' }}>Name</span>
          <input
            className='in'
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your Name"
            style={{ fontSize: '16px' }}
          />
        </label>
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
        <label>
          <span style={{ color: 'white' }}>Confirm Password</span>
          <input
            className='in'
            type="password"
            name="confirm_password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your Password"
            style={{ fontSize: '16px' }}
          />
        </label>
        <div>
          <button type="submit" className="submit btn" style={{ backgroundColor: '#000000', color: 'rgb(255, 255, 255)' }}>
            Sign Up
          </button>
        </div>
      </form>

      {alertMessage && (
        <div
          style={{
            marginTop: '20px',
            padding: '10px',
            backgroundColor: alertType === 'success' ? '#d4edda' : '#f8d7da',
            color: alertType === 'success' ? '#155724' : '#721c24',
            border: `1px solid ${alertType === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
            borderRadius: '4px'
          }}
        >
          {alertMessage}
        </div>
      )}
    </div>
  );
}

export default SignUp;
