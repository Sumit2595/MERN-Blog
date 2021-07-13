import React,{useContext} from 'react'
import Navbar from '../components/Navbar'
import Container from '../components/Container'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import { CredentialsContext } from '../App'
//import Userpage from '../components/Report';
const Homepage = () => {
    const [credentials, setCredentials] = useContext(CredentialsContext);
    console.log('user name and info ' ,credentials); 
    const logout=()=>{
         setCredentials(null); 
         localStorage.clear();
    }
    return (
        <>
         <Navbar/>
         <div class="container">
         {!credentials && <h1>Please Register/Login before Acccesing the blogs</h1>}
         {credentials && <h3>Welcome {credentials.userName}</h3>}
         {credentials && <button onClick={logout}>Log out</button>}
        { credentials && <Container username={credentials.userName}/> }
         </div>
        </>
    )
}

export default Homepage
