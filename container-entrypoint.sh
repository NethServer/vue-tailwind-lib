#!/bin/bash

if [[ -z "$1" ]]; then
    echo "Missing parameter: append 'storybook', 'build' or 'publish"
elif [[ "$1" == "storybook" ]]; then
    npm install && npm run storybook
elif [[ "$1" == "build" ]]; then
    npm install && npm run build
elif [[ "$1" == "publish" ]]; then
    npm install && npm run build && npm publish
else
    echo "Parameter not recognized: '$1'. Only 'storybook', 'build' or 'publish' are allowed"
fi
