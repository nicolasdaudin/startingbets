const conversationReducerDefaultState = [];

export default (state = conversationReducerDefaultState, action) => {
  switch (action.type) {    
    case 'SET_MESSAGES':
      //const messages = getMessagesFromLocalStorage() || [];
      const messages = action.messages || [];
      return { 
        ...state,
        messages
      }
    case 'ADD_MESSAGE':
      //addMessageToLocalStorage(state.messages,action.message);
      return {
        ...state,
        messages: [...state.messages,action.message]
      }
    
    default:
      return state;
  }
}