import { useState, useEffect } from 'react'
import { getPopular, getTrending } from '../api'
import { Link } from 'react-router-dom'
import Template from './Template/Template'
import moment from 'moment'

export default function Home ({ setSelectTrack }) {
    const [ popular, setPopular ] = useState()
    const [ type, setType ] = useState('movie')
    const [ trending, setTrending ] = useState()
    const [ weekType, setWeekType ] = useState('day')
    const [ selectPopular, setSelectPopular ] = useState() 
    const [ selectTrending, setSelectTrending ] = useState()
    
    useEffect(() => {
      getPopular(setPopular, type)
    }, [type])

    useEffect(() => {
      getTrending(setTrending, weekType)
    }, [weekType])
  
    useEffect(()=> {
      if (!popular) return
      const random = Math.floor(Math.random() * popular.length)
      setSelectPopular(popular[random])
    }, [popular])

    useEffect(()=> {
        if (!trending) return
        const random = Math.floor(Math.random() * trending.length)
        setSelectTrending(trending[random])
      }, [trending])

    return  <div id="home">
            { selectPopular ?
                <>
                <div className="home-container mb-4 overflow-auto" 
                     style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://image.tmdb.org/t/p/original/${ selectPopular.backdrop }')`}}>
                    <div className="col-sm-8 mx-auto">
                      <div className="d-flex my-4 my-md-4 align-items-center">
                          <img className="d-none d-md-block shadow-sm p-4" src= { selectPopular.url } alt={ selectPopular.backdrop } 
                                style={{ width: '300px', height: '400px', border: '20px solid #ffc107' }}  />
                          <div className="card-body p-0 pl-md-4">
                            <h1 className="display-5">Popular on { type === 'movie' ? 'Movies' : 'TV Shows'}</h1>
                            <h2 className="display-6 text-warning">{ selectPopular.title }</h2>
                            <div>
                              <p className="p-0" >{selectPopular.overview }</p>
                            </div>
                            <p className="p-0 mt-2">Released on { moment(selectPopular.released).format('MMM D, YYYY') } - { moment(selectPopular.released).fromNow() } </p>
                            <Link className="btn btn-lg btn-danger" style={{ borderRadius: '30px' }} to={ '/track-info' }
                                    onClick={()=> { setSelectTrack(selectPopular) }}>View this { type === 'movie' ? 'Movie' : 'TV Show'}</Link>
                          </div>
                      </div>
                    </div>
                </div>
                <Template data={ popular } head='Popular' options={ type } setOptions={ setType } setSelectTrack={ setSelectTrack } />
                </> : null
            }

            { selectTrending ? 
                <>
                <div className="home-container mb-4" 
                      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://image.tmdb.org/t/p/original/${ selectTrending.backdrop }')`}}>
                    <div className="col-sm-8 mx-auto">
                      <div className="d-flex my-4 my-md-5 align-items-center">
                          <img className="d-none d-md-block shadow-sm p-4" src= { selectTrending.url } alt={ selectTrending.backdrop } 
                                style={{ width: '300px', height: '400px', border: '15px solid #28a745' }}  />
                          <div className="card-body p-0 pl-md-4">
                            <h1 className="display-5">Trending { weekType === 'day' ? 'Today' : 'This Week' }</h1>
                            <h2 className="display-6 text-warning">{ selectTrending.title }</h2>
                            <div>
                              <p className="p-0" >{selectTrending.overview }</p>
                            </div>
                            <p className="p-0 mt-2">Released on { moment(selectTrending.released).format('MMM D, YYYY') } - { moment(selectTrending.released).fromNow() } </p>
                            <Link className="btn btn-lg btn-danger" style={{ borderRadius: '30px' }} to={ '/track-info' }
                                    onClick={()=> { setSelectTrack(selectTrending) }}>View this show</Link>
                          </div>
                      </div>
                    </div>
                </div>
                <Template data={ trending } head='Trending' options={ weekType } setOptions={ setWeekType } setSelectTrack={ setSelectTrack } />
                </> : null }
            </div>
}