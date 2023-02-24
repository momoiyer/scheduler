export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const filteredDay = state.days
    .filter(currentDay => currentDay.name === day)[0];

  if (!filteredDay) {
    return [];
  }

  const filteredAppointment = filteredDay.appointments
    .map(app => Object.values(state.appointments)
      .filter(currentAppointment => currentAppointment.id === app)[0]);

  return filteredAppointment;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewer = Object.values(state.interviewers).filter(interviewer => interviewer.id === interview.interviewer)[0];
  const result = { student: interview.student, interviewer };
  return result;
}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days
    .filter(currentDay => currentDay.name === day)[0];

  if (!filteredDay) {
    return [];
  }

  const filteredInterviewers = filteredDay.interviewers
    .map(availableInterviewer => Object.values(state.interviewers)
      .filter(interviewer => interviewer.id === availableInterviewer)[0]);

  return filteredInterviewers;
}