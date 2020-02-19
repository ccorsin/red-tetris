const reducer = (state = {} , action) => {
  switch(action.type){
    case 'START':
        return {
          ...state,
          isRunning: true,
         };
    case 'STOP':
        return {
          ...state,
          isRunning: false,
        };
    case 'UPDATE_PLAYERS':
        return {
          ...state,
          players: action.players
        }
    default: 
        return state
  }
}

export default reducer