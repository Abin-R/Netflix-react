 import React, { useEffect, useState } from 'react'
 import "./Navbar.css";
 import "./App.css";


function NavBar() {
    const [isScrolled, setIsScrolled] = useState(false);    

    useEffect(() => {
        const handleScroll = () => {
          // Check the vertical scroll position of the window.
          if (window.scrollY > 0) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
        };
    
        // Add an event listener for the 'scroll' event.
        window.addEventListener('scroll', handleScroll);
    
        // Clean up the event listener when the component unmounts.
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    return (
        <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="Netflix Logo" />
            <img className='avatar' src='https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png' alt="avatar" />
        </div>
    )
}

export default NavBar
