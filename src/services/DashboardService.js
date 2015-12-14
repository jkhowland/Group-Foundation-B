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

  saveGroup(groupName) {
    var user = LoginStore.userData;

    FP.child("profiles/" + Email.escapeEmail(user.email)).child('/groups').push({
      groupName: groupName,
      admin: true,
      name: user.name
    }).once('value', function(a,b,c){
      var lastKey = a.key();
      
      FP.child("groups/" + lastKey)
        .push({
          t:1,
          a:2
        }).once('value', function(a,b,c){
          console.log(a,b,c);
        });

    });
    // then(function(a,b,c) {
    //   var k =  FP.child("profiles/" + Email.escapeEmail(user.email)).child('/groups');
    //   console.log(k);
    //   console.log(a,b,c);
    //   DashboardActions.groupSaved(a);
     
    // }, function(err) {
    //   console.log(err)
    //     // DashboardActions.gotQuote(response);
    // });
  }

  saveGlobalGroup(){
    
  }
}

export default new DashboardService()
