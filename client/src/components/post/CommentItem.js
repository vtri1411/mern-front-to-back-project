import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { deleteComment } from '../../actions/post'

function CommentItem({ postId, comment: { _id, text, name, avatar, user, date } }) {
   const dispatch = useDispatch()
   const { auth } = useSelector(({ auth }) => ({ auth }))
   return (
      <div class="post bg-white p-1 my-1">
         <div>
            <Link to={`/profile/${user}`}>
               <img
                  class="round-img"
                  src={avatar}
                  alt=""
               />
               <h4>{name}</h4>
            </Link>
         </div>
         <div>
            <p class="my-1">
               {text}
            </p>
            <p class="post-date">
               Posted on {moment(date).format('YYYY/MM/DD')}
            </p>
            {
               !auth.loading && auth.user && user === auth.user._id &&
               <button onClick={e => dispatch(deleteComment(postId, _id) )}
               type='button' className='btn btn-danger'>
                  <i className="fas fa-times"></i>
               </button>
            }
         </div>
      </div>
   )
}

export default CommentItem
