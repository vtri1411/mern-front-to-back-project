import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import PropTypes from 'prop-types'


function Login({ login, isAuthenticated }) {
   const [formData, setFormData] = useState({
      email: '',
      password: ''
   })
   const { email, password } = formData
   const onChange = e => setFormData({
      ...formData,
      [e.target.name]: e.target.value
   })
   const onSubmit = e => {
      e.preventDefault()
      login(email, password)
   }
   if (isAuthenticated) {
      return <Redirect to='dashboard' />
   }

   return (
      <>
         <h1 className="large text-primary">Login</h1>
         <p className="lead"><i className="fas fa-user"></i> Sign into your account</p>
         <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
               <input type="email" placeholder="Email Address" name="email" required
                  value={email} onChange={e => onChange(e)} />
            </div>
            <div className="form-group">
               <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  minLength="6"
                  onChange={e => onChange(e)}
                  value={password}
               />
            </div>
            <input type="submit" className="btn btn-primary" value="Login" />
         </form>
         <p className="my-1">
            Don't have an account? <Link to="/register">Sign Up</Link>
         </p>
      </>
   )
}

const propTypes = {
   login: PropTypes.func.isRequired,
}

const mapStateToProps = ({ auth }) => ({
   isAuthenticated: auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
