import React from 'react';
import './Navbar.scss';
import iconBusiness from "../../assets/icons/icon-business.svg";
import iconGeneral from "../../assets/icons/icon-general.svg";
import iconHealth from "../../assets/icons/icon-health.svg";
import iconHome from "../../assets/icons/icon-home.svg";
import iconScience from "../../assets/icons/icon-science.svg";
import iconSports from "../../assets/icons/icon-sports.svg";
import iconTechnology from "../../assets/icons/icon-technology.svg";
import iconBookmark from "../../assets/icons/icon-bookmark.svg";
import iconSearch from "../../assets/icons/icon-search.svg";
import { Categories } from '../../utilities/types';

type NavbarProps = {
    isSmallScreen?: boolean;
    handleCategories: (category: Categories) => void;
    category: Categories;
}

function Navbar({isSmallScreen, handleCategories, category}: NavbarProps) {
    function handleClick(e: React.MouseEvent<HTMLUListElement>) {
        /* Selecting list item and reading data value to read category. */
        const listItem = e.target as HTMLElement;

        if(listItem){
            const targetItem = listItem.closest(".nav__item")! as HTMLElement;
            const value = targetItem.dataset.value as Categories;
            handleCategories(value);        
        }       
    }

    return (
        <nav className={`nav ${isSmallScreen && 'nav--small-screen'}`}>
            <ul onClick={handleClick} className="nav__list">
                <li data-value="entertainment" className="nav__item">
                    <button className={`nav__btn ${category === "entertainment" && "nav__btn--active"}`}>
                        <svg>
                            <use href={`${iconHome}#home`} />
                        </svg>
                        <span>Home</span>
                    </button>                            
                </li>
                <li data-value="general" className="nav__item">
                    <button className={`nav__btn ${category === "general" && "nav__btn--active"}`}>
                        <svg>
                            <use href={`${iconGeneral}#general`} />
                        </svg>
                        <span>General</span>
                    </button>
                </li>
                <li data-value="business" className="nav__item">
                    <button className={`nav__btn ${category === "business" && "nav__btn--active"}`}>
                        <svg>
                            <use href={`${iconBusiness}#business`} />
                        </svg>
                        <span>Business</span>
                    </button>
                </li>
                <li data-value="health" className="nav__item">
                    <button className={`nav__btn ${category === "health" && "nav__btn--active"}`}>
                        <svg>
                            <use href={`${iconHealth}#health`} />
                        </svg>
                        <span>Health</span>
                    </button>
                </li>
                <li data-value="science" className="nav__item">
                    <button className={`nav__btn ${category === "science" && "nav__btn--active"}`}>
                        <svg>
                            <use href={`${iconScience}#science`} />
                        </svg>
                        <span>Science</span>
                    </button>
                </li>
                <li data-value="sports" className="nav__item">
                    <button className={`nav__btn ${category === "sports" && "nav__btn--active"}`}>
                        <svg>
                            <use href={`${iconSports}#sports`} />
                        </svg>
                        <span>Sports</span>
                    </button>
                </li>
                <li data-value="technology" className="nav__item">
                    <button className={`nav__btn ${category === "technology" && "nav__btn--active"}`}>
                        <svg>
                            <use href={`${iconTechnology}#technology`} />
                        </svg>
                        <span>Technology</span>
                    </button>
                </li>
                <li data-value="bookmarks" className="nav__item">
                    <button className={`nav__btn ${category === "bookmarks" && "nav__btn--active"}`}>
                        <svg>
                            <use href={`${iconBookmark}#bookmark`} />
                        </svg>
                        <span>Favorites</span>
                    </button>
                </li>
                <li data-value="search" className="nav__item">
                    <button className={`nav__btn ${category === "search" && "nav__btn--active"}`}>
                        <svg>
                            <use href={`${iconSearch}#search`} />
                        </svg>
                        <span>Searched</span>
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar