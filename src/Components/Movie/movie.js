import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getMovies, loadMoreMovies, getSearchMovie } from '../api'
import moment from 'moment'
import Search from './search'

export default function Movie ({ loadMovie, setSelectTrack }) {
    const options = { 
        'Playing': 'now_playing',
        'Popular': 'popular',
        'Top Rated': 'top_rated',
        'Upcoming': 'upcoming'
    }
    const [ movies, setMovies ] = useState([])
    const [ selectMovie, setSelectMovie ] = useState()
    const [ selectOption, setSelectOption ] = useState(options['Playing'])
    const [ pages, setPages ] = useState(1)
    const [ load, setLoad ] = useState(false)
    const [ search, setSearch ] = useState('')
    const [ searchMovies, setSearchMovies ] = useState([])

    useEffect(()=> {
        if (!loadMovie) return
        window.history.pushState({}, null, '/')
        setMovies([])
        setPages(1)
        getMovies(setMovies, selectOption)
    }, [loadMovie, selectOption])
    
    useEffect(()=> {
        if (!load) return
        if (pages > 3) return
        loadMoreMovies(setMovies, selectOption, pages, movies)
        setLoad(false)
    }, [load, pages, movies, selectOption])

    useEffect(()=> {
        if (!search) return setSearchMovies([])
        getSearchMovie(search, setSearchMovies)
    }, [search])
    
    useEffect(()=> {
        if (!movies) return
        const random = Math.floor(Math.random() * movies.length)
        setSelectMovie(movies[random])
    }, [movies])
    
    return  <div id="movie">
            { selectMovie ? 
                <div className="home-container mb-4" 
                     style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://image.tmdb.org/t/p/original/${ selectMovie.backdrop }')`}}>
                    <div className="col-sm-8 mx-auto">
                        <div className="d-flex my-4 my-md-5 align-items-center">
                            <img className="d-none d-md-block shadow-sm p-4" src= { selectMovie.url } alt={ selectMovie.title } 
                                 style={{ width: '250px', height: '350px', border: '15px solid white' }}  />
                            <div className="card-body p-0 pl-md-4">
                                <h1 className="display-5 text-warning">{ Object.keys(options).find(key => options[key] === selectOption) } Movies</h1>
                                <h2 className="display-6">{ selectMovie.title }</h2>
                                <div>
                                    <p className="col col-md-10 p-0 text-secondary">{ selectMovie.overview }</p>
                                </div>
                                <p className="p-0 mt-2">Released on { moment(selectMovie.released).format('MMM D, YYYY') } - { moment(selectMovie.released).fromNow() } </p>
                                <div className="search-bar col col-md-10 p-0">
                                    <div className="search-group">
                                        <input className="search-input" value={ search } onChange={(e)=> setSearch(e.target.value)}
                                               placeholder="Search for movies"/>
                                    </div>
                                    <button className="search-button btn-primary disabled" onClick={()=> setSearch('')}>
                                        <i className="fa fa-times text-grey"aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : null }
                { search ? <Search searchMovies={ searchMovies } setSelectTrack={ setSelectTrack }/>
                         :
                <div className="col-sm-10 mx-auto p-3 p-md-0">
                    <div className="container-fluid d-md-flex p-0 justify-content-md-center">
                        <h2 className="display-5 mb-3 mb-md-0" >Movies</h2>
                        <div className="btn-group ml-md-4 btn-group-toggle" data-toggle="buttons">
                            { Object.keys(options).map((key, index)=> {
                                    return  <label key={key} className={ index === 0 ? "btn btn-primary shadow-none active" : "btn btn-primary shadow-none"}
                                                  onClick={()=> { if (options[key] === selectOption) return
                                                                setSelectOption(options[key]) }}>
                                                <input type="radio" name={key} id={key} autoComplete="off"/>{key}
                                            </label>
                            })}
                        </div>
                    </div>
                    <div className="poster-container py-4">
                        { movies.length ? 
                        <>
                        { movies.map(item => {
                            let { id, title, url, released } = item
                            item.path = 'movie'
                            return  <Link className="poster flex-shrink-0 pr-2 pb-md-3 " key={ id + '-movie' } to={ '/track-info' } 
                                        href="#trackinfo" onClick={()=> { setSelectTrack(item) }}>
                                        <img className="mb-1 img-fluid rounded" src= { url } alt={ title } />
                                        <div>{ title }</div>
                                        <div className="text-muted">{ moment(released).fromNow() }</div>
                                    </Link> }) 
                        }
                        { pages < 3 
                            ?   <div className="poster flex-shrink-0 ml-0 d-flex flex-column">
                                    <button className="btn px-4 btn-primary my-auto mx-auto" type="button" 
                                            style={{ borderRadius: '30px'}} 
                                            onClick={() => { setPages(pages+1); setLoad(!load) }}>+ More Movies</button>
                                </div>
                            : null 
                        }
                        </>
                            : null }
                    </div>
                </div>
                }
            </div>
}