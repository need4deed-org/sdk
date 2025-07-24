#!/bin/bash

set -e

echo "--- Running create-pr script ---"

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# prevent running on 'main'
if [ "$CURRENT_BRANCH" == "main" ]; then
  echo "Error: This script is intended for feature or development branches, not main."
  exit 1
fi

echo "Current branch: $CURRENT_BRANCH"

# check for existing PR from the current branch
echo "Checking for an existing Pull Request from '$CURRENT_BRANCH'..."
PR_NUMBER=$(gh pr list --head "$CURRENT_BRANCH" --json number --jq '.[0].number' 2>/dev/null || true)

if [ -n "$PR_NUMBER" ]; then
  echo "A Pull Request (PR #$PR_NUMBER) already exists from '$CURRENT_BRANCH', exiting."
  exit 0
fi

echo "Proceeding with version bump for '$CURRENT_BRANCH'."
yarn version --patch --message "Release: Bump version to %s"

NEW_VERSION=$(node -p "require('./package.json').version")
echo "Version bumped and committed to: $NEW_VERSION"

echo "Pushing to origin/$CURRENT_BRANCH..."
git push origin "$CURRENT_BRANCH"
git push origin "v$NEW_VERSION"

echo "--- Branch '$CURRENT_BRANCH' prepared and pushed to GitHub. ---"
