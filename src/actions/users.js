import uuid from 'uuid';
import db from '../firebase/firebase';
import {DEFAULT_BOOKMAKER_DATA} from '../constants';

export const addUser = (user) => ({
  type: 'ADD_USER',
  user
})

export const startAddUser = (user) => {
  return (dispatch, getState) => {
    //console.log('user to be added',user);
    const bookmakersObject = [];
    Object.keys(user.bookmakers).forEach(bookmaker => {
      //console.log(bookmaker)
      if (user.bookmakers[bookmaker]) {
        bookmakersObject[bookmaker] = DEFAULT_BOOKMAKER_DATA;
      }
    });
    user.bookmakers = bookmakersObject;
    return db.ref(`users`).push(user).then((ref) => {
      dispatch (addUser({
        id:ref.key,
        ...user
      }))
    });
  }
}

export const editUser = (id,updates) => ({
  type: 'EDIT_USER',
  id,
  updates
})

export const startEditUser = (id, updates) => {
  return (dispatch, getState) => {
    return db.ref(`users/${id}`).update(updates).then( () => {
      dispatch(editUser(id,updates));
    })
  }
}

export const disableUser = (id) => ({
  type: 'DISABLE_USER',
  id
})

export const startDisableUser = (id) => {
  return (dispatch, getState) => {
    return db.ref(`users/${id}`).update({disabled: true}).then( () => {
      dispatch(disableUser(id));
    })
  }
}

export const setUsers = (users) => ({
  type: 'SET_USERS',
  users
})

export const startSetUsers = (showDisabled) => {
  return (dispatch,getState) => {
    const usersRef = db.ref(`users`);
    let usersQuery = usersRef;
    if (!showDisabled) { 
      usersQuery = usersQuery.orderByChild('disabled').equalTo(false)
    }
    //return db.ref(`users`).once('value').then((snapshot) => {
    return usersQuery.once('value').then((snapshot) => {
      const users = [];
      snapshot.forEach(childSnapshot => {        
        users.push({
          id:childSnapshot.key,
          ...childSnapshot.val()
        })
        //console.log(childSnapshot.key, childSnapshot.val())
      });

      dispatch(setUsers(users));
    })
  }
}