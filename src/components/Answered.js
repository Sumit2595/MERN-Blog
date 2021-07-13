import React from 'react'
import { useState,useEffect} from 'react';
const Answered = () => {
    const [answers,setAnswers] = useState([]);
    useEffect(async () => {
        await fetch(`http://localhost:4000/answer`, {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
         },
       })
         .then((response) => response.json())
         .then((answers) =>{ setAnswers(answers)
                   console.log(answers);           
         })
     }, []);
    return (
        <div>
          {answers.length==0 && <h1>No Query Answered</h1>}
          {answers.length!=0 && <h1>Answered Query</h1> &&<p>{answers.map((ans) =>
                <>
                <li> <b>Asked By:</b>{ans.name}</li>
                <li> <b>question asked:</b>{ans.question}</li>
                <li> <b>answer:</b> {ans.user_answer}</li>
                <hr  style={{
          color: '#000000',
          backgroundColor: '#000000',
          height: .5,
          borderColor : '#000000'
      }}/>
                  </>
                )}</p>}
        </div>
    )
}

export default Answered
