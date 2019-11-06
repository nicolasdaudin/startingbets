import React from 'react';
import moment from 'moment';
import {USER_ACTIONS} from '../constants';

const JourneyMessage = ({origin,content,type = USER_ACTIONS[0].type,createdAt,role, readAt}) => {
  
  return (
    <div className={(origin === role) ? 'right-message' : 'left-message'}>
      <div className='message-container'>
        <p className={(origin === role || !!readAt) ? 'message-content read' : 'message-content unread'}>{content}</p>
        <p className='message-info'>
          {/* only if role is admin, we show [Simple Message] or [Prise de Paris]*/}
          {role === 'admin' && <span>[{USER_ACTIONS.find(action => action.type === type).label}]</span>} 
          Par <strong>{origin}</strong> le <i>{moment(createdAt).format("LL LTS")}</i>{readAt && <i> - Lu à {moment(readAt).format("LL LTS")}</i>}
        </p>
      </div>
    </div>
  )
}

export default JourneyMessage;