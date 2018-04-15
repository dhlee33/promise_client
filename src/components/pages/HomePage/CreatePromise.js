import React, { Component } from 'react'
import DateTime from 'react-datetime'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, Col, Container, Input, Button } from 'reactstrap'
import moment from 'moment'
import { Actions } from './reducer'

class CreatePromise extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sinceWhen: '',
      tilWhen: '',
      user2: null,
      // Promises: [],
    }
    console.log(this.props)
    this.createPromise = this.createPromise.bind(this)
    this.props.fetchPromiseList(this.props.userId)
    this.props.fetchUsers()
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
        {this.props.username &&
        <div>
          <span>USER: {this.props.username}&nbsp;</span> <Button color="link" onClick={this.props.logout}>LOGOUT</Button>
          <span style={{color: 'red', fontSize: '20px'}}>{this.props.errorMessage}</span>
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
                inputProps={{placeholder: 'sinceWhen'}}
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
                inputProps={{placeholder: 'tilWhen'}}
              />
            </Col>
            <Col sm={3}>
              <Input
                type="select"
                onChange={e => this.setState({ user2: e.target.value })}
              >
                <option>Select User 2</option>
                {this.props.users.map(u => <option>{u.id}</option>)}
              </Input>
            </Col>
            <Col>
              <Button onClick={this.createPromise}>Create Promise</Button>
            </Col>
          </Row>
          <hr />
          <h1>Promises</h1>
          <div>
            <span>promises as inviter: </span>
            {this.props.promises_as_inviter.map(p => <span>{p} </span>)}
          </div>
          <div>
            <span>promises as invitee: </span>
            {this.props.promises_as_invitee.map(p => <span>{p} </span>)}
          </div>
          {/* {this.state.Promises.length === 0 && <div>There is no promises</div>} */}
          {/* {this.state.Promises.map(p => ( */}
          {/* <div> */}
          {/* <div>sinceWhen: <span>{p.sinceWhen}</span></div> */}
          {/* <div>tilWhen: <span>{p.tilWhen}</span></div> */}
          {/* <div>user2: <span>{p.user2Id}</span></div> */}
          {/* <hr /> */}
          {/* </div> */}
          {/* ))} */}
        </div>
      }
      </Container>
    )
  }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({
  logout: Actions.logout,
  createPromise: Actions.createPromiseRequest,
  fetchPromiseList: Actions.fetchPromiseListRequest,
  fetchUsers: Actions.fetchUsersRequest,
}, dispatch)

const mapStateToProps = (state) => ({
  username: state.HomePageReducer.username,
  userId: state.HomePageReducer.userId,
  promises_as_inviter: state.HomePageReducer.promises_as_inviter,
  promises_as_invitee: state.HomePageReducer.promises_as_invitee,
  users: state.HomePageReducer.users,
  errorMessage: state.HomePageReducer.errorMessage,
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePromise)
