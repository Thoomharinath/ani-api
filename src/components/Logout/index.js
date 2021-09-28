import './index.css'

const Logout = props => {
  const {onClick} = props

  return (
    <button className="button" type="button" onClick={onClick}>
      Logout
    </button>
  )
}

export default Logout
