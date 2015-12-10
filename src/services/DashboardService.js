import request from 'reqwest';
import when from 'when';
import {QUOTE_URL} from '../constants/DashboardConstants';
import DashboardActions from '../actions/DashboardActions';
import Email from '../services/EmailService.js';
import LoginStore from '../stores/LoginStore.js';
import FP from './FirebaseService.js';

class DashboardService {

  nextQuote() {
    request({
        url: QUOTE_URL,
        method: 'GET',
        crossOrigin: true,
        headers: {
          'Authorization': 'Bearer ' + LoginStore.jwt
        }
      })
      .then(function(response) {
        DashboardActions.gotQuote(response);
      });
  }

  saveGroup(groupName) {
    var user = JSON.parse(LoginStore.userData);
    FP.child("profiles/" + Email.escapeEmail(user.email)).child('/groups').push({
      groupName: groupName,
      admin: true,
      name: user.name
    }).then(function(res) {
      console.log('res' + res)
      //DashboardActions.groupSaved(res);
      
    }, function(err) {
      console.log(err)
      // DashboardActions.gotQuote(response);
    });
  }
}

export default new DashboardService()
