import React, { useContext, useState } from 'react';
import { Pagination } from '@mantine/core';
import { SettingsContext } from '../../context/Settings/SettingsProvider';

const List = ({ list, toggleComplete }) => {
  const settings = useContext(SettingsContext);
  const [currentPage, setCurrentPage] = useState(1);

  // Function to calculate the total number of pages based on the list length and items per page setting
  const calculateTotal = () => Math.ceil(list.length / settings.itemsPerPage);

  // Calculate the start index for the items to be rendered based on the current page and items per page setting
  const startIndex = (currentPage - 1) * settings.itemsPerPage;
  // Calculate the end index for the items to be rendered based on the start index and items per page setting
  const endIndex = startIndex + settings.itemsPerPage;
  // Slice the list to get the items to be rendered based on the start and end indices
  const itemsToRender = list.slice(startIndex, endIndex);

  // Return the component
  return (
    <>
      {itemsToRender.map(item => (
        <div key={item.id}>
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
          <hr />
        </div>
      ))}
      <Pagination page={currentPage} total={calculateTotal()} onChange={setCurrentPage} />
    </>
  );
};

export default List;