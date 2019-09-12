import React from 'react';

import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import numeral from 'numeral';
import {updateEarningsData} from '../actions/earnings'
import { Editors } from "react-data-grid-addons";
const { DropDownEditor} = Editors;
numeral.defaultFormat('0,0[.]00 $');

const betTypes = [];
betTypes['none'] = 'Aucun';
betTypes['freebet'] = 'Gratuit';
betTypes['moneyback'] = 'Remboursé';




const checkIfValidBookmakerUpdate = (row, updated) => {
  if (row === 1) return true;

  return (
    (!updated.home || updated.home.match(/^\d{1,}(\.\d{0,2})?$/))
    && (!updated.draw || updated.draw.match(/^\d{1,}(\.\d{0,2})?$/))
    && (!updated.away || updated.away.match(/^\d{1,}(\.\d{0,2})?$/))
    );
}

const transformIntoNumber = (row, updated) => {
  if (row === 1) return updated;

  const newUpdated = {};
  if (updated.home) {
    newUpdated.home = parseFloat(updated.home,10) ; 
  }
  if (updated.draw) {
    newUpdated.draw = parseFloat(updated.draw,10) ;
  }
  if (updated.away) {
    newUpdated.away = parseFloat(updated.away,10) ;
  }
  return newUpdated;
}



const CustomCellFormatter = (cell) => {
  if (cell.row.value === 'Cote') {
    return <span>{cell.value}</span>
  } else if (cell.row.value === 'Type de pari') {
    return betTypes[cell.value];
  } else {
    return <span>{numeral(cell.value).format()}</span>
  }
}


export class EarningsCalculationTable extends React.Component {
  constructor (props) {
    super(props);


    this.columns = [
      { key: "value", name: "", editable: false},
      { key: "home", name:"1", editable: true,formatter : CustomCellFormatter},
      { key: "draw", name:"X", editable: true,formatter : CustomCellFormatter},
      { key: "away", name:"2", editable: true,formatter : CustomCellFormatter}
    ]
  }

  checkCellEditable = ({ row }) => {
    return (row.value !== 'Gains' && row.value !== 'GAB' && row.value !== 'Type de pari');
  };

  getCustomRowRenderer = ({ renderBaseRow, ...props }) => {
    if (props.row.value === 'Gains') {
      return <span className='earnings-calculation-container'><strong>{renderBaseRow(props)}</strong></span>;
    } else if (props.row.value === 'GAB') {
      return <span className='earnings-calculation-container'><i>{renderBaseRow(props)}</i></span>;
    } else if (props.row.value === 'Type de pari') {
      return <span className='earnings-calculation-container'>{renderBaseRow(props)}</span>;
    } else {
      return <span className='earnings-calculation-container'><div>{renderBaseRow(props)}</div></span>;
    } 
  };  

  getBetTypeActions = (key) => { 
    const updated = [];
    return [
      {
        icon:"glyphicon glyphicon-cog",
        actions:[
          {
            text: "Normal",
            callback: () => {
              updated[key] = 'none';
              this.onGridRowsUpdated({fromRow:1,toRow:1,updated})
            }
          },
          {
            text: "Gratuit",
            callback: () => {
              updated[key] = 'freebet';
              this.onGridRowsUpdated({fromRow:1,toRow:1,updated})
            }
          },
          {
            text: "Remboursé",
            callback: () => {
              updated[key] = 'moneyback';
              this.onGridRowsUpdated({fromRow:1,toRow:1,updated})
            }
          }
        ]
      }
    ]
  }
  
  getCellActions = (column,row) => {
    return (row.value === 'Type de pari' && column.key !== 'value') ? this.getBetTypeActions(column.key) : null;
  }

  onGridRowsUpdated = ({ fromRow, toRow, updated}) => {   

    if (checkIfValidBookmakerUpdate(fromRow,updated) 
      ){ 
      console.log('onGridRowsUpdated', updated);
      this.props.updateEarningsData(fromRow,transformIntoNumber(fromRow,updated));
    };
  };

  render () {
    return (
      <div>
        <h3>Tableau de Calcul des gains pour les prises de paris</h3>
        
        
        <ReactDataGrid
          columns={this.columns}
          rowGetter = { (i) => {
            if (this.props.rows) {
              if (i < this.props.rows.length) {
                return this.props.rows[i];
              } else if (i === this.props.rows.length) {
                return this.props.earnings;
              } else if (i === this.props.rows.length + 1) {
                return this.props.gab;
              } 
            } else {
              return '';
            }
          }}
          rowsCount = {(this.props.rows) ? this.props.rows.length + 2 : 0}
          onGridRowsUpdated={this.onGridRowsUpdated}
          enableCellSelect={true}
          rowRenderer={this.getCustomRowRenderer}
          onCheckCellIsEditable={this.checkCellEditable}
          minHeight={250}
          getCellActions={this.getCellActions}
        />
        <p><strong>Payout: {Math.floor(this.props.payout*100)} %</strong></p>
        
      </div>
    );
  }

}


const mapStateToProps = (state,props) => {
  return { 
    rows : state.earnings.rows,
    earnings: state.earnings.earnings,
    gab : state.earnings.gab,
    payout : state.earnings.payout
  }
}


const mapDispatchToProps = (dispatch) => ({
  updateEarningsData : (index,data) => { dispatch(updateEarningsData(index,data))}
});

export default connect(mapStateToProps,mapDispatchToProps)(EarningsCalculationTable);

