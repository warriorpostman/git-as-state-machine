import React from "react"
import { useMachine } from '@xstate/react'
import Diagram from './Diagram';
import { Machine } from 'xstate'

  const machine = Machine({
    id: 'git',
    initial: 'no_changes',
    states: {
      no_changes: { 
        on: {
          CHANGE_FILE: 'unstaged', // eg. cat "Hello" > new_file.txt
        } 
      },
      unstaged: { 
        on: { 
          STAGE_CHANGE: 'staged', // eg. git add .
          CHECKOUT_CHANGE: 'no_changes', // eg. git checkout .
          UNDO_FILE_CHANGE: 'no_changes' // eg. with an editor
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

  const transition = (ACTION) => { 
    console.log("ACTION: ", ACTION)
    // Aksshually, newState is like...the old state? Not sure why it works that way.
    const newState = send(ACTION);
    // console.log("new state: ", newState.value);
    console.log("git state?:", gitState.value);
  };

  return (
    <div>
      <h2>Welcome to...Machine</h2>
      <div>
        <Diagram gitState={gitState.value} />
        <div>Current: {gitState.value}</div>
        The states
        <ul>
          <li><button onClick={() => transition('CHANGE_FILE')}>cat "Hello" > new_file.txt</button></li>
          <li><button onClick={() => transition('UNDO_FILE_CHANGE')}>Clear change with an editor</button></li>
          <li><button onClick={() => transition('STAGE_CHANGE')}>git add .</button></li>
          <li><button onClick={() => transition('CHECKOUT_CHANGE')}>git checkout .</button></li>
          <li><button onClick={() => transition('COMMIT_CHANGE')}>git commit</button></li>
          <li><button onClick={() => transition('RESET')}>git reset .</button></li>
          <li><button onClick={() => transition('RESET_SOFT')}>git reset HEAD~1</button></li>
          <li><button onClick={() => transition('RESET_HARD')}>git reset --hard HEAD~1</button></li>
        </ul>
      </div>
    </div>
  );
}

export default GitMachine
