import { useState, useEffect } from 'react'
import { getReviews, getCredits, getRecommend } from '../api'
import { Link } from 'react-router-dom'
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
                    <div className="col-md-8 mx-auto">
                        <div className="d-flex my-4 my-md-5 align-items-center">
                            <img className="d-none d-md-block shadow-sm p-4" src= { selectTrack.url } alt={ selectTrack.title } 
                                 style={{ width: '250px', height: '350px', border: '15px solid white' }}  />
                            <div className="card-body p-0 pl-md-4">
                                <h1 className="display-5 m-0 text-warning">{ selectTrack.title }</h1>
                                <div>
                                    <p className="col col-md-10 p-0 text-secondary">{ selectTrack.overview }</p>
                                </div>
                                <p className="p-0 mt-2">Released on { moment(selectTrack.released).format('MMM D, YYYY') } - { moment(selectTrack.released).fromNow() } 
                                   <br />Voted { selectTrack.vote }</p>
                            </div>
                        </div>
                    </div>
                </div> : null }
                <div className="row m-0">
                    <div className="col-md-6 ml-auto blog-main">
                        <div className="blog-post">
                            <h3 className="blog-post-title text-success">Reviews</h3>
                            { reviews && reviews.length ? reviews.map(item => {
                                let date = item.updated_at ? item.updated_at.split('T')[0] : null
                                return  <div className="text-secondary" key={ item.id + reviews }>
                                            <p className="blog-post-meta text-light">On {moment(date).format('MMM D, YYYY')}-{moment(date).fromNow()} By <span className="text-warning">{ item.author }</span></p>
                                            <div className={item.content.length > 800 ? 'review-container' : null }>
                                                <p className="pr-2">{ item.content }</p>
                                            </div>
                                            <hr className="line"/>
                                        </div> })
                            : 
                            <>
                                <p className="text-muted">No review</p>
                                <hr className="line"/>
                            </> }
                        </div>
                        <div className="blog-post mt-4">
                            <h3 className="blog-post-title text-warning">Similar Show</h3>
                            <div className="item-container d-flex overflow-auto">
                                { recommend && recommend.length ? recommend.map(item => {
                                    const { id, title, backdrop } = item
                                    item.path = selectTrack.path
                                    return  <Link className="recommend py-3 mr-3" key={ id + 'recommend' } to={ '/track-info' } onClick={()=> { setSelectTrack(item) }}>
                                                    <img className="mb-1 rounded" 
                                                        style={{ width: '18rem' }}
                                                        src= { "https://image.tmdb.org/t/p/original" + backdrop } 
                                                        alt={ title } />
                                                    <p className="pl-3 m-0">{ title }</p>
                                            </Link> }) 
                                : 
                                <>
                                    <p className="text-muted">No similar show</p>
                                    <hr className="line"/>
                                </> }
                            </div>
                        </div> 
                    </div>
                    <aside className="col-md-3 mr-auto align-items-stretch">
                        { credits ? 
                            <>
                                <div className='d-md-flex align-items-end justify-content-between'>
                                    <h3 className="font-italic m-0 text-warning">Casts</h3> 
                                    <p className="m-0" style={{ fontWeight: '300'}}>{credits.length} people</p>
                                </div>
                                <hr className="line w-100 mt-1"/>
                                <ol className="list-unstyled d-flex flex-md-column overflow-auto">
                                    { credits.map(actor => {
                                        const noImage = 'https://www.exstrompt.com/wp-content/uploads/2015/07/placeholder-user.jpg'
                                        const image = actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : noImage
                                        return  <li key={ actor.credit_id + actor.name } className='mb-2 flex-shrink-0 d-md-flex' > 
                                                    <img className="d-none d-md-block" style={{ width: '3rem', height: '4rem' }} src= { image } alt={ actor.name } />
                                                    <div className="d-none d-md-block pl-md-3">
                                                        <p className="m-0">{ actor.name }</p>
                                                        <p className="m-0 text-secondary d-none d-md-block" style={{ fontWeight: "400"}}>{ actor.character }</p>
                                                    </div>
                                                    <div className="d-block d-md-none mr-3" style={{ width: '120px' }}>
                                                        <img className="img-fluid" src= { image } alt={ actor.name } />
                                                        <p className="m-0">{ actor.name }</p>
                                                    </div>
                                                </li> })} 
                                </ol>
                            </> 
                        : null }
                    </aside>
                </div>
            </div>
}