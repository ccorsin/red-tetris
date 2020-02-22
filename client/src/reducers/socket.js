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
    case 'REFILL':
        return {
          ...state,
          tetriminos: action.tetriminos
        }
    case 'CURRENT_PLAYER':
        return {
          ...state,
          currentPlayer: action.currentPlayer
        }
    case 'SET_SMASH':
      return {
        ...state,
        up: action.up,
      }
    default: 
        return state
  }
}

export default reducer