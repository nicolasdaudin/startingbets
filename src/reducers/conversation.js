const conversationReducerDefaultState = [];

const getMessagesFromLocalStorage = () => {
  const messagesJSON = localStorage.getItem('messages');
  return JSON.parse(messagesJSON);
}

const addMessageToLocalStorage = (messages,message) => {
  const newMessages = Array.from(messages)
  newMessages.push(message);
  const messagesJSON = JSON.stringify(newMessages);
  localStorage.setItem('messages',messagesJSON);

}

export default (state = conversationReducerDefaultState, action) => {
  switch (action.type) {    
    case 'SET_MESSAGES':
      const messages = getMessagesFromLocalStorage() || [];
      return { 
        ...state,
        messages
      }
    case 'ADD_MESSAGE':
      addMessageToLocalStorage(state.messages,action.message);
      return {
        ...state,
        messages: [...state.messages,action.message]
      }
    
    default:
      return state;
  }
}