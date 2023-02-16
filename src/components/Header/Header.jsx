import React from 'react';
import "./Header.scss";
import iconSearch from "../../assets/icons/icon-search.svg";

function Header({handleQuery}) {    
    function handleSubmit(e) {
        e.preventDefault();
        const input = document.querySelector("#input");
        if(!input.value) return;
        handleQuery(input.value.trim())
    }

    return (
        <header className='header container'>
            <a href='/' className="header__logo">
                <h1 className="heading--h1">
                    <span className="header__logo--my">My</span>
                    <span className="header__logo--news">News</span>
                </h1>
            </a>               

            <form onSubmit={handleSubmit} action="/" method='get' className="form">
                <label htmlFor='input' className="form__search-icon">
                    <img src={iconSearch} alt="" />                
                </label>
                <input id='input' type="text" className="form__input" placeholder="Search news"/>
                <button type="submit" className="form__btn-submit">Search</button>
            </form>
        </header>
    )
}

export default Header