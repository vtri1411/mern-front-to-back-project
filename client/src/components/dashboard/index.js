import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteProfile, getCurrentProfile } from '../../actions/profile'
import Spinner from '../layouts/Spinner'
import DashBoardAction from './DashBoardAction'
import Experience from './Experience'
import Education from './Education'

const mapState = ({ auth, profile: { profile, loading } }) => ({
   auth, profile, loading
})

function DashBoard() {
   const dispatch = useDispatch()
   const { auth: { user }, profile, loading } = useSelector(mapState)
   useEffect(() => {
      dispatch(getCurrentProfile())
   }, [])
   return loading && !profile
      ? <Spinner />
      : (
         <>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
               <i className="fas fa-user"></i> Welcome {user && user.name}
            </p>
            {
               profile
                  ? (
                     <>
                        <DashBoardAction />
                        <Experience experience={profile.experience} />
                        <Education education={profile.education} />
                        <div className="my-2">
                           <button className="btn btn-danger"
                              onClick={e => dispatch(deleteProfile())}>
                              <i className="fas fa-user-minus"></i> Delete my account
                           </button>
                        </div>
                     </>
                  )
                  : (
                     <>
                        <p>You have not yet setup a profile, please add some info</p>
                        <Link to='create-profile' className="btn btn-primary my-1">
                           Create Profile
                        </Link>
                     </>
                  )
            }
         </>
      )

}

export default DashBoard
