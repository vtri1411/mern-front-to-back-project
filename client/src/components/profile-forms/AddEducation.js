import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addEducation } from '../../actions/profile'
import { Link, useHistory } from 'react-router-dom'



function AddEducation() {
   const dispatch = useDispatch()
   const history = useHistory()
   const [formData, setFormData] = useState({
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      current: false,
      description: ''
   })

   const [toDateDisable, setToDateDisable] = useState(false)
   const { school, degree, fieldofstudy, from,
      to, current, description } = formData

   useEffect(() => {
      if (toDateDisable) {
         setFormData({ ...formData, to: '' })
      }
   }, [toDateDisable])

   const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
   const onSubmit = e => {
      e.preventDefault()
      dispatch(addEducation(formData, history))
   }

   return (
      <>
         <h1 class="large text-primary">
            Add Your Education
         </h1>
         <p class="lead">
            <i class="fas fa-code-branch"></i> Add any school or bootcamp that you have attended
         </p>
         <small>* = required field</small>
         <form class="form" onSubmit={e => onSubmit(e)}>
            <div class="form-group">
               <input type="text" placeholder="* School or Bootcamp" name="school" required
                  value={school} onChange={e => onChange(e)} />
            </div>
            <div class="form-group">
               <input type="text" placeholder="* Degree or Certificate" name="degree" required
                  value={degree} onChange={e => onChange(e)} />
            </div>
            <div class="form-group">
               <input type="text" placeholder="Field of Study" name="fieldofstudy"
                  value={fieldofstudy} onChange={e => onChange(e)} />
            </div>
            <div class="form-group">
               <h4>From Date</h4>
               <input type="date" name="from"
                  value={from} onChange={e => onChange(e)} />
            </div>
            <div class="form-group">
               <p>
                  <input type="checkbox" name="current" value=""
                     checked={current}
                     value={current} onChange={e => {
                        setFormData({ ...formData, current: !current })
                        setToDateDisable(!current)
                     }} />
                  Current
               </p>
            </div>
            <div class="form-group">
               <h4>To Date</h4>
               <input type="date" name="to"
                  value={to} onChange={e => onChange(e)}
                  disabled={toDateDisable ? 'disable' : ''}
               />
            </div>
            <div class="form-group">
               <textarea
                  name="description"
                  cols="30"
                  rows="5"
                  placeholder="Program Description"
                  value={description} onChange={e => onChange(e)}
               ></textarea>
            </div>
            <input type="submit" class="btn btn-primary my-1" />
            <a class="btn btn-light my-1" href="dashboard">Go Back</a>
         </form>
      </>
   )
}

export default AddEducation
