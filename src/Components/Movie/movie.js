import { useState, useEffect } from 'react'
import { getMovies } from '../api'
import moment from 'moment'

export default function Movie ({ loadMovie }) {
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

    useEffect(()=> {
        if (!loadMovie) return
        const initial = { array: [], option: 'now_playing', page: '1'}
        getMovies(initial.array, setMovies, initial.option, initial.page)
        }, [loadMovie])
        
    useEffect(() => {
        if (!loadMovie) return
        const array = [...movies]
        getMovies(array, setMovies, selectOption, pages)
    }, [loadMovie, selectOption, pages])

    useEffect(()=> {
      if (!movies) return
      const random = Math.floor(Math.random() * movies.length)
      setSelectMovie(movies[random])
    }, [movies])

    return  <div className="tab-pane" id="movie">
            {   
                selectMovie ? 
                <div className="header-container mb-4 row" 
                     style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://image.tmdb.org/t/p/original/${ selectMovie.backdrop }')`}}>
                    <div className="col-sm-10 mx-auto p-3 p-md-0">
                        <div className="d-flex pt-3 pl-3 pl-md-5">
                            <img className="d-none d-md-block shadow-sm border" src= { "https://image.tmdb.org/t/p/w500" + selectMovie.url } alt={ selectMovie.title } 
                                 style={{ width: '250px', height: '350px', borderRadius: '30px' }}  />
                            <div className="card-body d-flex flex-column">
                                <h1 className="display-5">{ selectMovie.title }</h1>
                                <p className="col col-md-10 pl-3">
                                    {selectMovie.overview } <br /><br />
                                    Released on { moment(selectMovie.released.replace('/-/g', '')).format('MMM D, YYYY') } ({ moment(selectMovie.released.replace('/-/g', '')).fromNow() }) 
                                    <br />
                                    Voted { selectMovie.vote }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                : null
            }
            <div className="col-sm-10 mx-auto p-3 p-md-0">
                <div className="container-fluid d-md-flex p-0 justify-content-md-center">
                    <h2 className="display-5 mb-3 mb-md-0">Movies</h2>
                    <div className="btn-group ml-md-4" role="group" aria-label="Basic outlined example">
                        {
                            Object.keys(options).map(key=> (
                                <button key={key} type="button" className="btn btn-dark" onClick={()=> {
                                    if (options[key] === selectOption) return
                                    setMovies([])
                                    setPages(1)
                                    setSelectOption(options[key])
                                }}>{ key }</button>
                            ))
                        }
                    </div>
                </div>
                <div className="poster-container py-4">
                    { movies.length ? movies.map(item => {
                        const { id, title, url, released } = item
                        const date = released.replace('/-/g', '')
                        return  <div className="poster flex-shrink-0 mr-3 mb-md-3 " key={ id + '-movie' }>
                                    <img className="mb-1 img-fluid rounded" src= { "https://image.tmdb.org/t/p/w200" + url } alt={ title } />
                                    <div>{ title }</div>
                                    <div className="text-muted">{ moment(date).fromNow() }</div>
                                </div>
                    }) : null }
                    { pages <= 3 
                        ? 
                        <div className="poster flex-shrink-0 mr-3 mb-md-3 row ml-0">
                            <button className="btn px-4 btn-primary my-auto" type="button" 
                                    style={{ borderRadius: '30px'}}
                                    onClick={() => setPages(pages+1) }>+ More Movies</button>
                        </div>
                        : null
                    }
                </div>
            </div>
            </div>
}