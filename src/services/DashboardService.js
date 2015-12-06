import request from 'reqwest';
import when from 'when';
import {
  QUOTE_URL
}
from '../constants/DashboardConstants';
import DashboardActions from '../actions/DashboardActions';
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

  saveGroup() {
    FP.child("profiles").child("admin%40admin%2Eua").set({
      groups: [{
        groupId: 1,
        groupName: 'test',
        firstAdminName: 'Name',
        admin: true
      }]
    }).then(function(res) {
          console.log(res);
      
    }, function(err) {
      // DashboardActions.gotQuote(response);
    });
  }
}

export default new DashboardService()
