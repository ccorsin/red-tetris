import React from 'react'
import ReactDom from 'react-dom'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'                                                                                                                                                    
import {ioSocketMiddleWare} from './middleware/ioSocketMiddleWare'
import alertReducer from './reducers/alert'
import socketReducer from './reducers/socket'
import App from './containers/app'
import {alert} from './actions/alert'

const initialState = {}
const rootReducer = combineReducers({
  alert: alertReducer,
  sock: socketReducer
})
const middleware = [ ioSocketMiddleWare,
                    thunk,
                    createLogger() ]

export const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware))

ReactDom.render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('tetris'))

store.dispatch(alert('Soon, will be here a fantastic Tetris ...'))
