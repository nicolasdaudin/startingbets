import db from '../firebase/firebase';
import moment from 'moment';

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
      dispatch (addMessage({
        ...message,
        id: ref.key
      }));
    });
  }
}
export const startMarkMessagesAsRead = (uid,role) => {
  return (dispatch,getState) => {
    return db.ref(`users/${uid}/messages`).once('value').then((snapshot) => {
      let updates = {};
      const readAt = moment().valueOf();
      
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.child("origin").val() === role && !childSnapshot.hasChild("readAt")){                
          // we add readAt
          updates[childSnapshot.key] = { ...childSnapshot.val(), readAt : readAt}        
        }
      });

      return db.ref(`users/${uid}/messages`).update(updates).then(() => {        
        dispatch(markMessagesAsRead(role,readAt));
      });
    })
  }
}

// we should check that we update the correct messages : that theseare the messages of the current user and not something else 
export const markMessagesAsRead = (role, readAt) => ({
  type: 'MARK_MESSAGES_AS_READ',
  role,
  readAt
})