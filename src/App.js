import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import Anime from './components/AnimeDetails'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/Home" component={Home} />
      <Route exact path="/anime/:id" component={Anime} />
    </Switch>
  </BrowserRouter>
)

export default App
