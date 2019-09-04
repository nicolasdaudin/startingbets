import React from 'react';
import moment from 'moment';
import {USER_ACTIONS} from '../constants';

const JourneyMessage = ({origin,content,type = USER_ACTIONS[0].type,date,role}) => {
  
  return (
    <div className={(origin === role) ? 'right-message' : 'left-message'}>
      <div className='message-container'>
        <p className='message-content'>{content}</p>
        <p className='message-info'>
          {/* only if role is admin, we show [Simple Message] or [Prise de Paris]*/}
          {role === 'admin' && <span>[{USER_ACTIONS.find(action => action.type === type).label}]</span>} 
          Par <strong>{origin}</strong> le <i>{moment(date).format("LLLL")}</i></p>
      </div>
    </div>
  )
}

export default JourneyMessage;