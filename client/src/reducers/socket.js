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
    case 'DO_SMASH':
      return {
        ...state,
        smashing: action.smash
      }
    case 'DO_FREEZE':
      return {
        ...state,
        freeze: action.freeze,
      }
    case 'WINNER':
    return {
      ...state,
      winner: action.player
    }
    default: 
        return state
  }
}

export default reducer