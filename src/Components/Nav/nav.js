export default function Nav ({ setLoadMovie, setLoadTv }) {
    return  <nav className="navbar navbar-expand-md navbar-dark" aria-label="Twelfth navbar example">
                <div className="container-fluid">
                    <div className="lead">Movie</div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample10" aria-controls="navbarsExample10" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-md-end" id="navbarsExample10">
                        <ul className="nav nav-tabs">
                            <li className="">
                                <a className="" href="#home" data-toggle="tab">Home</a>
                            </li>
                            <li className="" onClick={() => setLoadMovie(true)}>
                                <a className="" href="#movie" data-toggle="tab">Movie</a>
                            </li>
                            <li className="" onClick={() => setLoadTv(true)}>
                                <a className="" href="#tv" data-toggle="tab">TV</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
}