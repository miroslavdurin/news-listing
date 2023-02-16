import axios from "axios";
import sources from "../sources.json";
import adImage from "../assets/images/ad-image.png";

/* Function used to download json file from news api, for minimazing api calls during development */
export function downloadData(data, filename) {
    const fileData = JSON.stringify(data);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = filename+".json";
    link.href = url;
    link.click();
}

export async function getArticles(apiKey, category, isQuery = false, query) {
    try {
    let url;

    if(isQuery) url = `https://newsapi.org/v2/everything?q=${query}&language=en&searchIn=title&apiKey=${apiKey}`
    else url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=100&category=${category}&apiKey=${apiKey}`

    const res = await axios({url: url , method:"GET"});      

    if(res.data.status !== "ok") return;
      
    const allRes = res.data.articles.map(article=>{
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

export function insertAdsAndBreakingNews(articles) {
  const ads = [{
      title: "Compare Prices Find The Best Computer Accessory",
      category: "programmatic/native ad",
      author: "Gary Webber",
      urlToImage: adImage,
      isAd: true
    },    
    {
      title: "A Discount Toner Cartridge Is Better Than Ever And You Will Save 50…",
      category: "programmatic/native ad",
      author: "Travis Rodgers",
      urlToImage: adImage,
      isAd: true,
    },
    {
      title: "Send your paid traffic to high-converting landing pages",
      category: "programmatic/native ad",
      author: "Google",
      urlToImage: adImage,
      isAd: true,
    },
    {
      title: "Get the top-rated page builder app that 35K+ ecommerce brands love",
      category: "programmatic/native ad",
      author: "Shogun",
      urlToImage: adImage,
      isAd: true,
    },
    {
      title: "Get the best of Fox News delivered to your inbox daily",
      category: "programmatic/native ad",
      author: "News Station",
      urlToImage: adImage,
      isAd: true,
    }    
  ]

  const newArticles = [...articles]

  ads.forEach((ad, i)=>{
    newArticles.splice(((i * 5)+7), 0, ad)
  })

  newArticles.splice(3, 0, {
    isBreakingNews: true,
    title: "Peace On Earth A Wonderful Wish But No Way",
    category: "breaking",
    author: "Bertie Campbell",
    isAd: true
  })

  return newArticles
}