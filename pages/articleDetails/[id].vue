<template>
  <MDBContainer fluid>
    <MDBRow v-if="article">
      <div class="col-md-8 mb-4">
        <section class="border-bottom mb-4">
          <img :src="article.imageURL" class="img-fluid shadow-2-strong rounded mb-4" :alt="article.title" />

          <div class="row align-items-center mb-4">
            <div class="col-lg-6 text-center text-lg-left mb-3 m-lg-0">
              <div class="info">
                <img :src="article.author.imageURL" class="rounded-circle" height="50" width="50" alt="author"
                  loading="lazy" />
                <div class="author-info">
                  <h6 :class="'card-title author'">
                    {{ article.author.name }}
                  </h6>
                  <small class="text-muted">{{
                    article.datePublished
                  }}</small>
                </div>
              </div>
            </div>

            <div class="col-lg-6 text-center text-lg-right">
              <ShareNetwork v-for="network in networks" :key="network.network" :network="network.network"
                :url="`https://codingfundi.com/articles/${article.id}`" :title="article.title"
                hashtags="codingfundi,tutorials,coding" :description="article.subtitle">
                <button type="button" class="btn btn-primary px-3 mr-1" :style="{ 'background-color': network.color }">
                  <i :class="network.icon"></i>
                </button>
              </ShareNetwork>
            </div>
          </div>
        </section>
        <section>
          <div v-html="html"></div>
        </section>
      </div>
      <!--Grid column-->
      <MDBCol md="4">
        <Affiliate>
          <Sponsored />
          <BookingAffiliate />
          <Sponsored />
          <div class="text-center">
          </div>
          <iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin"
            style="width: 120px; height: 240px" marginwidth="0" marginheight="0" scrolling="no" frameborder="0"
            src="//ws-eu.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=DE&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=codingfundi-21&language=en_GB&marketplace=amazon&region=DE&placement=B0CHWWM3JH&asins=B0CHWWM3JH&linkId=b5a62a2de86693abd709a282c8a58698&show_border=true&link_opens_in_new_window=true"></iframe>
        </Affiliate>
      </MDBCol>
      <!--Grid column-->
    </MDBRow>
  </MDBContainer>
</template>


<script setup lang="ts">
const route = useRoute()
import { useStore } from "@/store";
import Article from '~/model/article';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { ref } from 'vue';
import { BLOCKS } from '@contentful/rich-text-types';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import { MDBContainer, MDBRow, MDBCol } from "mdb-vue-ui-kit";

const store = useStore();
const articleId = route.params.id;
const article = ref<Article | Article>();

const networks = ref([
  { network: "facebook", icon: "fab fa-facebook-f", color: "#3b5998" },
  { network: "twitter", icon: "fab fa-twitter", color: "#55acee" },
  { network: "linkedin", icon: "fab fa-linkedin-in", color: "#0082ca" },
]);

const html = ref<string>('');
onMounted(async () => {
  await store.fetchArticleWithAssets(articleId as string);
  article.value = store.getArticleById(articleId as string);

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any) => {
        let code = node.content[0].value;
        if (node.content && node.content[0]?.marks?.some((mark: any) => mark.type === 'code')) {
          const language = node.data?.language || 'javascript';
          return `<pre style="border-radius:5px;" class="rich-code language-${language}"><code>${Prism.highlight(code, Prism.languages[language], language)}</code></pre>`;
        }
        return `<p>${node.content[0].value}</p>`;
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const imageUrl = getAssetUrlById(node.data.target.sys.id);
        return `<div"><img  class="img-fluid shadow-2-strong rounded mb-4" src="${imageUrl}" alt="image" /></div>`;
      },
    },
  };

  const modifiedContent = selectWithCodeWrapper(article.value?.content);
  html.value = documentToHtmlString({ nodeType: BLOCKS.DOCUMENT as const, data: {}, content: modifiedContent.content }, options);
  Prism.highlightAll();
});

