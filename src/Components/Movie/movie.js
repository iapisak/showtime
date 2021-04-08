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
        'upcoming': 'upcoming'
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
                                <input type='search' value={ search } onChange={(e)=> setSearch(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                </div>
                : null }
                <div className="col-sm-10 mx-auto p-3 p-md-0">
                    <div className="container-fluid d-md-flex p-0 justify-content-md-center">
                        <h2 className="display-5 mb-3 mb-md-0">Movies</h2>
                        <div className="btn-group ml-md-4" role="group" aria-label="Basic outlined example">
                            { Object.keys(options).map(key=> (
                                    <button key={key} type="button" className="btn btn-dark" onClick={()=> {
                                        if (options[key] === selectOption) return
                                        setSelectOption(options[key]) }}>{ key }</button> )) }
                        </div>
                    </div>
                    { search ? <Search searchMovies={ searchMovies } setSelectTrack={ setSelectTrack }/>
                        :
                        <div className="poster-container py-4">
                            { movies.length ? movies.map(item => {
                                const { id, title, url, released } = item
                                item.path = 'movie'
                                const date = released.replace('/-/g', '')
                                return  <Link className="poster flex-shrink-0 mr-3 mb-md-3 " key={ id + '-movie' } to={ '/track-info' } 
                                            onClick={()=> { setSelectTrack(item) }}>
                                            <img className="mb-1 img-fluid rounded" src= { "https://image.tmdb.org/t/p/w200" + url } alt={ title } />
                                            <div>{ title }</div>
                                            <div className="text-muted">{ moment(date).fromNow() }</div>
                                        </Link>
                            }) : null }
                            { pages < 3 ? 
                                    <div className="poster flex-shrink-0 mr-3 mb-md-3 row ml-0">
                                        <button className="btn px-4 btn-primary my-auto" type="button" 
                                                style={{ borderRadius: '30px'}}
                                                onClick={() => { setPages(pages+1); setLoad(!load) }}>+ More Movies</button>
                                    </div>
                                : null } 
                        </div>
                    }
                </div>
            </div>
}