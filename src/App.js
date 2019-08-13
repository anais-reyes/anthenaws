//Library
import React, { Component } from 'react';
//Components
import UsersPresentation from './components/UsersPresentation/UsersPresentation';
import SearchDropdown from './components/SearchDropdown/SearchDropdown';
import SearchInput from './components/SearchInput/SearchInput';
import Directory from './components/Directory/Directory';

//Styles
import './App.css';
import { Container } from 'reactstrap';
//Getname
import getName from './components/getName';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      genders: [],
      originalUsers: [],
      selectedUser: null,
      gender: 'All Users'
    };
    this.filterUsers = this.filterUsers.bind(this);
    this.selectUser = this.selectUser.bind(this);
    this.findUser = this.findUser.bind(this);
  }

  //Function to get the gender of the users
  getGenders(users) {
    let genders = users.map(element => element.gender);
    this.setState({ genders: new Set(genders) });
  }

  //Function to select an user and highlight the container
  selectUser(event) {
    let email = event.target.dataset.email
      ? event.target.dataset.email
      : event.target.parentElement.dataset.email;
    let user = this.state.originalUsers.find(element => {
      return element.email === email;
    });
    this.setState({ selectedUser: user }, () =>
      console.log(this.state.selectedUser)
    );
  }

  //Function to filter the users with the dropdown event
  filterUsers(event) {
    if (
      event.target.innerText.toLowerCase() === 'male' ||
      event.target.innerText.toLowerCase() === 'female'
    ) {
      let users = this.state.originalUsers.filter(element => {
        return element.gender === event.target.innerText.toLowerCase();
      });
      this.setState({
        users: users,
        selectedUser: null,
        gender: getName(event.target.innerText)
      });
    } else {
      this.setState({
        users: this.state.originalUsers,
        selectUser: null,
        gender: 'All Users'
      });
    }
  }

  findUser(event) {
    let value = event.target.value.toLowerCase();
    let matches = this.state.originalUsers.filter(user => {
      return (
        user.name.first.indexOf(value) !== -1 ||
        user.name.last.indexOf(value) !== -1
      );
    });
    if (this.state.gender === 'male' || this.state.gender === 'female') {
      matches = matches.filter(
        user => user.gender === this.state.gender.toLowerCase()
      );
    }

    this.setState({ users: matches });
  }

  //Lifecycle method to fetch users data
  componentDidMount() {
    fetch('https://randomuser.me/api/?results=21')
      .then(response => response.json())
      .then(users => {
        this.setState({ users: users.results, originalUsers: users.results });
        this.getGenders(users.results);
      });
  }
  render() {
    return (
      <section className="App">
        <UsersPresentation />
        <Container className="filters">
          <SearchDropdown
            genders={this.state.genders}
            filterUsers={this.filterUsers}
            gender={this.state.gender}
          />
          <SearchInput findUsers={this.findUser} />
        </Container>

        <Directory
          users={this.state.users}
          selectedUser={this.state.selectedUser}
          selectUser={this.selectUser}
        />
      </section>
    );
  }
}

export default App;
