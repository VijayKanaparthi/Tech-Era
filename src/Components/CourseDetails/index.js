import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'

import './index.css'

const contraints = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseDetails extends Component {
  state = {courseDetails: {}, activeTab: contraints.initial}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({activeTab: contraints.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)

    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const responseData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }

      this.setState({
        courseDetails: responseData,
        activeTab: contraints.success,
      })
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
        onClick={this.getDetails}
      >
        Retry
      </button>
    </div>
  )

  renderSuccess = () => {
    const {courseDetails} = this.state
    return (
      <div className="big-card">
        <div>
          <img
            src={courseDetails.imageUrl}
            alt={courseDetails.name}
            className="big-image"
          />
        </div>
        <div className="big-card-part2">
          <h1>{courseDetails.name}</h1>
          <p>{courseDetails.description}</p>
        </div>
      </div>
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
      <div className="course-details-container">
        <Navbar />
        {this.renderViews()}
      </div>
    )
  }
}
export default CourseDetails
