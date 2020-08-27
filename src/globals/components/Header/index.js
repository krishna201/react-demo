import React from "react";
import "./header.scss";
import { withRouter } from "react-router";
class MyHeader extends React.Component {
  render() {
    return (
      
        <div className="header">
         
        <span >TODO list</span>
           <span>React Js</span>
          
        </div>
      
    );
  }
}
export default withRouter(MyHeader);
