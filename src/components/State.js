import React from "react"

import './State.css';

const State = ({ children, current }) => {
  return (
    <div className={current ? "current-state" : "state"}>
      {children}
    </div>
  );
}

export default State
