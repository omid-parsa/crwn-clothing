import React from 'react';

import { Route } from 'react-router-dom';
import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { createStructuredSelector } from 'reselect';

import { selectIsCollectionFetching, selectIsCollectionLoaded  } from '../../redux/shop/shop.selectors';

// import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'; // we removed this after thunk-redux

import { connect } from 'react-redux';
// import { updateCollections } from '../../redux/shop/shop.actions';// we removed this after thunk-redux
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';


import WithSpinner from '../../components/with-spinner/with-spinner.component'; // this is a high order component

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    // state= { // we removed this after thunk-redux
    //     loading: true
    // }

// we changed this component to a class because we need to have didmount method here
    unsubscribeFromSnapshot = null; // we will discover later why we are creating this null value

    componentDidMount(){
        const { fetchCollectionsStartAsync } = this.props;
        fetchCollectionsStartAsync();
        // const { updateCollections } = this.props; // we removed this after thunk-redux
        // const collectionRef = firestore.collection('collections'); // these codes moved to action
        /*
        collectionRef.onSnapshot(async snapShot => {
            const collectionMap= convertCollectionsSnapshotToMap(snapShot);
            // console.log(collectionMap);
            updateCollections(collectionMap);
            this.setState({ loading: false})
        });*/
        // we change the above observeable method to a fetch method. observeable methods are methods that constanly check if something is happening
        //below a new method we created that only fetch data one time
        
        /*collectionRef.get().then( snapShot => {  //these codes moved to action
            const collectionMap= convertCollectionsSnapshotToMap(snapShot);
            updateCollections(collectionMap);
            this.setState({ loading: false})
        }); */
    }
    

    render () {
        const { match, isCollectionsFetching, selectIsCollectionLoaded } = this.props; 
        // const { loading } = this.state;  // we removed this after thunk-redux
        return(
            <div className='shop-page'>
                <Route exact path={`${match.url}`} render= { props => (
                    <CollectionsOverviewWithSpinner isLoading={isCollectionsFetching} {...props} />
                ) } />
                
                <Route exact path={`${match.path}/:collectionId`} render = { props => (
                    <CollectionPageWithSpinner isLoading={!selectIsCollectionLoaded} {...props} />
                )} />
            </div>
        );
    }
    
}
const mapDispatchToProps = dispatch => ({
    // updateCollections: collectionMap => dispatch(updateCollections(collectionMap))// we removed this after redux-thunk
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})
const mapStateToProps = createStructuredSelector({
    isCollectionsFetching: selectIsCollectionFetching,
    selectIsCollectionLoaded: selectIsCollectionLoaded
})
export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);