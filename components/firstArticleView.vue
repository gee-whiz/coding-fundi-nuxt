<template>
    <div class="card mb-3">
        <div class="row g-0">
            <div class="col-md-6">
                <img :src="article.imageURL" alt="hero" :class="'img-fluid rounded-start hover-overlay ripple'" />
            </div>
            <div class="col-md-6">
                <div class="card-body">
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
        </div>
    </div>
</template>

<script setup lang="ts">

import Article from '~/model/article';

const props = defineProps({
    article: {
        type: Object as PropType<Article>,
        required: true
    }
});
</script>

<style scoped lang="scss">
.img-fluid {
    max-height: 400px;
    object-fit: cover;
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

.col-md-6,
.card-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.author {
    color: #2b2c34;
    font-size: 14px;
    margin: 0;
}

.rounded-start {
    border-top-left-radius: var(--mdb-card-border-radius) !important;
    border-bottom-left-radius: var(--mdb-card-border-radius) !important;
}

@media screen and (max-width: 768px) {
    .img-fluid {
        width: 100%;
        max-height: 250px;
        object-fit: cover;
    }

    .rounded-start {
        border-bottom-left-radius: 0 !important;
        border-top-right-radius: var(--mdb-card-border-radius) !important;
    }

    .col-md-6 {
        width: 100%;
    }
}
</style>~/model/Article~/model/Article