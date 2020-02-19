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
    else if (action.type == 'UPDATE_PLAYERS') {
      return next(action);
    } 
    else if (action.type == 'COLLISION') {
      action.socket.emit('collision', action.player, action.room);
      return next(action);
    }
    else if (action.type == 'REFILL') {
      return next(action);
    } else if (action.type == 'CURRENT_PLAYER') {
      return next(action);
    }
    return
  }
}