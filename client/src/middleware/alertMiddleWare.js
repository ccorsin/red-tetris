export const alertMiddleWare = () => {
  console.log("alertMiddleWare")
  return next => (action) => {
    if (action.type === 'ALERT_POP') {
      console.log("alertMiddleWare pop")
      return next(action);
    }
    else if (action.type === 'ALERT_SWITCH') {
      console.log("alertMiddleWare switch")
      return next(action);
    }
    return;
  }
}