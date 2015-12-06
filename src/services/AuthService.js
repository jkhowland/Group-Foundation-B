import request from 'reqwest';
import when from 'when';
import FP from '../services/FirebaseService';
import { LOGIN_URL, SIGNUP_URL } from '../constants/LoginConstants';
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
   return this.handleAuth(when(FP.createUser({
     email: email,
     password: password
   })));
 }

  handleAuth(loginPromise) {
    return loginPromise
      .then(function(response) {
        var jwt = response.token;
        LoginActions.loginUser(jwt);
        return true;
      });
  }
}

export default new AuthService()
