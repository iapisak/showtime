import { Switch, Route} from 'react-router-dom'
import Home from '../Components/Home/home'

export default function Routes ({ data }) {
    console.log(data)
    return  <Switch>
                <Route exact path='/' render={() => <Home data={ data } /> } />
            </Switch>
}