const earningsReducerDefaultState = [];


const DEFAULT_EARNINGS_DATA = [
  { value: 'Mise', home: 150, draw: 130, away: 110},
  { value: 'Type de pari', home:'none',draw:'none',away:'none'},
  { value: 'Cote', home: 2.37, draw: 3.12, away: 3.55}
];


const computeEarnings = (rows) => {
  return { 
    value : 'Gains', 
    home : rows[0].home * rows[2].home - rows[0].home, 
    draw : rows[0].draw * rows[2].draw - rows[0].draw, 
    away : rows[0].away * rows[2].away - rows[0].away
  }
}

// si c'est un pari remboursé (moneyback), on ne retire pas le montant de la mise pour le GAB des autres paris
// si c'est un pari gratuit (freebet), on retire le montant de la mise pour le GAB de ce pari
// à checker avec Pierre car les gains calculés ont déjà été soustraits de la mise donc j'ai l'impression que c'est comme si on soustrayait deux fois
const computeGab = (rows,earnings) => {
  return { 
    value : 'GAB', 
    home : earnings.home - ((rows[1].draw !== 'moneyback') ? rows[0].draw : 0 ) - ( (rows[1].away !== 'moneyback') ? rows[0].away : 0) - ( rows[1].home === 'freebet' ? rows[0].home : 0),
    draw : earnings.draw - ((rows[1].home !== 'moneyback') ? rows[0].home : 0 ) - ( (rows[1].away !== 'moneyback') ? rows[0].away : 0) - ( rows[1].draw === 'freebet' ? rows[0].draw : 0),
    away : earnings.away - ((rows[1].home !== 'moneyback') ? rows[0].home : 0 ) - ( (rows[1].draw !== 'moneyback') ? rows[0].draw : 0) - ( rows[1].away === 'freebet' ? rows[0].away : 0)
  }
}

const computePayout = (rows) => {
  if (rows[2].home !== 0 && rows[2].draw !== 0 && rows[2].away !== 0){
    return parseFloat(1/rows[2].home + 1/rows[2].draw + 1/rows[2].away,10)
  } else{
    return 0;
  }
}

export default (state = earningsReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_EARNINGS_DATA':
      let rows = action.earningsData || DEFAULT_EARNINGS_DATA;
      let earnings = computeEarnings(rows);
      let gab = computeGab(rows,earnings);
      let payout = computePayout(rows);
      return {
        ...state,
        rows,
        earnings,
        gab,
        payout
      }
    case 'UPDATE_EARNINGS_DATA':
      rows = state.rows.slice();
      rows[action.index] = { ...rows[action.index],...action.earningsData};
      earnings = computeEarnings(rows);
      gab = computeGab(rows,earnings);
      payout = computePayout(rows);
      return {
        ...state,
        rows,
        earnings,
        gab,
        payout
      }
    default:
      return state;
  }
}