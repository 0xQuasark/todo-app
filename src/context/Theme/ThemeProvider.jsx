import { useEffect } from 'react';
import React, { useState } from 'react';

export const ThemeContext = React.createContext();

function SettingsProvider(props){
  const [mode, setMode] = useState('light');
  const [primaryColor, setPrimaryColor] = useState('#89CFF0');
  const [secondaryColor, setSecondaryColor] = useState('#ffffff');

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  }

  useEffect( () => {
    if (mode === 'light') {
      setPrimaryColor('#89CFF0')
      setSecondaryColor('#ffffff')
    } else {
      setPrimaryColor('#ffffff')
      setSecondaryColor('#89CFF0')
    }
  }, [mode]);


  return (
    <ThemeContext.Provider value = {{ mode, primaryColor, secondaryColor, toggleMode }}>
      {props.children}
    </ThemeContext.Provider>
  )
}
