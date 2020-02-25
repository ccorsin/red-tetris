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
    case 'CURRENT_PLAYER':
        return {
          ...state,
          currentPlayer: action.currentPlayer
        }
    default: 
        return state
  }
}

export default reducer