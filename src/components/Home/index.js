import {Component} from 'react'
import './index.css'
import Logout from '../Logout'
import Login from '../Login'
import Message from '../Message'

class Home extends Component {
  state = {status: false}

  onClick = () => {
    this.setState(prevState => ({status: !prevState.status}))
  }

  render() {
    const {status} = this.state
    return (
      <div className="container">
        <div className="card">
          {<Message status={status} />}
          {status ? (
            <Logout onClick={this.onClick} />
          ) : (
            <Login onClick={this.onClick} />
          )}
        </div>
      </div>
    )
  }
}

export default Home
