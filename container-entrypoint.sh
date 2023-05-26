#!/bin/bash

if [[ -z "$1" ]]; then
    echo "Missing parameter: append 'build' or 'storybook'"
elif [[ "$1" == "build" ]]; then
    npm install && npm run build
elif [[ "$1" == "storybook" ]]; then
    npm install && npm run storybook
else
    echo "Parameter not recognized: '$1'. Only 'build' or 'storybook' are allowed"
fi
