import React from 'react';
import './SingleArticle.scss';
import iconBookmark from '../../assets/icons/icon-bookmark.svg';
import placeholderImage from "../../assets/images/placeholder-image.jpg";


function SingleArticle({url, image, title, category, author, isBookmarked, isAd, isBreakingNews, handleBookmarks}) {
  function handleClick(){
    handleBookmarks ({
      urlToImage: image,
      title,
      category,
      author,
      url,
      isBookmarked: !isBookmarked
    })
  }

  function handleOpenLink() {
    /* Opening link on a new page if it isn't ad. */
    !isAd && window.open(url)
  }

  return (    
      isBreakingNews ? 
        <div className='article article--no-shadow'>
          <div className="article__breaking">
            <h6 className="heading--h6">{category}</h6>
            <h2 className="heading--h2">{title}</h2>
            <h5 className="heading--h5">{author}</h5>
          </div>          
        </div>      
      :
        <div className='article'>
          <div className='article__top' onClick={handleOpenLink}>
            {isAd && <div className="article__ad">ad</div>}
            <div className="article__img-wrapper">
                <img src={ image || placeholderImage} alt="article" className="article__img" />
            </div>
            <div className="article__content">
                <div>
                    <h6 className="heading--h6">{category}</h6>
                    <h4 title={title} className="heading--h4">{title.length >= 65 ? `${title.slice(0,65)} ...` : title}</h4>
                </div>            
            </div>  
          </div>
          <div className='article__bottom'>
            <h5 className="heading--h5">{author}</h5>
            {!isAd &&
              <button onClick={handleClick} className={`article__bookmark-btn ${isBookmarked && "article__bookmark-btn--bookmarked"}`}>
                <svg>
                  <use href={`${iconBookmark}#bookmark`}></use>
                </svg>
              </button>}
          </div>      
        </div>       
  )
}

export default SingleArticle