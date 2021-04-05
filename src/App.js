// import './App.css';

import { useState, useEffect } from 'react'
import axios from 'axios'

import Landing from './Components/landing'
import Nav from './Components/Nav/nav'

export default function App() {
  const [ movie, setMovie ] = useState([])

  useEffect(()=> {
    if (movie.length) return
    const getMovie = async ()=> {
      const url = process.env.REACT_APP_API_URL
      const key = process.env.REACT_APP_API_KEY
      console.log(url, key)
      const movies = await axios.get(`${ url }/movie/popular?api_key=${ key }&language=en-US&page=1`).then(data => data)
      return movies
    }

    setMovie([getMovie()])
    console.log(movie)

  }, [ movie ])

  return  <div className="d-flex flex-column text-light" style={{ backgroundColor: '#212529', height: '100vh'}}>
            <Nav />
            <main className='flex-grow-1' style={{ overflow: 'scroll', height: ''}} >
              <Landing />
            </main>
            <footer className="mt-auto text-white-50 text-center">
                <p>Cover template for <a href="https://getbootstrap.com/" className="text-white">Bootstrap</a>, by <a href="https://twitter.com/mdo" className="text-white">@mdo</a>.</p>
            </footer>
          </div>
}
