<template>
    <NuxtLink v-if="firstArticle" to="/articleDetails">
        <FirstArticleView :article="firstArticle" />
    </NuxtLink>
    <section class="text-center">
        <div class="row row-cols-1 row-cols-md-2 g-4" style="margin-bottom: 16px">
            <NuxtLink v-for="article in remainingArticles" :key="article.id" to="/articleDetails">
                <ArticleView :article="article" />
            </NuxtLink>
        </div>
    </section>
</template>

<script setup lang="ts">

import { useStore } from "@/store";
import Article from "~/model/article";

import {
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBContainer,
    MDBBtn,
    MDBCollapse,
} from 'mdb-vue-ui-kit';
import { ref } from 'vue';

const collapse5 = ref(false);
const store = useStore();
const articles = ref<Article[]>([]);
const firstArticle = ref<Article | null>(null);
const remainingArticles = ref<Article[]>([]);

onMounted(async () => {
    await store.fetchArticles();
    await store.fetchAllAssets();
    articles.value = store.articles
    firstArticle.value = articles.value.length > 0 ? articles.value[0] : null;
    remainingArticles.value = articles.value.length > 0 ? articles.value.slice(1) : [];
});

</script>