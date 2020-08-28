import React from 'react';
import { auth, createUserPropileDocument } from '../../firebase/firebase.utils';

import FormInput  from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import ErrorMessage from '../error-message/error-message.component';

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor () {
        super();

        this.state= {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
            errorMsg: null
        }
    }
    handleSubmit = async event => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword} = this.state;

        if (password !== confirmPassword) {
            this.setState({ errorMsg: "Passwords do not match" })
            return;
        }
        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            await createUserPropileDocument(user, {displayName});
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: '',
                errorMsg: null
            });
        } catch (error) {
            console.log(error.message);
            this.setState({ errorMsg: error.message })
        }
    }
    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    render() {
        const { displayName, email, password, confirmPassword} = this.state;
        return (
            <div className='sign-up'>
                <h2>I do not have an account</h2>
                <span>Sign up with your email</span>
                {
                    this.state.errorMsg ? (
                        <ErrorMessage errorMsg={this.state.errorMsg} />
                    ) : ''
                }
                <form className='sign-up-form' onSubmit={this.handleSubmit}> 
                    <FormInput
                        type='text'
                        name= 'displayName'
                        value= {displayName}
                        onChange= {this.handleChange}
                        label='Display Name'
                        required
                    />
                    <FormInput
                        type='email'
                        name= 'email'
                        value= {email}
                        onChange= {this.handleChange}
                        label='Email'
                        required
                    />
                    <FormInput
                        type='password'
                        name= 'password'
                        value= {password}
                        onChange= {this.handleChange}
                        label='Password'
                        required
                    />
                    <FormInput
                        type='password'
                        name= 'confirmPassword'
                        value= {confirmPassword}
                        onChange= {this.handleChange}
                        label='Confirm Password'
                        required
                    />

                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}
export default SignUp;