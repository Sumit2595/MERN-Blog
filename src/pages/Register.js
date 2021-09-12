import React from 'react'
import { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import Navbar from '../components/Navbar';
import { CredentialsContext } from '../App';
import { CheckError } from './Login';
var CryptoJS = require("crypto-js");
  const Register=()=> {
    const [userName,setName]=useState("");
    const [userPass,setPass]=useState("");
    const [error, setError] = useState("");
    const [,setCredentials] = useContext(CredentialsContext);
    const CheckError=async (response)=> {
      if (!response.ok) {
        const { message } = await response.json();
        throw Error(message);
      }
      return response.json();
    };
    const getName=(e)=>{
        console.log(e.target.value); 
        setName(e.target.value);
    }
    const getPass=(e)=>{
      console.log(e.target.value);
      const password=e.target.value;
      const ciphertext = CryptoJS.AES.encrypt(password, 'secret key 123').toString();
       console.log("The encrypted password is",ciphertext); 
      setPass(ciphertext);
    }
    const register = (e) => {
        e.preventDefault();
         if(userName==="" || userPass==="")
         {   alert('Either Username or password is Empty')
             return;
         }
        fetch(`http://localhost:4000/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName,
            userPass,
          }),
        })
        .then(CheckError)
        .then(()=>{
           setCredentials({
               userName,
               userPass  
           });
           const value={
            userName:userName,
           userPass:userPass
      }
      localStorage.setItem('user',JSON.stringify(value));
           history.push("/");   
        })
        .catch((err)=>{
          setError(err.message);
        })
      };
      const history=useHistory();
    return (
        <div>
           <Navbar />
           <div class="container">
           <h1>Register User</h1>
           {error && <span style={{ color: "red" }}>{error}</span>}
           <form onSubmit={register}>
           <input type="text" onChange={getName} placeholder="Username" />
           <br></br>
           <input type="password" onChange={getPass} placeholder="password" /> 
           <br></br>
           <button type="submit">Register</button>
           </form>
           </div>
        </div>
    )
}

export default Register
