import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

const Login = () => {
  const token = Cookies.get('jwt_token')
  console.log(token)
  if (token !== undefined) {
    return <Redirect to="/Home" />
  }
  return (
    <div className="login-page">
      <button type="button" className="login-but">
        <a
          className="color"
          href="https://api.aniapi.com/v1/oauth?response_type=token&client_id=71695870-199c-461d-9c4c-c28d505b29c4&redirect_uri=http://localhost:3000/Home&state=<RANDOM_STRING>"
        >
          Login/Signup
        </a>
      </button>
    </div>
  )
}

export default Login
