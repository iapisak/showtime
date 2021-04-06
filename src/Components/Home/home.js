import { useState, useEffect } from 'react'
import { getPopular, getTrending } from '../api'
import Template from './Template/Template'

import './home.css'

export default function Home () {
    const [ popular, setPopular ] = useState()
    const [ type, setType ] = useState('movie')
    const [ trending, setTrending ] = useState()
    const [ selectPopular, setSelectPopular ] = useState() 
    const [ selectTrending, setSelectTrending ] = useState()
    
    useEffect(() => {
      getPopular(setPopular, type)
    }, [type])

    useEffect(() => {
        getTrending(setTrending)
      }, [])
  
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

    return  <>

            <div className="home-container p-5 mb-4" 
                 style={ selectPopular ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://image.tmdb.org/t/p/original/${ selectPopular.backdrop }')`} : null }>
                <div className="col-sm-10 mx-auto py-5">
                    <h1 className="display-5 fw-bold">{ selectPopular.title }</h1>
                    <p className="col-md-8 fs-4">{selectPopular.overview }</p>
                    <button className="btn btn-primary btn-lg" type="button">Example button</button>
                </div>
            </div>
            <Template data={ popular } head='Popular' type={ type } setType={ setType } />
            { selectTrending ? 
                <>
                    <div className="home-container p-5 mb-4 rounded-3" 
                            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://image.tmdb.org/t/p/original/${ selectTrending.backdrop }')`}}>
                            <div className="col-sm-10 mx-auto py-5">
                            <h1 className="display-5 fw-bold">{ selectTrending.title }</h1>
                            <p className="col-md-8 fs-4">{ selectTrending.overview }</p>
                            <button className="btn btn-primary btn-lg" type="button">Detail</button>
                        </div>
                    </div>
                    <Template data={ trending } head='Trending' />
                </> : null }
            </>
}