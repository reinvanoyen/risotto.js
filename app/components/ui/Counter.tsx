import React, { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0);

    return <button onClick={() => setCount(count + 1)}>Increment {count}</button>;
};

export default Counter;