import React from "react";

function GreatGrandChild(props) {
  return (
    <div>
      <h5>Great Grand Child Component</h5>
      <p>Employee Name: {props.name}</p>
      <p>Department: {props.dept}</p>
    </div>
  );
}

export default GreatGrandChild;