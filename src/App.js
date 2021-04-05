// import './App.css';

import { useState, useEffect } from 'react'
import { getPopularMovie } from './Components/api'

import Landing from './Components/Template/Template'
import Nav from './Components/Nav/nav'

export default function App() {
  
  const [ movies, setMovies ] = useState()
  
  useEffect(() => {
    getPopularMovie(setMovies)
  }, [])

  return  <div className="d-flex flex-column text-light" style={{ backgroundColor: '#212529', height: '100vh'}}>
            <Nav />
            <main className='flex-grow-1' style={{ overflow: 'scroll' }} >
              <Landing data={ movies } />
            </main>
            <footer className="mt-auto text-white-50 text-center">
                <p>Cover template for <a href="https://getbootstrap.com/" className="text-white">Bootstrap</a>, by <a href="https://twitter.com/mdo" className="text-white">@mdo</a>.</p>
            </footer>
          </div>
}
