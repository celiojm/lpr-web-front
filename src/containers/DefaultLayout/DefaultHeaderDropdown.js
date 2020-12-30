import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Progress } from 'reactstrap';

const propTypes = {
  notif: PropTypes.bool,
  accnt: PropTypes.bool,
};
const defaultProps = {
  notif: false,
  accnt: false,
};

class DefaultHeaderDropdown extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  dropNotif() {
    const itemsCount = 5;
    return (
      <Dropdown nav className="d-md-down-none" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          <i className="icon-bell"/><Badge pill color="danger">{itemsCount}</Badge>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header tag="div" className="text-center"><strong>You have {itemsCount} notifications</strong></DropdownItem>
          <DropdownItem><i className="icon-user-follow text-success"/> New user registered</DropdownItem>
          <DropdownItem><i className="icon-user-unfollow text-danger"/> User deleted</DropdownItem>
          <DropdownItem><i className="icon-chart text-info"/> Sales report is ready</DropdownItem>
          <DropdownItem><i className="icon-basket-loaded text-primary"/> New client</DropdownItem>
          <DropdownItem><i className="icon-speedometer text-warning"/> Server overloaded</DropdownItem>
          <DropdownItem header tag="div" className="text-center"><strong>Server</strong></DropdownItem>
          <DropdownItem>
            <div className="text-uppercase mb-1">
              <small><b>CPU Usage</b></small>
            </div>
            <Progress className="progress-xs" color="info" value="25" />
            <small className="text-muted">348 Processes. 1/4 Cores.</small>
          </DropdownItem>
          <DropdownItem>
            <div className="text-uppercase mb-1">
              <small><b>Memory Usage</b></small>
            </div>
            <Progress className="progress-xs" color="warning" value={70} />
            <small className="text-muted">11444GB/16384MB</small>
          </DropdownItem>
          <DropdownItem>
            <div className="text-uppercase mb-1">
              <small><b>SSD 1 Usage</b></small>
            </div>
            <Progress className="progress-xs" color="danger" value={90} />
            <small className="text-muted">243GB/256GB</small>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  dropAccnt() {
    return (
      <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          <span>Username</span>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
          <DropdownItem><i className="fa fa-user"/> Profile</DropdownItem>
          <DropdownItem><i className="fa fa-wrench"/> Settings</DropdownItem>
          <DropdownItem divider />
          <DropdownItem><i className="fa fa-shield"/> Lock Account</DropdownItem>
          <DropdownItem onClick={this.props.onLogout}><i className="fa fa-lock"/> Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  render() {
    const { notif, accnt} = this.props;
    return (
        notif ? this.dropNotif() :
          accnt ? this.dropAccnt() :null
    );
  }
}

DefaultHeaderDropdown.propTypes = propTypes;
DefaultHeaderDropdown.defaultProps = defaultProps;

export default DefaultHeaderDropdown;
