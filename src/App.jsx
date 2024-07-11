import { Route, Routes, Link, NavLink } from 'react-router-dom'
import Home from './templates/Home'
import About from './templates/About'
import Posts from './templates/Posts'
import Post from './templates/Post'
import Services from './templates/Services'
import Contact from './templates/Contact'
import Works from './templates/Works'

function App() {

  return (
    <>
      <header id="masthead" className="site-header">
        <div className="site-branding">
        </div>
        <nav className="site-navigation">
          <ul>
            <li><NavLink to='/' end>Home</NavLink></li>
            <li><NavLink to='/blog'>Blog</NavLink></li>
            <li><NavLink to='/about'>About</NavLink></li>
            <li><NavLink to='/contact'>Contact</NavLink></li>
            <li><NavLink to='/services'>Services</NavLink></li>
            <li><NavLink to='/works'>Works</NavLink></li>
          </ul>
        </nav>
      </header>
      <main id="main">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/blog' element={<Posts />} />
          <Route path='/blog/:slug' element={<Post />} />
          <Route path='/services' element={<Services />} />
          <Route path='/works' element={<Works />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </main>
      <footer>
        <p>&copy; Daniela Melo</p>
      </footer>
    </>
  )
}

export default App
