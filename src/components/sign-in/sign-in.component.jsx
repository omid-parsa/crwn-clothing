import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import ErrorMessage from '../error-message/error-message.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor(props){
        super(props);

        this.state={
            email: '',
            password: '',
            errorMsg: null
        }
    }
    handleSubmit= async event => {
        event.preventDefault();
        const {email, password}= this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '', errorMsg: null});
        } catch (error) {
            this.setState({ errorMsg: error.message });
        }

        
    }

    handleChange = e => {
        const {name, value} =e.target;

        this.setState({ [name]: value });
    }
    render(){
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                {
                    this.state.errorMsg ? 
                    (
                        <ErrorMessage errorMsg={this.state.errorMsg} />
                    )
                    : ''
                }
                <form onSubmit={this.handleSubmit}>
                    <FormInput type='email' name='email' label='email' handleChange={this.handleChange} required value={this.state.email} />

                    <FormInput type='password' name='password' label='password' handleChange={this.handleChange} required value={this.state.password} />
                    <div className='buttons'>
                        <CustomButton type='submit'>Sign In</CustomButton>
                        <CustomButton onClick= {signInWithGoogle} isGoogleSignIn>Sign In With Google</CustomButton>
                    </div>
                    

                </form>
            </div>
        );
    }
}
export default SignIn;