const bookmakersReducerDefaultState = [];

const DEFAULT_BOOKMAKER_DATA = [
  { site: 'JOA', deposit:75,balance: 73,withdrawal: 0, validationDate: '01/05', validated:'ok', link:''},
  { site: 'Unibet', deposit:100,balance: 100,withdrawal: 0, validationDate: '11/05', validated:'ok', link:'ABC'}
]


const FEES = 97;
const INITIAL_BANKROLL = 175;


const computeTotal = (rows) => {
  const total = { site: 'TOTAL', deposit: 0, balance: 0, withdrawal: 0};

  for (let i = 0; i < rows.length ; i++){
    total.deposit = (parseFloat(total.deposit) + parseFloat(rows[i].deposit)).toFixed(2);
    total.balance = (parseFloat(total.balance) + parseFloat(rows[i].balance)).toFixed(2);
    total.withdrawal = (parseFloat(total.withdrawal) + parseFloat(rows[i].withdrawal)).toFixed(2);       
  }
  return total;
}

const computeCurrentEarnings = (total) => {
  return (parseFloat(total.withdrawal) - parseFloat(total.deposit) + parseFloat(total.balance) - parseFloat(FEES)).toFixed(2);
}

const computeAvailable = (total) => {
  return (parseFloat(INITIAL_BANKROLL) - parseFloat(total.deposit) + parseFloat(total.withdrawal)).toFixed(2);
}

export default (state = bookmakersReducerDefaultState, action) => {
  switch (action.type) {    
    case 'SET_BOOKMAKER_DATA':
      let rows = action.bookmakerData || DEFAULT_BOOKMAKER_DATA;
      let total = computeTotal(rows);
      let currentEarnings = computeCurrentEarnings(total);
      let available = computeAvailable(total);
      return { 
        ...state,
        rows,
        total,
        currentEarnings,
        available
      }
    case 'UPDATE_BOOKMAKER_DATA':
      rows = state.rows.slice();
      rows[action.index] = { ...rows[action.index], ...action.bookmakerData};   
      total = computeTotal(rows);
      currentEarnings = computeCurrentEarnings(total);
      available = computeAvailable(total);
      return {
        ...state,
        rows,
        total,
        currentEarnings,
        available
      }
   
    default:
      return state;
  }
}