import db, {firebase,config} from '../firebase/firebase';


export const addUser = (user) => ({
  type: 'ADD_USER',
  user
});



export const startAddUser = (user,uid) => {
  return (dispatch, getState) => {
    
    // bookmakers
    // const bookmakersObject = [];
    // Object.keys(user.bookmakers).forEach(bookmaker => {
    //   //console.log(bookmaker)
    //   if (user.bookmakers[bookmaker]) {
    //     bookmakersObject[bookmaker] = DEFAULT_BOOKMAKER_DATA;
    //   }
    // });
    // user.bookmakers = bookmakersObject;
    return db.ref(`users/${uid}`).set(user).then((ref) => {
      dispatch (addUser({
        id:uid,
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
      //startSetUsers();
    })
  }
}


export const disableUser = (id) => ({
  type: 'DISABLE_USER',
  id
})

export const startDisableUser = (id) => {
  return (dispatch, getState) => {
    return db.ref(`users/${id}`).update({status: 'disabled'}).then( () => {
      dispatch(disableUser(id));
    })
  }
}

export const setUsers = (users) => ({
  type: 'SET_USERS',
  users
})

export const startSetUsers = (showDisabled = false) => {
  return (dispatch,getState) => {    
    return db.ref(`users`).once('value').then((snapshot) => {
      const users = [];
      snapshot.forEach(childSnapshot => {  
        if (showDisabled || childSnapshot.child('status').val() !== 'disabled'){      
          users.push({
            id:childSnapshot.key,
            ...childSnapshot.val()
          })
        }
        //console.log(childSnapshot.key, childSnapshot.val())
      });

      dispatch(setUsers(users));
    })
  }
}

export const isAdminUser = (user,callback) => {  
  db.ref(`users`).orderByKey().equalTo(user.uid).once('value')
    .then((snapshot) => {        
        callback(!snapshot.hasChildren()); 
    });  
}
