import React from 'react';
import { connect } from 'react-redux';
import {startSetMessages} from '../actions/conversation';

import JourneyMessage from './JourneyMessage';

export class JourneyConversation extends React.Component {
  constructor(props) {
    super(props);

    this.props.startSetMessages(this.props.userid);



  }

  render() {    
    return (
      <div>
        <h3>Derniers messages</h3>
        { (this.props.messages) ? 
            (this.props.messages.map( (message) => (
              <JourneyMessage 
                key={message.date} 
                {...message}
                role={this.props.role} 
              />
            ))) : (<p>Aucun message</p>)
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  messages : state.conversation.messages
})


const mapDispatchToProps = (dispatch) => ({
  startSetMessages : (userid) => { dispatch(startSetMessages(userid))}
});

const ConnectedJourneyConversation = connect(mapStateToProps,mapDispatchToProps)(JourneyConversation);

export default ConnectedJourneyConversation;