import { useState, useEffect } from 'react'
import { getPopular, getTrending } from '../api'
import Template from './Template/Template'

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
                <div className="home-container mb-4" 
                     style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://image.tmdb.org/t/p/original/${ selectPopular.backdrop }')`}}>
                    <div className="col-sm-10 mx-auto p-3 mt-5">
                        <h1 className="display-5">Popular on { type === 'movie' ? 'Movies' : 'TV'}</h1>
                        <h1 className="display-5">{ selectPopular.title }</h1>
                        <p className="col-md-8 p-0">{selectPopular.overview }</p>
                    </div>
                </div>
                <Template data={ popular } head='Popular' options={ type } setOptions={ setType } setSelectTrack={ setSelectTrack } />
                </> : null
            }

            { selectTrending ? 
                <>
                <div className="home-container mb-4" 
                      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://image.tmdb.org/t/p/original/${ selectTrending.backdrop }')`}}>
                    <div className="col-sm-10 mx-auto p-3 mt-5">
                        <h1 className="display-5">Trending { weekType === 'day' ? 'Today' : 'This Week' }</h1>
                        <h1 className="display-5">{ selectTrending.title }</h1>
                        <p className="col-md-8 p-0">{ selectTrending.overview }</p>
                    </div>
                </div>
                <Template data={ trending } head='Trending' options={ weekType } setOptions={ setWeekType } setSelectTrack={ setSelectTrack } />
                </> : null }
            </div>
}