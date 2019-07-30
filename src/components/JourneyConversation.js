import React from 'react';
import JourneyMessage from './JourneyMessage';
import { getThemeProps } from '@material-ui/styles';


const messages = [
  { origin: 'user', content: 'ça va', date: '2019-07-29 14:39:31'},
  { origin: 'admin', content: 'oui', date: '2019-07-29 15:39:31'},
  { origin: 'user', content: 'tu peux parier sur la victoire du PSG demain', date: '2019-07-30 11:22:31'},
  { origin: 'admin', content: 'cest bon cest fait', date: '2019-07-30 14:39:31'}
]

const JourneyConversation = (props) => (
  <div>
    <h3>Derniers messages</h3>
    { messages.map( (message) => (
      <JourneyMessage 
         key={message.content} 
        {...message}
        screen={props.screen}  />
    ))}
  </div>
)

export default JourneyConversation;