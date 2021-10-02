const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcript = require('bcryptjs')
const config = require('config')
const User = require('../../models/User')


// @route   GET api/auth
// @desc    Get user account
// @access  Private
router.get('/', auth, async (req, res) => {
   try {
      const user = await User.findById(req.user.id).select('-password')
      res.json(user)
   } catch (err) {
      console.log(err.message)
      res.status(500).json({ msg: "Server Error" })
   }
})

// @route   POST api/auth
// @desc    Login user
// @access  Public
router.post(
   '/',
   check('email', 'Invalid email').isEmail(),
   check('password', 'Please enter a password').exists(),
   async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(401).json({ errors: errors.array() })
      }
      const { email, password } = req.body
      try {
         const user = await User.findOne({ email })
         if (!user) {
            return res.status(400).json({ errors: 'Invalid Credentials' })
         }
         const isMatch = await bcript.compare(password, user.password)
         if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
         }
         const payload = {
            user: {
               id: user.id
            }
         }
         jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 3 * 24 * 60 * 60 },
            (err, token) => {
               if (err) throw err
               res.json({ token })
            }
         )
      } catch (err) {
         console.log(err.message)
         res.status(500).json({ msg: 'Server Error' })
      }
   }
)

module.exports = router