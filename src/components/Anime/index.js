import Loader from 'react-loader-spinner'
import {Component} from 'react'

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

    status: '',
  }

  componentDidMount() {
    this.getList()
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
    }
    // console.log(data1)
    this.setState({status: activeStatus.success, animeList: data1})
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

  onSuccess = animeList => {
    const {title, coverImage, description, count, seasonYear, genre} = animeList
    return (
      <div className="anime-details">
        <h1>{title}</h1>
        <p>{description}</p>
        <img src={coverImage} alt="cover" />
        <p>{count}</p>
        <p>{seasonYear}</p>
        <p>{genre}</p>
      </div>
    )
  }

  LoadingContent = () => {
    const {status, animeList} = this.state
    console.log(animeList)
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
