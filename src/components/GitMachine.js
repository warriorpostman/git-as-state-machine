import React, { useState } from "react"
import { useMachine } from '@xstate/react'

import Diagram from './Diagram';
import CmdLineButton from './CmdLineButton';
import CmdLineButtonItem from './CmdLineButtonItem';
import Terminal from './Terminal';
import { createGitMachine } from './GitStateMachine';

import './GitMachine.css';

const GitMachine = () => {
  const [reset, triggerReset] = useState(false);
  console.log('reset?', reset);

  const [gitState, send] = useMachine(createGitMachine());
  const [commands, setCommands] = useState([]);

  const transition = (action) => { 
    const commandsCopy = [...commands];
    commandsCopy.push({ timestamp: Date.now(), text: action.text });
    setCommands(commandsCopy);
    // Aksshually, newState is like...the old state? Not sure why it works that way.
    send(action.id);
    // console.log("new state: ", newState.value);
    console.log("action", action.id, "gitState", gitState.value)
  };

  const startOver = () => {
    triggerReset(true);
    // useMachine(createGitMachine());
    // console.log('This is basically the real world example of "start over!!!"');
    // const what = send('RESET_HARD');
    //console.log('Derp ? basically the real world example of "start over!!!"', 
    //  what, gitState.value);
  }

  const actions = [
    {
      id: 'CHANGE_FILE',
      text: "echo 'Hello' > new_file.txt"
    }, {
    //   id: 'STASH_CHANGE', 
    //   text: "git stash" 
    // }, {
      // id: 'STASH_APPLY', 
      // text: "git stash apply" 
    // }, {
      id: 'UNDO_FILE_CHANGE', 
      text: "rm new_file.txt" 
    }, {
      id: 'STAGE_CHANGE', 
      text: "git add ."
    }, {
      id: 'CHECKOUT_CHANGE', 
      text: "git checkout ."
    }, {
      id: 'COMMIT_CHANGE', 
      text: "git commit"
    }, {
      id: 'RESET', 
      text: "git reset ." 
    }, {
      id: 'RESET_SOFT', 
      text: "git reset HEAD~1" 
    }, {
      id: 'RESET_HARD', 
      text: "git reset --hard HEAD~1"
    }
  ];

  return (
    <div>
      <div>
        <Diagram gitState={gitState.value} />
        <div className="command-ui">
          <ul>
            {actions.map(action => {
              return (
                  <CmdLineButtonItem
                    key={action.id}
                    onClick={() => transition(action)}
                    displayText={action.text}
                  />
                );
            })}
          { false &&
            <li>
              <CmdLineButton 
                onClick={() => startOver()} 
                text="Start over!"
              />
            </li>
          }
          </ul>
          <Terminal 
            commands={commands} 
          />
        </div>
      </div>
    </div>
  );
}

export default GitMachine
