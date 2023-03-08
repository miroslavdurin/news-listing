import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import './LatestNews.scss';
import iconChevronRight from '../../assets/icons/icon-chevron-right.svg';

import axios from 'axios';

interface Article {
    title: string;
    publishedAt: Date;
    url: string;
}

function LatestNews() {
    const [items, setItems] = useState<Article[]>([]);
    const [ref, inView] = useInView();
    const page = useRef(1);
    const maxPages = useRef(1);


    useEffect(()=>{
        async function getData(isFirstPage: boolean) {                           
            
            try {    
                if(page.current > maxPages.current) return    
                console.log("call")                                
                    const res = await axios({url: `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&page=${page.current}&apiKey=${process.env.REACT_APP_API_KEY}`, method:"GET"});
                    isFirstPage ? setItems([...res.data.articles]) : setItems(prev => [...prev, ...res.data.articles])
                    page.current = page.current + 1;   
                    maxPages.current = res.data.totalResults % 10; 
            }catch(err){
                console.log(err)
            }
        }              

        page.current === 1 && getData(true)
        if(inView) getData(false)
   
      }, [inView])                   
       
    return (
        <div className='latest'>
            <div className="latest__header">
                <div className="alarm-circle" />
                <h4 className="heading--h4">Latest News</h4>
            </div>
            <div className="latest__content">
                <ul className="latest__list">                  
                        
                        {items.map((article, i, array)=>{
                                const date = new Date(article.publishedAt);
                                const hours = +date.getHours();
                                const minutes = +date.getMinutes();
                                const time = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`                                

                                return (
                                    i === array.length - 1 ?
                                    <li key={article.url} className="latest__item">
                                        <h6 className="heading--h6">{time}</h6>
                                        <a rel='noreferrer' target="_blank" href={article.url} className="latest__link heading--h4">
                                            {article.title}
                                        </a>
                                    </li>

                                    :
                                    
                                    <li ref={ref} key={article.url} className="latest__item">
                                        <h6 className="heading--h6">{time}</h6>
                                        <a rel='noreferrer' target="_blank" href={article.url} className="latest__link heading--h4">
                                            {article.title}
                                        </a>
                                    </li>
                                )
                        })}                                    
                    
                </ul>
            </div>
            <a href="/" className="latest__see-all-news">
                <span>See all news</span>  
                <img src={iconChevronRight.toString()} alt="" />
            </a>
        </div>



    )
}

export default LatestNews