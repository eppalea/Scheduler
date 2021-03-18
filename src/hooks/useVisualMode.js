import React, { useState } from 'react';

export default function useVisualMode(initial) {
  
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode) => {
    console.log("mode:", mode)
    console.log("newMode:", newMode)
    setMode(newMode);
  }

  return { mode, transition }
}
