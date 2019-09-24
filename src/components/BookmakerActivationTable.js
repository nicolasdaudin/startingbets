import React from 'react';

import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import {startUpdateBookmakerData} from '../actions/bookmakers'

const checkIfValidBookmakerUpdate = (updated) => {
  return true;
}

export class BookmakerActivationTable extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [
      { key: "site", name:"Bookmaker", editable: false},
      { key: "validationDate", name:"Date validation", editable:true/*, editable: (props.role === 'admin')*/},
      { key: "validated", name:"Ok?", editable:true},
      { key: "link", name:"Lien", editable:true}
    ]
  }

  onGridRowsUpdated = ({ fromRow, toRow, updated}) => {   
    if (checkIfValidBookmakerUpdate(updated) 
      ){ 
        
      console.log('onGridRowsUpdated', updated);
      this.props.startUpdateBookmakerData(this.props.userid,fromRow,this.props.rows[fromRow].site,updated);

    };
  };

  render() {
    return (
      <div>
        <h3>Tableau activation:</h3>
        <ReactDataGrid
          columns={this.columns}
          rowGetter = { (i) => { return (this.props.rows ? this.props.rows[i] : '')} }            
          rowsCount = {(this.props.rows) ? this.props.rows.length : 0}
          onGridRowsUpdated = {this.onGridRowsUpdated}
          enableCellSelect={true}  
          minHeight={(this.props.rows) ? (this.props.rows.length + 2) * 37 : 200}        
        />          
      </div>
    )
  }


}

const mapStateToProps = (state,props) => {
  return { 
    rows : state.bookmakers.rows
  }
}

const mapDispatchToProps = (dispatch) => ({
  startUpdateBookmakerData : (userid,index,site,data) => { dispatch(startUpdateBookmakerData(userid,index,site,data))}
});

export default connect(mapStateToProps,mapDispatchToProps)(BookmakerActivationTable);