import React, { Component } from 'react';
import {connect} from 'react-redux'
import {signIn,signOut} from '../actions'

class GoogleAuth extends Component {

    componentDidMount(){
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                clientId:'562300077344-doa0g5ee63fkc73bglc5fg4mg0qrceed.apps.googleusercontent.com',
                scope:'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    onAuthChange = (isSignedIn)=>{
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        }
        else{
            this.props.signOut();
        }
}
    renderAuthButton(){
        if(this.props.isSignedIn===null){
            return null;
        }
         if(this.props.isSignedIn===true){
            return (
                <button onClick={this.auth.signOut} className="ui red google button">
                    <i className="google icon"></i>
                    Sign Out
                </button>
            )
        }
        else{
            return(
            <button onClick={this.auth.signIn} className="ui red google button">
                    <i className="google icon"></i>
                    Sign In With Google
                </button>
            )
        }
    }
    render() { 
        return ( 
        <div>
            {this.renderAuthButton()}
            
        </div> );
    }
}

const mapStateToProps = (state)=>{
    return {isSignedIn:state.auth.isSignedIn}
}
export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth);