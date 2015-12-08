import request from 'reqwest';
import when from 'when';
import FP from '../services/FirebaseService';
import {LOGIN_URL, SIGNUP_URL}from '../constants/LoginConstants';
import LoginActions from '../actions/LoginActions';

class AuthService {

  login(email, password) {
    return this.handleAuth(when(FP.authWithPassword({
      email: email,
      password: password
    })));
  }

  logout() {
    LoginActions.logoutUser();
  }

  signup(email, password) {
    return this.handleSignup(when(FP.createUser({
      email: email,
      password: password
    })), {
      email: email,
      password: password
    });
  }


  handleAuth(loginPromise) {
    return loginPromise
      .then(function(response) {
        var user = {};
        user.email = response.password.email;
        user.profileImageURL = response.password.profileImageURL;

        var jwt = response.token;
        LoginActions.loginUser(jwt, user.email);
        return true;
      });
  }

  handleSignup(promise, user) {
    return promise
      .then(function(res) {
        if (res.uid) {
          let decoded_email = encodeURIComponent(user.email).replace('.', '%2E');
          let profile = {};
          profile[""+decoded_email+""] = {
            name: '',
            phone: '',
            admin: true
          };
          FP.child("profiles").set(profile).then(function(res) {
            console.log(res);
            alert('Successfully saved.')
            return true;
          }, function(err) {
            alert(err);
            console.error('Error authenticating to Firebase!');
          });
        }
      });

  }


}


export default new AuthService()
