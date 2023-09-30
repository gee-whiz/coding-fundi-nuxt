import axios from "axios";
import Author from "../model/Author";
import Article from "~/model/Article";
import formatDateHumanReadable from "../utils/dateExtensions";

const BASE_URL =
    "https://cdn.contentful.com/spaces/svxuef11w26o/environments/master";
const ACCESS_TOKEN = "oOlHf_ypm_L19jmbEIVNuJH8jjlFi4_o0KrajlogL2Q";

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
});

export const fetchAllAssets = async (id: string): Promise<string> => {
    try {
        const response = await instance.get(`/assets/${id}`);
        return response.data.fields.file.url;
    } catch (error) {
        console.error("!!! Error fetching all assets:", error);
        return "";
    }
};

export const fetchArticles = async (): Promise<Article[]> => {
    try {
        const response = await instance.get("/entries?", {
            params: {
                content_type: "article",
                // skip: 3,
                // limit: 100,
            },
        });
        console.log("Response:", response.data);
        const articles = transformContentfulToArticles(response.data);
        return articles;
    } catch (error) {
        console.error("!!! Error fetching articles:", error);
        return [];
    }
};

export const fetchArticlesByCategory = async (
    CategoryId: string
): Promise<Article[]> => {
    try {
        const response = await instance.get("/entries?", {
            params: {
                content_type: "article",
                "fields.category.sys.id": CategoryId,
            },
        });
        console.log("Category Response:", response.data);
        const articles = transformContentfulToArticles(response.data);
        return articles;
    } catch (error) {
        console.error("!!! Error fetching articles:", error);
        return [];
    }
};

export const fetchArticleById = async (
    articleId: string
): Promise<Article[]> => {
    try {
        const response = await instance.get("/entries?", {
            params: {
                content_type: "article",
                "sys.id": articleId,
            },
        });
        const articles = transformContentfulToArticles(response.data);
        return articles;
    } catch (error) {
        console.error("!!! Error fetching articles:", error);
        return [];
    }
};

export const fetchAssetById = async (id: string): Promise<any[]> => {
    try {
        const response = await instance.get(`/assets?${id}`);
        return response.data.item.fields.file.url;
    } catch (error) {
        console.error("!!! Error fetching all assets:", error);
        return [];
    }
};

// Extracts the author transformation to its own function
const transformToAuthor = (data: any, authorId: string): Author | null => {
    const authorEntry = data.includes.Entry.find(
        (entry: any) => entry.sys.id === authorId
    );

    if (!authorEntry) return null;

    // Check if the author has an associated image
    const authorImageId = authorEntry.fields.imageUrl?.sys?.id;
    const authorImageUrl = authorImageId
        ? extractImageUrl(data, authorImageId)
        : "";

    return new Author(
        authorEntry.sys.id,
        authorEntry.fields.name,
        authorImageUrl
    );
};

// Extracts the image URL extraction to its own function
const extractImageUrl = (data: any, imageId: string): string => {
    const imageAsset = data.includes.Asset.find(
        (asset: any) => asset.sys.id === imageId
    );

    return imageAsset?.fields?.file?.url || "";
};

// Main transformation function for the Article
const transformContentfulToArticles = (data: any): Article[] => {
    const articles: Article[] = [];

    for (const item of data.items) {
        const authorId = item.fields.author?.sys?.id;
        const author = transformToAuthor(data, authorId);

        if (!author) {
            console.warn("!!! No author found for article with ID:", item.sys.id);
            continue; // Skip this article if no author is associated
        }

        const imageUrl = extractImageUrl(data, item.fields.imageUrl?.sys?.id);

        const article = new Article(
            item.sys.id,
            item.fields.title,
            item.fields.subtitle,
            author,
            formatDateHumanReadable(item.fields.datePublished),
            item.fields.content,
            imageUrl
        );

        articles.push(article);
    }

    return articles;
};
