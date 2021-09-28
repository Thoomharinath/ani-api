import './index.css'

const Login = props => {
  const {onClick} = props

  return (
    <button className="button" type="button" onClick={onClick}>
      Login
    </button>
  )
}

export default Login
