import db from '../firebase/firebase';

export const setMessages = (messages) => ({
  type: 'SET_MESSAGES',
  messages
});

export const startSetMessages = (uid) => {
  return (dispatch, getState) => {
    //const uid = getState().auth.uid;
    //const uid = 2;
    return db.ref(`users/${uid}/messages`).orderByChild('date').limitToLast(10).once('value').then((snapshot) => {      
      const messages = [];
      snapshot.forEach((childSnapshot) => {        
        messages.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      })

      dispatch(setMessages(messages));
    });

  }
}

export const addMessage = (message) => ({
  type: 'ADD_MESSAGE',
  message
})

export const startAddMessage = (message,uid) => {
  return (dispatch,getState) => {
    //const uid = getState().auth.uid;
    //const uid = 2;
    return db.ref(`users/${uid}/messages`).push(message).then((ref) => {
      dispatch (addMessage(message,uid));
      
    });
  }
}