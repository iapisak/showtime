import { useState, useEffect } from 'react'
import { getPopularMovie, getTrending } from './Components/api'
import Nav from './Components/Nav/nav'
import { withRouter } from 'react-router-dom'
import Routes from './Config/Routes'

function App() {
  
  const [ movies, setMovies ] = useState()
  const [ trending, setTrending ] = useState()
  const [ bgImage, setBgImage ] = useState() 
  
  useEffect(() => {
    getPopularMovie(setMovies)
    getTrending(setTrending)
  }, [])

  useEffect(()=> {
    if (!movies) return
    const random = Math.floor(Math.random() * movies.length)
    setBgImage({ movie: movies[random].url })
  }, [movies])

  return  <div className="d-flex flex-column text-light" style={{ backgroundColor: '#212529', height: '100vh'}}>
            <div>
              <div className="col-sm-10 mx-auto">
                <Nav />
              </div>
            </div>
            <main className='flex-grow-1' style={{ overflow: 'scroll' }} >
              <Routes data= {{ movies, trending, bgImage } } />
            </main>
            <footer className="mt-auto text-white-50 text-center">
                <p>Cover template for <a href="https://getbootstrap.com/" className="text-white">Bootstrap</a>, by <a href="https://twitter.com/mdo" className="text-white">@mdo</a>.</p>
            </footer>
          </div>
}

export default withRouter(App)
