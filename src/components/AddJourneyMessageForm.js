import React from 'react';
import { connect } from 'react-redux';
import {startAddMessage} from '../actions/conversation';
import moment from 'moment';
import {USER_ACTIONS} from '../constants.js';



export  class AddJourneyMessageForm extends React.Component {
  constructor(props){
    super(props);
  

    this.state = {
      message : '',
      origin: props.role,
      type: null
    }

  }

  onMessageChange = (e) => {
    const message = e.target.value;
    this.setState(() => ({message}))
  }
  onSubmit = (e) => {
    e.preventDefault();
    
    this.props.startAddMessage({
      content : this.state.message,
      origin : this.state.origin,
      type: this.state.type || USER_ACTIONS[0].type,
      date: moment().valueOf()
    })
    
    this.setState(() => ({message : '',type: null}));
    
  }

  onChooseAction = (e) => {    
    const id = e.target.id;    
    this.setState(() => (
      {
        message : USER_ACTIONS[id].default_msg,
        type : USER_ACTIONS[id].type
      }));
  }
  
  render() {
    return (
      <div>
        {/* showing the different kind of actions - Simple Message, Prise de Paris - only when it's admin.... */}
        {this.state.origin === 'admin' && USER_ACTIONS.map( (action,idx) => (<button key={idx} id={idx} onClick={this.onChooseAction}>{action.label}</button>))}         
        <form onSubmit={this.onSubmit}>
          <textarea
            className='message-textarea'
            value={this.state.message}
            onChange={this.onMessageChange}
            //placeholder="Écrievez ici le message à envoyer"
            >    
          </textarea>
          <button>Envoyer le message</button>

        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddMessage : (message) => { dispatch(startAddMessage(message))}
});

export default connect(null,mapDispatchToProps)(AddJourneyMessageForm)