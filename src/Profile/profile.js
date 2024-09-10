import React, { useEffect, useState } from 'react';  
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';  
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';  
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faUserCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';   
import './profile.css';  
import { Link } from 'react-router-dom';

const UserProfile = ({ setComponent }) => {  
  const auth = getAuth();  
  const db = getFirestore();  
  const storage = getStorage();  

  const [user, setUser] = useState(null);  
  const [profilePic, setProfilePic] = useState('');  
  const [name, setName] = useState('');  
  const [age, setAge] = useState('');  
  const [email, setEmail] = useState('');  
  const [phone, setPhone] = useState('');  
  const [file, setFile] = useState(null);  
  const [isEditing, setIsEditing] = useState(false); 

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

          if (userData.profilePic) {  
            const profilePicUrl = await getDownloadURL(ref(storage, `profile_pictures/${user.uid}`));  
            setProfilePic(profilePicUrl);  
          }  
        }  
      }  
    });  

    return () => unsubscribe();  
  }, [auth, db, storage]);  

  const handleSignOut = () => {
    signOut(auth).then(() => {
      window.location.href = '/login';
    }).catch(() => {
      window.alert('There are some server issues.');
    });
  };

  const handleFileChange = (e) => {  
    setFile(e.target.files[0]);  
  };  

  const handleUpload = async () => {  
    if (file) {  
      const storageRef = ref(storage, `profile_pictures/${user.uid}`);  
      await uploadBytes(storageRef, file);  
      const profilePicUrl = await getDownloadURL(storageRef);  
      setProfilePic(profilePicUrl);  
      const userRef = doc(db, 'users', user.uid);  
      await updateDoc(userRef, { profilePic: profilePicUrl });  
    }  
  };  

  const handleDeleteProfilePic = async () => {  
    if (profilePic) {  
      const storageRef = ref(storage, `profile_pictures/${user.uid}`);  
      await deleteObject(storageRef);  
      setProfilePic('');  

      const userRef = doc(db, 'users', user.uid);  
      await updateDoc(userRef, { profilePic: '' });  
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
          <div className="profile-pic">
            {profilePic ? (
              <>
                <img src={profilePic} alt="Profile" className="circular-pic" />
                <button className="delete-pic-btn" onClick={handleDeleteProfilePic}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </>
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
                <Link to="/home">Home</Link>
              </li>
            </ul>
          </div>
          <div className='log'>
            <button className="logout-button" onClick={handleSignOut}>Logout</button>
          </div>
        </div>
      </div>
      <div className="profile-details">
        <div className="detail-block-container">
          <h2>Profile Details</h2>
          <div className="detail-block">
            <p><strong>Name:</strong> {isEditing ? <input type="text" value={name} onChange={(e) => setName(e.target.value)} /> : name}</p>
          </div>
          <div className="detail-block">
            <p><strong>Age:</strong> {isEditing ? <input type="number" value={age} onChange={(e) => setAge(e.target.value)} /> : age}</p>
          </div>
          <div className="detail-block">
            <p><strong>Email:</strong> {isEditing ? <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /> : email}</p>
          </div>
          <div className="detail-block">
            <p><strong>Phone No.:</strong> {isEditing ? <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} /> : phone}</p>
          </div>
          <div className='upload-image'>
            <input type="file" onChange={handleFileChange} />
          </div>
          <button className='upload-image-btn' onClick={handleUpload}>Upload Profile Picture</button><br></br><br></br>
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
