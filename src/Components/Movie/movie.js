import { useState, useEffect } from 'react'
import { getMovies } from '../api'
import moment from 'moment'

export default function Home () {
    const options = { 
        'Playing': 'now_playing',
        'Popular': 'popular',
        'Top Rated': 'top_rated',
        'upcoming': 'upcoming'
    }
    const [ movies, setMovies ] = useState([])
    const [ selectMovie, setSelectMovie ] = useState()
    const [ selectOption, setSelectOption ] = useState(options.Playing)
    const [ pages, setPages ] = useState(1)
    
    useEffect(() => {
        if (pages > 5) return
        const array = [...movies]
        getMovies(array, setMovies, selectOption, pages)
    }, [selectOption, pages])

    useEffect(()=> {
      if (!movies) return
      const random = Math.floor(Math.random() * movies.length)
      setSelectMovie(movies[random])
    }, [movies])

    return  <>
            {
                selectMovie ? 
                <div className="home-container p-5 mb-4" 
                        style={{ position: 'relative', backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://image.tmdb.org/t/p/original/${ selectMovie.backdrop }')`}}>
                    <div className="col-sm-10 mx-auto py-5">
                        <h1 className="display-5">{ selectMovie.title }</h1>
                        <p className="col-md-8 fs-4">{selectMovie.overview }</p>
                        <button className="btn btn-primary btn-lg" type="button">Example button</button>
                    </div>
                </div>
                : null
            }
            <div className="col-sm-10 mx-auto">
                <div className="container-fluid d-flex p-0 pl-4">
                    <h2 className="display-5">Movies</h2>
                    <div className="btn-group ml-4" role="group" aria-label="Basic outlined example">
                        {
                            Object.keys(options).map(key=> (
                                <button key={key} type="button" className="btn btn-dark" onClick={()=> {
                                    if (options[key] === selectOption) return
                                    setPages(1)
                                    setMovies([])
                                    setSelectOption(options[key])
                                }}>{ key }</button>
                            ))
                        }
                    </div>
                </div>
                <div className="d-flex flex-wrap pl-4 py-4">
                    { movies ? movies.map(item => {
                        const { id, title, url, released } = item
                        const date = released.replace('/-/g', '')
                        return  <div className="mr-3" key={ id } style={{ width: '200px' }}>
                                    <img className="mb-1" 
                                        src= { "https://image.tmdb.org/t/p/w200" + url } 
                                        alt={ title } />
                                    <div>{ title }</div>
                                    <div className="text-muted">{ moment(date).fromNow() }</div>
                                </div>
                    }) : null }
                    <button className="btn btn-primary btn-lg" type="button"
                            onClick={() => setPages(pages+1) }> Load More</button>
                </div>
            </div>
            </>
}