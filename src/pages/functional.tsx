import { useState } from "react";

function Functional() {
  console.log("Build function");
  const [count, setCount] = useState(0);

  function onClick() {
    setCount(() => count + 1);
  }

  return (
    <>
      <div>Functional Component Count {count}</div>
      <button onClick={onClick}>Count</button>
    </>
  );
}

export default Functional;
