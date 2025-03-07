import React from 'react';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faHistory } from '@fortawesome/free-solid-svg-icons';

function Sidebar({ activeTab, setActiveTab }) {
  return (
    <Nav className="flex-column">
      <Nav.Link 
        className={activeTab === 'home' ? 'active' : ''} 
        onClick={() => setActiveTab('home')}
      >
        <FontAwesomeIcon icon={faHome} /> Home
      </Nav.Link>
      <Nav.Link 
        className={activeTab === 'favorites' ? 'active' : ''} 
        onClick={() => setActiveTab('favorites')}
      >
        <FontAwesomeIcon icon={faHeart} /> Favorites
      </Nav.Link>
      <Nav.Link 
        className={activeTab === 'recent' ? 'active' : ''} 
        onClick={() => setActiveTab('recent')}
      >
        <FontAwesomeIcon icon={faHistory} /> Recently Played
      </Nav.Link>
    </Nav>
  );
}

export default Sidebar;