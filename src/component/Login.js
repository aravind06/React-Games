import React from 'react';
import '../App.css';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect, useSelector } from "react-redux";
import { userAuthentication, setUserName, setPassword } from "../action";
import { useHistory } from 'react-router-dom';

function Login(mapActiontoProps) {


  const userData = useSelector(state => state.loginReducer.userData);
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


          <TextField className="login-elements" id="userName-entry" label="User Name" value={userData.userName} onChange={(e) => mapActiontoProps.setUserName(e.target.value)} />

          <TextField className="login-elements" id="password-entry" label="Password" type="password" value={userData.password} onChange={(e) => mapActiontoProps.setPassword(e.target.value)} />

          <div className="warningMessage">{loginState.statusMessage}</div>
          <Button className="login-elements" variant="contained" color="primary" disableElevation onClick={() => mapActiontoProps.userAuthentication(userData)}>
            Login
          </Button>
        </Card>
      </header>
    </div>
  );
}

const mapActiontoProps = {
  userAuthentication,
  setUserName,
  setPassword
}

export default connect(null, mapActiontoProps)(Login);
