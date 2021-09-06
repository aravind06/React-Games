import React, { useState } from 'react';
import '../App.css';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect, useSelector } from "react-redux";
import {userAuthentication} from "../action";
import { useHistory } from 'react-router-dom';

function Login({userAuthentication}) {


  const [userData, setUserData] = useState({
    userName: "",
    password: ""
  });

  const loginState = useSelector(state => state.loginReducer.loginStatus);
  const history = useHistory();
  if (loginState.statusCode === "200") {
    history.push('/home')
  }
  return (
    <div className="App">
      <header className="App-header">
        <Card className="login-container">
          <div className="title">Login</div>
          
          
          <TextField className="login-elements" id="userName-entry" label="User Name" value={userData.userName} onChange={(e) => setUserData({...userData, userName: e.target.value})} />

          <TextField className="login-elements" id="password-entry" label="Password" type="password" value={userData.password} onChange={(e) => setUserData({...userData, password: e.target.value})} />

          <div className="warningMessage">{loginState.statusMessage}</div>
          <Button className="login-elements" variant="contained" color="primary" disableElevation onClick={() => userAuthentication(userData)}>
            Login
          </Button>
        </Card>
      </header>
    </div>
  );
}


export default connect(null, {userAuthentication})(Login);
