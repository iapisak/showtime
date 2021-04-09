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
            <footer className="py-3 text-center mt-auto">
                <p className="m-0 text-light">This is examples show case for Portfolio. Database from <span style={{ color: '#90cea1' }}>The Movie DB</span>, developer <span style={{ color: '#90cea1' }}>@Jun</span> 2021.</p>
            </footer>
          </div>
})
