'use strict';

import React, { useState } from 'react';

export const SettingsContext = React.createContext();

function SettingsProvider(props) {

  const [displayItems, setDisplayItems] = useState(3);
  const [hideCompleted, setHideCompleted] = useState(true);
  const [sortDifficulty, setSortDifficulty] = useState('default');

  return (
    <SettingsContext.Provider value = {{ displayItems, hideCompleted, sortDifficulty}}>
      {props.children}
    </SettingsContext.Provider>
  )

}

export default SettingsProvider;