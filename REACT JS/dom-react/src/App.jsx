import React, { useRef } from "react";

function DomExample() {
  const headingRef = useRef(null);
  const inputRef = useRef(null);

  const changeDom = () => {
    // Change text
    headingRef.current.innerText = "DOM Updated using React";

    // Change style
    headingRef.current.style.color = "blue";

    // Focus input field
    inputRef.current.focus();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 ref={headingRef}>Original Heading</h2>

      <input
        ref={inputRef}
        type="text"
        placeholder="Click button to focus"
      />

      <br /><br />

      <button onClick={changeDom}>
        Change DOM
      </button>
    </div>
  );
}

export default DomExample;