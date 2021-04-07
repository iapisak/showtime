import { useState, useEffect } from 'react'
import { getReviews, getCredits } from '../api'
import moment from 'moment'

export default function TrackInfo ({ selectTrack }) {
    const [ reviews, setReviews ] = useState()
    const [ credits, setCredits ] = useState()
    
    useEffect(()=> {
        if (!selectTrack) return
        getReviews(selectTrack.id, selectTrack.path, setReviews)
        getCredits(selectTrack.id, selectTrack.path, setCredits)
    }, [ selectTrack ])

    return  <div id="trackinfo">
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


                <div className="row">
                    <div className="col-md-6 ml-auto blog-main">
                        <h3 clasName="pb-3 mb-4 font-italic border-bottom">
                            From the Firehose
                        </h3>

                        <div className="blog-post">
                            <h2 className="blog-post-title">Sample blog post</h2>
                            <p className="blog-post-meta">January 1, 2014 by <a href="/">Mark</a></p>

                            <p>This blog post shows a few different types of content that's supported and styled with Bootstrap. Basic typography, images, and code are all supported.</p>
                            <hr />
                            <p>Cum sociis natoque penatibus et magnis <a href="/">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
                            <blockquote>
                            <p>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                            </blockquote>
                            <p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
                            <h2>Heading</h2>
                            <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                            <h3>Sub-heading</h3>
                            <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                            <pre><code>Example code block</code></pre>
                            <p>Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa.</p>
                            <h3>Sub-heading</h3>
                            <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                            <ul>
                            <li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>
                            <li>Donec id elit non mi porta gravida at eget metus.</li>
                            <li>Nulla vitae elit libero, a pharetra augue.</li>
                            </ul>
                            <p>Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</p>
                            <ol>
                            <li>Vestibulum id ligula porta felis euismod semper.</li>
                            <li>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</li>
                            <li>Maecenas sed diam eget risus varius blandit sit amet non magna.</li>
                            </ol>
                            <p>Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.</p>
                        </div>

                        <div className="blog-post">
                            <h2 className="blog-post-title">Another blog post</h2>
                            <p className="blog-post-meta">December 23, 2013 by <a href="/">Jacob</a></p>

                            <p>Cum sociis natoque penatibus et magnis <a href="/">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
                            <blockquote>
                            <p>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                            </blockquote>
                            <p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
                            <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                        </div>

                        <div className="blog-post">
                            <h2 className="blog-post-title">New feature</h2>
                            <p className="blog-post-meta">December 14, 2013 by <a href="/">Chris</a></p>

                            <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                            <ul>
                            <li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>
                            <li>Donec id elit non mi porta gravida at eget metus.</li>
                            <li>Nulla vitae elit libero, a pharetra augue.</li>
                            </ul>
                            <p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
                            <p>Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</p>
                        </div>

                        <nav className="blog-pagination">
                            <a className="btn btn-outline-primary" href="/">Older</a>
                            <a className="btn btn-outline-secondary disabled" href="/">Newer</a>
                        </nav>

                    </div>

                    <aside className="col-md-3 mr-auto blog-sidebar">
                        <div className="p-3 mb-3 bg-light rounded">
                            <h4 className="font-italic">About</h4>
                            <p className="mb-0">Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
                        </div>

                        <div className="p-3">
                            <h4 className="font-italic">Archives</h4>
                            <ol className="list-unstyled mb-0">
                            <li><a href="/">March 2014</a></li>
                            <li><a href="/">February 2014</a></li>
                            <li><a href="/">January 2014</a></li>
                            <li><a href="/">December 2013</a></li>
                            <li><a href="/">November 2013</a></li>
                            <li><a href="/">October 2013</a></li>
                            <li><a href="/">September 2013</a></li>
                            <li><a href="/">August 2013</a></li>
                            <li><a href="/">July 2013</a></li>
                            <li><a href="/">June 2013</a></li>
                            <li><a href="/">May 2013</a></li>
                            <li><a href="/">April 2013</a></li>
                            </ol>
                        </div>

                        <div className="p-3">
                            <h4 className="font-italic">Elsewhere</h4>
                            <ol className="list-unstyled">
                            <li><a href="/">GitHub</a></li>
                            <li><a href="/">Twitter</a></li>
                            <li><a href="/">Facebook</a></li>
                            </ol>
                        </div>
                    </aside>
                </div>
            </div>
}