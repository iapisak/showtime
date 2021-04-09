import { Link } from 'react-router-dom'
import moment from 'moment'

export default function Template ({ data, head, options, setOptions, setSelectTrack }) {
    return  <div className="col-sm-10 mx-auto p-0">
                <div className="container-fluid d-flex pl-md-4">
                    <h2 className="display-5 m-0">{ head }</h2>
                    { head === 'Popular'    ? <div className="btn-group btn-group-toggle ml-auto" data-toggle="buttons">
                                                <label className="btn btn-dark shadow-none active"
                                                       onClick={()=> { if (options === 'movie') return; setOptions('movie') }} >
                                                    <input type="radio" name='movies' id='movies' autoComplete="off"/>Movies
                                                </label>
                                                <label className="btn btn-dark shadow-none"
                                                       onClick={()=> { if (options === 'tv') return; setOptions('tv') }} >
                                                    <input type="radio" name='tv' id='tv' autoComplete="off"/>Tv shows
                                                </label>
                                              </div>
                                            : <div className="btn-group btn-group-toggle ml-auto" data-toggle="buttons">
                                                <label className="btn btn-dark shadow-none active"
                                                       onClick={()=> { if (options === 'day') return; setOptions('day') }} >
                                                    <input type="radio" name='day' id='day' autoComplete="off"/>Today
                                                </label>
                                                <label className="btn btn-dark shadow-none"
                                                       onClick={()=> { if (options === 'week') return; setOptions('week') }} >
                                                    <input type="radio" name='week' id='week' autoComplete="off"/>Week
                                                </label>
                                            </div> }
                </div>
                <div className="item-container d-flex overflow-auto pl-2 pl-md-4 py-4">
                    { data ? data.map(item => {
                        let { id, title, url, released } = item
                        item.path = item.media_type ? item.media_type : options
                        return  <Link className="item poster flex-shrink-0" key={ id } to={ '/track-info' } onClick={()=> { setSelectTrack(item) }}>
                                    <img className="mb-1 img-fluid rounded" src= { url } alt={ title } />
                                    <div>{ title }</div>
                                    { options || item.media_type === 'movie' ? <div className="text-muted">{ moment(released).fromNow() }</div>
                                                                             : <div className="text-muted">{ moment(released).format('MMM D, YYYY')}</div> }
                                </Link>
                    }) : null }
                </div>
            </div>
}