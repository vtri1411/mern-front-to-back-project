import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../actions/post'
import Spinner from '../layouts/Spinner'
import PostForm from './PostForm'
import PostItem from './PostItem'



const mapState = ({ post }) => ({
   post: post.posts,
   loading: post.loading
})

function Posts() {
   const dispatch = useDispatch()
   const { post, loading } = useSelector(mapState)

   useEffect(() => {
      dispatch(getPosts())
   }, [])
   return loading 
      ? <Spinner />
      : (
         <>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead ">
               <i className='fas fa-user'>Welcome to comunity</i>
            </p>
            <PostForm />
            <div className="posts">
               {
                  post.map(post => <PostItem key={post._id} post={post} />)
               }
            </div>
         </>
      )
}

export default Posts
