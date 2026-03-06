#!/bin/bash
# Script pour sauvegarder sur GitHub

git add -A
git commit -m "Save: $(date '+%Y-%m-%d %H:%M')"
git push origin master

echo "✅ Code sauvegardé sur GitHub !"
