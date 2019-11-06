import React from 'react';
import { connect } from 'react-redux';
import {startSetMessages,startMarkMessagesAsRead} from '../actions/conversation';
import {startEditUser} from '../actions/users';

import JourneyMessage from './JourneyMessage';

export class JourneyConversation extends React.Component {
  constructor(props) {
    super(props);

    this.props.startSetMessages(this.props.userid);



  }

  componentDidMount() {
    // we set all unread messages to read
    console.log('componentDidMount JourneyConversation');
    setTimeout(() => {      
      // we mark messages as read
      this.props.startMarkMessagesAsRead(this.props.userid, this.props.role === 'admin' ? 'user' : 'admin')
      // we edit the field 'allUserMessagesHaveBeenRead' from 'store' foield in users. only if the current role is admin 
      if (this.props.role === 'admin') {
        this.props.startEditUser(this.props.userid,true);
      }      
    }
    ,1000)

  }

  render() {    
    return (
      <div>
        <h3>Derniers messages</h3>
        { (this.props.messages) ? 
            (this.props.messages.map( (message) => (
              <JourneyMessage 
                key={message.id} 
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
  startSetMessages : (userid) => { dispatch(startSetMessages(userid))},
  startMarkMessagesAsRead : (userid,role) => {dispatch(startMarkMessagesAsRead(userid,role))},
  startEditUser : (userid,allUserMessagesHaveBeenRead) => { dispatch(startEditUser(userid,{ allUserMessagesHaveBeenRead }))}

});

const ConnectedJourneyConversation = connect(mapStateToProps,mapDispatchToProps)(JourneyConversation);

export default ConnectedJourneyConversation;