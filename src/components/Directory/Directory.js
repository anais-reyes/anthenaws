import React, { Component } from 'react';
import './Directory.css';
import getName from '../getName';
import { Modal, ModalHeader, ModalBody, Container, Row, Col } from 'reactstrap';

class Directory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: true
    };

    this.toggle = this.toggle.bind(this);
    this.changeBackdrop = this.changeBackdrop.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  changeBackdrop(e) {
    let value = e.target.value;
    if (value !== 'static') {
      value = JSON.parse(value);
    }
    this.setState({ backdrop: value });
  }

  render() {
    return (
      <section>
        <Container>
          <Row>
            {this.props.users.map(element => {
              return (
                <Col
                  md="4"
                  xs="6"
                  sm="6"
                  data-email={element.email}
                  key={element.cell}
                  className="user-container"
                  onClick={event => {
                    this.props.selectUser(event);
                    this.toggle();
                  }}
                >
                  <img
                    className="thumb"
                    src={element.picture.thumbnail}
                    alt="profilepic"
                  />
                  <span>{`${getName(element.name.title)}${
                    element.name.title === 'mr' ||
                    element.name.title === 'mrs' ||
                    element.name.title === 'ms'
                      ? '.'
                      : ''
                  }
                 ${getName(element.name.first)} 
                 ${getName(element.name.last)}`}</span>
                </Col>
              );
            })}
          </Row>
        </Container>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          backdrop={this.state.backdrop}
        >
          <ModalHeader toggle={this.toggle} />
          <ModalBody>
            <h2>
              {this.props.selectedUser
                ? `${getName(this.props.selectedUser.name.title)}${
                    this.props.selectedUser.name.title === 'mr' ||
                    this.props.selectedUser.name.title === 'mrs' ||
                    this.props.selectedUser.name.title === 'ms'
                      ? '.'
                      : ''
                  }
                 ${getName(this.props.selectedUser.name.first)} 
                 ${getName(this.props.selectedUser.name.last)}`
                : ''}
            </h2>
            <img
              src={
                this.props.selectedUser
                  ? this.props.selectedUser.picture.large
                  : ''
              }
            />
            <p>
              Phone:{' '}
              {this.props.selectedUser ? this.props.selectedUser.phone : ''}
            </p>
            <p>
              Email:{' '}
              {this.props.selectedUser ? this.props.selectedUser.email : ''}
            </p>
            <p>
              State:{' '}
              {this.props.selectedUser
                ? getName(this.props.selectedUser.location.state)
                : ''}
            </p>
          </ModalBody>
        </Modal>
      </section>
    );
  }
}

export default Directory;
