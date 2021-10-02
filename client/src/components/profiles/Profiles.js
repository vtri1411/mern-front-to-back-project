import React, { useEffect } from 'react'
import Spinner from '../layouts/Spinner'
import ProfileItem from './ProfileItem'
import { getAllProfiles } from '../../actions/profile'
import { useSelector, useDispatch } from 'react-redux'

const mapState = ({ profile: { profiles, loading } }) => ({
   profiles, loading
})

function Profiles() {
   const dispatch = useDispatch()
   const { profiles, loading } = useSelector(mapState)
   useEffect(() => {
      dispatch(getAllProfiles())
   }, [])
   return loading
      ? <Spinner />
      : (
         <>
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
               <i className="lead fab fa-connectdevelop"></i> Browse and connect with Developers
            </p>
            <div className="profiles">
               {profiles && profiles.length > 0
                  ? profiles.map(profile => (<ProfileItem key={profile._id} profile={profile} />))
                  : <h4>No profiles found</h4>}
            </div>
         </>
      )
}

export default Profiles
