import React from 'react'
import { useState,useEffect,useH} from 'react';
import { useHistory } from "react-router-dom";
import Navbar from './Navbar';
const UserLogin = () => {
  const quesAsked=localStorage.getItem("queriesAsked");
  const user_name=localStorage.getItem("user");
  const history = useHistory();
    console.log('User name',user_name)
      if(user_name===null || quesAsked===null)
      {  
        history.push("/login");
        alert('First Login and then search')
      }
  const [queries,setQueries] = useState(JSON.parse(quesAsked));
    const [answerQuery,setAnswer] = useState("");
    useEffect(() => {
         fetch(`http://localhost:4000/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((queries) =>{ setQueries(queries)
                    console.log(queries.length);            
          })
      }, []);
      console.log(queries);
      const handleInput = (e)=>{
         console.log(e.target.value);
         setAnswer(e.target.value);
      } 
      const Query = (key,userName,ques,answer)=>{
         if(answer==="")
          {    
            alert('Please type something');
                 return;        
          }
          console.log(localStorage.getItem("user"));
        fetch(`http://localhost:4000/answer`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                 key,
                 userName,
                 ques,
                 answer
              }),
        })
        localStorage.removeItem('queriesAsked');
         console.log(`button clicked`);
         history.push("/login");
      }  
    return (
        <div>
            <Navbar /> 
            {queries &&
             <>
            <h1>From:{queries.userName}</h1>
            <h1>Question Asked:{queries.userQuestion}</h1>
            <div className="form-group">
    <label for="exampleFormControlTextarea1"><h2>Enter your answers in the given text box</h2></label>
    <textarea className="form-control" id="studentQuery" rows="3" onChange={handleInput}></textarea>
    <br/>
    <button onClick={()=>Query(queries.key,queries.userName,queries.userQuestion,answerQuery)}>Post Answer</button>
       </div>
         </>
     } 
      {user_name && queries===null && <h1>Click on the Answer button in the provided Unanswered Question</h1>}   
      {user_name===null && queries===null && <h1>Please Login to answer the asked question</h1>}
        </div>
    )
}

export default UserLogin
