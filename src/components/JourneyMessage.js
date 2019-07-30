import React from 'react';

const JourneyMessage = ({origin,content,date,screen}) => {
  
  return (
    <div className={(origin === screen) ? 'right-message' : 'left-message'}>
      <p>Message de {origin} le {date} : </p>
      <p>{content}</p>
    </div>
  )
}

export default JourneyMessage;