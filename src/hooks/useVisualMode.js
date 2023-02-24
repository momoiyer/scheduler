import { useState } from 'react';

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      history.pop();
    }
    setMode(newMode);
    setHistory(prev => [...prev, newMode]);
  };

  const back = () => {
    if (history.length > 1) {
      history.pop();
      const previousMode = history[history.length - 1];
      setMode(previousMode);
    }
  };

  return { mode, transition, back };

}