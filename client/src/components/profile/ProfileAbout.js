import React from 'react'

function ProfileAbout({ profile: {
   bio, skills, user
} }) {
   return (
      <div className="profile-about bg-light p-2">
         {
            bio &&
            <>
               <h2 className="text-primary">Biography</h2>
               <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
                  doloremque nesciunt, repellendus nostrum deleniti recusandae nobis
                  neque modi perspiciatis similique?
               </p>
            </>
         }
         <div className="line"></div>
         <h2 className="text-primary">Skill Set</h2>
         <div className="skills">
            {
               skills && skills.map((skill, index) =>
                  <div className="p-1" key={index}><i className="fa fa-check"></i> {skill}</div>)
            }
         </div>
      </div>
   )
}

export default ProfileAbout
