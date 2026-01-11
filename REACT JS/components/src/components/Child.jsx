import React from "react";
import GrandChild from "./GrandChild";

function Child(props) {
  return (
    <div>
      <h3>Child Component</h3>
      <GrandChild name={props.name} dept={props.dept} />
    </div>
  );
}

export default Child;