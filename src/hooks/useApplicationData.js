import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  const getSpotsRemaining = function (dayObj, appointments) {
    let count = 0;

    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        count++;
      }
    }
    return count;
  };

  const updateSpots = function (dayName, days, appointments) {
    const day = days.find((item) => item.name === dayName);
    const unbookedSpots = getSpotsRemaining(day, appointments);

    const newState = days.map((item) => {
      if (item.name === dayName) {
        return { ...item, spots: unbookedSpots };
      }
      return item;
    });
    return newState;
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const spots = updateSpots(state.day, state.days, appointments);

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        setState((prevState) => ({
          ...prevState,
          appointments,
          days: spots,
        }));
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const spots = updateSpots(state.day, state.days, appointments);

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          appointments,
          days: spots,
        });
      });
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
