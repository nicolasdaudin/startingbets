import { firebase, googleAuthProvider } from '../firebase/firebase';
import {startAddUser} from './users';

// to login, first we click the button 'login' in LoginPage that dispatches 'startLogin'
// that changes the login state in Firebase
// then in app.js we have this firebase.auth().onAuthStateChanged( (user) => {
// and this dispatches login which dispatches an action (to keep the uid of the user connected)
// so I could wonder: why do we dispatch login from onAuthStateChanged and not from startLogin ?
// we do this to make sure that the redux store is up to date on first access to the page
// onAuthStateChanged is called even on first access to the page, so this can set up the store correctly
// if we dispatched login from startLogin, the store would not be up to date on the first access... only adter a user clicked login or logout

export const login = (uid, isAdmin) => ({
  type:'LOGIN',
  uid, 
  isAdmin
});

export const startGoogleLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  }
}



export const logout = () => ({
  type:'LOGOUT'
})

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  }
}

export const signUpUserError = (error) => ({
  type:'SIGN_UP_ERROR',
  error
});

export const signInUserError = (error) => ({
  type:'SIGN_IN_ERROR',
  error
});



export const startSignInUser = (user) => {
  return (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(user.email,user.password)
      .catch(error => {
        dispatch(signInUserError(error));
      })
      .then(firebaseUser => {
        if (firebaseUser){
          const uid = firebaseUser.uid; 
          console.log("User " + uid + " recognized successfully!");
          //dispatch(login(user.uid));
          //dispatch(login(uid));
        };
      });
  }
}

export const startSignUpUser = (user) => {
  return (dispatch, getState) => {
    

    //console.log(user);
    firebase.auth().createUserWithEmailAndPassword(user.email,user.password)
      .catch(error => {
        //console.log("about to dispatch signUpUserError with error :",error);
        dispatch(signUpUserError(error));       
      })
      .then(firebaseUser => {
        if (firebaseUser){
          const uid = firebaseUser.uid; 
        
          delete user.password;
          console.log("User " + uid + " created successfully!");
          //dispatch(login(user.uid));
          dispatch(startAddUser(user,uid));
        };
      });

  }
}