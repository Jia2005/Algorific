import React, { useState, useRef } from 'react';
import './HomePage.css'; // Ensure to import your CSS file

const Navbar = () => {
  const [navbarClass, setNavbarClass] = useState('navbar');

  const toggleNavbar = () => {
    setNavbarClass(prevClass => 
      prevClass === 'navbar' ? 'navbar responsive' : 'navbar'
    );
  };

  return (
    <div className={navbarClass} id="myNavbar">
      <a href="#home" className="active">Home</a>
      <a href="#dashboard">Dashboard</a>
      <a href="#services">Learn</a>
      <a href="#about">Algorithm</a>
      <a href="#contact">Quiz</a>
      <a href="javascript:void(0);" className="icon" onClick={toggleNavbar}>
        &#9776;
      </a>
    </div>
  );
};

const Card = ({ imgSrc, title, description }) => {
  return (
    <div className="card">
      <div className="face front">
        <img src={imgSrc} alt={title} />
        <h3>{title}</h3>
      </div>
      <div className="face back">
        <h3>{title}</h3>
        <p>{description}</p>
        <button onClick={() => window.location.href='#'}>Learn</button>
        <button onClick={() => window.location.href='#'}>Play a game</button>
      </div>
    </div>
  );
};

const CardContainer = () => {
  return (
    <div className="cont">
      <Card 
        imgSrc="/Images/queue.jpg" 
        title="Queue" 
        description="A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle."
      />
      <Card 
        imgSrc="/Images/stacks.jpg" 
        title="Stack" 
        description="A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle."
      />
      <Card 
        imgSrc="/Images/ll.jpg" 
        title="Linked List" 
        description="A linked list is a linear data structure consisting of nodes, each containing a value and a reference."
      />
      <Card 
        imgSrc="/Images/bst.jpg" 
        title="Binary Search Tree" 
        description="A binary search tree (BST) arranges nodes so left children are smaller than their parents."
      />
      <Card 
        imgSrc="/Images/huff.jpg" 
        title="Huffman Coding" 
        description="Huffman coding is a compression technique that assigns shorter codes to more frequent characters."
      />
      <Card 
        imgSrc="/Images/hashing.jpg" 
        title="Hashing" 
        description="Hashing transforms input data into a fixed-size string of characters, typically serving as a unique identifier."
      />
    </div>
  );
};

const AboutSection = () => {
  return (
    <div className="about-section">
      <div className="about-us-image">
        <img src="/Images/about.jpg" alt="About Us" />
      </div>
      <div className="about-us-text">
        <h1><b>About Us</b></h1>
        <p style={{ fontSize: '18px' }}>
          <b><em>
            <strong>Algorific</strong> is dedicated to making Data Science accessible and engaging for all...
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
        <p style={{ fontSize: '18px' }}>
          <b><em>
            Are you passionate about building interactive and fun algorithms? ...
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

const TeamSection = () => {
  return (
    <div className="team-section">
      <h2>Social Media</h2>
      <div className="team-member">
        <img src="/Images/insta.svg" alt="Instagram" />
        <h3>Instagram</h3>
      </div>
      <div className="team-member">
        <img src="/Images/fb.svg" alt="Facebook" />
        <h3>Facebook</h3>
      </div>
      <div className="team-member">
        <img src="/Images/ld.svg" alt="LinkedIn" />
        <h3>LinkedIn</h3>
      </div>
    </div>
  );
};

// Main HomePage Component
const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="logo">
        <a href="#" className="navlogo">
          <img src="/Images/logo.svg" alt="Logo" />
          <div className="logoo" style={{ fontSize: '25px', color: 'white' }}>ALGORIFIC</div>
        </a>
      </div>
      <CardContainer />
      <AboutSection />
      <ContactUs />
      <TeamSection />
    </div>
  );
};

export default HomePage;
