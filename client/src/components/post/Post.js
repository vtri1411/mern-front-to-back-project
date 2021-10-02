import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../layouts/Spinner'
import { getPost } from '../../actions/post'
import { useParams, Link } from 'react-router-dom'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

function Post() {
   const dispatch = useDispatch()
   const { id } = useParams()
   const { post, loading } = useSelector(({ post: { post, loading } }) => ({ post, loading }))
   useEffect(() => {
      dispatch(getPost(id))
   }, [])

   return loading || !post
      ? <Spinner />
      : (
         <>
            <Link to='/posts' className='btn'>Back to Posts</Link>
            <PostItem showActions={false} post={post} />
            <CommentForm postId={post._id} />
            <div className="comments">
               {
                  post.comments && post.comments.map(comment =>
                     <CommentItem key={comment._id} comment={comment} postId={post._id} />)
               }
            </div>
         </>
      )
}

export default Post
