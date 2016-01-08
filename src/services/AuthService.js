import when from 'when';
import FP from '../services/FirebaseService';
import {LOGIN_URL, SIGNUP_URL} from '../constants/LoginConstants';
import LoginActions from '../actions/LoginActions';
import Email from '../services/EmailService.js';
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

  signup(email, password, name, phone) {
    return this.handleSignup(when(FP.createUser({
      email: email,
      password: password
    })), {
      email: email,
      password: password,
      name: name,
      phone: phone
    });
  }


  handleAuth(loginPromise) {
    return loginPromise
      .then(function(response) {
        var user = {};
        user.email = response.password.email;
        user.profileImageURL = response.password.profileImageURL;
        var jwt = response.token;
        //get user name, another
        FP.child('profiles/' + Email.escapeEmail(user.email)).on('value', function(data){
          user.name = data.val().name;
          user.phone = data.val().phone;
          LoginActions.loginUser(jwt, user);
          return true;
        });
      });
  }

  handleSignup(promise, user) {
    return promise
      .then(function(res) {
        if (res.uid) {
          //save
          FP.child("profiles/" + Email.escapeEmail(user.email)).set({
            name: user.name,
            phone: user.phone,
            admin: true
          }).then(function(res) {
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
