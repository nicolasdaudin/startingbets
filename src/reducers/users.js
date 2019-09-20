const usersReducerDefaultState = [];

export default (state = usersReducerDefaultState, action) => {
  switch (action.type) {    
    case 'ADD_USER':
      //addMessageToLocalStorage(state.messages,action.message);
      return [
        ...state,
        action.user
      ];
    case 'DISABLE_USER':
      return state.filter((user) => (user.id !== action.id));
    case 'EDIT_USER':
      return state.map((user) => {
        if (user.id === action.id){
          return {
            ...user,
            ...action.updates
          }
        } else {
          return user;
        }
      })
    case 'SET_USERS':
      return action.users;
    default:
      return state;
  }
}