import request from 'reqwest';
import when from 'when';
import {
  QUOTE_URL
}
from '../constants/DashboardConstants';
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

  getGroups() {
    var user = LoginStore.userData;
    console.log(user);
    FP.child('profiles/' + Email.escapeEmail(user.email) + '/groups').on('value', function(data) {
      //got groups
      DashboardActions.gotGroups(data.val());
    });
  }

  saveGlobalGroup() {

  }

  saveGroup(groupName) {
    var user = LoginStore.userData;

    FP.child("profiles/" + Email.escapeEmail(user.email)).child('/groups').push({
        groupName: groupName,
        admin: true,
        name: user.name
      })
      .once('value', function(a, b, c) {

        var lastKey = a.key();
        var joinDate = new Date().getTime();

        FP.child("groups/" + lastKey)
          .set({
            groupName: groupName,
            admin: {
              [Email.escapeEmail(user.email)]: {
                name: user.name,
                phone: user.phone,
                joinDate: joinDate
              }
            }
          }).then(function() {
            console.log('ok')
          }, function(err) {
            console.log(err)
          });

      });
  }

}

export default new DashboardService()
