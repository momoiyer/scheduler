import React, { useState, useEffect } from "react";
import Axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";

// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };


export default function Application(props) {
  const [state, setState] = useState({ day: "Monday", days: [], appointments: {} });

  const setDay = day => setState(prev => ({ ...prev, day }));

  const dailyAppointments = getAppointmentsForDay({ days: state.days, appointments: state.appointments }, state.day);

  useEffect(() => {
    const getDays = Axios.get('/api/days');
    const getAppointments = Axios.get('/api/appointments');
    const getInterviewers = Axios.get('/api/interviewers');

    Promise.all([getDays, getAppointments, getInterviewers])
      .then(results => {
        const daysResult = results[0].data;
        const appointmentsResult = results[1].data;
        const interviewersResult = results[2].data;
        setState(prev => ({ ...prev, days: daysResult, appointments: appointmentsResult, interviewers: interviewersResult }));
      });
  }, []);



  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment =>
          <Appointment
            key={appointment.id}
            {...appointment}
          />)}
        <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
}
