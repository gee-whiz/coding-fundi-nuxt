<template>
  <main>
    <VueShowdown :markdown="html" />
  </main>
</template>


<script setup lang="ts">
const route = useRoute()
import { useStore } from "@/store";
import Article from '~/model/article';
import { VueShowdown } from 'vue-showdown';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { ref } from 'vue';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

const store = useStore();
const articleId = route.params.id;
const article = ref<Article | Article>();
let html = ref<string>('');

onMounted(async () => {
  article.value = store.getArticleById(articleId as string);
  
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const imageUrl = getAssetUrlById(node.data.target.sys.id);
        return `<img src="${imageUrl}" alt="Testing" width="300" height="200" />`;
      },
    },
  };

  html.value = documentToHtmlString(article.value?.content, options);
});

const getAssetUrlById = (id: string) => {
  const url = store.getAssetUrlById(id);
  return url;
};

</script>