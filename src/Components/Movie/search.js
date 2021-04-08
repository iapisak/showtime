import { Link } from 'react-router-dom'
import moment from 'moment'

export default function Search ({ searchMovies, setSelectTrack }) {

    return  <div className="poster-container py-4">
                { searchMovies.length ? searchMovies.map(item => {
                    const { id, title, url, released } = item
                    item.path = 'movie'
                    const date = released ? released.replace('/-/g', '') : ''
                    return  <Link className="poster flex-shrink-0 mr-3 mb-md-3 " key={ id + '-movie' } to={ '/track-info' } 
                                onClick={()=> { setSelectTrack(item) }}>
                                <img className="mb-1 img-fluid rounded" src= { "https://image.tmdb.org/t/p/w200" + url } alt={ title } />
                                <div>{ title }</div>
                                <div className="text-muted">{ moment(date).fromNow() }</div>
                            </Link>
                }) : null }
            </div>
}