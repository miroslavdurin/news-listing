import './App.scss';
import './sass/main.scss';
import { useEffect, useState, useRef } from 'react';
import {useMediaQuery} from './utilities/hooks';
import Banner from './components/Banner/Banner';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import SingleArticle from './components/SingleArticle/SingleArticle';
import LatestNews from './components/LatestNews/LatestNews';
import PhoneModal from './components/PhoneModal/PhoneModal';
import { getArticles, insertAdsAndBreakingNews} from './utilities/helpers';
import { Article, Categories } from './utilities/types';

function App() {
  const [isFeatured, setIsFeatured] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState<Categories>("entertainment");
  const [displayBanner, setDisplayBanner] = useState(true);
  const isBigScreen =  !useMediaQuery('(max-width: 40em)');

  const searchedArticles: React.MutableRefObject<Article[]> = useRef([]);

  /* Variable used to track previous category, to prevent unnecessary api calls. */
  /* Alternative would be to use useDefferedValue hook. */
  const prevCategory: React.MutableRefObject<Categories | null>  = useRef(null);

  const [bookmarks, setBookmarks] = useState<Article[]>(()=>{
    /* Checking if local storage exists and putting bookmarks in state. */
    const storage = localStorage.getItem("bookmarks");
    if(!storage) return []
    else return JSON.parse(storage)
  });
    
  async function handleQuery(query: string) {
    const fetchedArticles: Article[] = await getArticles(process.env.REACT_APP_API_KEY, "search", true, query);

    /* Checking for bookmarked articles. */
    fetchedArticles.forEach(article=>{
      article.isBookmarked = bookmarks.some(bookmark=> bookmark.url === article.url)      
    })

    searchedArticles.current = [...fetchedArticles];

    if(category === "search") {
      setArticles([...searchedArticles.current])
      return;
    }

    setCategory("search");
  }

  function handleModal(){
    if(!isBigScreen) setIsModalOpen(prev=>!prev)
  }

  function handleClick(e: React.MouseEvent) {
    /* Function used on small screen to select featured and latest news. */
    const target = e.target as HTMLElement;
    const btn = target.closest(".main__btn") as HTMLElement;
    if(!btn) return;

    if((isFeatured && btn.dataset.value === "featured") || (!isFeatured && btn.dataset.value === "latest")) return;
    if(!isFeatured && btn.dataset.value === "featured") setIsFeatured(true);
    if(isFeatured && btn.dataset.value === "latest") setIsFeatured(false)
  }

  function handleCategories(newCategory: Categories) {
    if(newCategory === category) return;
    if(!isBigScreen) setIsFeatured(true)
    setCategory(newCategory)
  }

  function handleBookmarks(bookmarkArticle: Article){
    searchedArticles.current.forEach(article=> {
      if(article.url === bookmarkArticle.url) article.isBookmarked = bookmarkArticle.isBookmarked
    })

    if(!bookmarkArticle.isBookmarked) {
      /* Removing article from bookmarks and updating local storage. */
      const filteredBookmarks = bookmarks.filter(bookmark=> bookmark.url !== bookmarkArticle.url)
      setBookmarks([...filteredBookmarks]);

      /* Updating local storage. */
      localStorage.clear();
      localStorage.setItem("bookmarks", JSON.stringify(filteredBookmarks))
      
      return;
    }

    /* Adding article to bookmarks array and updating local storage. */
    setBookmarks([...bookmarks, bookmarkArticle]);      
    localStorage.setItem("bookmarks", JSON.stringify([...bookmarks, bookmarkArticle]))    
  }

  function handleDisplayBanner(){
    setDisplayBanner(false)
  }

  useEffect(()=>{   
    /* Closing modal window, it would stay open after selecting a new category. */
    setIsModalOpen(false)

    async function controlArticles(c: Categories) {
      /* Tracking previous category. */
      prevCategory.current = category;
      
      const fetchedArticles:Article[] = await getArticles(process.env.REACT_APP_API_KEY, c, false, "");
      fetchedArticles.forEach(article=>{
        article.isBookmarked = bookmarks.some(bookmark=> bookmark.url === article.url);
        article.category = category;
      })

      const articlesWithAds = insertAdsAndBreakingNews(fetchedArticles)
      setArticles([...articlesWithAds])      
    }

    if(category === "bookmarks") {
        setArticles([...bookmarks])    
        /* Tracking previous category. */
        prevCategory.current = "bookmarks";
        return;
    }

    if(category === "search") {
      setArticles([...searchedArticles.current])      
      /* Tracking previous category. */
      prevCategory.current = "search";
      return;
    }

    if(prevCategory.current === category) {     
      /* Preventing a new async call when only bookmarks had changed. */
      setArticles(curState=> {
        /* Using callback version because we need current state. */
        /* If we would use articles array then ES Lint would ask to put articles in dependancy array. */
        /* Putting articles in dependancy array would cause an infinite loop,  */
        /* due to the fact that React creates new array on each render. */
        const updatedArticles = [...curState];
        /* Checking for bookmarked articles */
        updatedArticles.forEach(article => {article.isBookmarked = bookmarks.some(bookmark=> bookmark.url === article.url)})
      
        return updatedArticles
      })   
      return
    };

    controlArticles(category);
  }, [category, bookmarks]) 

  return (
    <div className="App">
      {!isBigScreen && isModalOpen && <PhoneModal handleQuery={handleQuery} isSmallScreen={!isBigScreen} handleCategories={handleCategories} category={category}/>}
      {!isBigScreen &&<button onClick={handleModal} className={`btn-hamburger ${isModalOpen && 'btn-hamburger--active'}`}><span/></button>}
      {displayBanner && <Banner handleDisplayBanner={handleDisplayBanner} />}
      <Header handleQuery={handleQuery} />
      <div className='main-panel container'>
        {isBigScreen && <Navbar handleCategories={handleCategories} category={category} />}
        <main className={`main ${isModalOpen && !isBigScreen && 'hidden'}`}>          
          {isBigScreen && <h3 className='heading--h3'>News</h3>}

          {         
           !isBigScreen && 
            <div onClick={handleClick} className='main__phone-buttons' >
              <button  data-value="featured" className={`main__btn ${isFeatured && 'main__btn--active'}`}>Featured</button>
              <button  data-value="latest" className={`main__btn ${!isFeatured && 'main__btn--active'}`}>Latest</button>
            </div>
          }

          {isBigScreen ? <div className='main-grid'>
            {articles.map(article => <SingleArticle key={article.title} isBreakingNews={article?.isBreakingNews} isAd={article?.isAd}  isBookmarked={article?.isBookmarked} url={article.url} handleBookmarks={handleBookmarks} image={article.urlToImage} title={article.title} category={article.category} author={article.author} />)}
                <LatestNews />
              </div> :
              <div className='main-grid'>
              {isFeatured ? 
              articles.map(article => <SingleArticle key={article.title} isBreakingNews={article?.isBreakingNews} isAd={article?.isAd} isBookmarked={article.isBookmarked} url={article.url} handleBookmarks={handleBookmarks} image={article.urlToImage} title={article.title} category={article.category} author={article.author} />)
              :
              <LatestNews />} 
            </div>
          }          
        </main>
      </div>
    </div>
  );
}

export default App;
