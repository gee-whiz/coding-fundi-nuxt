import { defineStore } from "pinia";
import Author from "@/model/author";
import {
  fetchArticles,
  fetchAllAssets,
  fetchArticlesByCategory,
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
  categoryId: string;
  assets: Record<string, string>;
  isSubscribed: boolean;
  isVerified: boolean;
}


export const useStore = defineStore({
  id: "store",
  state: (): State => ({
    articles: [],
    categoryArticles: [],
    categoryId: "",
    assets: {},
    isSubscribed: false,
    isVerified: false,
  }),

  actions: {
    async fetchArticles() {
      this.articles = await fetchArticles();
    },
    async fetchArticlesByCategory() {
      this.articles = await fetchArticlesByCategory(this.categoryId);
    },

    async fetchAllAssets() {
      const assets = await fetchAllAssets();
      // Process assets to transform it into key-value pairs
      const assetLookup: Record<string, string> = {};
      for (const asset of assets) {
        assetLookup[asset.sys.id] = asset.fields.file.url;
      }
      this.assets = assetLookup;
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
