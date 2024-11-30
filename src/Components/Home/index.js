import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'
import TechItems from '../TechItems'

import './index.css'

const contraints = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {courses: [], activeTab: contraints.initial}

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({activeTab: contraints.progress})
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const responseData = data.courses.map(item => ({
        id: item.id,
        logoUrl: item.logo_url,
        name: item.name,
      }))
      this.setState({courses: responseData, activeTab: contraints.success})
    } else {
      this.setState({activeTab: contraints.failure})
    }
  }

  renderProgess = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        className="failure-button"
        onClick={this.getCourses}
      >
        Retry
      </button>
    </div>
  )

  renderSuccess = () => {
    const {courses} = this.state
    console.log(courses)
    return (
      <>
        <h1>Courses</h1>
        <ul className="cards-container">
          {courses.map(each => (
            <TechItems itemDetails={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }

  renderViews = () => {
    const {activeTab} = this.state

    switch (activeTab) {
      case contraints.progress:
        return this.renderProgess()
      case contraints.success:
        return this.renderSuccess()
      case contraints.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <Navbar />
        {this.renderViews()}
      </div>
    )
  }
}

export default Home
