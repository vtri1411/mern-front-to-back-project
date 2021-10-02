import React from 'react'
import moment from 'moment'

function ProfileEducation({ education: {
   school, degree, fieldofstudy, current,
   to, from, description
} }) {
   return (
      <div>
         <h3 className="text-dark">{school}</h3>
         <p>{moment(from).format('YYYY/MM/DD')} - {current ? ' Now' : moment(to).format('YYYY/MM/DD')}</p>
         <p><strong>Degree: </strong>{degree}</p>
         <p>
            <strong>Field of Study: </strong>
            {fieldofstudy}
         </p>
         <p>
            <strong>Description: </strong>
            {description}
         </p>
      </div>
   )
}

export default ProfileEducation
