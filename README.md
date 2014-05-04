# then-system

  the `system()` you've missed

## Installation

    npm install then-system

## API
### system(command)
### system(command, args)
### system(command, opts)
### system(command, args, opts)

  Returns a promise for undefined.
  Uses `child_process.spawn` to spawn the process, and waits for it to exit.
  If the process exits abnormally, the promise is rejected with an error.

  For clarity, command is allowed to be an array, for cases like `vmadm boot`, where `vmadm` clearly isn't a very useful description of what command is being run.
  This only makes a difference for error reporting.

#### ExitError

  * name: `ExitError`
  * stderr: stderr output of the process (Buffer)

  then, depending on how it exited:

  * signal: signal that killed the process (string)
  * message: ``'`' + command + '` killed by signal `' + err.signal + '`: ' + err.stderr``

  *or*

  * code: exit code (integer)
  * message: ``'`' command + '` exited with ' + err.code + ': ' + err.stderr``

