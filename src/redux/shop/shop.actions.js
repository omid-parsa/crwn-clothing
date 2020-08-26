import ShopActionsType from './shop.types';
import { firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';

export const updateCollections = collectionsMap => ({
    type:ShopActionsType.UPDATE_COLLECTIONS,
    payload: collectionsMap 
}); 

export const fetchCollectionsStart = () => ({
    type: ShopActionsType.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionsType.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});
export const fetchCollectionsFailure = errorMessage =>({
    type: ShopActionsType.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});
export const fetchCollectionsStartAsync = () => {
    
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart); // here we fire this action to set isFetching to true
        // and after that we continue the following asynchornous flow

        collectionRef.get().then( snapShot => {
            const collectionMap= convertCollectionsSnapshotToMap(snapShot);
            dispatch(fetchCollectionsSuccess(collectionMap));

        }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
    }
}