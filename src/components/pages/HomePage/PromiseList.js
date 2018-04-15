import React, { Component } from 'react'
import { connect } from 'react-redux'

const PromiseList = (props) => {
  return (
    <div>
      <h1>Promises</h1>
      <div>
        <span>promises as inviter: </span>
        {props.promises_as_inviter.map(p => <span>{p} </span>)}
      </div>
      <div>
        <span>promises as invitee: </span>
        {props.promises_as_invitee.map(p => <span>{p} </span>)}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  promises_as_inviter: state.HomePageReducer.promises_as_inviter,
  promises_as_invitee: state.HomePageReducer.promises_as_invitee,
})

export default connect(mapStateToProps, null)(PromiseList)
