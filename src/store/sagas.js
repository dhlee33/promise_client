import { fork } from 'redux-saga/effects'
import HomePageSaga from '../components/pages/HomePage/saga'

const req = require.context('.', true, /\.\/.+\/sagas\.js$/)

const sagas = [HomePageSaga]

req.keys().forEach((key) => {
  sagas.push(req(key).default)
})

export default function* () {
  yield sagas.map(fork)
}
