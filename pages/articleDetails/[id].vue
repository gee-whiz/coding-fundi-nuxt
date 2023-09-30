<template>
  <h1>{{ article?.title }}</h1>
</template>


<script setup lang="ts">
import { useStore } from "@/store";
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import Article from '~/model/article';

const store = useStore();
const route = useRoute();
const articleId = ref(route.params.id);
const article = ref<Article | Article>();

// Function to fetch and set article
const fetchAndSetArticle = async () => {
  await store.fetchArticleWithAssets(articleId.value as string);
  article.value = store.getArticleById(articleId.value as string);
  console.log(article.value);
};

// Watch for changes to articleId and re-fetch data
watch(articleId, () => {
  fetchAndSetArticle();
});

// Initialize
fetchAndSetArticle();


useSeoMeta({
  description: () => `description: ${article.value?.title}`,
  ogDescription: () => `ogDescription: ${article.value?.title}`,
  ogImage: () => `ogImage: ${article.value?.imageURL}`,
})
</script>