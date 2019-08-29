import React, { useContext } from 'react';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import numeral from 'numeral';
import {updateBookmakerFunds} from '../actions/bookmakerFunds'
import { throws } from 'assert';


const CustomCellFormatter = ({value}) => {
  return <span>{numeral(value).format()}</span>
}

const INITIAL_BANKROLL = 175;
const FEES = 97;

numeral.defaultFormat('0,0[.]00 $');


const checkIfNumber = (number) => {
  return (!number || number.match(/^\d{1,}(\.\d{0,2})?$/))
}

export  class BookmakerFundsTable extends React.Component {
  constructor (props) {
    super(props);


    this.columns = [
      { key: "site", name: "Bookmaker", editable: false},
      { key: "deposit", name: "Dépôt", editable: (props.role === 'admin'), formatter : CustomCellFormatter},
      { key: "balance", name: "Solde", editable: (props.role === 'admin'), formatter : CustomCellFormatter},
      { key: "withdrawal", name: "Retrait", editable: (props.role === 'admin'), formatter : CustomCellFormatter}
    ]
  }

  checkCellEditable = ({ row }) => {
    return (row.site !== 'TOTAL');
  };

  getCustomRowRenderer = ({ renderBaseRow, ...props }) => {
    if (props.idx === this.props.rows.length) {
      return <strong>{renderBaseRow(props)}</strong>;
    } else {
      return <div>{renderBaseRow(props)}</div>;
    }
  };
  

  onGridRowsUpdated = ({ fromRow, toRow, updated}) => {   
    if (checkIfNumber(updated.deposit) && checkIfNumber(updated.balance) && checkIfNumber(updated.withdrawal) 
      ){ 
      this.props.updateBookmakerFunds(fromRow,updated);
    };
  };

  render () {
    return (
      <div>
        <p><strong>Capital Initial : {numeral(INITIAL_BANKROLL).format()} </strong></p>
        
        <ReactDataGrid
          columns={this.columns}
          rowGetter = { (i) => {
            if (i < this.props.rows.length) {
              return this.props.rows[i];
            } else {
              return this.props.total;
            }
          }}
          rowsCount = {this.props.rows.length + 1}
          onGridRowsUpdated={this.onGridRowsUpdated}
          enableCellSelect={true}
          rowRenderer={this.getCustomRowRenderer}
          onCheckCellIsEditable={this.checkCellEditable}
        />
        <p><strong>Gains actuels (frais inclus {FEES}): {numeral(this.props.currentEarnings).format()} - Dispo: {numeral(this.props.available).format()}</strong></p>
        
      </div>
    );
  }

}

const mapStateToProps = (state,props) => {
  return { 
    rows : state.bookmakerFunds.rows,
    total: state.bookmakerFunds.total,
    currentEarnings : state.bookmakerFunds.currentEarnings,
    available : state.bookmakerFunds.available
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateBookmakerFunds : (index,funds) => { dispatch(updateBookmakerFunds(index,funds))}
});

export default connect(mapStateToProps,mapDispatchToProps)(BookmakerFundsTable);

