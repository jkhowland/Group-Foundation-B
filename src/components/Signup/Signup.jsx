import React from '../../../node_modules/react/addons';
import ReactMixin from 'react-mixin';
import Auth from '../../services/AuthService'

export default class Signup extends React.Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    };
  }

  signup(e) {
    e.preventDefault();
    Auth.signup(this.state.email, this.state.password)
      .catch(function(err) {
        alert("There's an error logging in");
        console.log("Error logging in", err);
      });
  }

  render() {
    return (
      <div className="login jumbotron center-block">
        <h1>Signup</h1>
        <form role="form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" valueLink={this.linkState('email')} className="form-control" id="username" placeholder="Username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" valueLink={this.linkState('password')} className="form-control" id="password" ref="password" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-default" onClick={this.signup.bind(this)}>Submit</button>
      </form>
    </div>
    );
  }
}

ReactMixin(Signup.prototype, React.addons.LinkedStateMixin);
