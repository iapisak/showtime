import { Link } from 'react-router-dom'

export default function Nav ({ setLoadMovie, setLoadTv }) {
        return  <div className="container-fluid p-0">
                    <nav id="nav-container" className="col-md-10 mx-auto navbar navbar-dark navbar-expand-md shadow-md">
                        <h2 className="display-md-6 py-2">Showtimes</h2>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav" aria-controls="nav" aria-expanded="false">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-md-end" id="nav">
                            <ul className="nav navbar-nav">
                                <Link className='nav-link text-light' to={'/'} data-toggle="collapse" data-target=".navbar-collapse.show">Home</Link>
                                <Link className='nav-link text-light' to={'/movie'} data-toggle="collapse" data-target=".navbar-collapse.show" onClick={() => { setLoadMovie(true) }} >Movies</Link>
                                <Link className='nav-link text-light' to={'/tv'} data-toggle="collapse" data-target=".navbar-collapse.show" onClick={() => { setLoadTv(true) }} >Tv Shows</Link>
                            </ul>
                        </div>
                    </nav>
                </div>
}