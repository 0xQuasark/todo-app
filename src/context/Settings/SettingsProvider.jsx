'use strict';

import React, { useState } from 'react';

export const SettingsContext = React.createContext();

function SettingsProvider(props) {

  const [displayItems, setDisplayItems] = useState(3);
  const [hideCompleted, setHideCompleted] = useState(true);
  // const [sortDifficulty, setSortDifficulty] = useState('default');
  const [sort, setSort] = useState('difficulty');   // copying Jacob's name during demo

  return (
    <SettingsContext.Provider value = {{ displayItems, hideCompleted, sort}}>
      {props.children}
    </SettingsContext.Provider>
  )

}

export default SettingsProvider;