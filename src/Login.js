import React, { useState } from 'react';
import './App.css';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";


function Login() {
  axios.defaults.baseURL = 'http://localhost:8081/e-shop';

  // Important: If axios is used with multiple domains, the AUTH_TOKEN will be sent to all of them.
  // See below for an example using Custom instance defaults instead.
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userMsg, setUserMsg] = useState('');
  const authenticate = () => {
    axios.post("/userLogin", {
      "userName": userName,
      "password": password
    }).then(resp => {
      setUserMsg(resp.data);
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        <Card className="login-container">
          <div className="title">Login</div>
          
          
          <TextField className="login-elements" id="userName-entry" label="User Name" value={userName} onChange={(e) => setUserName(e.target.value)} />

          <TextField className="login-elements" id="password-entry" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <div className="warningMessage">{userMsg}</div>
          <Button className="login-elements" variant="contained" color="primary" disableElevation onClick={() => authenticate()}>
            Login
          </Button>
        </Card>
      </header>
    </div>
  );
}

export default Login;
