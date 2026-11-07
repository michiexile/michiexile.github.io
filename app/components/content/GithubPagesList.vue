<template>
<ul>
  <template v-for="repo in github.data.repositoryOwner.repositories.nodes">
    <template v-if="repo.ref != null">
      <template v-if="!repo.ref.repository.isFork">
        <template v-if="repo.ref.repository.owner.login == props.owner">
          <li><LinkToGithubIo :repository="repo.ref.repository" /></li>
        </template>
      </template>
    </template>
  </template>
</ul>
</template>

<script setup>
const props = defineProps(["owner"]);
const config = useRuntimeConfig();
const github_api_token = config.githubApiToken;
const github_api_endpoint = "https://api.github.com/graphql";

const graphqlQuery = `
query {
  repositoryOwner(login:\"${props.owner}\") {
    repositories(first:100) {
      nodes {
        ref(qualifiedName:\"gh-pages\") {
          repository {
            name
            owner { login }
            nameWithOwner
            description
            isFork
          }
        }
      }
    }
  }
}`
    .replaceAll("\n", "")
    .replaceAll(/ +/g, " ")
    .replaceAll('"','\\"');

const { data: github } = await useFetch(github_api_endpoint, {
  method: "POST",
  headers: {
    "authorization": `bearer ${ github_api_token }`
  },
  body: `{ "query": "${graphqlQuery}" }`
});

const name = "GithubPagesList";
</script>

<style scoped>

</style>