import React from 'react';
import { ReactComponent as EllipseIcon } from '../assets/Ellipse 1.svg'; // SVG background
 // Additional overlay or decorative element
import avatarImage from '../assets/MrJournalerFront1.png'; // Main avatar image
import {ReactComponent as CommunityIcon } from '../assets/Vector.svg'; 
const Header = () => (
  <div className="header">
    <div className="avatar-container">
      <EllipseIcon className="avatar-background"/>
      
      <img src={avatarImage} alt="Chatbot Avatar" className="avatar-image" />
    </div>

    {/* Community Button */}
    <button
      className="community-button"
      onClick={() => window.open('https://t.me/MrJournaler', '_blank')}
    >
      <CommunityIcon className="community-button-icon" />
      <span className="community-button-text">Go to community</span>
    </button>
  </div>
);

export default Header;
