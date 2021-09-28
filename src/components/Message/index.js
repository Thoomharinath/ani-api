import './index.css'

const Message = props => {
  const {status} = props

  if (status) {
    return <h1 className="head">Welcome User </h1>
  }

  return <h1 className="head">Please Login </h1>
}

export default Message
