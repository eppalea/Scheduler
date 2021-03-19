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

export function getInterview(state, interview) {
  console.log('state is: ', state);
  console.log("interview is:", interview);
  
  if (!interview) {
    return null;
  }
 
  return {interviewer: state.interviewers[interview.interviewer], student: interview.student}
}

export function getInterviewersForDay(state, day) {
  //... returns an array of interviewers for that day
  const dailyInterviewers = [];

  state.days.forEach((dayOfWeek) => {
    if (dayOfWeek.name === day) {
      dayOfWeek.interviewers.forEach((id) => {
        dailyInterviewers.push(state.interviewers[id])
      })
    }
  })
  return dailyInterviewers;
}