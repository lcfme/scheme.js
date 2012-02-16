#!/bin/bash
tmp_browser_repl="/tmp/browser-repl-$$"
cp -r browser-repl "$tmp_browser_repl"
cp src/scheme.js "$tmp_browser_repl"/js
git checkout gh-pages
rm -rf browser-repl
mv "$tmp_browser_repl" browser-repl
sed -i "s/\.\.\/src\/scheme.js/js\/scheme.js/" browser-repl/index.html
git add browser-repl
git commit -m "Update browser-repl"
git checkout master
