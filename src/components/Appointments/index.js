import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  AddComment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const newDate = format(new Date(dateInput), 'dd MMMM yyyy, EEEE')

    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: newDate,
      starred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  changeStarImage = id => {
    console.log(id)
    const {appointmentsList} = this.state

    this.setState({
      appointmentsList: appointmentsList.map(eachAppointment => {
        if (id !== eachAppointment.id) {
          return eachAppointment
        }

        return {...eachAppointment, starred: !eachAppointment.starred}
      }),
    })
  }

  filterStared = () => {
    const {appointmentsList} = this.state
    this.setState({
      appointmentsList: appointmentsList.filter(each => each.starred === true),
    })
  }

  render() {
    const {titleInput, dateInput, appointmentsList} = this.state

    return (
      <div className="appointsments-container">
        <div className="responsive-container">
          <div className="appointments-container">
            <div className="add-appointment-container">
              <form className="form" onSubmit={this.AddComment}>
                <h1 className="add-appointment-heading">Add Appointment</h1>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  value={titleInput}
                  onChange={this.onChangeTitleInput}
                  className="input"
                  placeholder="Title"
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  onChange={this.onChangeDateInput}
                  className="input"
                  value={dateInput}
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-img"
              />
            </div>
            <hr className="hr" />
            <div className="header-with-filter-container">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                type="button"
                className="filter-style"
                onClick={this.filterStared}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {appointmentsList.map(eachAppointment => (
                <AppointmentItem
                  eachAppointment={eachAppointment}
                  key={eachAppointment.id}
                  changeStarImage={this.changeStarImage}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
