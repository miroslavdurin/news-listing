import axios from "axios";
import sources from "../sources.json";
import adImage from "../assets/images/ad-image.png";
import { Article, Categories } from "./types";

/* Function used to download json file from news api, for minimazing api calls during development */
export function downloadData<T>(data:T, filename:string) {
    const fileData = JSON.stringify(data);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = filename+".json";
    link.href = url;
    link.click();
}

export async function getArticles(apiKey:string|undefined, category:Categories, isQuery:boolean = false, query:string) {
  interface FetchedArticle extends Article {
    source: {
      name: string
    }
  }

    try {
    const url = isQuery ? 
    `https://newsapi.org/v2/everything?q=${query}&language=en&searchIn=title&apiKey=${apiKey}` : 
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=100&category=${category}&apiKey=${apiKey}`;

    const res = await axios({url: url , method:"GET"});      

    if(res.data.status !== "ok") return;
      
    const allRes = res.data.articles.map((article: FetchedArticle)=>{
      return {
        ...article,
        category: sources.find(source=>source.name.toLowerCase() === article.source?.name.toLowerCase())?.category || "entertainment"        
      }
    })      

    return allRes;

    }catch(err){
      throw(err)
    }
}

export function insertAdsAndBreakingNews(articles: Article[]) {
  
  const ads: Article[] = [{
      title: "Compare Prices Find The Best Computer Accessory",
      category: "programmatic/native ad",
      author: "Gary Webber",
      image: adImage,
      isAd: true,
      isBookmarked: false,
      isBreakingNews: false,
      url: ""
    },    
    {
      title: "A Discount Toner Cartridge Is Better Than Ever And You Will Save 50…",
      category: "programmatic/native ad",
      author: "Travis Rodgers",
      image: adImage,
      isAd: true,
      isBookmarked: false,
      isBreakingNews: false,
      url: ""
    },
    {
      title: "Send your paid traffic to high-converting landing pages",
      category: "programmatic/native ad",
      author: "Google",
      image: adImage,
      isAd: true,
      isBookmarked: false,
      isBreakingNews: false,
      url: ""
    },
    {
      title: "Get the top-rated page builder app that 35K+ ecommerce brands love",
      category: "programmatic/native ad",
      author: "Shogun",
      image: adImage,
      isAd: true,
      isBookmarked: false,
      isBreakingNews: false,
      url: ""
    },
    {
      title: "Get the best of Fox News delivered to your inbox daily",
      category: "programmatic/native ad",
      author: "News Station",
      image: adImage,
      isAd: true,
      isBookmarked: false,
      isBreakingNews: false,
      url: ""
    }    
  ]

  const newArticles = [...articles]

  ads.forEach((ad, i)=>{
    return newArticles.splice(((i * 5) + 7), 0, ad);
  })

  /* Breaking news article. */
  newArticles.splice(3, 0, {
    isBreakingNews: true,
    title: "Peace On Earth A Wonderful Wish But No Way",
    category: "breaking",
    author: "Bertie Campbell",
    isAd: true,
    image: "",
    isBookmarked: false,
    url: ""
  })

  return newArticles
}