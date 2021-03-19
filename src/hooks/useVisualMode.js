import React, { useState } from 'react';

export default function useVisualMode(initial) {
  
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    // console.log('mode is:', mode);
    // console.log("transition newMode: ", newMode);
    setMode(newMode);
    
    if (replace) {
      return initial;
    } 

    // when transition is called, adds new mode to our history
    const newHistory = [...history];
    newHistory.push(newMode);
    // console.log("newHistory is: ", newHistory)
    setHistory(newHistory);
  }

  
  const back = () => {
   
    if (history.length < 2) {
      return;
    } 

    // console.log('back history is:', history)
    const prevMode = history[history.length - 2]
    // console.log('prevMode is:', prevMode)
    setMode(prevMode);
   
    setHistory(prev => {
      // console.log('prev:', ...prev)
      const newHistory = [...prev];
      newHistory.pop();
      // console.log('newHistory after pop:', newHistory)
      return newHistory
    });  
  };  

  return { mode, transition, back };
}
