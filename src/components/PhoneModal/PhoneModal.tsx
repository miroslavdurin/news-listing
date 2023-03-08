import React from 'react';
import './PhoneModal.scss';
import iconSearch from "../../assets/icons/icon-search.svg";
import Navbar from '../Navbar/Navbar';
import { Categories } from '../../utilities/types';

type PhoneModalProps = {
    isSmallScreen: boolean;
    handleCategories: (category: Categories) => void;
    handleQuery: (query: string) => void;
    category: Categories;
}

function PhoneModal({isSmallScreen, handleCategories, handleQuery, category}: PhoneModalProps) {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        /* Reading input and calling handleQuery function. */
        e.preventDefault();
        const input = document.querySelector("#input") as HTMLInputElement;
        if(!input.value) return;
        handleQuery(input.value.trim())
    }

  return (
    <div className='modal'>
        <div className="container">
            <div className="modal__logo-box">
                <a href='/' className="modal__logo">
                    <h1 className="heading--h1">
                        <span className="modal__logo--my">My</span>
                        <span className="modal__logo--news">News</span>
                    </h1>
                </a>   
            </div>
            <form onSubmit={handleSubmit} action="/" method='get' className="form">
                <label htmlFor='input' className="form__search-icon">
                    <img src={iconSearch} alt="" />                
                </label>
                <input id='input' type="text" className="form__input" placeholder="Search news"/>
                <button type="submit" className="form__btn-submit">Search</button>
            </form>
            <Navbar isSmallScreen={isSmallScreen} handleCategories={handleCategories} category={category}/>
        </div>
    </div>
  )
}

export default PhoneModal