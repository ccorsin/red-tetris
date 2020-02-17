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
    default: 
        return state
  }
}

export default reducer



