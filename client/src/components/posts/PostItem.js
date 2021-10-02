import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { addLike, removeLike, deletePost } from '../../actions/post'


const mapState = ({ auth }) => ({
   auth
})

function PostItem({ post: { _id, text, name, avatar, user, likes, comments, date }, showActions = true }) {
   const dispatch = useDispatch()
   const { auth } = useSelector(mapState)
   return (
      <div className="post bg-white p-1 my-1">
         <div>
            <Link to={`/profile/${user}`}>
               <img
                  className="round-img"
                  src={avatar}
                  alt=""
               />
               <h4>{name}</h4>
            </Link>
         </div>
         <div>
            <p className="my-1">
               {text}
            </p>
            <p className="post-date">
               Posted on {moment(date).format('YYYY/MM/DD')}
            </p>
            {
               showActions &&
               <>
                  <button type="button" class="btn btn-light"
                     onClick={() => dispatch(addLike(_id))}>
                     <i class="fas fa-thumbs-up"></i> {'  '}
                     {
                        likes.length > 0 &&
                        <span class='comment-count'>  {likes.length}</span>
                     }
                  </button>
                  <button type="button" class="btn btn-light"
                     onClick={() => dispatch(removeLike(_id))}>
                     <i class="fas fa-thumbs-down"></i>
                  </button>
                  <Link to={`/posts/${_id}`} class="btn btn-primary">
                     Discussion {'  '}
                     {
                        comments.length > 0 &&
                        <span class='comment-count'>{comments.length}</span>
                     }
                  </Link>
                  {
                     auth.user && auth.user._id === user &&
                     <button
                        type="button"
                        class="btn btn-danger"
                        onClick={() => dispatch(deletePost(_id))}
                     >
                        <i class="fas fa-times"></i>
                     </button>
                  }
               </>
            }
         </div>
      </div >
   )
}

export default PostItem
