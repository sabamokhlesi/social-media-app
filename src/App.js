import React from 'react'
import './App.scss';
import SignUpPage from './containers/sign-up-page/sign-up-page'
import SignInPage from './containers/sign-in-page/sign-in-page'
import Account from './containers/account/account'
import * as actions from './store/actions/index'
import {connect} from 'react-redux'
import {Redirect, Route,Switch} from 'react-router-dom'


class App extends React.Component{

  componentDidMount(){
    this.props.onTryAutoSignUp()
  }

  render(){
    return (
      <div className="App">
        {!this.props.isSignedUp?
            <Switch>
              <Route path='/' exact component={!this.props.isSignedUp?SignUpPage:Account}/>
              <Route path='/sign-up' exact component={SignUpPage}/>
              <Route path='/sign-in' exact component={SignInPage}/>
              <Redirect to='/sign-up'/>
            </Switch>
        :<Account/>}
      </div>
    );
  }
}

const mapStateToProps = state =>{return{isSignedUp : state.auth.token !== null}}
const mapDispatchToProps = dispatch =>{return{onTryAutoSignUp: () => dispatch(actions.checkSignIn())}}

export default connect(mapStateToProps,mapDispatchToProps)(App);
