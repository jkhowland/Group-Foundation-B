import React from '../../../node_modules/react/addons';
import ReactMixin from 'react-mixin';
import AuthenticatedComponent from './../Authenticated/AuthenticatedComponent';
import DashboardStore from '../../stores/DashboardStore.js';
import DashboardService from '../../services/DashboardService.js';

export default AuthenticatedComponent(

  class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getQuoteState();
    this._onChange = this._onChange.bind(this);
    this.state = {
      group: ''
    };
  }

  componentDidMount() {
    if (!this.state.quote) {
      this.requestNextQuote();
    }

    DashboardStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    DashboardStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(this.getQuoteState());
  }

  requestNextQuote() {
    DashboardService.nextQuote();
  }

  requestSaveGroup(){
    DashboardService.saveGroup();
  }

  getQuoteState() {
    return {
      quote: DashboardStore.quote
    };
  }

  render() {
    return (
      <div>
       <h1>Save group</h1>
        <form role="form">
        <div className="form-group">
          <label htmlFor="group">Group</label>
          <input type="text" className="form-control" id="group" ref="group" placeholder="group" />
        </div>
        <button type="submit" className="btn btn-default" onClick={this.requestSaveGroup}>Submit</button>
      </form>
      </div>
    );
  }
}
);

