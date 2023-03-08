import React, {useState} from 'react';
import "./Header.scss";
import iconSearch from "../../assets/icons/icon-search.svg";

type HeaderProps = {
    handleQuery: (query:string) => void;
}

function Header({handleQuery}: HeaderProps) {    
    const [input, setInput] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if(!input) return;
        handleQuery(input.trim())
    }

    function handleChange(e: React.ChangeEvent) {
        const target = e.target as HTMLInputElement;
        setInput(target.value);
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
                <input onChange={handleChange} type="text" value={input} name="input" className="form__input" placeholder="Search news"/>
                <button type="submit" className="form__btn-submit">Search</button>
            </form>
        </header>
    )
}

export default Header