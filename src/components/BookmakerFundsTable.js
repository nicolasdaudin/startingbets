import React, { useContext } from 'react';
import ReactDataGrid from 'react-data-grid';
import numeral from 'numeral';


const CustomCellFormatter = ({value}) => {
  return <span>{numeral(value).format()}</span>
}

const columns = [
  { key: "site", name: "Bookmaker", editable: false},
  { key: "deposit", name: "Dépôt", editable: true, formatter : CustomCellFormatter},
  { key: "balance", name: "Solde", editable: true, formatter : CustomCellFormatter},
  { key: "withdrawal", name: "Retrait", editable: true, formatter : CustomCellFormatter}
]

const rows = [
  { site: 'JOA', deposit:75,balance: 69,withdrawal: 0},
  { site: 'Unibet', deposit:100,balance: 100,withdrawal: 0},
  
]

const total = { site: 'TOTAL', deposit: 175, balance: 169, withdrawal: 0}

const INITIAL_BANKROLL = 175;
const FEES = 97;

numeral.defaultFormat('0,0[.]00 $');

// const CustomCellRenderer = ({renderBaseCell, ...props}) => {
//   const color = "green";
//   //return <div style={{ color }}>{renderBaseCell({ ...props, isEditorEnabled: false})}</div>
//   return <div style={{ color }}>{renderBaseCell(props)}</div>

// }



const CustomRowRenderer = ({ renderBaseRow, ...props }) => {
  if (props.idx === rows.length) {
    return <strong>{renderBaseRow(props)}</strong>;
  } else {
    return <div>{renderBaseRow(props)}</div>;
  }
};

const checkIfNumber = (number) => {
  return (!number || number.match(/^\d{1,}(\.\d{0,2})?$/))
}
export default class BookmakerFundsTable extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      rows : rows || [],
      total : {site: 'TOTAL'},
      currentEarnings : 0,
      available : 0
    }
  }

  checkCellEditable = ({ column, row }) => {
    return (row.site !== 'TOTAL');
  };
  

  onGridRowsUpdated = ({ fromRow, toRow, updated}) => {   
    if (checkIfNumber(updated.deposit) && checkIfNumber(updated.balance) && checkIfNumber(updated.withdrawal) 
      //&& fromRow < this.state.rows.length && toRow < this.state.rows.length // avoid modification of 'TOTAL' row 
      ){ 
      this.setState(previousState => {
        const rows = previousState.rows.slice();
        const total = { site: 'TOTAL', deposit: 0, balance: 0, withdrawal: 0}
        
        
          for (let i = fromRow; i <= toRow ; i++){
            rows[i] = { ...rows[i], ...updated};       
          }

          for (let i = 0; i < rows.length ; i++){
            total.deposit = (parseFloat(total.deposit) + parseFloat(rows[i].deposit)).toFixed(2);
            total.balance = (parseFloat(total.balance) + parseFloat(rows[i].balance)).toFixed(2);
            total.withdrawal = (parseFloat(total.withdrawal) + parseFloat(rows[i].withdrawal)).toFixed(2);       
          }

          const currentEarnings = (parseFloat(total.withdrawal) - parseFloat(total.deposit) + parseFloat(total.balance) - parseFloat(FEES)).toFixed(2);
          const available = (parseFloat(INITIAL_BANKROLL) - parseFloat(total.deposit) + parseFloat(total.withdrawal)).toFixed(2);
          
          console.log(currentEarnings);
          return {rows,total,currentEarnings,available}
      })
    };
  };

  render () {
    return (
      <div>
        <p><strong>Capital Initial : {numeral(INITIAL_BANKROLL).format()} </strong></p>
        
        <ReactDataGrid
          columns={columns}
          rowGetter = { (i) => {
            if (i < this.state.rows.length) {
              return this.state.rows[i];
            } else {
              return this.state.total;
            }
          }}
          rowsCount = {this.state.rows.length + 1}
          onGridRowsUpdated={this.onGridRowsUpdated}
          enableCellSelect={true}
          rowRenderer={CustomRowRenderer}
          onCheckCellIsEditable={this.checkCellEditable}
        />
        <p><strong>Gains actuels (frais inclus {FEES}): {numeral(this.state.currentEarnings).format()} - Dispo: {numeral(this.state.available).format()}</strong></p>
        
      </div>
    );
  }

}
