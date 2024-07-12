import { Route, Routes, Link, NavLink } from 'react-router-dom'
import Home from './templates/Home'
import About from './templates/About'
import Contact from './templates/Contact'
import Works from './templates/Works'
import Work from './templates/Work'
import daniLogo from './assets/daniLogo.svg'
import './styles/scss/styles.scss'

function App() {
  return (
    <>
    <div className="wrapper">
        <header id="masthead" className="site-header">
            <div className="site-branding">
            <Link to="/">
                <div><  img className="logo" src={daniLogo}  alt="Dani Melop Logo" /></div>
            </Link>
            </div>
            <nav className="site-navigation">
            <ul>
                <li><NavLink to='/' end>Home</NavLink></li>
                <li><NavLink to='/about'>About</NavLink></li>
                <li><NavLink to='/contact'>Contact</NavLink></li>
                <li><NavLink to='/works'>Works</NavLink></li>
            </ul>
            </nav>
        </header>
        <main id="main">
            <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/works/:slug' element={<Work />} />
            <Route path='/works' element={<Works />} />
            <Route path='/contact' element={<Contact />} />
            </Routes>
        </main>
        <footer>
            <p>&copy;2024 Daniela Melo</p>
        </footer>
        </div>
    </>
  )
}

export default App
