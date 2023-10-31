import React, { useContext } from 'react';
import { Pagination } from '@mantine/core';
import { SettingsContext } from '../../context/Settings/SettingsProvider';


const List = ({ list, toggleComplete }) => {

  const settings = useContext(SettingsContext); // opt in to our providers data! If no provider is present, this will be undefined.
  const calculateTotal  = () => Math.ceil(list.length / settings.displayItems);
  // console.log(calculateTotal());
  
  const handlePagination  = () => {
    
    console.log('Pagination happening');
    
  }

  return (
  <>
    {list.map(item => (
      <div key={item.id}>
        <p>{item.text}</p>
        <p><small>Assigned to: {item.assignee}</small></p>
        <p><small>Difficulty: {item.difficulty}</small></p>
        <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
        <hr />
      </div>
    ))}
    <Pagination value={1} total={calculateTotal()} onChange={handlePagination}/>
  </>
  )
};

export default List;
