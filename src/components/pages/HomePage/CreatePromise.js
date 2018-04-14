import React, { Component } from 'react'
import DateTime from 'react-datetime'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import { Row, Col, Container, Input, Button } from 'reactstrap'
import moment from 'moment'
import { Actions } from './reducer'

class CreatePromise extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sinceWhen: '2018-04-07T09:09:59.496396Z',
      tilWhen: '2018-04-08T09:09:59.496396Z',
      user2: 43,
      // Promises: [],
    }
    this.createPromise = this.createPromise.bind(this)
  }

  createPromise() {
    // this.setState({
    //   Promises: [
    //     ...this.state.Promises,
    //     {
    //       sinceWhen: this.state.sinceWhen,
    //       tilWhen: this.state.tilWhen,
    //       user2: this.state.user2,
    //     }],
    // })
    this.props.createPromise(this.state)
  }

  render() {
    return (
      <Container fluid>
        <Button onClick={this.props.logout}>LOGOUT</Button>
        <hr />
        <h1>Create Promise</h1>
        <Row>
          <Col sm={3}>
            <DateTime
              placeholder="sinceWhen"
              onChange={(m) => {
                if (m instanceof moment) {
                  this.setState({
                    sinceWhen: m.format(),
                  })
                }
              }}
            />
          </Col>
          <Col sm={3}>
            <DateTime
              placeholder="tilWhen"
              onChange={(m) => {
                if (m instanceof moment) {
                  this.setState({
                    tilWhen: m.format(),
                  })
                }
              }}
            />
          </Col>
          <Col sm={3}>
            <Input
              type="select"
              onChange={e => this.setState({ user2: e.target.value })}
            >
              <option>2</option>
              <option>3</option>
            </Input>
          </Col>
          <Col>
            <Button onClick={this.createPromise}>Create Promise</Button>
          </Col>
        </Row>
        <hr />
        <h1>Promises</h1>
        {/*{this.state.Promises.length === 0 && <div>There is no promises</div>}*/}
        {/*{this.state.Promises.map(p => (*/}
          {/*<div>*/}
            {/*<div>sinceWhen: <span>{p.sinceWhen}</span></div>*/}
            {/*<div>tilWhen: <span>{p.tilWhen}</span></div>*/}
            {/*<div>user2: <span>{p.user2Id}</span></div>*/}
            {/*<hr />*/}
          {/*</div>*/}
        {/*))}*/}
      </Container>
    )
  }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({
  logout: Actions.logout,
  createPromise: Actions.createPromiseRequest,
}, dispatch)

export default connect(null, mapDispatchToProps)(CreatePromise)
