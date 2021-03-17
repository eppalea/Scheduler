export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const dailyAppts = [];

  state.days.forEach((dayOfWeek) => {
    if (dayOfWeek.name === day) {
      dayOfWeek.appointments.forEach((id) => {
        dailyAppts.push(state.appointments[id])
      })
    }
  })
  return dailyAppts;
}

