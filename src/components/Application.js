import React, { useState, useEffect } from "react";
import Axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({ day: "Monday", days: [], appointments: {}, interviewers: {} });

  const setDay = day => setState(prev => ({ ...prev, day }));

  const dailyAppointments = getAppointmentsForDay({ days: state.days, appointments: state.appointments }, state.day);
  const dailyInterviewers = getInterviewersForDay({ days: state.days, interviewers: state.interviewers }, state.day);

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

  const schedules = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
      />
    );
  });

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
        {schedules}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
