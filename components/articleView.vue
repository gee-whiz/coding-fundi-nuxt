<template>
    <div class="card">
        <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
            <img :src="article.imageURL" class="img-fluid" style="width: 100%;" :alt="article.title" />
            <a href="#!">
                <div class="mask" style="background-color: rgba(251, 251, 251, 0.15)"></div>
            </a>
        </div>
        <div class="card-body" style="text-align: justify">
            <h5 class="card-title" style="color: #2b2c34">
                {{ article.title }}
            </h5>
            <p class="card-text"></p>
            <div class="info">
                <img :src="article.author.imageURL" class="rounded-circle" height="50" width="50" alt="author"
                    loading="lazy" />
                <div class="author-info">
                    <h6 :class="'card-title author'">
                        {{ article.author.name }}
                    </h6>
                    <small class="text-muted">{{ article.datePublished }}</small>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import Article from '~/model/Article';

const props = defineProps({
    article: {
        type: Object as PropType<Article>,
        required: true
    }
});

</script>
<style scoped lang="scss">
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

.author {
    color: #2b2c34;
    font-size: 14px;
    margin: 0;
}

.card {
    height: 380px;
}
</style>

~/model/Article