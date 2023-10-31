'use strict';

import { localStorageColorSchemeManager } from '@mantine/core';
import React, { useEffect, useState } from 'react';

export const SettingsContext = React.createContext();

function SettingsProvider(props) {

  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [hideCompleted, setHideCompleted] = useState(true);
  // const [sortDifficulty, setSortDifficulty] = useState('default');
  const [sort, setSort] = useState('difficulty');   // copying Jacob's name during demo


  // save our settings
  const saveSettings = () => {
    const settings = {
      itemsPerPage,
      hideCompleted,
      sort
    };
    localStorage.setItem('settings', JSON.stringify(settings));
    // console.log('saved: ', settings)
  }

  // load the settings (if any)
  useEffect(() => {
    const savedSettings = localStorage.getItem('settings');

    if (savedSettings) {
      const { itemsPerPage, hideCompleted, sort} = JSON.parse(savedSettings);
      setItemsPerPage(itemsPerPage);
      setHideCompleted(hideCompleted);
      setSort(sort);
    }
    // console.log('loaded: ', JSON.parse(savedSettings))
  }, []); // an empty array here makes it load only once on mount

  saveSettings();
  return (
    <SettingsContext.Provider value = {{ itemsPerPage, hideCompleted, sort}}>
      {props.children}
    </SettingsContext.Provider>
  )

}

export default SettingsProvider;