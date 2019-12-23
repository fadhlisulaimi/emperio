import React from 'react';
import '../../src/res/styles/style-banner.css';

const Banner = (props) => {
    return(
        <div className = 'banner-layout' style = {{backgroundColor: props.bannerInfo.background}}>
            {props.bannerInfo.message}
        </div>
    );
}


export default Banner;