branches=("master" "develop" "release" "stage")

for branch in "${branches[@]}"; do
  echo "Switching to branch $branch"
  git checkout $branch
  echo "Pulling latest changes for $branch"
  git pull origin $branch
  echo "---------------------------------"
done

git checkout develop
echo "Switched back to develop branch"

