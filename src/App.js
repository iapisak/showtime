import { useState } from 'react'
import { withRouter } from 'react-router-dom';
import Routes from './Config/Routes';
import Nav from './Components/Nav/nav'
import './App.css'

export default withRouter(function App() {
  const [ loadMovie, setLoadMovie ] = useState(false)
  const [ loadTv, setLoadTv ] = useState(false)
  const [ selectTrack, setSelectTrack ] = useState()

  return  <div className="d-flex flex-column text-light" style={{ backgroundColor: '#212529', height: '100vh'}}>
            <Nav setLoadMovie={ setLoadMovie } setLoadTv={ setLoadTv }/>
            <main className='container-fluid p-0' style={{ overflow: 'scroll' }} >
              <Routes loadMovie={ loadMovie } loadTv={ loadTv } selectTrack={ selectTrack } setSelectTrack={ setSelectTrack }/>
            </main>
            <footer className="py-3 text-white-50 text-center mt-auto" style={{ backgroundColor: '#0d253f' }}>
                <p className="m-0">Data base from <span className="text-white">TMP</span>, project By <span className="text-white">@Jun</span>.</p>
            </footer>
          </div>
})
