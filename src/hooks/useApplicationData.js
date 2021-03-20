import { useState, useEffect } from 'react'
import axios from 'axios';

export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

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
    
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then(() => {
      setState((prevState) => ({
        ...prevState,
        appointments
      }));
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

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => {
      setState({
        ...state,
        appointments
      })
    })

  };

  useEffect(() => {
     
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then((all) => {
        setState(prev => ({
          ...prev, 
          days: all[0].data, 
          appointments: all[1].data, 
          interviewers: all[2].data 
        }));  
      });
  }, [])

  return { state, setDay, bookInterview, cancelInterview };
}

  
  
