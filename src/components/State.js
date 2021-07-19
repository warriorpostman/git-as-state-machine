import React from "react"

import './State.css';

export const State = ({ children, current }) => {
  return (
    <div className={current ? "current-state" : "state"}>
      {children}
    </div>
  );
}

export const Transition = () => (
  <div className="transition">⬇️</div>
);

export default State;
