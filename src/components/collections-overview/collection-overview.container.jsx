import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'; 
import { compose } from 'redux';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';

import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionOverview from '../collections-overview/collections-overview.component';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
});

//const CollectionOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionOverview));

const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner)
    (CollectionOverview);// this is equivalent with the above code
export default CollectionOverviewContainer;
