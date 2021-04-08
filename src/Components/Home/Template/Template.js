import { Link } from 'react-router-dom'
import moment from 'moment'

export default function Template ({ data, head, options, setOptions, setSelectTrack }) {
    return  <div className="col-sm-10 mx-auto p-0">
                <div className="container-fluid d-flex pl-md-4">
                    <h2 className="display-5">{ head }</h2>
                    { head === 'Popular'    ? <div className="btn-group btn-group-toggle ml-auto" data-toggle="buttons">
                                                <button type="button" className="btn shadow-none btn-dark" onClick={()=> {
                                                    if (options === 'movie') return
                                                        setOptions('movie')
                                                    }}>Movies</button>
                                                <button type="button" className="btn shadow-none btn-dark" onClick={()=> {
                                                    if (options === 'tv') return
                                                    setOptions('tv')}}>TV</button>
                                              </div>
                                            : <div className="btn-group btn-group-toggle ml-auto" data-toggle="buttons">
                                                <button type="button" className="btn shadow-none btn-dark" onClick={()=> {
                                                    if (options === 'day') return
                                                    setOptions('day')
                                                    }}>Today</button>
                                                <button type="button" className="btn shadow-none btn-dark" onClick={()=> {
                                                    if (options === 'week') return
                                                    setOptions('week')}}>Week</button>
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