import { Link } from 'react-router-dom'

export default function Nav ({ setLoadMovie, setLoadTv }) {
        return  <div className="container-fluid p-0" style={{ backgroundColor: '#0d253f' }}>
                    <nav className="col-md-10 mx-auto navbar navbar-expand-md shadow-md">
                        <h5 className="">Showtimes by The Movie DB</h5>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample10" aria-controls="navbarsExample10" aria-expanded="false">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-md-end" id="navbarsExample10">
                            <ul className="nav navbar-nav">
                                <Link className='nav-link' to={'/'}>Home</Link>
                                <Link className='nav-link' to={'/movie'} onClick={() => { setLoadMovie(true) }} >Movie</Link>
                                <Link className='nav-link' to={'/tv'} onClick={() => { setLoadTv(true) }} >Tv</Link>
                            </ul>
                        </div>
                    </nav>
                </div>
}