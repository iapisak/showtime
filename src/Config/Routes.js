import { Switch, Route} from 'react-router-dom'
import Home from '../Components/Home/home'
import Movie from '../Components/Movie/movie'

export default function Routes () {
    
    return  <Switch>
                <Route exact path='/' render={() => <Home /> } />
                <Route path='/movie' render={() => <Movie /> } />
            </Switch>
}