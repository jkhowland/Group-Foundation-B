import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {QUOTE_GET, GROUPS_GET, GROUP_SAVED} from '../constants/DashboardConstants.js';

export default {
  gotQuote: (quote) => {
    AppDispatcher.dispatch({
      actionType: QUOTE_GET,
      quote: quote
    })
  },

  groupSaved: (res) => {
    AppDispatcher.dispatch({
      actionType: GROUP_SAVED
      //quote: quote
    })
  },

  gotGroups: (groups) => {
    AppDispatcher.dispatch({
      actionType: GROUPS_GET,
      groups: groups
    })
  },
}
