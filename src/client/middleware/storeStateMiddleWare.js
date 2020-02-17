export const storeStateMiddleWare = ({ dispatch, getState }) => {
  next => (action) => {
    if (action.type == 'START') {
      console.log ("START1");
      socket.emit('start', action.room);
      return dispatch(action);
    }  
  // Run action
  return next(action);
  }
}