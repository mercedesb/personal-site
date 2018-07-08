#!/bin/sh

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
  echo "git configured"
}

commit_website_files() {
  git checkout -b production
  git add .
  echo "added"
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
  echo "committed"
}

upload_files() {
  git remote add origin https://${GH_TOKEN}@github.com/mercedesb/personal-site.git > /dev/null 2>&1
  echo "remote added"
  git push --quiet --set-upstream origin production
  echo "pushed"
}

setup_git
commit_website_files
upload_files