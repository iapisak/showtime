import { useState, useEffect } from 'react'
import { getPopular } from '../api'

export default function Home () {
    const [ movies, setMovies ] = useState()
    const [ bgImage, setBgImage ] = useState() 
    
    useEffect(() => {
      getPopular(setMovies)
    }, [])
  
    useEffect(()=> {
      if (!movies) return
      const random = Math.floor(Math.random() * movies.length)
      setBgImage({ movie: movies[random].url })
    }, [movies])

    return  <>
            <div className="p-5 mb-4 bg-light">
                <div className="col-sm-10 mx-auto py-5">
                    <h1 className="display-5 fw-bold">Custom jumbotron</h1>
                    <p className="col-md-8 fs-4">Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your liking.</p>
                    <button className="btn btn-primary btn-lg" type="button">Example button</button>
                </div>
            </div>
            <div className="col-sm-10 mx-auto">
                <div className="container-fluid d-flex pl-4">
                    <h2 className="display-5">Movies</h2>
                    {/* <h2 className="ml-auto">Hi</h2>                   */}
                </div>
                <div className="d-flex flex-wrap pl-4 py-4">
                    { movies ? movies.map(item => {
                        const { id, title, url, released } = item
                        return  <div className="mr-3" key={ id } style={{ width: '200px' }}>
                                    <img className="" 
                                        src= { "https://image.tmdb.org/t/p/w200" + url } 
                                        alt={ title } />
                                    <div>{ title }</div>
                                    <div>{ released }</div>
                                </div>
                    }) : null }
                </div>
            </div>
            </>
}