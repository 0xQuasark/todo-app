import { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth/AuthProvider';

function Login() {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  const auth = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    // console.log('username:', username, 'password:', password)
    auth.login(username, password);
  }

  // console.log('auth stuff:', auth)
  return (
    <div>
      {!auth.isLoggedIn
        ? (
          <form onSubmit={handleSubmit}>
            <input name="username" type="text" placeholder="username" />
            <input name="password" type="text" placeholder="password" />
            <button type="submit">Login</button>
          </form>)
        : (<button onClick={auth.logout}>Logout</button>)
      }
    </div>
  )

}

export default Login;