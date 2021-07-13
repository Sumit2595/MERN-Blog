import React from 'react'
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

const Unanswered = () => { 
  const [queries,setQueries] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:4000/queries`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((queries) => setQueries(queries));
      }, []);
      const history = useHistory();
      const handleClicks=async (key,userName,userQuestion)=>{
         const userLoggedIn=localStorage.getItem("user");
         const tempUser=JSON.parse(userLoggedIn);
         console.log(tempUser);
          if(tempUser.userName===userName)
           {   var answer = window.confirm("You yourself asked the question and want to answer.Are u sure you want to continue");
               if (!answer)
                  return;
              }  
        // console.log(res);
        await fetch(`http://localhost:4000/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            key,
            userName,
            userQuestion,
          }),
        });
          const WhoAsked={
            key:key,
            userName:userName,
            userQuestion:userQuestion
          }
         console.log('The person who asked',WhoAsked);
           localStorage.setItem('queriesAsked',JSON.stringify(WhoAsked));
            history.push("/user");
      } 
    return (
        <div>
            {queries.length==0 && <h4>No queries to answer</h4>}
            {queries.map((res) => (
        <div key={res._id}>
          <li><b> Question Asked By:</b>{res.username}</li>
          <li> <b>Question:</b>{res.question}</li>
           <button onClick={()=>handleClicks(res._id,res.username,res.question)}>Answer</button>
           <hr  style={{
          color: '#000000',
          backgroundColor: '#000000',
          height: .5,
          borderColor : '#000000'
      }}/>
        </div>
      ))}  
        </div>
    )
}

export default Unanswered
