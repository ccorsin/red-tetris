import React from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'


const App = ({message}) => {
  const reg = /(#[\d]+)(\[\w+\])/;
  const params = reg.exec(window.location.href);
  const room = params[1].substring(1);
  const username = params[2].slice(1,-1);
  const socket = io('http://0.0.0.0:3004');
  socket.emit('room', room, username)

  return (
    <div>
      {socket.on('message', function(message) {
        alert(message);
      })}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}
export default connect(mapStateToProps, null)(App)