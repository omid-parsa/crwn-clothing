import React from 'react';
import './menu-item.styles.scss';

// import the following method in order to have access to match, histroy and ... from react-router-dom
// because only the parent component has access to them and theit childeran has no access to them
import { withRouter, Link } from 'react-router-dom';

const MenuItem = ({title, imageUrl, size, history, match, linkUrl}) => (
    <div  className={`${size} menu-item`} onClick={ () => history.push(`${match.url}${linkUrl}`)}> 
        <div className='background-image' style={ {backgroundImage: `url(${imageUrl})`} } />
        <div className='content'> 
            <h1 className='title'>{title.toUpperCase()}</h1>
            <span className='subtitle'>SHOP NOW</span>
        </div>
    </div>
);
export default withRouter(MenuItem);