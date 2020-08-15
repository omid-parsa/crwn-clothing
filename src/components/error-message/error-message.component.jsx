import React from 'react';

import './error-message.styles.scss';

const ErrorMessage = ({errorMsg}) => (
    <div className='error-message'>
        <p>{errorMsg}</p>
    </div>
)
export default ErrorMessage;