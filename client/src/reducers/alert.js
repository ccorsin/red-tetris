// import { ALERT_POP } from '../actions/alert'

const reducer = (state = { switch: false, message: "" } , action) => {
  switch (action.type) {
    case 'ALERT_POP':
      console.log("reducer pop")
      return { 
        ...state,
        message: action.message 
      };
    case 'ALERT_SWITCH':
      console.log("reducer switch")
      return { 
        ...state,
        alert: action.switch
      };
    default: 
      return state;
  }
};

export default reducer;

