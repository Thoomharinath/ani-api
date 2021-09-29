import {BrowserRouter, Route, Switch} from 'react-router-dom'

/* import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css' */

import Home from './components/Home'
import Login from './components/Login'
import Anime from './components/Anime'
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
