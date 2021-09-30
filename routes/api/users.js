const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const gravata = require('gravatar')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken');
const User = require('../../models/User')

// @route POST api/users
// @desc Test route
// @access Public

router.post(
   '/',
   check('name', 'Name is required').not().isEmpty(),
   check('email', 'Please include a valid email').isEmail(),
   check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
   async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() })
      }
      const { name, email, password } = req.body
      try {
         // get the user exists
         let user = await User.findOne({ email })
         if (user) {
            return res.status(400)
               .json({ errors: [{ msg: 'User has already existed' }] })
         }
         // gravatar
         const avatar = gravata.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
         })
         // create instance
         user = new User({
            name,
            email,
            password,
            avatar
         })
         // encrypt password
         const salt = await bcrypt.genSalt(10)
         user.password = await bcrypt.hash(password, salt)
         // add user to db
         await user.save()
         // create and set jwt
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
         res.status(500).json('server error')
      }
   }
)

module.exports = router