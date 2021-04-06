export default function Nav () {
    return  <nav className="navbar navbar-expand-md navbar-dark" aria-label="Twelfth navbar example">
                <div className="container-fluid">
                    <div className="lead">Movie</div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample10" aria-controls="navbarsExample10" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-md-end" id="navbarsExample10">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/movie">Movie</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">TV show</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
}