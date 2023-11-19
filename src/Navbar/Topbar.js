import React, { useState, useEffect } from 'react';
import "./Topbar.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
// import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faSignOutAlt,faArrowLeft, faHome, faUserFriends, faUser,faLocation,faUpload,faMessage} from '@fortawesome/free-solid-svg-icons';
export default function Topbar() {
  const [borderPosition, setBorderPosition] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  // Destructuring pathname from location
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  useEffect(() => {
    // Set initial borderPosition based on the current route
    const lisLength = document.querySelectorAll('nav ul li').length;
    const lisWidth = 100 / lisLength;
    const position = getInitialPosition(pathname, lisWidth);
    setBorderPosition(position);
  }, [pathname]);

  const getInitialPosition = (path, width) => {
    switch (path) {
      case '/':
        return 0;
      case '/location':
        return width;
      case '/post':
        return width * 2;
        case '/profile':
        return width * 3;
        case '/message':
        return width * 4;
      // Add more cases for other routes if needed
      default:
        return 0;
    }
  };

  const handleLinkClick = (e, i, attr) => {
    e.preventDefault();
    if (attr === "#one") {
      navigate("/");
    } else if (attr === "#two") {
      navigate("/location");
    }else if (attr === "#three") {
        navigate("/post");
      }else if (attr === "#four") {
        navigate("/message");
      }else if (attr === "#five") {
        navigate("/profile");
      } else {
      navigate(attr);
    }

    const activLinks = document.querySelector('nav ul li a.activ');
    const activContent = document.querySelector('section>div.activ');

    // activLinks.classList.remove('activ');
    // activContent.classList.remove('activ');

    // e.target.classList.add('activ');
    const activ = document.querySelector(attr);

    // activ.classList.add('activ');

    const lisLength = document.querySelectorAll('nav ul li').length;
    const lisWidth = 100 / lisLength;
    const position = i * lisWidth;
    setBorderPosition(position);
  };

  return (
    <main>
      <header className="clearfix">
        <div className="home">
          <a onClick={() => navigate("/")} className="logo">
            DelLife 
          </a>
        </div>
        <nav className="container-fluid">
          <ul className="clearfix">
            <li><a href="#one" className={pathname === '/' ? 'activ' : ''} style={{color:pathname === '/'?"red":"black"}} onClick={(e) => handleLinkClick(e, 0, '#one')}><FontAwesomeIcon icon={faHome} style={{color:pathname === '/'?"red":"black"}} className="iconstyle"/></a></li>

            <li><a href="#two" className={pathname === '/location' ? 'activ' : ''}  onClick={(e) => handleLinkClick(e, 1, '#two')}><FontAwesomeIcon icon={faSearch} style={{color:pathname === '/location'?"red":"black"}} className="iconstyle"/></a></li>

            <li><a href="#three" className={pathname === '/post' ? 'activ' : ''} onClick={(e) => handleLinkClick(e, 2, '#three')}><FontAwesomeIcon icon={faUpload} style={{color:pathname === '/post'?"red":"black"}} className="iconstyle"/></a></li>

            <li><a href="#five" className={pathname === '/profile' ? 'activ' : ''} onClick={(e) => handleLinkClick(e, 4, '#five')}><FontAwesomeIcon icon={faUser} style={{color:pathname === '/profile'?"red":"black"}} className="iconstyle"/></a></li> 

            <li><a href="#four" className={pathname === '/message' ? 'activ' : ''} onClick={(e) => handleLinkClick(e, 3, '#four')}><FontAwesomeIcon icon={faMessage} style={{color:pathname === '/message'?"red":"black"}} className="iconstyle"/></a></li>

            
          </ul>
          <span className='linebar' style={{ left: `${borderPosition}%` }}></span>
        </nav>
      </header>
      <section className="row">
        <div className=" content activ" id="one">
          {/* Content for One */}
        </div>
        <div className=" content" id="two">
          {/* Content for Two */}
        </div>
        <div className=" content" id="three">
          {/* Content for Three */}
        </div>
        <div className=" content" id="four">
          {/* Content for Four */}
        </div>
        <div className=" content" id="five">
          {/* Content for Five */}
        </div>
      </section>
    </main>
  );
}
