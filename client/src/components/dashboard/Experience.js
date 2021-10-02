import React from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { deleteExperience } from '../../actions/profile'


function Experience({ experience }) {
   const dispatch = useDispatch()
   return (
      <>
         <h2 className="my-2">Experience  Credientials</h2>
         <table className='table' >
            <thead>
               <tr>
                  <th>Company</th>
                  <th className='hide-sm' >Title</th>
                  <th className='hide-sm' >Years</th>
               </tr>
            </thead>
            <tbody>
               {
                  experience && Array.isArray(experience) &&
                  experience.map(exp => (
                     <tr key={exp._id} >
                        <td>{exp.company}</td>
                        <td className='hide-sm' >{exp.title}</td>
                        <td>
                           {
                              moment(exp.from).format('YYYY/MM/DD')
                           }
                           {
                              '  -  '
                           }
                           {
                              exp.to
                                 ? moment(exp.to).format('YYYY/MM/DD')
                                 : ' now'
                           }
                        </td>
                        <td>
                           <button className='btn btn-danger'
                              onClick={() => dispatch(deleteExperience(exp._id))}
                           >Delete</button>
                        </td>
                     </tr>
                  ))
               }
            </tbody>
         </table>
      </>
   )
}

export default Experience
