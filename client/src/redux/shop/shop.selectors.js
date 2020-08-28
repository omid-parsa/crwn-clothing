import { createSelector } from 'reselect';



const selectShop = state => state.shop;

export const collectionsSelector = createSelector([selectShop],
    shop => shop.collections
);
// below we create an array from an object
// notice first we extract the keys of the collections object then with map we create a new array with going through the object

export const selectCollectionForPreview = createSelector([collectionsSelector],
    collections =>collections ? Object.keys(collections).map(key => collections[key]) : []
);
export const collectionSelector = collectionUrlParam => createSelector(
    [collectionsSelector],
    collections => ( collections? collections[collectionUrlParam] : null)
);
export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
);
export const selectIsCollectionLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
);