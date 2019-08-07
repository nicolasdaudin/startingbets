import React from 'react';
import { connect } from 'react-redux';
import JourneyMessage from './JourneyMessage';



const JourneyConversation = (props) => (
  <div>
    <h3>Derniers messages</h3>
    { props.messages.map( (message) => (
      <JourneyMessage 
         key={message.date} 
        {...message}
        screen={props.screen}  />
    ))}
  </div>
)

const mapStateToProps = (state) => ({
  messages : state.conversation.messages
})

const ConnectedJourneyConversation = connect(mapStateToProps)(JourneyConversation);

export default ConnectedJourneyConversation;