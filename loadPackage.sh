#!/bin/sh

ID=$(curl --header "Job-Token: $CI_JOB_TOKEN" "${CI_API_V4_URL}/projects/$CI_PROJECT_ID/packages" | jq -r ".[] | select(.version == \"dev-${CI_COMMIT_BRANCH}\") | .id")

for id in $ID
do
    curl --request DELETE --header "Job-Token: $CI_JOB_TOKEN" "${CI_API_V4_URL}/projects/$CI_PROJECT_ID/packages/$id/"
done

curl --header "Job-Token: $CI_JOB_TOKEN" --data branch=${CI_COMMIT_BRANCH} "${CI_API_V4_URL}/projects/$CI_PROJECT_ID/packages/composer"