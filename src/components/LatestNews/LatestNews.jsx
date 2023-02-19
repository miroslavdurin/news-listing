import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import './LatestNews.scss';
import iconChevronRight from '../../assets/icons/icon-chevron-right.svg';
import { API_KEY } from '../../utilities/constants';

import axios from 'axios';

function LatestNews() {
    const [items, setItems] = useState([]);
    const [ref, inView] = useInView();
    const page = useRef(1);
    const maxPages = useRef(1)

    useEffect(()=>{
        async function getData() {                           
            
            try {    
                if(page.current > maxPages.current) return
            
                if(!inView && page.current === 1) {                    
                    const res = await axios({url: `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${API_KEY}`, method:"GET"});
                    setItems([...res.data.articles])
                    page.current = 2   
                    maxPages.current = res.data.totalResults % 10;   
                    return
                }      
                
                if(!inView) return;
                
                const res = await axios({url: `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&page=${page.current}&apiKey=${API_KEY}`, method:"GET"});
                
                setItems(prev => [...prev, ...res.data.articles])
                
                page.current = page.current + 1

            }catch(err){
                console.log(err)
            }
        }                      
        getData()

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
                <img src={iconChevronRight} alt="" />
            </a>
        </div>



    )
}

export default LatestNews