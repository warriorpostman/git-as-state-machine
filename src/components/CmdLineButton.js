import React from "react"

const CmdLineButton = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      <code>{text}</code>
    </button>
  );
}

export default CmdLineButton
