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
