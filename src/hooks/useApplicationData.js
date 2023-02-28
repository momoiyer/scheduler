import React, { useState, useEffect } from "react";
import Axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

const useApplicationData = () => {
  const [state, setState] = useState({ day: "Monday", days: [], appointments: {}, interviewers: {} });

  const setDay = day => setState(prev => ({ ...prev, day }));

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };


    return Axios.put(`/api/appointments/${id}`, appointment)
      .then((result) => {
        if (result.status === 204) {

          const appointments = {
            ...state.appointments,
            [id]: appointment
          };

          const days = updateSpots(appointments);
          setState(prev => ({ ...prev, appointments, days }));
        }
      })
      .catch(error => {
        console.log("error: ", error);
        throw new Error(error);
      });
  };

  const cancelInterview = (id) => {
    return Axios.delete(`/api/appointments/${id}`)
      .then((result) => {
        if (result.status === 204) {

          const appointment = {
            ...state.appointments[id],
            interview: null
          };
          const appointments = {
            ...state.appointments,
            [id]: appointment
          };

          const days = updateSpots(appointments);

          setState(prev => ({ ...prev, appointments, days }));
        }
      })
      .catch(error => {
        console.log("error: ", error);
        throw new Error(error);
      });
  };

  const updateSpots = (appointments) => {
    //get appointments for current day
    const dailyAppointments = getAppointmentsForDay({ ...state, appointments }, state.day);

    //calculate avalialbe spots from today's appointments
    const avaliableSpots = Object.values(dailyAppointments).filter(appointment => !appointment.interview);
    const spots = avaliableSpots.length;

    //create new day object with updated spots
    const currentDay = state.days.find((day) => day.name === state.day);
    const newCurrentDay = { ...currentDay, spots };

    //update days value by replacing current day with new current day object (without mutating state.days.day.spots)
    const updatedDays = [...state.days];
    const currentDayIndex = updatedDays.findIndex((day) => day.name === state.day);
    updatedDays[currentDayIndex] = newCurrentDay;

    // return an updated days array
    return updatedDays;
  };

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


  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;