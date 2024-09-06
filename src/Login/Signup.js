import React, { useState } from 'react';
import { db, collection, addDoc } from './../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); 
  const navigate = useNavigate();

  const signUpUser = async (email, password) => {
    const auth = getAuth();
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return { success: true, user };
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      return { success: false, errorCode, errorMessage };
    }
  };

  const handleSubmit = async (event) => {
	event.preventDefault();
    const result = await signUpUser(email, password);
    console.log(email,password);
    const { uid } = result.user;
    
    if (result.success) {
      const auth = getAuth();
      if (password !== confirmPassword) {
        setAlertMessage("Passwords do not match.");
        setAlertType('error');
        return;
      }
    
      try {
        await addDoc(collection(db, 'users'), {
          uid,
          name,
          email
        });
        setAlertMessage("User added successfully.");
        setAlertType('success');
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } catch (error) {
        console.error("Error adding document: ", error);
        setAlertMessage("Error adding user. Please try again.");
        setAlertType('error');
      }
    
      signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/linkedlist');
      })
      .catch(() => {
        alert('Username or password is incorrect');
      });
    
    } else {
      if (result.errorCode === 'auth/email-already-in-use') {
        alert('The email address is already in use. Please use a different email.');
      } else {
        alert('Sign-up failed: ' + result.errorMessage);
      }
      console.error('Signup failed:', result.errorMessage);
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