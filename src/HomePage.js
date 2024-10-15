import React, { useState } from 'react';
import bst from './Images/bst.jpg';
import queue from './Images/queue.jpg';
import ll from './Images/ll.jpg';
import huff from './Images/huff.jpg';
import about from './Images/about.jpg';
import hash from './Images/hashing.jpg';
import stack from './Images/stacks.jpg';
import profileLogo from './Images/profile.jpg';
import './HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
const Navbar = () => {
  const [navbarClass, setNavbarClass] = useState('navbar');

  const toggleNavbar = () => {
    setNavbarClass(prevClass => 
      prevClass === 'navbar' ? 'navbar responsive' : 'navbar'
    );
  };

  return (
    <div className={navbarClass} id="myNavbar">
      <a href="/" style={{backgroundColor:'red'}}>Logout</a>
      <a href='/profile'>
        <FontAwesomeIcon icon={faUser} style={{ marginRight: '8px' }} />
      </a>
      <a href="#dashboard">Dashboard</a>
      <a href="#about">Algorithm</a>
    </div>
  );
};

const Card = ({ imgSrc, title, description, learnLink, playLink }) => {
  return (
    <div className="card">
      <div className="face front">
        <img src={imgSrc} alt={title} />
        <h3>{title}</h3>
      </div>
      <div className="face back">
        <h3>{title}</h3>
        <p>{description}</p>
        <button onClick={() => window.location.href=learnLink}>Learn</button>
        <button onClick={() => window.location.href=playLink}>Play a game</button>
      </div>
    </div>
  );
};

const CardContainer = () => {
  return (
    <div className="cont-here">
      <Card 
        imgSrc={queue}
        title="Queue" 
        description="A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle."
        learnLink="/queue"
        playLink="/queue-game"
      />
      <Card 
        imgSrc={stack}
        title="Stack" 
        description="A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle."
        learnLink="/stack"
        playLink="/stack-game"
      />
      <Card 
        imgSrc={ll}
        title="Linked List" 
        description="A linked list is a linear data structure consisting of nodes, each containing a value and a reference."
        learnLink="/linked-list"
        playLink="/linked-list-game"
      />
      <Card 
        imgSrc={bst} 
        title="Binary Search Tree" 
        description="A binary search tree (BST) arranges nodes so left children are smaller than their parents."
        learnLink="/bst"
        playLink="/bst-game"
      />
      <Card 
        imgSrc={huff}
        title="Huffman Coding" 
        description="Huffman coding is a compression technique that assigns shorter codes to more frequent characters."
        learnLink="/huffman"
        playLink="/huffman-game"
      />
      <Card 
        imgSrc={hash} 
        title="Hashing" 
        description="Hashing transforms input data into a fixed-size string of characters, typically serving as a unique identifier."
        learnLink="/hashing"
        playLink="/hashing-game"
      />
    </div>
  );
};

const AboutSection = () => {
  return (
    <div className="about-section">
      <div className="about-us-image">
        <img src={about} alt="About Us" className='imgabout' />
      </div>
      <div className="about-us-text">
        <p style={{ fontSize: '18px', color: 'black' }}>
          <b><em><br></br>
            <strong>Algorific</strong> is dedicated to making Data Science accessible and engaging for all. Our mission is to simplify complex Data Science concepts through high-quality animated courses that transform learning into an enjoyable adventure. Each lesson is designed to be engaging and easy to understand, incorporating interactive exercises and quizzes to enhance comprehension. We strive to make Data Science education available to everyone, regardless of their background, and aim to inspire the next generation of data scientists, analysts, and enthusiasts by merging animation with data science education.
          </em></b>
        </p>
      </div>
    </div>
  );
};

const ContactUs = () => {
  return (
    <div className="contact-us">
      <section className="join-us-text">
        <h1><b>Join Us!</b></h1>
        <p style={{ fontSize: '18px', color: 'black' }}>
          <b><em>
          Are you passionate about building interactive and fun algorithms? We invite you to join our team and contribute to creating engaging, gamified learning experiences. Together, we can make learning data structures exciting and accessible for everyone!
          </em></b>
        </p>    
      </section>
    
      <section className="contact-us-text">
        <h1><b>Contact Us</b></h1>
        <form action="#">
          <div className="inputbox">
            <div className="inputfeild feild">
              <input type="text" placeholder="Full Name" id="name" className="item" autoComplete="off" />
              <div className="errortext">Full Name can't be blank</div>
            </div>
            <div className="inputfeild feild">
              <input type="text" placeholder="Email Address" id="email" className="item" autoComplete="off" />
              <div className="errortext email">Email can't be blank</div>
            </div>
          </div>
          <div className="inputbox">
            <div className="inputfeild feild">
              <input type="text" placeholder="Phone Number" id="phone" className="item" autoComplete="off" />
              <div className="errortext">Phone Number can't be blank</div>
            </div>
            <div className="inputfeild feild">
              <input type="text" placeholder="Qualification" id="Qualification" className="item" autoComplete="off" />
              <div className="errortext">Qualification can't be blank</div>
            </div>
          </div>
          <div className="textareafeild feild">
            <textarea id="message" cols="30" rows="10" placeholder="Your Message" className="item" autoComplete="off"></textarea>
            <div className="errortext">Message can't be blank</div>
          </div>
          <button type="submit">Send Message</button>
        </form>
      </section>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>Follow Us</h2><br></br>
        <div className="social-icons">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram}  style={{height:'4vh'}}/> 
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebookF}  style={{height:'4vh'}}/> 
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedinIn} style={{height:'4vh'}} /> 
          </a>
        </div>
      </div>
    </footer>
  );
};

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="logo">
        <a href="/home" className="navlogo">
          <div className="logoo" style={{ fontSize: '25px', color: 'white' }}>ALGORIFIC</div>
        </a>
      </div>
      <CardContainer />
      <AboutSection />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default HomePage;
