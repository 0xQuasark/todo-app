import React from 'react';
import { SettingsContext } from '../../context/Settings/SettingsProvider';
import useForm from '../../hooks/form';

const Todo = ({ handleChange, handleSubmit }) => {

  const settings = React.useContext(SettingsContext);


  return (
    <>
      <form onSubmit={handleSubmit}>

        <h2>Add To Do Item</h2>

        <label>
          <span>To Do Item</span>
          <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
        </label>

        <label>
          <span>Assigned To</span>
          <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
        </label>

        <label>
          <span>Difficulty</span>
          <input onChange={handleChange} defaultValue={settings.sort} type="range" min={1} max={5} name="difficulty" />
        </label>

        <label>
          <button type="submit">Add Item</button>
        </label>
      </form>


    </>
  );
};

export default Todo;
