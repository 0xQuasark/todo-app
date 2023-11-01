'use strict';

import { localStorageColorSchemeManager } from '@mantine/core';
import React, { useEffect, useState } from 'react';

export const SettingsContext = React.createContext();

function SettingsProvider(props) {

  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [hideCompleted, setHideCompleted] = useState(true);
  // const [sortDifficulty, setSortDifficulty] = useState('default');
  const [sort, setSort] = useState('difficulty');   // copying Jacob's name during demo

  useEffect(() => {
    // This function saves to localStorage when any of the variables change
    const settings = {
      itemsPerPage,
      hideCompleted,
      sort
    };
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [hideCompleted, itemsPerPage, sort]);

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

  const toggleHideCompleted = () => setHideCompleted(!hideCompleted);

  const changeDisplayItems = (num) => {
    if (typeof(num) === 'number') {
      setItemsPerPage(num);
    } else {
      console.log('Please give me a number');
    }
  }

  const updateSort = (option) => {
    // add logic one day
  }

  return (
    <SettingsContext.Provider value = {{ itemsPerPage, hideCompleted, sort, toggleHideCompleted, changeDisplayItems}}>
      {props.children}
    </SettingsContext.Provider>
  )

}

export default SettingsProvider;