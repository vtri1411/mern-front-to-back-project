import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import PropTypes from 'prop-types'

function Navbar({ logout, auth: { loading, isAuthenticated } }) {
   const authLinks = (
      <>
         <li>
            <Link to='/posts'>
               <i className="fas fa-user"></i>
               <span className="hide-sm">  Post</span>
            </Link>
         </li>
         <li>
            <Link to='/dashboard'>
               <i className="fas fa-user"></i>
               <span className="hide-sm">  Dashboard</span>
            </Link>
         </li>
         <li onClick={() => logout()} >
            <a>
               <i className="fas fa-sign-out-alt"></i>
               <span className="hide-sm">  Logout</span>
            </a>
         </li>
      </>
   )
   const guestLinks = (
      <>
         <li><Link to='/register'>Register</Link></li>
         <li><Link to='/login'>Login</Link></li>
      </>
   )
   return (
      <nav className="navbar bg-dark">
         <h1>
            <Link to='/'><i className="fas fa-code"></i> DevConnector</Link>
         </h1>
         <ul>
            <li>
               <Link to='/profiles'>
                  Developers
               </Link>
            </li>
            {
               !loading && isAuthenticated && authLinks
            }
            {
               !loading && !isAuthenticated && guestLinks
            }
         </ul>

      </nav>
   )
}

const propTypes = {
   logout: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
}

const mapStateToProps = ({ auth }) => ({
   auth
})

export default connect(mapStateToProps, { logout })(Navbar)
