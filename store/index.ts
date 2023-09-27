import { defineStore } from "pinia";
import Author from "@/model/author";
import {
  fetchArticles,
  fetchAllAssets,
  fetchArticlesByCategory,
  fetchArticleById,
  fetchAssetById,
} from "@/services/contentful";

import { checkSubscriptionStatus } from "@/services/subscription";

interface Article {
  id: string;
  title: string;
  subtitle: string;
  author: Author;
  datePublished: string;
  content: string;
  imageURL: string;
}

interface State {
  articles: Article[];
  categoryArticles: Article[];
  assets: Record<string, any>;
  isSubscribed: boolean;
  isVerified: boolean;
}


export const useStore = defineStore({
  id: "store",
  state: (): State => ({
    articles: [],
    categoryArticles: [],
    assets: {},
    isSubscribed: false,
    isVerified: false,
  }),

  getters: {
    getArticleById: (state) => (id: string) => {
      return state.articles.find((article) => article.id === id);
    },

    getAssetUrlById: (state) => (id: string) => {
      const asset = state.assets[id];
      return asset;
    },
  },
  actions: {
    async fetchArticles() {
      this.articles = await fetchArticles();
    },
    
    async fetchArticlesByCategory(id: string) {
      this.articles = await fetchArticlesByCategory(id);
    },

    async fetchArticleWithAssets(id: string) {
      this.articles = await fetchArticleById(id);
      const article = this.articles.find((article) => article.id === id) as any;
      if (article) {
        const assetFetchPromises = article.content.content
          .filter((node: any) => node.nodeType === 'embedded-asset-block')
          .map(async (node: any) => {
            const assetId = node.data.target.sys.id;
            const assetData = await fetchAllAssets(assetId);
            return { id: assetId, data: assetData };
          });
    
        const assetsArray = await Promise.all(assetFetchPromises);
        // Transforming array to a Record for easy lookup
        this.assets = Object.fromEntries(
          assetsArray.map(({ id, data }) => [id, data])
        );
      }
    },
    
    async checkSubscriptionStatus() {
      const subscriberId = localStorage.getItem("subscriber_id");
      if (subscriberId) {
        const response = await checkSubscriptionStatus();
        if (response.subscriber.state === "active") {
          localStorage.setItem("subscriptionState", "active");
          this.isSubscribed = true;
          this.isVerified = true;
        } else if (response.subscriber.state === "inactive") {
          this.isSubscribed = true;
          this.isVerified = false;
        }
      }
    },
  },
});
