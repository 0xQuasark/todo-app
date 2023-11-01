import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from './context/auth/AuthProvider';


import useForm from './hooks/form';
import Header from './Components/Header';
import Footer from './Components/Footer';
import List from './Components/List';
import Todo from './Components/Todo';
import Login from './Components/Login/Login'
import Auth from './Components/Auth/Auth'

import { v4 as uuid } from 'uuid';

const App = () => {
  // let userForTask

  const auth = useContext(AuthContext);
  // console.log('contents of auth: ', auth)
  // if (auth.user) {
  //   userForTask = auth.user;
  // } else {
  //   userForTask = 'unknown';
  // }

  const [defaultValues] = useState({ difficulty: 4 });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  // console.log('auth content:', auth)

  function addItem(item) {
    console.log('auth status:', auth)
    item.id = uuid();
    item.complete = false;
    item.assignee = auth.user;
    item.difficulty = defaultValues.difficulty;
    console.log('Adding item: ', item);
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter( item => item.id !== id );
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map( item => {
      if ( item.id === id ) {
        item.complete = !item.complete;
      }
      return item;
    });
    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily. 
    // disable code used to avoid linter warning 
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [list]);  


  return (
    <>
      {/* <Routes>
        <Route path="/settings" component={SettingsPage} />
      </Routes> */}
      <Login />

      {auth.isLoggedIn
        ?  <>
            <Auth capability={'create'}>
              <p>You can create, so you are allowed to view me!</p>
            </Auth>
            <Header incomplete={incomplete}/>
            <Todo handleSubmit={handleSubmit} />
            <List list={list} toggleComplete={toggleComplete} />
          </>

        : <p>Please Log In</p>
      }
      <Footer />
    </>
  );
}

export default App;