export type Categories = "entertainment" | "general" | "business" | "health" | "science" | "sports" | "technology" | "bookmarks" | "search" | "programmatic/native ad" | "breaking";

export interface Article {
    url: string;
    image: string | undefined;
    title: string;
    category: Categories;
    author: string ;
    isBookmarked: boolean;
    isAd: boolean;
    isBreakingNews: boolean;
    urlToImage?: string;
}