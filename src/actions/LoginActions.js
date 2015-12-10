import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {LOGIN_USER, LOGOUT_USER} from '../constants/LoginConstants.js';
import RouterContainer from '../services/RouterContainer'

export default {
  loginUser: (jwt, user) => {
    var savedJwt = localStorage.getItem('jwt');
    var savedUser = JSON.parse(localStorage.getItem('user'));
 
    //need email or another solution to now user email
    AppDispatcher.dispatch({
      actionType: LOGIN_USER,
      jwt: jwt,
      userData: user
    });
    
    if (savedJwt !== jwt) {
      var nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/';

      RouterContainer.get().transitionTo(nextPath);
      localStorage.setItem('jwt', jwt);
      localStorage.setItem('user', JSON.stringify(user));
    }
  },
  logoutUser: () => {
    RouterContainer.get().transitionTo('/login');

    localStorage.removeItem('jwt');
    localStorage.removeItem('user');

    AppDispatcher.dispatch({
      actionType: LOGOUT_USER
    });
  }
}
