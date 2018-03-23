#!/bin/bash

if [ $# -eq 0 ]
  then
    if [ -n "$DEBUG_MODE" ]; then
      node --inspect-brk=0.0.0.0 src/server.js
    elif [ -n "$WATCH_MODE" ]; then
      node_modules/.bin/nodemon --inspect=0.0.0.0 -L src/server.js
    else
      node src/server.js
    fi
  else
    case "$1" in
      test)
        npm test
        ;;
      *)
        npm run $1
    esac
fi

exit $?
