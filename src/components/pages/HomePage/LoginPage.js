import React, { Component } from 'react'
import { Row, Col, Container, Input, Button } from 'reactstrap'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Actions } from './reducer'


class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }
  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <Input placeholder="USERNAME" onChange={e => this.setState({username: e.target.value})} />
          </Col>
          <Col>
            <Input placeholder="PASSWORD" onChange={e => this.setState({password: e.target.value})} />
          </Col>
          <Col>
            <Button onClick={() => this.props.login(this.state)}>LOGIN</Button>
          </Col>
        </Row>
        <span style={{color: 'red', fontSize: '20px'}}>{this.props.errorMessage}</span>
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login: Actions.loginRequest,
}, dispatch)

const mapStateToProps = (state) => ({
  errorMessage: state.HomePageReducer.errorMessage,
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
