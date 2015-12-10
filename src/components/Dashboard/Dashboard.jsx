import React from '../../../node_modules/react/addons';
import ReactMixin from 'react-mixin';
import AuthenticatedComponent from './../Authenticated/AuthenticatedComponent';
import DashboardStore from '../../stores/DashboardStore.js';
import DashboardService from '../../services/DashboardService.js';

ReactMixin(AuthenticatedComponent.prototype, React.addons.LinkedStateMixin);

export default AuthenticatedComponent(

  class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getGroups();
    this._onChange = this._onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      groupName: 'changeme',
      groups: ''
    };
  }

  componentDidMount() {
    DashboardService.getGroups();

    DashboardStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    DashboardStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(this.getGroups());
  }

  requestSaveGroup(){
    DashboardService.saveGroup(this.state.groupName);
  }

  getGroups() {
    return {
      groups: DashboardStore.groups
    };
  }

  handleChange (newValue) {
    this.setState({groupName: newValue});
  }

  render() {
    var valueLink = {
      value: this.state.groupName,
      requestChange: this.handleChange
    };
    var groups = this.state.groups;
    var list = [];
    for(var key in groups){
      list.push(<li>{groups[key].groupName}</li>)
    }
    return (
      <div>
       <h1>Save group</h1>
       {list}
        <form role="form">
        <div className="form-group">
          <label htmlFor="group">Group</label>
          <input type="text" className="form-control" valueLink={valueLink} id="group" ref="group" placeholder="group" />
        </div>
        <button type="submit" className="btn btn-default" onClick={this.requestSaveGroup.bind(this)}>Submit</button>
      </form>
      </div>
    );
  }
}
);

