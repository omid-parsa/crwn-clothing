import React from 'react';

import './collection.styles.scss';
import CollectionItem from '../../components/collection-item/collection-item.component';

import { connect } from 'react-redux';
import { collectionSelector } from '../../redux/shop/shop.selectors';

const CollectionPage = ({match, collection}) =>{
    console.log(collection);
    return(
    <div className='collection-page'>
        COLLECTION PAGE
    </div>
)};
const mapStateToProps = (state, ownProps) => ({
   collection: collectionSelector(ownProps.match.params.collectionId)(state)
})
export default connect(mapStateToProps)(CollectionPage);