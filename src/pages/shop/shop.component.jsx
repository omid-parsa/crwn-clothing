import React from 'react';

import { Route } from 'react-router-dom';
import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component'; // this is a high order component

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    state= {
        loading: true
    }

// we changed this component to a class because we need to have didmount method here
    unsubscribeFromSnapshot = null; // we will discover later why we are creating this null value

    componentDidMount(){
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');

        collectionRef.onSnapshot(async snapShot => {
            const collectionMap= convertCollectionsSnapshotToMap(snapShot);
            // console.log(collectionMap);
            updateCollections(collectionMap);
            this.setState({ loading: false})
        });
    }
    

    render () {
        const { match } = this.props; 
        const { loading } = this.state;  
        return(
            <div className='shop-page'>
                <Route exact path={`${match.url}`} render= { props => (
                    <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
                ) } />
                
                <Route exact path={`${match.path}/:collectionId`} render = { props => (
                    <CollectionPageWithSpinner isLoading={loading} {...props} />
                )} />
            </div>
        );
    }
    
}
const mapDispatchToProps = dispatch => ({
    updateCollections: collectionMap => dispatch(updateCollections(collectionMap))
})
export default connect(null, mapDispatchToProps)(ShopPage);