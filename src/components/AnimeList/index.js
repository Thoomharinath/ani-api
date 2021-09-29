import {Link} from 'react-router-dom'
import './index.css'

const AnimeComp = props => {
  const {List} = props
  // console.log(props)
  const {title, description, count, seasonYear, genre, id} = List
  // console.log(title)

  return (
    <Link to={`/anime/${id}`} className="card2">
      <li className="card1">
        <h1>{title}</h1>
        <p>{description}</p>
        <p>{count}</p>
        <p>{seasonYear}</p>
        <p>{genre}</p>
      </li>
    </Link>
  )
}

export default AnimeComp
