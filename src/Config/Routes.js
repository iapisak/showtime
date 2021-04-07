import { Switch, Route} from 'react-router-dom'
import Home from '../Components/Home/home'
import Movie from '../Components/Movie/movie'
import Tv from '../Components/TV/tv'
import Info from '../Components/TrackInfo/tranInfo'

export default function Routes ({ loadMovie, loadTv, selectTrack, setSelectTrack }) {
    
    return  <Switch>
                <Route exact path='/' render={() => <Home setSelectTrack={ setSelectTrack }/> } />
                <Route path='/movie' render={() => <Movie loadMovie={ loadMovie } setSelectTrack={ setSelectTrack } /> } />
                <Route path='/tv' render={() => <Tv loadTv={ loadTv } setSelectTrack={ setSelectTrack } /> } />
                <Route path='/track-info' render={() => <Info selectTrack={ selectTrack }/> } />
            </Switch>
}