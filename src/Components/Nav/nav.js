import { Link } from 'react-router-dom'

export default function Nav ({ setLoadMovie, setLoadTv }) {
        return  <div className="container-fluid p-0">
                    <nav className="col-md-10 mx-auto navbar navbar-dark navbar-expand-md shadow-md">
                        <h5 style={{ color: '#90cea1' }}>Showtimes by The Movie DB</h5>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample10" aria-controls="navbarsExample10" aria-expanded="false">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-md-end" id="navbarsExample10">
                            <ul className="nav navbar-nav">
                                <Link className='nav-link text-light' to={'/'}>Home</Link>
                                <Link className='nav-link text-light' to={'/movie'} onClick={() => { setLoadMovie(true) }} >Movies</Link>
                                <Link className='nav-link text-light' to={'/tv'} onClick={() => { setLoadTv(true) }} >Tv Shows</Link>
                            </ul>
                        </div>
                    </nav>
                </div>
}