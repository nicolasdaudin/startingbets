import React from 'react';
import { connect } from 'react-redux';
import {addMessage} from '../actions/conversation';
import moment from 'moment';

export  class AddJourneyMessageForm extends React.Component {
  constructor(props){
    super(props);
  

    this.state = {
      message : '',
      origin: props.screen
    }

  }

  onMessageChange = (e) => {
    const message = e.target.value;
    this.setState(() => ({message}))
  }
  onSubmit = (e) => {
    e.preventDefault();

    this.setState(() => ({message : ''}));
    this.props.addMessage({
      content : this.state.message,
      origin : this.state.origin,
      date: moment().valueOf()
    })
  }
  
  render() {
    return (
      <form className='journey-conversation' onSubmit={this.onSubmit}>
        <textarea
          value={this.state.message}
          onChange={this.onMessageChange}
          placeholder="Écrievez ici le message à envoyer">    
        </textarea>
        <button>Envoyer le message</button>

      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  addMessage : (message) => { dispatch(addMessage(message))}
});

export default connect(null,mapDispatchToProps)(AddJourneyMessageForm)