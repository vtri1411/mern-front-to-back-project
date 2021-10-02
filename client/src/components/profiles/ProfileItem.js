import React from 'react'
import { Link } from 'react-router-dom'

function ProfileItem({ profile, ...rest }) {
   const { user: { _id, name, avatar }, status, company, location, skills } = profile
   return (
      <div className='profile bg-light'>
         <img src={avatar} alt="" className="round-img" />
         <div>
            <h2>{name}</h2>
            <p>{status} {company && <span> at {company}</span>}</p>
            <div className="my-1">{location && <span>{location}</span>}</div>
            <Link to={`/profile/${_id}`} className='btn btn-primary'>View Profile</Link>
         </div>
         <ul>
            {skills && Array.isArray(skills) &&
               skills.slice(0, 4).map((skill, index) => {
                  <li key={index} className="text-primary">
                     <i className="fas fa-check"></i> {skill}
                  </li>
               })
            }
         </ul>
      </div>
   )
}

export default ProfileItem
