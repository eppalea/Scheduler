import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from 'components/DayList';
import 'components/Appointment';
import Appointment from "components/Appointment";
import axios from 'axios';


export default function Application(props) {
  // const [day, setDay] = useState(['Monday']);
  // const [days, setDays] = useState([]);
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  });

  useEffect(() => {
    
    axios.get('/api/days').then(response => {
      console.log('response:', response.data)
      setDays([...response.data])
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
            days={days}
            day={day}
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
       
        {appointments.map((appointment) =>
          <Appointment
            key={appointment.id} 
            {...appointment}
            />
          )}
        <Appointment key="last" time="5pm" />
        
      </section>
    </main>
  );
}

