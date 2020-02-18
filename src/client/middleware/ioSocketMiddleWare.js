export const ioSocketMiddleWare = () => {
  return next => (action) => {

    if (action.type == 'START') {
      action.socket.emit('start', action.room);
      return next(action);
    }
    else if (action.type == 'END') {
      action.socket.emit('end', action.room);
      return next(action);
    }  
    return
  }
}