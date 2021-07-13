import React from 'react'
import { useState } from 'react'
import { useHistory } from "react-router-dom";
const Queries = (props) => {
    const [question,setQuestion]=useState("")
    const [listItems,setListItems]=useState([]);
    const username=props.username;
    const [quesData,setQuesData]=useState([])
    let getArray;
   const checkButton = (e)=>{
       if(question==="")
        return;   
    setQuestion("");   
    fetch(`http://localhost:4000`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                username,
                question
              }),
        })
         .then(()=>{
            window.location.reload(); 
         })

   };
   const history=useHistory();
   const getQuestion = (e)=>{
        setQuestion(e.target.value);
        console.log(question);
   }
   const setArray=()=>{
         setQuesData([]);
   }
    return (
        <div>
           <div className="form-group">
    <label for="exampleFormControlTextarea1"><h2>Enter your queries in the given text box</h2></label>
    <textarea className="form-control" id="studentQuery" rows="3" onChange={getQuestion} value={question}></textarea>
       </div>
       <button type="button" class="btn btn-primary" onClick={checkButton}>Ask Query</button>
       <br/>
       <br/>
       {quesData.length!=0 && <p>{quesData.map((query) =>
                <>
                <li> <b>Asked By:</b>{query.username}</li>
                <li> <b>question asked:</b> {query.question}</li>
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

export default Queries
