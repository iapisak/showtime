import { useState, useEffect } from 'react'
import { getTvs } from '../api'
import moment from 'moment'

export default function TV ({ loadTv }) {
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
    
    useEffect(()=> {
        if (!loadTv) return
        const initial = { array: [], option: 'airing_today', page: '1'}
        getTvs(initial.array, setTvs, initial.option, initial.page)
        }, [loadTv])
        
    useEffect(() => {
        if (!loadTv) return
        const array = [...tvs]
        getTvs(array, setTvs, selectOption, pages)
    }, [loadTv, selectOption, pages])

    useEffect(()=> {
      if (!tvs) return
      const random = Math.floor(Math.random() * tvs.length)
      setSelectTvs(tvs[random])
    }, [tvs])

    return  <div className="tab-pane" id="tv">
            {   
                selectTvs ? 
                <div className="header-container mb-4 row" 
                     style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://image.tmdb.org/t/p/original/${ selectTvs.backdrop }')`}}>
                    <div className="col-sm-10 mx-auto p-3 p-md-0">
                        <div className="d-flex pt-3 pl-3 pl-md-5">
                            <img className="d-none d-md-block shadow-sm border" src= { "https://image.tmdb.org/t/p/w500" + selectTvs.url } alt={ selectTvs.title } 
                                 style={{ width: '250px', height: '350px', borderRadius: '30px' }}  />
                            <div className="card-body d-flex flex-column">
                                <h1 className="display-5">{ selectTvs.title }</h1>
                                <p className="col col-md-10 pl-3">
                                    {selectTvs.overview } <br /><br />
                                    Released on { moment(selectTvs.released.replace('/-/g', '')).format('MMM D, YYYY') } ({ moment(selectTvs.released.replace('/-/g', '')).fromNow() }) 
                                    <br />
                                    Voted { selectTvs.vote }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                : null
            }
            <div className="col-sm-10 mx-auto p-3 p-md-0">
                <div className="container-fluid d-md-flex p-0 justify-content-md-center">
                    <h2 className="display-5 mb-3 mb-md-0">TV Shows</h2>
                    <div className="btn-group ml-md-4" role="group" aria-label="Basic outlined example">
                        {
                            Object.keys(options).map(key=> (
                                <button key={key} type="button" className="btn btn-dark" onClick={()=> {
                                    if (options[key] === selectOption) return
                                    setTvs([])
                                    setPages(1)
                                    setSelectOption(options[key])
                                }}>{ key }</button>
                            ))
                        }
                    </div>
                </div>
                <div className="poster-container py-4">
                    { tvs.length ? tvs.map(item => {
                        const { id, title, url, released } = item
                        const date = released.replace('/-/g', '')
                        return  <div className="poster flex-shrink-0 mr-3 mb-md-3 " key={ id + '-tv' }>
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
                                    onClick={() => setPages(pages+1) }>+ More TVs</button>
                        </div>
                        : null
                    }
                </div>
            </div>
            </div>
}