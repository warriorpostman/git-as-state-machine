import React from 'react';
import './Terminal.css'

const Terminal = ({ commands }) => {
  return (
    <div className="terminal">
      {commands.map((cmd, idx) => 
        <div key={`${cmd.timestamp}-cmd`}><b>&gt;</b> {cmd.text}</div>
      )}
    </div>
  );
}

export default Terminal;

