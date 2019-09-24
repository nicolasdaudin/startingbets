import React from 'react';

import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import numeral from 'numeral';
import {startUpdateBookmakerData,startSetBookmakerData } from '../actions/bookmakers';



const INITIAL_BANKROLL = 175;
const FEES = 97;

numeral.defaultFormat('0,0[.]00 $');


const checkIfValidBookmakerUpdate = (updated) => {
  return ((!updated.deposit || updated.deposit.match(/^\d{1,}(\.\d{0,2})?$/))
    && (!updated.balance || updated.balance.match(/^\d{1,}(\.\d{0,2})?$/))
    && (!updated.withdrawal || updated.withdrawal.match(/^\d{1,}(\.\d{0,2})?$/)))
}

const transformIntoNumber = (updated) => {
  const newUpdated = {};
  if (updated.deposit) {
    newUpdated.deposit = parseFloat(updated.deposit,10) ; // * 100 because we use the cents in the display
  }
  if (updated.balance) {
    newUpdated.balance = parseFloat(updated.balance,10) ;
  }
  if (updated.withdrawal) {
    newUpdated.withdrawal = parseFloat(updated.withdrawal,10) ;
  }
  return newUpdated;
}

const CustomCellFormatter = ({value}) => {
  return <span>{numeral(value).format()}</span>
}



export  class BookmakerFundsTable extends React.Component {
  constructor (props) {
    super(props);

    this.props.startSetBookmakerData(this.props.userid);

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
    if (checkIfValidBookmakerUpdate(updated) 
      ){ 
        
      console.log('onGridRowsUpdated', updated);
      this.props.startUpdateBookmakerData(this.props.userid,fromRow,this.props.rows[fromRow].site,transformIntoNumber(updated));
    };
  };

  render () {
    return (
      <div>
        <h3>Gains actuels</h3>
        <p><strong>Capital Initial : {numeral(INITIAL_BANKROLL).format()} </strong></p>
        
        <ReactDataGrid
          columns={this.columns}
          rowGetter = { (i) => {
            if (this.props.rows) {
              if (i < this.props.rows.length) {
                return this.props.rows[i];
              } else {
                return this.props.total;
              }
            } else {
              return '';
            }
          }}
          rowsCount = {(this.props.rows) ? this.props.rows.length + 1 : 0}
          onGridRowsUpdated={this.onGridRowsUpdated}
          enableCellSelect={true}
          rowRenderer={this.getCustomRowRenderer}
          onCheckCellIsEditable={this.checkCellEditable}
          minHeight={(this.props.rows) ? (this.props.rows.length + 2) * 37 : 200}
        />
        <p><strong>Gains actuels (frais inclus {FEES}): {numeral(this.props.currentEarnings).format()} - Dispo: {numeral(this.props.available).format()}</strong></p>
        
      </div>
    );
  }

}

const mapStateToProps = (state,props) => {
  return { 
    rows : state.bookmakers.rows,
    total: state.bookmakers.total,
    currentEarnings : state.bookmakers.currentEarnings,
    available : state.bookmakers.available
  }
}

const mapDispatchToProps = (dispatch) => ({
  startUpdateBookmakerData : (userid,index,site,data) => { dispatch(startUpdateBookmakerData(userid,index,site,data))},
  startSetBookmakerData : (userid) => { dispatch(startSetBookmakerData(userid))}
});

export default connect(mapStateToProps,mapDispatchToProps)(BookmakerFundsTable);

