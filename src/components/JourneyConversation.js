import React from 'react';
import { connect } from 'react-redux';
import JourneyMessage from './JourneyMessage';

export class JourneyConversation extends React.Component {
  constructor(props) {
    super(props);

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

const ConnectedJourneyConversation = connect(mapStateToProps)(JourneyConversation);

export default ConnectedJourneyConversation;