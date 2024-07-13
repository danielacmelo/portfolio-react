import { Route, Routes, Link, NavLink } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Home from './templates/Home'
import About from './templates/About'
import Contact from './templates/Contact'
import Works from './templates/Works'
import Work from './templates/Work'
import daniLogo from './assets/daniLogo.svg'
import './styles/scss/styles.scss'

function App() {
    const [isActive, setIsActive] = useState(false);
    const menuRef = useRef(null);
    const hamburgerRef = useRef(null);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
          document.removeEventListener('touchstart', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (menuRef.current &&
        !menuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)) {
            setIsActive(false);
        }
    };

    const handleHamburgerClick = () => {
        setIsActive(!isActive)
    }

    const handleLinkClick = () => {
        setIsActive(false);
    };
    return (
        <div className="wrapper">
            <header id="masthead" className="site-header">
                <div className="site-branding">
                <Link to="/">
                    <div><img className="logo" src={daniLogo} alt="Dani Melo Logo" /></div>
                </Link>
                </div>

                <button className="menu-toggle" aria-controls="header-menu" aria-expanded="false" aria-label="Menu Toggle" onClick={handleHamburgerClick} ref={hamburgerRef}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                        <title>Menu Icon</title>
                        <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"></path>
                    </svg>
                </button>

                <nav className={`site-navigation${isActive ? ' active' : ''}`} ref={menuRef}>
                    <ul>
                        <li><NavLink onClick={handleLinkClick} to='/' end>Home</NavLink></li>
                        <li><NavLink onClick={handleLinkClick} to='/works'>Works</NavLink></li>
                        <li><NavLink onClick={handleLinkClick} to='/about'>About</NavLink></li>
                        <li><NavLink onClick={handleLinkClick} to='/contact'>Contact</NavLink></li>
                        
                    </ul>
                </nav>
            </header>
            <main id="main">
                <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/works/:slug' element={<Work />} />
                <Route path='/works' element={<Works />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                </Routes>
            </main>
            <footer>
                <p>&copy;2024 Daniela Melo</p>
            </footer>
        </div>
    )
}

export default App
