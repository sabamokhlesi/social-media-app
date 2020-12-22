import React from 'react'
import './sign-up-page.scss'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/spinner/spinner'
import { withRouter } from "react-router-dom"

class SignUpPage extends React.Component{
    state = {
        signUpMessage : null,
        formIsValid : true
    }
    submitHandler(event){
        let message = null
        let valid = true
        const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        event.preventDefault()
        if(!this.termsAndConditions.checked) {message = 'Please agree to the terms';valid = false}
        if (this.signUpPass.value.trim().length < 6) {message = 'password is too short'; valid = false} 
        if(this.signUpPassRepeat.value !== this.signUpPass.value){message = 'Enter the same password'; valid = false}
        if (this.userName.value.trim().length < 1) {message = 'Please enter a username'; valid = false}
        if (!emailPattern.test(this.signUpEmail.value)){message= 'invalid email'; valid = false}
        if(message === null){
            this.props.onSignUp(this.signUpEmail.value,this.signUpPass.value,this.userName.value,valid);
            this.props.history.push('/')
            this.signUpPass.value = ''
            this.signUpPassRepeat.value =''
            this.userName.value=''
            this.signUpEmail.value = ''
            this.termsAndConditions.checked = false
        } 
        this.setState({signUpMessage:message,formIsValid:valid})
    }
    

    render(){
        let errorMessage = null
        if (this.props.error && this.state.signUpMessage === null) {
            errorMessage = 'Please try again'
        }
        let form = 
            <form className='sign-up'>
                <div className='sign-up-form'>
                        <div className="sign-up-form-title h3">Join Us Now!</div>
                        <p className='sign-up-message'>{this.state.signUpMessage}</p>
                        <p className='sign-up-message'>{errorMessage}</p>
                        <div className="sign-up-form-fields">
                            <div className="sign-up-form-field"><input key='sign-up-email' ref={input => {this.signUpEmail = input;}} type="email" className="sign-up-form-username" placeholder="Email"/></div>
                            <div className="sign-up-form-field"><input key='sign-up-name' ref={input => {this.userName = input;}} type="text" className="sign-up-form-username" placeholder="username"/></div>
                            <div className="sign-up-form-field"><input key='sign-up-pass'  autoComplete='new-password' ref={input => {this.signUpPass = input;}} type="password" className="sign-up-form-password" placeholder="Password" /></div>
                            <div className="sign-up-form-field"><input key='sign-up-pass-repeat' ref={input => {this.signUpPassRepeat = input;}} type="password" className="sign-up-form-password" placeholder="Repeat Your Password" /></div>
                            <input type="checkbox" id="termsAndConditions" name="termsAndConditions" ref={input => {this.termsAndConditions = input;}}></input>
                            <label htmlFor="termsAndConditions" className='sign-up-form-terms'> I agree to the <Link to="/" className='sign-up-to-sign-in-link'>Terms and Conditions</Link></label><br></br>
                        </div>
                        <input type="submit" className="btn btn-four sign-up-btn" value='Sign Up' onClick={this.submitHandler.bind(this)}></input>
                        <div className="sign-up-to-sign-in">
                            <h4>Already have an account? <Link to="/sign-in" className='sign-up-to-sign-in-link'> Sign In</Link></h4>
                        </div>
                </div>
            </form>
        if (this.props.loading){form = <Spinner/>}
        
        return(
            <div className='sign-up-page'>
                <h1>{this.props.loading?'Loading information... please wait':null}</h1>
                {form}  
            </div>
        )
    } 
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error !== null
    };
}

const mapDispatchToProps = dispatch => {
    return{
        onSignUp : (email,password,userName,isValid) => dispatch(actions.addUser(email,password,userName,isValid))
    }
} 
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(SignUpPage))