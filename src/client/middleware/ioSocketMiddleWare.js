import io from 'socket.io-client'

export const ioSocketMiddleWare = ({ dispatch, getState }) => {
  return next => (action) => {
    const socket = io('http://0.0.0.0:3004');
    if (action.type == 'START') {
      socket.emit('start', action.room);
      return next(action);
    }
    else if (action.type == 'END') {
      socket.emit('end', action.room);
      return next(action);
    }  
    return
  }
}