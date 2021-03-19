import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from 'components/DayList';
import 'components/Appointment';
import Appointment from "components/Appointment";
import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors';


export default function Application(props) {
  // const [day, setDay] = useState(['Monday']);
  // const [days, setDays] = useState([]);
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const setDay = day => setState({...state, day });

  function bookInterview(id, interview) {
    console.log("new id is:", id, "new interview is:", interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      setState({
        ...state,
        appointments
      })
    });

  };

  function cancelInterview(id) {
    console.log('deleting id:', id);
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState({
        ...state,
        appointments
      })
    })

  }

  useEffect(() => {
     
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then((all) => {
        // console.log('all:', all);
        setState(prev => ({
          ...prev, 
          days: all[0].data, 
          appointments: all[1].data, 
          interviewers: all[2].data 
        }));  
      });
  }, [])

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
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
       
        {
          dailyAppointments.map((appointment) => {
            const interview = getInterview(state, appointment.interview);           
            return (
              <Appointment
                key={appointment.id} 
                {...appointment}
                interview={interview}
                interviewers={dailyInterviewers}
                bookInterview={bookInterview}
                cancelInterview={cancelInterview}
              />
            )
          })
        }
        <Appointment key="last" time="5pm" />
        
      </section>
    </main>
  );
}