const selectWithCodeWrapper = (content: { content: any; }) => {
  const nodes = [...content.content] || [];
  try {
    for (let i = nodes.length - 1; i > -1; i--) {
      if (
        nodes[i] &&
        nodes[i - 1] &&
        nodes[i].nodeType === 'paragraph' &&
        nodes[i].content[0]?.marks?.[0]?.type === 'code' &&
        nodes[i - 1].content[0]?.marks?.[0]?.type === 'code'
      ) {
        nodes[i - 1].content[0].value += `\r` + nodes[i]?.content[0]?.value;
        nodes.splice(i, 1);
      }
    }
    return {
      ...content,
      content: nodes,
    };
  } catch (e) {
    console.error(e);
  }
  return content;
};

useHead({
  title: article.value?.title,
  meta: [
    { name: 'description', content: article.value?.subtitle },
    { name: 'keywords', content: 'codingfundi, tutorials, coding, programming, software development, web development, software engineering, web design, web development, coding tutorials, coding tutorials for beginners, coding tutorials for beginners ' },
    { name: 'author', content: article.value?.author.name },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@codingfundi' },
    { name: 'twitter:title', content: article.value?.title },
    { name: 'twitter:description', content: article.value?.subtitle },
    { name: 'twitter:image', content: article.value?.imageURL },
    { name: 'twitter:image:alt', content: article.value?.title },
    { name: 'twitter:creator', content: '@codingfundi' },
    { property: 'og:title', content: article.value?.title },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: `https://codingfundi.com/articles/${article.value?.id}` },
    { property: 'og:image', content: article.value?.imageURL },
    { property: 'og:description', content: article.value?.subtitle },
    { property: 'og:site_name', content: 'Coding Fundi' },
    { property: 'article:published_time', content: article.value?.datePublished },
    { property: 'article:modified_time', content: article.value?.datePublished },
  ]
})

const getAssetUrlById = (id: string) => {
  const url = store.getAssetUrlById(id);
  return url;
};

</script>

<style scoped lang="scss">
.description {
  display: flex;
}

.img-fluid {
  max-height: 463px;
  width: 100%;
  object-fit: cover;
}

.card {
  display: flex;
  flex-direction: row;
  overflow: hidden;
  margin-bottom: 1em;
}

.card a {
  text-decoration: none;
  color: inherit;
}

.router-link-exact-active,
.router-link-active {
  text-decoration: none;
  color: inherit;
}

.description {
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #2c3e50;
}

small {
  color: #2c3e50;
  font-size: x-small;
}

.social-icons {
  display: flex;
  align-items: center;
  padding: 32px;
  z-index: 999;
}

.social-icons p {
  margin: 24px;
  margin-right: 32px;
}

.fixed-bottom {
  position: relative;
}

.social-icons a {
  margin-right: 32px;
  font-size: 24px;
  color: #2c3e50;
  text-decoration: none;
}

.social-icons a:hover {
  color: #0468bf;
}

.floating-share {
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.5);
  color: white;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.divider {
  height: 24px;
  width: 1px;
  background-color: #ccc;
  margin-right: 10px;
}

.content {
  display: flex;
  flex-direction: column;
  padding: 30px;
  margin-bottom: 32px;
  justify-content: center;
}

.author-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1px;
  margin: 0;
}

.info {
  display: flex;
  gap: 10px;
}

.code-block {
  background-color: #282c34;
  border-radius: 5px;
  overflow: auto;
  max-height: 300px;
}

.author {
  color: #2b2c34;
  font-size: 14px;
  margin: 0;
}

::v-deep p {
  margin-bottom: 32px;
}

::v-deep h1,
::v-deep h2,
::v-deep h3,
::v-deep h4,
::v-deep h5,
::v-deep h6 {
  margin-top: 1em;
}
@media screen and (max-width: 768px) {
  .card {
    flex-direction: column;
    overflow: hidden;
  }

  .img-fluid {
    max-height: 250px;
  }

  .content {
    padding: 10px;
    justify-content: top;
  }
}
</style>


