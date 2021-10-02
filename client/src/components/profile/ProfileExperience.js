import React from 'react'
import moment from 'moment'

function ProfileExperience({ experience: {
   company, title, location, current,
   to, from, description
} }) {
   return (
      <div>
         <h3 className="text-dark">{company}</h3>
         <p>{moment(from).format('YYYY/MM/DD')} - {current ? ' Now' : moment(to).format('YYYY/MM/DD')}</p>
         <p><strong>Position: </strong>{title}</p>
         <p>
            <strong>Description: </strong>
            {description}
         </p>
      </div>
   )
}

export default ProfileExperience
