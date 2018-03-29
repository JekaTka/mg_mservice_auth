#!/bin/bash

if [ $# -eq 0 ]
  then
    echo '111'
    if [ -n "$DEBUG_MODE" ]; then
      node --inspect-brk=0.0.0.0 src/server.js
    elif [ -n "$WATCH_MODE" ]; then
      node_modules/.bin/nodemon --inspect=0.0.0.0 -L src/server.js
    else
      node src/server.js
    fi
  else
    echo '1211'
    case "$1" in
      test)
      echo '1221'
        npm test
        ;;
      *)
      echo '1213'
        npm run $1
    esac
fi

exit $?
