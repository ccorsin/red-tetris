const reducer = (state = { freeze: false }, action) => {
  switch(action.type){
    case 'START':
        return {
          ...state,
          isRunning: true,
         };
    case 'END':
        return {
          ...state,
          isRunning: false,
          winner: {}
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
    case 'WINNER':
    return {
      ...state,
      isRunning: false,
      winner: action.player
    }
    case 'RESET':
        return {
          ...state,
          winner: undefined
        }
    case 'ADD_ROUND':
      return {
        ...state,
        currentPlayer: action.currentPlayer
      }
    default: 
        return state
  }
}

export default reducer