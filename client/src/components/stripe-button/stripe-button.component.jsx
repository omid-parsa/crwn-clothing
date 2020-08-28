import React from 'react';
import axios from 'axios';

import StripeCheckout from 'react-stripe-checkout';
// import { response } from 'express';
// import { json } from 'body-parser';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price *100;
    const publishableKey ='pk_test_51HJ02JDiz2FuLcio65N5fKMsu7SIPEjZ7aDqxPLbiMWE6Zt5tFTTdicflC63LhNoj6PitYKzo38h5J7t9c389RQH00qe6UcGY7';
    const onToken = token => {
        axios({
            url: 'payment',
            method: 'POST',
            data: {
                amount: priceForStripe,
                token
            }
        })
        .then( response => {
            alert('Payment was successful!')
        })
        .catch( error => {
            console.log('Payment error: ', JSON.parse(error));
            alert('There was an issue with the payment, please call the provider');
        })
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

