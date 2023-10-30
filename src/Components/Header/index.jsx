import React from 'react';

const Header = ({ incomplete }) => (
  <header data-testid="todo-header">
    <h1 data-testid="todo-h1">To Do List: {incomplete} items pending</h1>
  </header>
);

export default Header;