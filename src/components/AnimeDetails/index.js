import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Reviews from '../Reviews'

import './index.css'

const activeStatus = {
  Initial: 'Initial',
  progress: 'progress',
  success: 'success',
  failure: 'failure',
}

class Anime extends Component {
  state = {
    animeList: [],
    reviewList: [],
    reviewText: '',
    ratingValue: '',
    status: '',
    Id: '',
  }

  componentDidMount() {
    this.getList()
    this.getReview()
  }

  getReview = async () => {
    // const {reviewList} = this.state
    const url = 'https://anime-api-hari.herokuapp.com/review'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const reviewData = await response.json()
    //  console.log(data1)
    console.log(reviewData)
    this.setState({reviewList: reviewData})
  }

  updateList = each => {
    const data1 = {
      title: each.titles.en,
      description: each.descriptions.en,
      genre: each.genres,
      seasonYear: each.season_year,
      count: each.episodes_count,
      coverImage: each.cover_image,
      id: each.id,
      bannerImage: each.banner_image,
      startDate: each.start_date,
      endDate: each.end_date,
      score: each.score,
      seasonPeriod: each.season_period,
      duration: each.episode_duration,
      coverColor: each.cover_color,
    }
    console.log(data1.id)
    this.setState({
      status: activeStatus.success,
      animeList: data1,
      Id: data1.id,
    })
  }

  getEmpty = () => {
    const data1 = ['NO ANIME TO SHOW']
    this.setState({animeList: data1, status: activeStatus.success})
  }

  getList = async () => {
    this.setState({status: activeStatus.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    // console.log(empType)
    // const token = Cookies.get('jwt_token')
    const url = `https://api.aniapi.com/v1/anime/${id}`

    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM1NyIsIm5iZiI6MTYzMjgwNzk0NiwiZXhwIjoxNjM1Mzk5OTQ2LCJpYXQiOjE2MzI4MDc5NDZ9.tYK2jfL7lK-6IVPsD1NNGX3aSLIyoB077rq3LQDszJc'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      if (data.status_code === 404) {
        this.getEmpty()
      } else {
        // console.log(data.data.documents)
        this.updateList(data.data)
      }
    } else {
      console.log('failure')
      this.setState({status: activeStatus.failure})
    }
  }

  onProgress = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onReview = event => {
    const {reviewText} = this.state
    console.log(reviewText)
    this.setState({reviewText: event.target.value})
  }

  onRating = event => {
    if (event.target.value >= 5) {
      this.setState({ratingValue: 5})
    } else {
      this.setState({ratingValue: event.target.value})
    }
  }

  reviewSubmit = async event => {
    event.preventDefault()
    const {reviewText, ratingValue, Id} = this.state
    const url = 'https://anime-api-hari.herokuapp.com/review'
    const reviewDetails = {
      review: reviewText,
      rating: ratingValue,
      Id: `${Id}`,
    }
    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(reviewDetails),
    }

    const response = await fetch(url, options)
    console.log(response)
    this.getReview()
  }

  onSuccess = animeList => {
    const {reviewText, ratingValue, reviewList, Id} = this.state
    const {
      title,
      coverImage,
      description,
      count,
      seasonYear,
      genre,
      seasonPeriod,
      duration,
      score,
      startDate,
      endDate,
      coverColor,
    } = animeList
    return (
      <div className="anime-details" style={{backgroundColor: `${coverColor}`}}>
        <div>
          <img src={coverImage} alt="anime" className="anime-image" />
        </div>
        <div>
          <h1>
            <span className="span1">Title:</span>
            {title}
          </h1>
          <p>
            <span className="span1">Description:</span>
            {description}
          </p>
          <p>
            <span className="span1">Count:</span>
            {count}
          </p>
          <p>
            <span className="span1">SeasonYear:</span>
            {seasonYear}
          </p>
          <p>
            <span className="span1">Genre:</span>
            {genre}
          </p>
          <p>
            <span className="span1">StartDate:</span>
            {startDate}
          </p>
          <p>
            <span className="span1">EndDate:</span>
            {endDate}
          </p>
          <p>
            <span className="span1">SeasonPeriod:</span>
            {seasonPeriod}
          </p>
          <p>
            <span className="span1"> Duration:</span>
            {duration}
          </p>
          <p>
            <span className="span1"> Score:</span>
            {score}
          </p>
        </div>
        <form onSubmit={this.reviewSubmit} className="form-review">
          <label htmlFor="rating" className="rating" value={ratingValue}>
            Rating
          </label>
          <input
            type="text"
            id="rating"
            className="input-box"
            onChange={this.onRating}
          />
          <label htmlFor="review" className="review">
            Write a review
          </label>
          <input
            id="review"
            type="text"
            placeholder="write a review"
            className="input-field"
            value={reviewText}
            onChange={this.onReview}
          />

          <button type="submit" className="review-button">
            REVIEW
          </button>
        </form>
        <ul className="review-cont">
          {reviewList.map(each => each.id === Id && <Reviews List={each} />)}
        </ul>
      </div>
    )
  }

  LoadingContent = () => {
    const {status, animeList, ratingValue} = this.state
    console.log(ratingValue)
    switch (status) {
      case 'success':
        return this.onSuccess(animeList)
      case 'failure':
        return this.onFailure()
      case 'progress':
        return this.onProgress()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="page">
        <ul className="anime-list">{this.LoadingContent()}</ul>
      </div>
    )
  }
}

export default Anime
