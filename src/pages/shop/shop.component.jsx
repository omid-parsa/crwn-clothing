import React from 'react';

import { Route } from 'react-router-dom';
import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';


class ShopPage extends React.Component {
    

// we changed this component to a class because we need to have didmount method here
    unsubscribeFromSnapshot = null; // we will discover later why we are creating this null value

    componentDidMount(){
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');

        collectionRef.onSnapshot(async snapShot => {
            const collectionMap= convertCollectionsSnapshotToMap(snapShot);
            // console.log(collectionMap);
            updateCollections(collectionMap);
        });
    }
    

    render () {
        const { match } = this.props;   
        return(
            <div className='shop-page'>
                <Route exact path={`${match.url}`} component={CollectionOverview} />
                <Route exact path={`${match.path}/:collectionId`} component={CollectionPage } />
            </div>
        );
    }
    
}
const mapDispatchToProps = dispatch => ({
    updateCollections: collectionMap => dispatch(updateCollections(collectionMap))
})
export default connect(null, mapDispatchToProps)(ShopPage);