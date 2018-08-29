#!/usr/bin/bash

mkdir -p dist/demo
babel --out-dir dist src &&
echo "window.mailChimpUser=$MAIL_CHIMP_USER; window.mailChimpId=$MAIL_CHIMP_ID" > dist/config.json && 
echo "window.mailChimpUser=$MAIL_CHIMP_USER; window.mailChimpId=$MAIL_CHIMP_ID" > dist/demo/config.json && 
browserify dist/*.js -o dist/demo/demo.js && 
cp src/demo.html dist/demo && 
cp src/demo.css dist/demo &&
cp node_modules/react-table/react-table.css dist/demo &&
cp -r assets/images dist/demo && 
cp -r assets/favicon dist/demo/favicon


