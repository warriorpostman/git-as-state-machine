import React, { useHook } from "react"

import { createMachine, interpret } from 'xstate'

const GitMachine = () => {
  // Stateless machine definition
// machine.transition(...) is a pure function used by the interpreter.
  const machine = createMachine({
    id: 'git',
    initial: 'NO_CHANGES',
    states: {
      NO_CHANGES: { 
        on: { 
          CHANGE_FILE: 'UNSTAGED', // eg. cat "Hello" > new_file.txt
          UNDO_FILE_CHANGE: 'NO_CHANGES' // eg. with an editor
        } 
      },
      UNSTAGED: { 
        on: { 
          STAGE_CHANGE: 'STAGED', // eg. git add .
          CHECKOUT_CHANGE: 'NO_CHANGES' // eg. git checkout .
        }
      },
      STAGED: { 
        on: { 
          COMMIT_CHANGE: 'COMMITTED', // eg. git commit
          RESET_CHANGE: 'UNSTAGED' // git reset .
        },
      },
      COMMITTED: { on: { 
          RESET_SOFT: 'UNSTAGED', // eg. git reset HEAD~1
          RESET_HARD: 'NO_CHANGES', // eg. git reset --hard HEAD~1
        },
      }
    }
  });
  const service = interpret(machine)
    .onTransition((state) => console.log(state.event, ', thus...', state.value))
    .start();

  service.send('STAGE_CHANGE');
  service.send('CHANGE_FILE');
  service.send('STAGE_CHANGE');
  service.send('COMMIT_CHANGE');
  service.send('STAGE_CHANGE');
  service.send('RESET_SOFT');
  // console.log('current:', service.send('STAGE_CHANGE'));
  // console.log('current:', service.send('CHANGE_FILE'));
  // console.log('current:', service.send('STAGE_CHANGE'));

  return (
    <div>
      <h2>Welcome to...Machine</h2>
      <div>
        The states
        <ul>
          <li>no local changes</li>
          <li>changes unstaged</li>
          <li>changes staged for commit</li>
          <li>committed</li>
        </ul>
      </div>
    </div>
  );
}

export default GitMachine
