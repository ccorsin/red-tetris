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
    default: 
        return state
  }
}

export default reducer