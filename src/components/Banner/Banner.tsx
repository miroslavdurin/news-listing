import React from 'react';
import "./Banner.scss";

type BannerProps = {
    handleDisplayBanner: ()=>void;
}

function Banner({handleDisplayBanner}: BannerProps) {
    return (
        <div className='banner'>
            <div className="container">
                <div className="banner__left-side">
                    <h4 className="heading--h4">Make MyNews your homepage</h4>
                    <p className="banner__message">Every day discover what's trending on the internet!</p>
                </div>
                <div className="banner__right-side">
                    <button onClick={()=>handleDisplayBanner()} className="banner__btn banner__btn--white">Get</button>
                    <button onClick={()=>handleDisplayBanner()} className="banner__btn banner__btn--transparent">No, thanks</button>
                </div>
            </div>
        </div>
    )
}

export default Banner