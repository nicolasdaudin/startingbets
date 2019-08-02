import React from 'react';
import moment from 'moment';

const JourneyMessage = ({origin,content,date,screen}) => {
  
  return (
    <div className={(origin === screen) ? 'right-message' : 'left-message'}>
      <p>Message de <strong>{origin}</strong> le <i>{moment(date).format("LLLL")}</i> : </p>
      <p>{content}</p>
    </div>
  )
}

export default JourneyMessage;