import React from 'react';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';

//import array from another js file. we exported it from there as a const
import SHOP_DATA from './shop.data';


class ShopPage extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            collections: SHOP_DATA
        };
    }

    render() {
        const {collections}= this.state;
        return(
            <div className='shop-page'>
                {
                    collections.map( ({id, ...otherCollectionProp}) => (
                        <CollectionPreview key={id} {...otherCollectionProp} />
                    ) )
                }
            </div>
        );
    }
    
}
export default ShopPage;