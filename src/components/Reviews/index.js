import './index.css'

const Reviews = props => {
  const {List} = props
  const {review, rating} = List
  return (
    <li className="list-review">
      <p className="review-color">
        <span className="dash">-</span>
        {review}
      </p>
      <p className="rating-num">
        <span className="rating-color">Rating:</span>
        {rating}
      </p>
      <hr className="line" />
    </li>
  )
}

export default Reviews
