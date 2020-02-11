import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'

const socket = io('http://0.0.0.0:3004');

const App = ({message}) => {
  const reg = /(#[\d]+)(\[\w+\])/;
  const params = reg.exec(window.location.href);
  const room = params[1].substring(1);
  const username = params[2].slice(1,-1);

  useEffect(() => {
    socket.emit('room', room, username)
    socket.on('message', function(message) {
      alert(message);
    })
  })

  return (
    <div>
      <h1>Hello</h1>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}
export default connect(mapStateToProps, null)(App)