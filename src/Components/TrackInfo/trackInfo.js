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
                <div className="header-container mb-4 row" 
                     style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://image.tmdb.org/t/p/original/${ selectTrack.backdrop }')`}}>
                    <div className="col-sm-10 mx-auto p-3 p-md-0">
                        <div className="d-flex pt-3 pl-3 pl-md-5">
                            <img className="d-none d-md-block shadow-sm border" src= { selectTrack.url } alt={ selectTrack.title } 
                                 style={{ width: '250px', height: '350px', borderRadius: '30px' }}  />
                            <div className="card-body d-flex flex-column">
                                <h1 className="display-5">{ selectTrack.title }</h1>
                                <p className="col col-md-10 pl-3">
                                    { selectTrack.overview } <br /><br />
                                    Released on { moment(selectTrack.released).format('MMM D, YYYY') } ({ moment(selectTrack.released).fromNow() }) 
                                    <br />
                                    Voted { selectTrack.vote }
                                </p>
                            </div>
                        </div>
                    </div>
                </div> : null }
                <div className="row">
                    <div className="col-md-6 ml-auto blog-main">
                        <div className="blog-post">
                            <h2 className="blog-post-title pb-3 mb-4 font-italic border-bottom">{ selectTrack.title }</h2>
                            <p>{ selectTrack.overview }</p>
                            <hr />
                        </div>
                        { reviews ? 
                        <div className="blog-post">
                            <h2 className="blog-post-title">Reviews</h2>
                            { reviews.map(item => {
                                let date, newDate
                                if (item.updated_at) {
                                    date = item.updated_at ? item.updated_at.split('T')[0] : null
                                    newDate = date.replace('/-/g', '')
                                } else newDate = ''

                                return  <div key={ item.id }>
                                            <p className="blog-post-meta">
                                                { `${moment(newDate).format('MMM D, YYYY')} - ${moment(newDate).fromNow()}` } By { item.author }
                                            </p>
                                            <p>{ item.content }</p>
                                            <hr />
                                        </div> })}
                        </div>
                        : null }
                        { recommend ?
                            <div className="blog-post">
                                <h2 className="blog-post-title">Similar</h2>
                                <div className="item-container d-flex overflow-auto pl-2 pl-md-4 py-4">
                                    { recommend.map(item => {
                                        const { id, title, backdrop } = item
                                        item.path = selectTrack.path
                                        return  <div className="item" key={ id } to={ '/track-info' } onClick={()=> { setSelectTrack(item) }}>
                                                    <img className="mb-1 rounded" 
                                                        style={{ width: '20rem' }}
                                                        src= { "https://image.tmdb.org/t/p/original" + backdrop } 
                                                        alt={ title } />
                                                    <div>{ title }</div>
                                                </div>
                                    }) }
                                </div>
                            </div> : null }

                        <nav className="blog-pagination">
                            <a className="btn btn-outline-primary" href="/">Older</a>
                            <a className="btn btn-outline-secondary" href="/">Newer</a>
                        </nav>

                    </div>

                    <aside className="col-md-3 mr-auto blog-sidebar">
                        <div className="p-3 mb-3 bg-dark rounded">
                            <h4 className="font-italic">About</h4>
                            <p className="mb-0">{ selectTrack.overview }</p>
                        </div>
                        { credits ? 
                        <div className="p-3">
                            <h4 className="font-italic">Casts</h4>
                            <ol className="list-unstyled mb-0">
                                { credits.map(actor => {
                                    return  <li key={ actor.id } className='d-flex mb-2'>
                                                <div style={{ width: '3rem', height: '' }}>
                                                    <img className="img-fluid" 
                                                        src= { "https://image.tmdb.org/t/p/w500" + actor.profile_path } alt={ actor.name } />
                                                </div>
                                                <p>{ actor.name }<br/>- { actor.character }</p>
                                            </li> })}
                            </ol>
                        </div> : null }
                    </aside>
                </div>
            </div>
}