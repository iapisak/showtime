import { useState, useEffect } from 'react'
import { getReviews } from '../api'
import moment from 'moment'

export default function TrackInfo ({ selectTrack }) {
    const [ reviews, setReviews ] = useState()
    console.log(selectTrack)

    useEffect(()=> {
        if (!selectTrack) return
        getReviews(selectTrack.id, setReviews)
        console.log(reviews)
    }, [selectTrack ])

    return  <div className="tab-pane" id="trackinfo">
        { selectTrack ? 
        
                <div className="header-container mb-4 row" 
                     style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://image.tmdb.org/t/p/original/${ selectTrack.backdrop }')`}}>
                    <div className="col-sm-10 mx-auto p-3 p-md-0">
                        <div className="d-flex pt-3 pl-3 pl-md-5">
                            <img className="d-none d-md-block shadow-sm border" src= { "https://image.tmdb.org/t/p/w500" + selectTrack.url } alt={ selectTrack.title } 
                                 style={{ width: '250px', height: '350px', borderRadius: '30px' }}  />
                            <div className="card-body d-flex flex-column">
                                <h1 className="display-5">{ selectTrack.title }</h1>
                                <p className="col col-md-10 pl-3">
                                    {selectTrack.overview } <br /><br />
                                    Released on { moment(selectTrack.released.replace('/-/g', '')).format('MMM D, YYYY') } ({ moment(selectTrack.released.replace('/-/g', '')).fromNow() }) 
                                    <br />
                                    Voted { selectTrack.vote }
                                </p>
                            </div>
                        </div>
                    </div>
                </div> : null }
            </div>
}