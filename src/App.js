import React,{useState,useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import Register from './pages/Register';
import  Homepage  from './pages/Homepage';
import Login from './pages/Login';
import UserLogin from './components/UserLogin';
export const CredentialsContext = React.createContext(); 
function App(e) {
  const userInfo=localStorage.getItem("user");
  // console.log('Logged in user',loggedInUser);
  const credentialsState = useState(JSON.parse(userInfo));
  return (
    <div className="App">
      <CredentialsContext.Provider value={credentialsState}>
      <Router>
        <Switch>
          <Route exact path="/">
             <Homepage/>
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/user">
            <UserLogin />
          </Route>
        </Switch>
      </Router>
      </CredentialsContext.Provider>
    </div>
  );
}

export default App;
