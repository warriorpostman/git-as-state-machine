import { Machine } from 'xstate'

export function createGitMachine() {
  return Machine({
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
};



