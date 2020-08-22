import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price *100;
    const publishableKey ='pk_test_51HJ02JDiz2FuLcio65N5fKMsu7SIPEjZ7aDqxPLbiMWE6Zt5tFTTdicflC63LhNoj6PitYKzo38h5J7t9c389RQH00qe6UcGY7';
    const onToken = token => {
        console.log(token);
        alert('Payment Successful!')
    }
    return(
        <StripeCheckout 
            label='Pay Now'
            name='CRWN Clothing ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is: $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};
export default StripeCheckoutButton;

