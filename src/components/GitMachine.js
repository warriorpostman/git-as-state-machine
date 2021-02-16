import React, { useState } from "react"
import { useMachine } from '@xstate/react'
import { Machine } from 'xstate'

import Diagram from './Diagram';
import CmdLineButton from './CmdLineButton';
import CmdLineButtonItem from './CmdLineButtonItem';
import Terminal from './Terminal';

import './GitMachine.css';

  const machine = Machine({
    id: 'git',
    initial: 'no_changes',
    states: {
      no_changes: { 
        on: {
          CHANGE_FILE: 'unstaged', // eg. cat "Hello" > new_file.txt
        } 
      },
      stashed: { 
        on: {
          STASH_APPLY: 'unstaged', // eg. git stash apply
        } 
      },
      unstaged: { 
        on: { 
          STAGE_CHANGE: 'staged', // eg. git add .
          CHECKOUT_CHANGE: 'no_changes', // eg. git checkout .
          UNDO_FILE_CHANGE: 'no_changes', // eg. with an editor
          STASH_CHANGE: 'stashed'
        }
      },
      staged: { 
        on: { 
          COMMIT_CHANGE: 'committed', // eg. git commit
          RESET: 'unstaged' // git reset .
        },
      },
      committed: { on: { 
          RESET_SOFT: 'unstaged', // eg. git reset HEAD~1
          RESET_HARD: 'no_changes', // eg. git reset --hard HEAD~1
        },
      }
    }
  });

const GitMachine = () => {

  const [gitState, send] = useMachine(machine);
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
    send('no_changes');
    setCommands([]);
  }

  const actions = [
    {
      id: 'CHANGE_FILE',
      text: "echo 'Hello' > new_file.txt"
    }, {
      id: 'STASH_CHANGE', 
      text: "git stash" 
    }, {
      id: 'STASH_APPLY', 
      text: "git stash apply" 
    }, {
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
            <li>
              <CmdLineButton 
                onClick={() => startOver()} 
                text="Start over!"
              />
            </li>
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
