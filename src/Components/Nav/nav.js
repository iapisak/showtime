import { Link } from 'react-router-dom'

export default function Nav ({ setLoadMovie, setLoadTv }) {
    return  <nav className="navbar navbar-expand-md navbar-dark" aria-label="Twelfth navbar example">
                <div className="container-fluid">
                    <div className="lead">Movie</div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample10" aria-controls="navbarsExample10" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-md-end" id="navbarsExample10">
                        <ul className="nav navbar-nav">
                            <li className="nav-link">
                                <Link className='nav-link' to={'/'}>Home</Link>
                            </li>
                            <li className="nav-link" >
                                <Link className='nav-link' to={'/movie'} onClick={() => { setLoadMovie(true) }} >Movie</Link>
                            </li>
                            <li className="nav-link" onClick={() => { setLoadTv(true) }}>
                                <Link className='nav-link' to={'/tv'} onClick={() => { setLoadMovie(true) }} >Tv</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
}