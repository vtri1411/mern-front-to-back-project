import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory, Route } from 'react-router-dom'

const mapState = ({ auth }) => ({
   auth
})

function PrivateRoute({ ...props }) {
   const { auth: { loading, isAuthenticated } } = useSelector(mapState)
   const history = useHistory()
   if (loading) {
      return null
   }
   if (!isAuthenticated) {
      history.push('/login')
      return null
   }
   if (isAuthenticated) {
      return (
         <Route {...props} />
      )
   }
}

export default PrivateRoute
