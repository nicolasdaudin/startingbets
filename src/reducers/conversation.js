const conversationReducerDefaultState = [];

export default (state = conversationReducerDefaultState, action) => {
  switch (action.type) {    
    case 'SET_MESSAGES':
      //const messages = getMessagesFromLocalStorage() || [];
      let messages = action.messages || [];
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
    case 'MARK_MESSAGES_AS_READ':        
        messages = state.messages.map( (message) => {
        if (message.origin === action.role && !message.readAt){          
          return {
            ...message,
            readAt: action.readAt
          }
        } else {
          return message;
        }
      })
      return { ...state, messages }
    
    default:
      return state;
  }
}