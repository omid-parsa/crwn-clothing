import React from 'react';

import { Route } from 'react-router-dom';
// import CollectionOverview from '../../components/collections-overview/collections-overview.component';// we removed this after creating container HOC
import CollectionOverviewContainer from '../../components/collections-overview/collection-overview.container';
import CollectionPageContainer from '../collection/collection.container';

// import { createStructuredSelector } from 'reselect';

// import { selectIsCollectionFetching, selectIsCollectionLoaded  } from '../../redux/shop/shop.selectors'; // we removed this after creating container HOC

// import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'; // we removed this after thunk-redux

import { connect } from 'react-redux'; 
// import { updateCollections } from '../../redux/shop/shop.actions';// we removed this after thunk-redux
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';


// import WithSpinner from '../../components/with-spinner/with-spinner.component'; // this is a high order component

// const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);// we removed this after creating container HOC
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);// we removed this after creating container HOC

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
        const { match } = this.props; 
        // const { loading } = this.state;  // we removed this after thunk-redux
        return(
            <div className='shop-page'>
                <Route exact path={`${match.url}`} component={CollectionOverviewContainer} />
                
                <Route exact path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
                 
            </div>
        );
    }
    
}
const mapDispatchToProps = dispatch => ({
    // updateCollections: collectionMap => dispatch(updateCollections(collectionMap))// we removed this after redux-thunk
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})
// const mapStateToProps = createStructuredSelector({
    // isCollectionsFetching: selectIsCollectionFetching,// we removed this after creating container HOC
    // selectIsCollectionLoaded: selectIsCollectionLoaded // we removed this after creating container HOC
// })
export default connect(null, mapDispatchToProps)(ShopPage);