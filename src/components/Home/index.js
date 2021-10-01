import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import AnimeComp from '../AnimeList'

import './index.css'

const activeStatus = {
  Initial: 'Initial',
  progress: 'progress',
  success: 'success',
  failure: 'failure',
}

class Home extends Component {
  state = {
    animeList: [],
    genreSearch: 'Pirates',
    descSearch: 'Monkey',
    titleSearch: 'One Piece',
    status: '',
  }

  componentDidMount() {
    this.getList()
  }

  searchButton = () => {
    this.getList()
  }

  genreSearch = event => {
    this.setState({genreSearch: event.target.value})
  }

  descSearch = event => {
    this.setState({descSearch: event.target.value})
  }

  titleSearch = event => {
    this.setState({titleSearch: event.target.value})
  }

  updateList = anime => {
    const data1 = anime.map(each => ({
      title: each.titles.en,
      description: each.descriptions.en,
      genre: each.genres,
      seasonYear: each.season_year,
      count: each.episodes_count,
      id: each.id,
      coverImage: each.cover_image,
    }))
    // console.log(data1)
    this.setState({status: activeStatus.success, animeList: data1})
  }

  getEmpty = () => {
    const data1 = []
    this.setState({animeList: data1, status: activeStatus.success})
  }

  getList = async () => {
    this.setState({status: activeStatus.progress})
    const {titleSearch, genreSearch, descSearch} = this.state
    let genSearch = genreSearch[0].toUpperCase()
    genSearch += genreSearch.slice(1)

    let titleSearch2 = titleSearch[0].toUpperCase()
    titleSearch2 += titleSearch.slice(1)

    console.log(genSearch)
    // const token = Cookies.get('jwt_token')
    const url = `https://api.aniapi.com/v1/anime?title=${titleSearch2}&genres=${genSearch}&description=%${descSearch}%`

    const JwtToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM1NyIsIm5iZiI6MTYzMjgwNzk0NiwiZXhwIjoxNjM1Mzk5OTQ2LCJpYXQiOjE2MzI4MDc5NDZ9.tYK2jfL7lK-6IVPsD1NNGX3aSLIyoB077rq3LQDszJc'

    Cookies.set('jwt_token', JwtToken, {
      expires: 30,
    })

    const options = {
      headers: {
        Authorization: `Bearer ${JwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      if (data.status_code === 404) {
        this.getEmpty()
      } else {
        // console.log(data.data.documents)
        this.updateList(data.data.documents)
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
    if (animeList.length === 0) {
      return (
        <div className="no-content">
          <h1>OOps! No Content Available</h1>
        </div>
      )
    }
    return animeList.map(each => <AnimeComp List={each} />)
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

  logoutButton = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/')
  }

  render() {
    const {genreSearch, descSearch, titleSearch} = this.state
    return (
      <div className="page">
        <div className="search">
          <div>
            <input
              type="search"
              placeholder="genreSearch"
              className="search-input"
              value={genreSearch}
              onChange={this.genreSearch}
            />
            <button
              type="button"
              testid="searchButton"
              className="search-but"
              onClick={this.searchButton}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div>
            <input
              type="search"
              placeholder="descSearch"
              className="search-input"
              value={descSearch}
              onChange={this.descSearch}
            />
            <button
              type="button"
              testid="searchButton"
              className="search-but"
              onClick={this.searchButton}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div>
            <input
              type="search"
              placeholder="titleSearch"
              className="search-input"
              value={titleSearch}
              onChange={this.titleSearch}
            />
            <button
              type="button"
              testid="searchButton"
              className="search-but"
              onClick={this.searchButton}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <button
            type="button"
            onClick={this.logoutButton}
            className="logout-button"
          >
            LOGOUT
          </button>
        </div>
        <ul className="anime-list">{this.LoadingContent()}</ul>
      </div>
    )
  }
}
export default Home
