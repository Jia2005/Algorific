import React, { useEffect, useState } from 'react';  
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';  
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faUserCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';   
import './profile.css';  
import { Link } from 'react-router-dom';

const avatarOptions = [
  'https://cdn-icons-png.freepik.com/256/9436/9436366.png?ga=GA1.1.1547364823.1726078972&semt=ais_hybrid',
  'https://cdn-icons-png.freepik.com/256/2945/2945512.png?ga=GA1.1.1547364823.1726078972&semt=ais_hybrid',
  'https://cdn-icons-png.freepik.com/256/435/435058.png?ga=GA1.1.1547364823.1726078972&semt=ais_hybrid',
  'https://cdn-icons-png.freepik.com/256/2945/2945512.png?ga=GA1.1.1547364823.1726078972&semt=ais_hybrid',
  'https://cdn-icons-png.freepik.com/256/1985/1985783.png?ga=GA1.1.1547364823.1726078972&semt=ais_hybrid'
];

const UserProfile = ({ setComponent }) => {  
  const auth = getAuth();  
  const db = getFirestore();  

  const [user, setUser] = useState(null);  
  const [avatarIndex, setAvatarIndex] = useState(null);  
  const [name, setName] = useState('');  
  const [age, setAge] = useState('');  
  const [email, setEmail] = useState('');  
  const [phone, setPhone] = useState('');  
  const [isEditing, setIsEditing] = useState(false); 
  const [isChoosingAvatar, setIsChoosingAvatar] = useState(false);

  useEffect(() => {  
    const unsubscribe = onAuthStateChanged(auth, async (user) => {  
      if (user) {  
        const userRef = doc(db, 'users', user.uid);  
        const userDoc = await getDoc(userRef);  

        if (userDoc.exists()) {  
          const userData = userDoc.data();  
          setUser(user);  
          setName(userData.name || '');  
          setAge(userData.age || '');  
          setEmail(userData.email || '');  
          setPhone(userData.phone || '');  

          if (userData.avatarIndex) {  
            setAvatarIndex(userData.avatarIndex);  
          } else {
            setAvatarIndex(null);
          }
        }  
      }  
    });  

    return () => unsubscribe();  
  }, [auth, db]);  

  const handleSignOut = () => {
    signOut(auth).then(() => {
      window.location.href = '/';
    }).catch(() => {
      window.alert('There are some server issues.');
    });
  };

  const handleAvatarSelection = async (index) => {
    if (!user || !user.uid) {
      window.alert('User is not authenticated. Please log in.');
      return;
    }
  
    try {
      setAvatarIndex(index);  
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { avatarIndex: index });  
    } catch (error) {
      console.error("Error updating avatar:", error);
      window.alert('Error updating avatar. Please try again.');
    }
  };

  const handleEdit = () => {  
    setIsEditing(true);  
  };  

  const handleSave = async () => {  
    const userRef = doc(db, 'users', user.uid);  
    await updateDoc(userRef, {  
      name,  
      age,  
      email,  
      phone  
    });  
    setIsEditing(false);  
  };  

  return (
    <div className="profile-container">
      <div className="sidebar">
        <div>
          <div className="profile-pic" style={{marginBottom:'60px', marginLeft:'25px'}}>
            {avatarIndex !== null ? (
              <img src={avatarOptions[avatarIndex - 1]} alt="Profile" className="circular-pic" />  
            ) : (
              <FontAwesomeIcon icon={faUserCircle} size="9x" />
            )}
          </div>
          <div className="profile-name">
            {name}
          </div>
          <hr className="sidebar-divider" />
          <div className="sidebar-menu">
            <ul>
              <li className="center">
                <Link to="/home" style={{textAlign:'left',}}>Home</Link></li>
                <li><Link to="/algo" >Algorithm</Link></li>
                <li><Link to="/dashboard" >Dashboard</Link>
              </li>
            </ul>
          </div>
          <div className='log' >
            <button className="logout-button" style={{alignSelf:'left'}} onClick={handleSignOut}>Logout</button>
          </div>
        </div>
      </div>
      <div className="profile-details">
        <div className="detail-block-container">
          <h2 style={{color:'black', marginBottom:'18px'}}>Profile Details</h2>
          <table className="profile-table" style={{color:'black'}}>
            <tbody>
              <tr>
                <td style={{width:'100px', paddingBottom:'10px'}}><strong>Name:</strong></td>
                <td style={{paddingBottom:'10px'}}>{isEditing ? <input type="text" value={name} onChange={(e) => setName(e.target.value)} /> : name}</td>
              </tr>
              <tr>
                <td style={{paddingBottom:'10px'}}><strong>Age:</strong></td>
                <td style={{paddingBottom:'10px'}}>{isEditing ? <input type="number" value={age} onChange={(e) => setAge(e.target.value)} /> : age}</td>
              </tr>
              <tr>
                <td style={{paddingBottom:'10px'}}><strong>Email:</strong></td>
                <td style={{paddingBottom:'10px'}}>{isEditing ? <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /> : email}</td>
              </tr>
              <tr>
                <td style={{paddingBottom:'10px'}}><strong>Phone No:</strong></td>
                <td style={{paddingBottom:'10px'}}>{isEditing ? <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} /> : phone}</td>
              </tr>
            </tbody>
          </table>
          <br />
          <div className="avatar-selection">
            <button className='hide' onClick={() => setIsChoosingAvatar(!isChoosingAvatar)}>
              {isChoosingAvatar ? 'Hide Avatars' : 'Choose an Avatar'}
            </button>
            {isChoosingAvatar && (
              <div className="avatar-options">
                {avatarOptions.map((avatarUrl, index) => (
                  <img
                    key={index}
                    src={avatarUrl}
                    alt={`Avatar ${index + 1}`}
                    className="avatar-option"
                    onClick={() => handleAvatarSelection(index + 1)}  // Save index + 1
                  />
                ))}
              </div>
            )}
          </div><br></br>

          <div className="profile-action-buttons">
            {isEditing ? (
              <button className="save-button" onClick={handleSave}>Save Changes</button>
            ) : (
              <button className="edit-button" onClick={handleEdit}>Edit Profile</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
