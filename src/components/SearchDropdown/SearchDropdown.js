import React, { Component } from 'react';
import './SearchDropdown.css';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import getName from '../getName';

class SearchDropdown extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>{this.props.gender}</DropdownToggle>
        <DropdownMenu>
          {Array.from(this.props.genders).map(element => {
            return (
              <DropdownItem
                key={element}
                onClick={event => {
                  this.props.filterUsers(event);
                }}
              >
                {getName(element)}
              </DropdownItem>
            );
          })}
          <DropdownItem
            onClick={event => {
              this.props.filterUsers(event);
            }}
          >
            All Users
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default SearchDropdown;
