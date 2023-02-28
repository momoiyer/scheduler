import React, { useState, useEffect } from "react";
import Axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({ day: "Monday", days: [], appointments: {}, interviewers: {} });

  const setDay = day => setState(prev => ({ ...prev, day }));

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return Axios.put(`/api/appointments/${id}`, appointment)
      .then((result) => {
        if (result.status === 204) {
          setState(prev => ({ ...prev, appointments }));
        }
      })
      .catch(error => {
        console.log("error: ", error);
        throw new Error(error);
      });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return Axios.delete(`/api/appointments/${id}`)
      .then((result) => {
        if (result.status === 204) {
          setState(prev => ({ ...prev, appointments }));
        }
      })
      .catch(error => {
        console.log("error: ", error);
        throw new Error(error);
      });
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