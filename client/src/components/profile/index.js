import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Spinner from '../layouts/Spinner'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import { getProfileById } from '../../actions/profile'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'

const mapState = ({ profile: { profile }, auth }) => ({
   profile, auth
})

function Profile() {
   const dispatch = useDispatch()
   const { profile, auth } = useSelector(mapState)
   const { id } = useParams()
   useEffect(() => {
      dispatch(getProfileById(id))
   }, [])

   return !profile
      ? <Spinner />
      : (
         <>
            <Link to='/profiles' className='btn btn-light' >Back To Profiles</Link>
            {
               auth.user && profile.user && auth.isAuthenticated && auth.user._id === profile.user._id &&
               <Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>
            }
            <div className="profile-grid my-1">
               <ProfileTop profile={profile} />
               <ProfileAbout profile={profile} />
               <div className="profile-exp bg-white p-2">
                  <h2 className="text-primary">Experience</h2>
                  {
                     profile.experience && profile.experience.length > 0
                        ? (
                           profile.experience.map(exp => (
                              <ProfileExperience key={exp._id} experience={exp} />
                           ))
                        )
                        : <h4>No Experience Cridentials</h4>
                  }
               </div>
               <div className="profile-edu bg-white p-2">
                  <h2 className="text-primary">Education</h2>

                  {
                     profile.education && profile.education.length > 0
                        ? (
                           profile.education.map(edu => (
                              <ProfileEducation key={edu._id} education={edu} />
                           ))
                        )
                        : <h4>No Experience Cridentials</h4>
                  }
               </div>
               {
                  profile.githubusername && <ProfileGithub username={profile.githubusername} />
               }
            </div>
         </>
      )
}

export default Profile
