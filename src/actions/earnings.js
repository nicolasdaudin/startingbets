import db from '../firebase/firebase';


export const setEarningsData = () => ({
  type: 'SET_EARNINGS_DATA'
});


export const updateEarningsData = (index,earningsData) => ({
  type: 'UPDATE_EARNINGS_DATA',
  index,
  earningsData
});
