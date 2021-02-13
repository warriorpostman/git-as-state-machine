import React from "react"

import './Diagram.css'

const Diagram = ({ gitState }) => {
  const orderedStates = [
    'no_changes',
    'unstaged',
    'staged',
    'committed'
  ];

  return (
    <div className="state-diagram">
      {orderedStates.map(s => 
        <div 
          className={gitState === s ? "current-state" : "state"}
        >
          {s}
        </div>
      )}
    </div>
  );
}

export default Diagram
