import React from 'react';

import './collections-overview.styles.scss';
import CollectionPreview from '../collection-preview/collection-preview.component';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { collectionsSelector } from '../../redux/shop/shop.selectors';

const CollectionOverview = ({collections}) => (
    <div className='collection-overview'>
        {
            collections.map(({id, ...otherCollectionProp}) =>
             <CollectionPreview key={id} {...otherCollectionProp} /> )
        }
    </div>
);
const mapStateToProps = createStructuredSelector({
    collections: collectionsSelector
})
export default connect(mapStateToProps)(CollectionOverview);