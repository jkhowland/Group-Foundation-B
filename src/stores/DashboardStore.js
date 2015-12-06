import {QUOTE_GET} from '../constants/DashboardConstants';
import {LOGOUT_USER} from '../constants/LoginConstants';
import BaseStore from './BaseStore';

class DashboardStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._quote = '';
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case QUOTE_GET:
        this._quote = action.quote;
        this.emitChange();
        break;
      case LOGOUT_USER:
        this._quote = null;
        this.emitChange();
        break;
      default:
        break;
    };
  }

  get quote() {
    return this._quote;
  }
}

export default new DashboardStore();
