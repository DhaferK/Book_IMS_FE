import React from 'react';
import logo from '../assets/logo.png';
function Navbar() {
  return (
    <nav>
        <header>
        <h1>WormVerse</h1>
        <p className="slogan">Dive into a Universe of Books!</p>
      </header>
      <img src={logo} alt="WormVerse Logo" className="logo" />
    </nav>
  );
}
export default Navbar;
