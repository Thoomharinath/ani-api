import {Link} from 'react-router-dom'
import './index.css'

const AnimeComp = props => {
  const {List} = props
  // console.log(props)
  const {title, description, count, seasonYear, genre, id, coverImage} = List
  // console.log(title)

  return (
    <Link to={`/anime/${id}`} className="card2">
      <li className="card1">
        <div>
          <h1>
            <span className="span">Title:</span>
            {title}
          </h1>

          <p>
            <span className="span">Description:</span>
            {description}
          </p>
          <p>
            <span className="span">Count:</span>
            {count}
          </p>
          <p>
            <span className="span">SeasonYear:</span>
            {seasonYear}
          </p>
          <p>
            <span className="span">Genre:</span>
            {genre}
          </p>
        </div>
        <div>
          <img src={coverImage} alt="anime" className="anime-image" />
        </div>
      </li>
    </Link>
  )
}

export default AnimeComp
