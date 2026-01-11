import React from "react";
import Child from "./Child";

function Parent() {
  const employeeName = "Rahul";
  const department = "IT";

  return (
    <div>
      <h2>Parent Component</h2>
      <Child name={employeeName} dept={department} />
    </div>
  );
}

export default Parent;
