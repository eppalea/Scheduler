import { useState } from 'react';

export default function useVisualMode(initial) {
  
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {

    if (replace) {
      setHistory((prevState) => [...prevState.slice(0, -1), newMode]); // removes last item, returns rest of array
    } else {
      setHistory((prevState) => [...prevState, newMode]);
    }
  };
  
  const back = () => {
   
    if (history.length < 2) {
      return;
    } 

    setHistory(prev => {
      // console.log('prev:', ...prev)
      const newHistory = [...prev];
      newHistory.pop();
      // console.log('newHistory after pop:', newHistory)
      return newHistory
    });  
  };  

  const mode = history.slice(-1)[0]; // create off history
  return { mode, transition, back };
}
