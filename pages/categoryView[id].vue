<template>
    <section class="text-center">
        <div class="row row-cols-1 row-cols-md-2 g-4" style="margin-bottom: 16px">
            <NuxtLink v-for="article in articles" :key="article.id" to="/articleDetails">
                <ArticleView :article="article" />
            </NuxtLink>
        </div>
    </section>
</template>

<script setup lang="ts">

import { useStore } from "@/store";
import Article from "~/model/article";

import { ref } from 'vue';

const store = useStore();
const articles = ref<Article[]>([]);

onMounted(async () => {
    await store.fetchArticlesByCategory();
    articles.value = store.articles
});

</script>