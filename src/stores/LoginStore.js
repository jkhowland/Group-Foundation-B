import {LOGIN_USER, LOGOUT_USER} from '../constants/LoginConstants';
import BaseStore from './BaseStore';
import jwt_decode from 'jwt-decode';

class LoginStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._userData = null;
    this._jwt = null;
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case LOGIN_USER:
        this._jwt = action.jwt;
        //need email or another solution to now user email
        this._user = jwt_decode(this._jwt);
        this._userData = action.userData;
        //save email and picture
        //this._userData.email = action.user.email;
        //this._userData.profileImageURL = action.user.profileImageURL;
        this.emitChange();
        break;
      case LOGOUT_USER:
        this._user = null;
        this._userData = null;
        this.emitChange();
        break;
      default:
        break;
    };
  }

  get user() {
    return this._user;
  }

  get userData() {
    return this._userData;
  }

  get jwt() {
    return this._jwt;
  }

  isLoggedIn() {
    return !!this._user;
  }
}

export default new LoginStore();
