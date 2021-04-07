import { useState, useEffect } from 'react'
import { getPopular, getTrending } from '../api'
import Template from './Template/Template'

import './home.css'

export default function Home () {
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

    return  <div className="tab-pane active" id="home">
            {
                selectPopular ?
                <>
                <div className="home-container p-5 mb-4" 
                     style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://image.tmdb.org/t/p/original/${ selectPopular.backdrop }')`}}>
                    <div className="col-sm-10 mx-auto py-5">
                        <h1 className="display-5">Popular on { type === 'movie' ? 'Movies' : 'TV'}</h1>
                        <h1 className="display-5">{ selectPopular.title }</h1>
                        <p className="col-md-8 fs-4">{selectPopular.overview }</p>
                    </div>
                </div>
                <Template data={ popular } head='Popular' type={ type } setType={ setType } />
                </> : null
            }

            { selectTrending ? 
                <>
                    <div className="home-container p-5 mb-4" 
                         style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://image.tmdb.org/t/p/original/${ selectTrending.backdrop }')`}}>
                        <div className="col-sm-10 mx-auto py-5">
                            <h1 className="display-5">Trending { weekType === 'day' ? 'Today' : 'This Week' }</h1>
                            <h1 className="display-5">{ selectTrending.title }</h1>
                            <p className="col-md-8 fs-4">{ selectTrending.overview }</p>
                        </div>
                    </div>
                    <Template data={ trending } head='Trending' type={ weekType } setType={ setWeekType } />
                </> : null }
            </div>
}