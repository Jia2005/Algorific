import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { db, doc, setDoc } from './../firebase';  
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error] = useState(null); 
  const navigate = useNavigate();

  const signUpUser = async (email, password) => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return { success: true, user };
    } catch (error) {
      return { success: false, errorCode: error.code, errorMessage: error.message };
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      window.alert("Passwords do not match.");
      return;
    }

    const result = await signUpUser(email, password);

    if (result.success) {
      const { user } = result;

      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          await setDoc(userRef, {
            name,
            email,
            age: '',
            phone: '',
            profilePic: ''
          });

          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');

          await signInWithEmailAndPassword(getAuth(), email, password);
          navigate('/home');
        } catch (error) {
          window.alert("Error adding document: " + error.message);
        }
      } else {
        window.alert('User creation failed. Please try again.');
      }
    } else {
      switch (result.errorCode) {
        case 'auth/email-already-in-use':
          window.alert('The email address is already in use. Please use a different email.');
          break;
        case 'auth/invalid-email':
          window.alert('Invalid email address. Please check and try again.');
          break;
        case 'auth/weak-password':
          window.alert('The password is too weak. Please use a stronger password.');
          break;
        default:
          window.alert('Sign-up failed: ' + result.errorMessage);
      }
    }
  };

  return (
    <div>
      <form name="sign-up" onSubmit={handleSubmit} className='signform'>
        <br /><br />
        <h1 align="center">Create your Account</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className='field'>
        <label>
          Name
        </label>
        <input
            className='in'
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your Name"
            style={{ fontSize: '16px' }}
          />
        </div>
        <div className='field'>
        <label>
          Email
        </label>
        <input
            className='in'
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email Address"
            style={{ fontSize: '16px' }}
          />
        </div>
        <div className='field'>
        <label>
          Password
        </label>
        <input
            className='in'
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            style={{ fontSize: '16px' }}
          />
        </div>
        <div className='field'>
        <label>
          Confirm Password
        </label>
        <input
            className='in'
            type="password"
            name="confirm_password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your Password"
            style={{ fontSize: '16px' }}
          />
        </div>
        <div>
          <button type="submit" className="submit btn" style={{ backgroundColor: '#000000', color: 'rgb(255, 255, 255)' }}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
