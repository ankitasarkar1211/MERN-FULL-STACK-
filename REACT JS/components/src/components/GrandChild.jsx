
import React from "react";
import GreatGrandChild from "./GreatGrandChild";

function GrandChild(props) {
  return (
    <div>
      <h4>GrandChild Component</h4>
      <GreatGrandChild name={props.name} dept={props.dept} />
    </div>
  );
}

export default GrandChild;