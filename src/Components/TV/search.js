import { Link } from 'react-router-dom'
import moment from 'moment'

export default function Search ({ searchTvs, setSelectTrack }) {

    return  <div className="col-sm-10 mx-auto p-3 p-md-0">
                <div className="container-fluid d-md-flex p-0 justify-content-md-center">
                    <h2 className="display-5 mb-3 mb-md-0">Search Results</h2>
                </div>
                <div className="poster-container py-4">
                { searchTvs.length ? searchTvs.map(item => {
                    const { id, title, url, released } = item
                    item.path = 'tv'
                    return  <Link className="poster flex-shrink-0 mr-3 mb-md-3 " key={ id + '-search' } to={ '/track-info' } 
                                onClick={()=> { setSelectTrack(item) }}>
                                <img className="mb-1 img-fluid rounded" src= { url } alt={ title } />
                                <div>{ title }</div>
                                <div className="text-muted">{ moment(released).fromNow() }</div>
                            </Link>
                }) : <p>No Tv shows found, Please try again</p> }
                </div>
            </div>
}