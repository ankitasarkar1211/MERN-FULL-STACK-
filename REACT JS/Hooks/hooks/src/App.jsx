// import React, { useRef } from "react";
// function FocusInput() {
//   const inputRef = useRef(null);
//   const handleFocus = () => {
//     inputRef.current.focus();
//   };
//   return (
//     <div>
//       <input ref={inputRef} type="text" />
//       <button onClick={handleFocus}>Focus Input</button>
//     </div>
//   );
// }
// export default FocusInput;
// import React, { useState, useEffect, useRef } from "react";
// function PreviousValue() {
//   const [count, setCount] = useState(0);
//   const prevCount = useRef();
//   useEffect(() => {
//     prevCount.current = count;
//   });
//   return (
//     <div>
//       <h2>Current: {count}</h2>
//       <h3>Previous: {prevCount.current}</h3>
//       <button onClick={() => setCount(count + 1)}>Increase</button>
//     </div>
//   );
// }
// export default PreviousValue;

// import React, { useState, useMemo } from "react";
// function ExpensiveComponent() {
//   const [count, setCount] = useState(0);
//   const [text, setText] = useState("");
//   const expensiveCalculation = (num) => {
//     console.log("Calculating...");
//     for (let i = 0; i < 1000000000; i++) {}
//     return num * 2;
//   };
//   const result = useMemo(() => {
//     return expensiveCalculation(count);
//   }, [count]);
//   return (
//     <div>
//       <h2>Result: {result}</h2>
//       <h2>Count: {count}</h2>
//       <button onClick={() => setCount(count + 1)}>Increase</button>
//       <input
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Type something"
//       />
//     </div>
//   );
// }
// export default ExpensiveComponent;

// import React, { useState, useCallback } from "react";
// const Child = React.memo(({ handleClick }) => {
//   console.log("Child Rendered");
//   return <button onClick={handleClick}>Click Me</button>;
// });
// function Parent() {
//   const [count, setCount] = useState(0);
//   const handleClick = useCallback(() => {
//     console.log("Button clicked");
//   }, []);
//   return (
//     <div>
//       <h2>{count}</h2>
//       <button onClick={() => setCount(count + 1)}>Increase</button>
//       <Child handleClick={handleClick} />
//     </div>
//   );
// }
// export default Parent;


import React, { useState, useRef, useMemo, useCallback } from "react";
// Child component that only re-renders when props change
const Child = React.memo(({ handleClick, result }) => {
  console.log("Child Rendered"); // To see when child re-renders
  return (
    <div>
      <button onClick={handleClick}>Increment</button>
      <p>Memoized Result: {result}</p>
    </div>
  );
});
function App() {
  const [count, setCount] = useState(0);
  const inputRef = useRef(null); // useRef to access DOM input
  const [multiplier, setMultiplier] = useState(1);
  // useCallback to memoize the increment function
  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
    if (inputRef.current) {
      console.log("Input Value:", inputRef.current.value);
    }
  }, []);
  // useMemo to compute expensive calculation only when dependencies change
  const computedValue = useMemo(() => {
    console.log("Calculating memoized result...");
    return count * multiplier;
  }, [count, multiplier]);
  return (
    <div style={{ padding: "20px" }}>
      <h2>useRef, useMemo, useCallback Demo</h2>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type something here..."
        style={{ marginBottom: "10px" }}
      />
      <div>
        <label>
          Multiplier:
          <input
            type="number"
            value={multiplier}
            onChange={(e) => setMultiplier(Number(e.target.value))}
            style={{ marginLeft: "5px" }}
          />
        </label>
      </div>
      <p>Count: {count}</p>
      <Child handleClick={handleIncrement} result={computedValue} />
    </div>
  );
}
export default App;
