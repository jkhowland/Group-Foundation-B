import {QUOTE_GET, GROUPS_GET} from '../constants/DashboardConstants';
import {LOGOUT_USER} from '../constants/LoginConstants';
import BaseStore from './BaseStore';

class DashboardStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._groups = '';
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
      case GROUPS_GET:
        this._groups = action.groups;
        this.emitChange();
        break;
      default:
        break;
    };
  }

  get groups() {
    return this._groups;
  }
}

export default new DashboardStore();
