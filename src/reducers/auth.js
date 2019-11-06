export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log('passing through LOGIN');
      return {
        ...state,
        uid: action.uid,
        isAdmin: action.isAdmin,
        error: {}
      };
    case 'LOGOUT':
      return {};
    case 'SIGN_UP_ERROR':
      console.log('passing through SIGN_UP_ERROR');
      return {
        error: action.error
      };
    case 'SIGN_IN_ERROR':
      console.log('passing through SIGN_IN_ERROR');
      return {
        error: action.error
      };
    default:
      return state;
  }
}