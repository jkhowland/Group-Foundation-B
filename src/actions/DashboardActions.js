import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {QUOTE_GET} from '../constants/DashboardConstants.js';

export default {
  gotQuote: (quote) => {
    AppDispatcher.dispatch({
      actionType: QUOTE_GET,
      quote: quote
    })
  },

  groupSaved: (res) => {
    console.log(res);
    AppDispatcher.dispatch({
      actionType: QUOTE_GET
      //quote: quote
    })
  }
}
