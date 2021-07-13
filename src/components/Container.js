import React from 'react'
import Queries from './Queries'
import Unanswered from './Unanswered';
import Answered from './Answered';
const Container = (props) => {
    console.log(props);
    return (
        <div>
            <div className="container">
        <div className="row">
        <div className="col-sm">
          <Queries username={props.username}/>
          <Answered />
         </div>
    <div className="col-sm">
      <h2>Unanswered Queries</h2>
       <Unanswered />
    </div>
  </div>
</div>
        </div>
    )
}

export default Container
