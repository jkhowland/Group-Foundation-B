import React from 'react';
import Router, {Route} from 'react-router';
import AuthenticatedApp from './components/Authenticated/AuthenticatedApp'
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import RouterContainer from './services/RouterContainer';
import LoginActions from './actions/LoginActions';

var routes = (
  <Route handler={AuthenticatedApp}>
    <Route name="login" handler={Login}/>
    <Route name="signup" handler={Signup}/>
    <Route name="home" path="/" handler={Home}/>
    <Route name="dashboard" handler={Dashboard}/>
  </Route>
);

var router = Router.create({routes});
RouterContainer.set(router);

let jwt = localStorage.getItem('jwt');
let user = localStorage.getItem('user');
if (jwt && user) {
  LoginActions.loginUser(jwt, user);
}

router.run(function (Handler) {
  React.render(<Handler />, document.getElementById('content'));
});

