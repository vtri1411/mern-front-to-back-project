const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth')
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')
const Post = require('../../models/Post')


// @route   POST api/posts
// @desc    Create new post
// @access  Private
router.post(
   '/',
   auth,
   check('text', 'Text is required').notEmpty(),
   async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() })
      }

      try {
         const user = await User.findById(req.user.id)

         const newPost = new Post({
            user: user._id,
            text: req.body.text,
            name: user.name,
            avatar: user.avatar
         })
         const post = await newPost.save()
         res.json(post)
      } catch (err) {
         console.log(err.message)
         res.status(500).send('Server Error')
      }
   }
)

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async (req, res) => {
   try {
      const posts = await Post.find().sort({ date: -1 })
      res.json(posts)
   } catch (err) {
      console.log(err.message)
      res.status(500).send('Server Error')
   }
})

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
   try {
      const post = await Post.findById(req.params.id)

      if (!post) {
         return res.status(404).json({ msg: 'Post not found' })
      }

      res.json(post)
   } catch (err) {
      console.log(err.message)
      if (err.kind === 'ObjectId') {
         return res.status(404).json({ msg: 'Post not found' })
      }
      res.status(500).send('Server Error')
   }
})

// @route   DELETE api/posts/:id
// @desc    Delete post by id
// @access  Private
router.delete('/:id', auth, async (req, res) => {
   try {
      const post = await Post.findById(req.params.id)

      if (!post) {
         return res.status(404).json({ msg: 'Post not found' })
      }
      if (post.user.toString() !== req.user.id) {
         return res.status(401).json({ msg: 'User not authorized' })
      }

      await post.remove()
      res.json({ msg: 'Post deleted' })
   } catch (err) {
      console.log(err.message)
      if (err.kind === 'ObjectId') {
         return res.status(404).json({ msg: 'Post not found' })
      }
      res.status(500).send('Server Error')
   }
})

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
   try {
      const post = await Post.findById(req.params.id)

      if (post.likes.some(like => like.user.toString() === req.user.id)) {
         return res.status(400).json({ msg: 'Post already liked' })
      }

      post.likes.unshift({ user: req.user.id })
      post.save()
      res.json(post.likes)

   } catch (err) {
      console.log(err.message)
      res.status(500).send('Server Error')
   }
})

// @route   DELETE api/posts/like/:id
// @desc    Unlike a post
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
   try {
      const post = await Post.findById(req.params.id)

      if (!post.likes.some(like => like.user.toString() === req.user.id)) {
         return res.status(400).json({ msg: 'Post has not yet been liked' })
      }

      const removeIndex = post.likes.findIndex(like => like.user.toString() === req.user.id)
      post.likes.splice(removeIndex, 1)
      post.save()
      res.json(post.likes)

   } catch (err) {
      console.log(err.message)
      res.status(500).send('Server Error')
   }
})

// @route   POST api/posts/comment/:id
// @desc    Add comment to a post
// @access  Private
router.post(
   '/comment/:id',
   auth,
   check('text', 'Text is required').notEmpty(),
   async (req, res) => {
      console.log('body', req.body)
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() })
      }
      try {
         const post = await Post.findById(req.params.id)
         const user = await User.findById(req.user.id).select('-password')

         const newComment = {
            text: req.body.text,
            user: req.user.id,
            name: user.name,
            avatar: user.avatar
         }

         post.comments.unshift(newComment)
         await post.save()
         res.json(post.comments)

      } catch (err) {
         console.log(err.message)
         res.status(500).send('Server Error')
      }
   }
)

// @route   DELETE api/posts/comment/:post_id/:cmt_id
// @desc    Delete comment of a post
// @access  Private
router.delete('/comment/:post_id/:cmt_id', auth, async (req, res) => {
   try {
      const post = await Post.findById(req.params.post_id)
      // Check error post id wrong
      if(!post) {
         return res.status(404).json({msg: 'Post not found'})
      } 
      // Find comment index
      const cmtIndex = post.comments.findIndex(comment => comment._id.toString() === req.params.cmt_id)
      // Check error comment id wrong
      if (cmtIndex === -1) {
         return res.status(404).json({ msg: 'Comment not found' })
      }
      // Check user authorization
      if (post.comments[cmtIndex].user.toString() !== req.user.id) {
         return res.status(401).json({ msg: 'User not authorized' })
      }
      // Remove comment
      post.comments.splice(cmtIndex, 1)
      await post.save()
      res.json(post.comments)

   } catch (err) {
      console.log(err)
      res.status(500).send('Server Error')
   }
})


module.exports = router