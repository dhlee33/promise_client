import React, { Component } from 'react'
import {connect} from 'react-redux';
import { PageTemplate } from 'components'
import CreatePromise from './CreatePromise'
import LoginPage from './LoginPage'

const HomePage = ({isAuthenticated}) => {
  return (
    <PageTemplate>
      {!isAuthenticated ?
        <LoginPage /> :
        <CreatePromise />
      }
    </PageTemplate>)
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.HomePageReducer.isAuthenticated,
})

export default connect(mapStateToProps, null)(HomePage)
