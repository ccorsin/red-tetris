const reducer = (state = {} , action) => {
  switch(action.type){
    case 'SOCKET_JOIN':
        return { }
    default: 
        return state
  }
}

export default reducer



