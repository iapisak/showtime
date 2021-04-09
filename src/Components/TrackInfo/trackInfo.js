import { useState, useEffect } from 'react'
import { getReviews, getCredits, getRecommend } from '../api'
import moment from 'moment'

export default function TrackInfo ({ selectTrack, setSelectTrack }) {
    const [ reviews, setReviews ] = useState()
    const [ credits, setCredits ] = useState()
    const [ recommend, setRecommend ] = useState()
    
    useEffect(()=> {
        if (!selectTrack) return
        window.history.pushState({}, null, '/')
        getReviews(selectTrack.id, selectTrack.path, setReviews)
        getCredits(selectTrack.id, selectTrack.path, setCredits)
        getRecommend(selectTrack.id, selectTrack.path, setRecommend)
    }, [ selectTrack ])

    return  <div id="trackinfo">
                { selectTrack ?
                <div className="home-container mb-4" 
                     style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://image.tmdb.org/t/p/original/${ selectTrack.backdrop }')`}}>
                    <div className="col-sm-10 mx-auto p-3">
                        <div className="d-flex mt-md-3">
                            <img className="d-none d-md-block shadow-sm border" src= { selectTrack.url } alt={ selectTrack.title } 
                                 style={{ width: '250px', height: '350px', borderRadius: '30px' }}  />
                            <div className="card-body p-0 pl-md-4">
                                <h1 className="display-5">{ selectTrack.title }</h1>
                                <div className="text-container">
                                    <p className="col col-md-10 p-0">{ selectTrack.overview }</p>
                                </div>
                                <p className="p-0 mt-2">Released on { moment(selectTrack.released).format('MMM D, YYYY') } - { moment(selectTrack.released).fromNow() } 
                                   <br />Voted { selectTrack.vote }</p>
                            </div>
                        </div>
                    </div>
                </div> : null }
                <div className="row p-3">
                    <div className="col-md-6 ml-auto blog-main pr-md-3">
                        <div className="blog-post">
                            <h2 className="blog-post-title pb-3 mb-4 font-italic border-bottom">{ selectTrack.title }</h2>
                            <p>{ selectTrack.overview }</p>
                            <hr />
                        </div>
                        <div className="blog-post">
                            <h2 className="blog-post-title">Reviews</h2>
                            { reviews ? reviews.map(item => {
                                let date = item.updated_at ? item.updated_at.split('T')[0] : null
                                return  <div key={ item.id }>
                                            <p className="blog-post-meta">On { `${moment(date).format('MMM D, YYYY')} - ${moment(date).fromNow()}` } By { item.author }</p>
                                            <p>{ item.content }</p><hr />
                                        </div> })
                            : null }
                        </div>
                        <div className="blog-post">
                            <h2 className="blog-post-title m-0">Similar</h2>
                            <div className="item-container d-flex overflow-auto pl-2 pl-md-4 py-4">
                                { recommend ? recommend.map(item => {
                                    const { id, title, backdrop } = item
                                    item.path = selectTrack.path
                                    return  <div className="item" key={ id } to={ '/track-info' } onClick={()=> { setSelectTrack(item) }}>
                                                <img className="mb-1 rounded" 
                                                    style={{ width: '20rem' }}
                                                    src= { "https://image.tmdb.org/t/p/original" + backdrop } 
                                                    alt={ title } />
                                                <div>{ title }</div>
                                            </div> }) 
                                : null }
                            </div>
                        </div> 
                    </div>

                    <aside className="col-md-3 mr-auto blog-sidebar">
                        { credits ? 
                        <div className="p-3 mb-3 bg-dark rounded">
                            <h2 className="font-italic mb-3">Casts</h2>
                            <div className="" style={{ height: '700px', overflowY: 'auto' }}>

                            
                            <ol className="list-unstyled mb-0">
                                { credits.map(actor => {
                                    const noImage = 'https://www.exstrompt.com/wp-content/uploads/2015/07/placeholder-user.jpg'
                                    const image = actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : noImage
                                    return  <li key={ actor.id } className='d-flex mb-2' >
                                        <div style={{ width: '3rem' }}>

                                            <img className="img-fluid"
                                                     src= { image } alt={ actor.name } />
                                        </div>
                                                <p className="pl-3">{ actor.name }<br/>{ actor.character }</p>
                                            </li> })}
                            </ol>
                            </div>
                        </div> 
                        : null }
                    </aside>
                </div>
            </div>
}