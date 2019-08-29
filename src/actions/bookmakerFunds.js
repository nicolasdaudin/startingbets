export const setBookmakerFunds = () => ({
  type: 'SET_BOOKMAKER_FUNDS'
});

export const updateBookmakerFunds = (index,funds) => ({
  type: 'UPDATE_BOOKMAKER_FUNDS',
  index,
  funds
});