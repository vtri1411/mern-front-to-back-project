import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../../actions/post'

function CommentForm({ postId }) {
   const dispatch = useDispatch()
   const [text, setText] = useState('')
   return (
      <div class="post-form">
         <div class="bg-primary p">
            <h3>Leave a comment</h3>
         </div>
         <form class="form my-1" onSubmit={e => {
            e.preventDefault()
            dispatch(addComment(postId, { text }))
            setText('')
         }}>
            <textarea
               name="text"
               cols="30"
               rows="5"
               placeholder="Comment on this post"
               value={text}
               onChange={e => setText(e.target.value)}
               required
            ></textarea>
            <input type="submit" class="btn btn-dark my-1" value="Submit" />
         </form>
      </div>
   )
}

export default CommentForm
