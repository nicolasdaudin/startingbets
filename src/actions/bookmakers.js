import db from '../firebase/firebase';


export const setBookmakerData = (bookmakerData) => ({
  type: 'SET_BOOKMAKER_DATA',
  bookmakerData
});

export const startSetBookmakerData = () => {
  return (dispatch, getState) => {
    // const uid = getState().auth.uid;
    const uid= 2;
    // using 'on' instead of 'once', we could listen to any change on DB :-D AWESOME
    //return db.ref(`users/${uid}/bookmaker`).on('value',(snapshot) => {
    return db.ref(`users/${uid}/bookmaker`).once('value').then((snapshot) => {
      const bookmakerData = [];
      snapshot.forEach((childSnapshot) => {
        bookmakerData.push({
          site: childSnapshot.key,
          ...childSnapshot.val()
        })
      });

      dispatch(setBookmakerData(bookmakerData));
    })
  }
}

export const updateBookmakerData = (index,site,bookmakerData) => ({
  type: 'UPDATE_BOOKMAKER_DATA',
  index,
  site,
  bookmakerData
});

export const startUpdateBookmakerData = (index,site,bookmakerData) => {
  return (dispatch, getState) => {
    // const uid = getState().auth.uid;
    const uid = 2;
    return db.ref(`users/${uid}/bookmaker/${site}`).update(bookmakerData).then(() => {
      console.log('startUpdateBookmakerData');
      dispatch(updateBookmakerData(index,site,bookmakerData))
    });
  }
}