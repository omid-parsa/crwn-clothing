import { createSelector } from 'reselect';



const selectShop = state => state.shop;

export const collectionsSelector = createSelector([selectShop],
    shop => shop.collections
);
// below we create an array from an object
// notice first we extract the keys of the collections object then with map we create a new array with going through the object

export const selectCollectionForPreview = createSelector([collectionsSelector],
    collections => Object.keys(collections).map(key => collections[key])
);
export const collectionSelector = collectionUrlParam => createSelector(
    [collectionsSelector],
    collections => collections[collectionUrlParam]
);