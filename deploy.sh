#!/usr/bin/env sh

# abort on errors
#set -e

# build
npm run build

# navigate into the build output directory
cd .vuepress/dist
# copy samples
cp -v -r ../../samples .

# if you are deploying to a custom domain
echo 'pwa-workshop.js.org' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/sylvainpolletvillard/pwa-workshop.git master:gh-pages

cd -