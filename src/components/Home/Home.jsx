import React from 'react';
import AuthenticatedComponent from './../Authenticated/AuthenticatedComponent'

export default AuthenticatedComponent(class Home extends React.Component {
  render() {
    return (
    	<div>
    	<h1>
    	Hello {this.props.user ? this.props.user.username : ''}
    	</h1>
    	<p>Look dasnboard page</p>
    	</div>);
  }
});
