export const setBookmakerFunds = () => ({
  type: 'SET_BOOKMAKER_FUNDS'
});

export const updateBookmakerFunds = (bookmakerIndex,updatedFunds) => ({
  type: 'UPDATE_BOOKMAKER_FUNDS',
  bookmakerIndex,
  updatedFunds
});