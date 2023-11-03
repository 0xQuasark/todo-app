'use strict';
import React, { useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios';

const testUsers = {
  Administrator: {
    password: 'admin',
    name: 'Administrator',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJywncmVhZCcsJ3VwZGF0ZScsJ2RlbGV0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.pAZXAlTmC8fPELk2xHEaP1mUhR8egg9TH5rCyqZhZkQ'
  },
  Editor: {
    password: 'editor',
    name: 'Editor',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWRpdG9yIiwicm9sZSI6ImVkaXRvciIsImNhcGFiaWxpdGllcyI6IlsncmVhZCcsJ3VwZGF0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.3aDn3e2pf_J_1rZig8wj9RiT47Ae2Lw-AM-Nw4Tmy_s'
  },
  Writer: {
    password: 'writer',
    name: 'Writer',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV3JpdGVyIiwicm9sZSI6IndyaXRlciIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.dmKh8m18mgQCCJp2xoh73HSOWprdwID32hZsXogLZ68'
  },
  User: {
    password: 'user',
    name: 'User',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiY2FwYWJpbGl0aWVzIjoiWydyZWFkJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.WXYvIKLdPz_Mm0XDYSOJo298ftuBqqjTzbRvCpxa9Go'
  },
  2: {
    password: '2',
    name: 'Administrator',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJywncmVhZCcsJ3VwZGF0ZScsJ2RlbGV0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.pAZXAlTmC8fPELk2xHEaP1mUhR8egg9TH5rCyqZhZkQ'
  },
  1: {
    password: '1',
    name: 'Editor',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWRpdG9yIiwicm9sZSI6ImVkaXRvciIsImNhcGFiaWxpdGllcyI6IlsncmVhZCcsJ3VwZGF0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.3aDn3e2pf_J_1rZig8wj9RiT47Ae2Lw-AM-Nw4Tmy_s'
  },
};

export const AuthContext = React.createContext();

function AuthProvider(props) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [capabilities, setCapabilities] = useState(null);

  const login = async (username, password) => {
    // find the user from above and see who matches

    // Basic Auth
    // base64 encoded username:password
    let encondedCredentials = btoa(`${username}:${password}`);

    // send the encoded credentials to the /signin route as a basic auth header
    let response = await axios.post('/signin').set({ Authorization: `Basic ${encondedCredentials}` });

    // token comes back in the response
    if (response.data) {
      validateToken(response.data.token);

    }


    let user = testUsers[username];

    if (user && user.password === password) {
      let tokenPayload = jwtDecode(user.token);
      // console.log('logged in successfully! payload: ', tokenPayload);
      setCapabilities(tokenPayload.capabilities)
      setUser(tokenPayload.name);
      setIsLoggedIn(true);
    } else {
      console.log('error when logging in!', user, username, password);
      setError ({ code: 401, message: 'Incorrect Credentials' });
    }
  }

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  }

  const validateToken = (token) => {
    try {
      let validUser = jwtDecode(token);
      setLoginState(true, token, validUser);
    }
    catch (e) {
      setLoginState(false, null, {capabilities: []}, e);
      console.log('Token Validation Error', e);
    }
  }

  return (
    <AuthContext.Provider value={{ login, logout, user, isLoggedIn, error, capabilities }}>
      {props.children}
    </AuthContext.Provider>
  );


}

export default AuthProvider;