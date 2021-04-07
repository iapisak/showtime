import moment from 'moment'
import './Template.css'

export default function Template ({ data, head, type, setType }) {

    return  <div className="col-sm-10 mx-auto">
                <div className="container-fluid d-flex p-0 pl-md-4">
                    <h2 className="display-5">{ head }</h2>
                    { head === 'Popular'    ? <div className="btn-group ml-auto" role="group" aria-label="Basic outlined example">
                                                <button type="button" className="btn btn-dark" onClick={()=> {
                                                    if (type === 'movie') return
                                                    setType('movie')
                                                    }}>Movies</button>
                                                <button type="button" className="btn btn-secondary" onClick={()=> {
                                                    if (type === 'tv') return
                                                    setType('tv')}}>TV</button>
                                              </div>
                                            : <div className="btn-group ml-auto" role="group" aria-label="Basic outlined example">
                                                <button type="button" className="btn btn-dark" onClick={()=> {
                                                    if (type === 'day') return
                                                    setType('day')
                                                    }}>Today</button>
                                                <button type="button" className="btn btn-secondary" onClick={()=> {
                                                    if (type === 'week') return
                                                    setType('week')}}>Week</button>
                                            </div> }
                </div>
                <div className="item-container d-flex overflow-auto pl-2 pl-md-4 py-4">
                    { data ? data.map(item => {
                        const { id, title, url, released } = item
                        const date = released.replace('/-/g', '')
                        return  <div className="item" key={ id }>
                                    <img className="mb-1" 
                                        style={{ width: '10rem' }}
                                        src= { "https://image.tmdb.org/t/p/w200" + url } 
                                        alt={ title } />
                                    <div>{ title }</div>
                                    { type || item.media_type === 'movie' ? <div className="text-muted">{ moment(date).fromNow() }</div>
                                                                          : <div className="text-muted">{ moment(date).format('MMM D, YYYY')}</div> }
                                </div>
                    }) : null }
                </div>
            </div>
}