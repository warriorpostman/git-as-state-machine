import React from "react"

import { State, Transition } from './State';
import './Diagram.css'

const Diagram = ({ gitState }) => {
  const orderedStates = [
    'no_changes',
    // 'stashed',
    'unstaged',
    'staged',
    'committed'
  ];

  return (
    <div className="state-diagram">
      {orderedStates.map((s, idx) => 
        <React.Fragment
            key={`state-${idx}-${s}`}
        >
          {idx !== 0 && <Transition />}
          <State 
            current={gitState === s}
          >
            {s}
          </State>
        </React.Fragment>
      )}
    </div>
  );
}

export default Diagram
