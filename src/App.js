import { useState } from 'react'
import Nav from './Components/Nav/nav'
import Home from './Components/Home/home'
import Movie from './Components/Movie/movie'

import './App.css'

export default function App() {
  const [ loadMovie, setLoadMovie ] = useState(false)

  return  <div className="d-flex flex-column text-light" style={{ backgroundColor: '#212529', height: '100vh'}}>
            <div>
              <div className="col-sm-10 mx-auto">
                <Nav setLoadMovie={ setLoadMovie } />
              </div>
            </div>
            <main className='flex-grow-1' style={{ overflow: 'scroll' }} >
              <div className="tab-content">
                <Home />
                <Movie loadMovie={ loadMovie }/>
                <div className="tab-pane" id="tv">TV</div>
              </div>
            </main>
            <footer className="mt-auto text-white-50 text-center">
                <p>Cover template for <a href="https://getbootstrap.com/" className="text-white">Bootstrap</a>, by <a href="https://twitter.com/mdo" className="text-white">@mdo</a>.</p>
            </footer>
          </div>
}
