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
        const loading = async () => {
            const initial = { option: 'now_playing', page: '1'}
            const getData = await getMovies(initial.option, initial.page)
            setMovies(getData)
        }
        loading()
    }, [loadMovie])
    
    useEffect(()=> {
        if (pages === 1) return
        const loadMore = async () => {
            const getData = await getMovies(selectOption, pages)
            const newArray = [...movies]
            setMovies([...newArray, ...getData])
        }
        loadMore()
    }, [pages])

    useEffect(()=> {
      if (!movies) return
      const random = Math.floor(Math.random() * movies.length)
      setSelectMovie(movies[random])
    }, [movies])

    return  <div className="tab-pane" id="movie">
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
                                    setMovies([])
                                    setPages(1)
                                    setSelectOption(options[key])
                                    const reloading = async () => {
                                        const getData = await getMovies(selectOption, pages)
                                        setMovies(getData)
                                    }
                                    reloading()
                                    return
                                }}>{ key }</button>
                            ))
                        }
                    </div>
                </div>
                <div className="d-flex flex-wrap pl-4 py-4">
                    { movies.length ? movies.map(item => {
                        const { id, title, url, released } = item
                        const date = released.replace('/-/g', '')
                        return  <div className="mr-3" key={ id + '-movie' } style={{ width: '200px' }}>
                                    <img className="mb-1" 
                                        src= { "https://image.tmdb.org/t/p/w200" + url } 
                                        alt={ title } />
                                    <div>{ title }</div>
                                    <div className="text-muted">{ moment(date).fromNow() }</div>
                                </div>
                    }) : null }
                    <button className="btn btn-primary btn-lg" type="button"
                            onClick={() => {
                                if (pages >= 4) return
                                setPages(pages+1)
                            }}> Load More</button>
                </div>
            </div>
            </div>
}