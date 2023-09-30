<template>
  <h1>{{ data?.title }}</h1>
</template>


<script setup lang="ts">
import { useStore } from "@/store";
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import Article from '~/model/article';

const store = useStore();
const route = useRoute();
const articleId = ref(route.params.id);


const { error, data } = useAsyncData(
  async () => {
    store.fetchArticleWithAssets(articleId.value as string);
    const article = store.getArticleById(articleId.value as string);
    return article;
  },
  {
    // uncomment this to make it work again
    // server: false
  },
);


useServerSeoMeta({
  description: () => `description: ${data.value?.title}`,
  ogDescription: () => `ogDescription: ${data.value?.title}`,
  ogImage: () => `ogImage: ${data.value?.imageURL}`,
})
</script>