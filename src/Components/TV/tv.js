import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getTvs, loadMoreTvs, getSearchTv } from '../api'
import moment from 'moment'
import Search from './search'

export default function TV ({ loadTv, setSelectTrack }) {
    const options = { 
        'On Air Today': 'airing_today',
        'On Air': 'on_the_air',
        'Popular': 'popular',
        'Top Rated': 'top_rated'
    }
    const [ tvs, setTvs ] = useState([])
    const [ selectTvs, setSelectTvs ] = useState()
    const [ selectOption, setSelectOption ] = useState(options['On Air Today'])
    const [ pages, setPages ] = useState(1)
    const [ load, setLoad ] = useState(false)
    const [ search, setSearch ] = useState('')
    const [ searchTvs, setSearchTvs ] = useState([])
    
    useEffect(()=> {
        if (!loadTv) return
        window.history.pushState({}, null, '/')
        setTvs([])
        setPages(1)
        getTvs(setTvs, selectOption)
    }, [loadTv, selectOption])
    
    useEffect(()=> {
        if (!load) return
        if (pages > 3) return
        loadMoreTvs(setTvs, selectOption, pages, tvs)
        setLoad(false)
    }, [load, pages, tvs, selectOption])

    useEffect(()=> {
        if (!search) return setSearchTvs([])
        getSearchTv(search, setSearchTvs)
    }, [search])

    useEffect(()=> {
      if (!tvs) return
      const random = Math.floor(Math.random() * tvs.length)
      setSelectTvs(tvs[random])
    }, [tvs])

    return  <div id="tv">
            { selectTvs ? 
                <div className="home-container mb-4" 
                        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://image.tmdb.org/t/p/original/${ selectTvs.backdrop }')`}}>
                    <div className="col-sm-10 mx-auto p-3">
                        <div className="d-flex mt-md-3">
                            <img className="d-none d-md-block shadow-sm border" src= { selectTvs.url } alt={ selectTvs.title } 
                                    style={{ width: '250px', height: '350px', borderRadius: '30px' }}  />
                            <div className="card-body p-0 pl-md-4">
                                <h1 className="display-6 font-weight-bold m-0">{ Object.keys(options).find(key => options[key] === selectOption) } Tvs</h1>
                                <h1 className="display-5">{ selectTvs.title }</h1>
                                <div className="text-container">
                                    <p className="col col-md-10 p-0">{ selectTvs.overview }</p>
                                </div>
                                <p className="p-0 mt-2">Released on { moment(selectTvs.released).format('MMM D, YYYY') } - { moment(selectTvs.released).fromNow() } 
                                   <br />Voted { selectTvs.vote }</p>
                                <div className="search-bar col col-md-8 p-0">
                                    <div className="search-group">
                                        <input className="search-input" value={ search } onChange={(e)=> setSearch(e.target.value)}
                                                placeholder="Search for Tv Shows"/>
                                    </div>
                                    <button className="search-button btn-primary disabled" onClick={()=> setSearch('')}>
                                        <i className="fa fa-times text-grey"aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : null}
                { search ? <Search searchTvs={ searchTvs } setSelectTrack={ setSelectTrack }/>
                         :
                <div className="col-sm-10 mx-auto p-3 p-md-0">
                    <div className="container-fluid d-md-flex p-0 justify-content-md-center">
                        <h2 className="display-5 mb-3 mb-md-0">TV Shows</h2>
                        <div className="btn-group ml-md-4 btn-group-toggle" data-toggle="buttons">
                            { Object.keys(options).map((key, index)=> {
                                    return  <label key={key} className={ index === 0 ? "btn btn-dark shadow-none active" : "btn btn-dark shadow-none" }
                                                  onClick={()=> { if (options[key] === selectOption) return
                                                                setSelectOption(options[key]) }}>
                                                <input type="radio" name={key} id={key} autoComplete="off"/>{key}
                                            </label>
                            })}
                        </div>
                    </div>
                    <div className="poster-container py-4">
                        { tvs.length ? 
                        <>
                        { tvs.map(item => {
                            let { id, title, url, released } = item
                            item.path = 'tv'
                            return  <Link className="poster flex-shrink-0 pr-3 pb-md-3 " key={ id + '-tv' } to={ '/track-info' } 
                                        onClick={()=> { setSelectTrack(item) }}>
                                        <img className="mb-1 img-fluid rounded" src= { url } alt={ title } />
                                        <div>{ title }</div>
                                        <div className="text-muted">{ moment(released).fromNow() }</div>
                                    </Link> })
                        }
                        { pages < 3 ? 
                            <div className="poster flex-shrink-0 ml-0 d-flex flex-column">
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