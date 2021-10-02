import React from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { deleteEducation } from '../../actions/profile'


function Education({ education }) {
   const dispatch = useDispatch()

   return (
      <>
         <h2 className="my-2">Education Credientials</h2>
         <table className='table' >
            <thead>
               <tr>
                  <th>School</th>
                  <th className='hide-sm' >Degree</th>
                  <th className='hide-sm' >Years</th>
               </tr>
            </thead>
            <tbody>
               {
                  education && education.map(edu => (
                     <tr key={edu._id} >
                        <td>{edu.school}</td>
                        <td className='hide-sm' >{edu.degree}</td>
                        <td>
                           {
                              moment(edu.from).format('YYYY/MM/DD')
                           }
                           {
                              '  -  '
                           }
                           {
                              edu.to
                                 ? moment(edu.to).format('YYYY/MM/DD')
                                 : ' Now'
                           }
                        </td>
                        <td>
                           <button className='btn btn-danger'
                              onClick={() => dispatch(deleteEducation(edu._id))}>Delete</button>
                        </td>
                     </tr>
                  ))
               }
            </tbody>
         </table>
      </>
   )
}

export default Education
