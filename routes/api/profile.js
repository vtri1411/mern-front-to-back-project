const { json } = require('express')
const express = require('express')
const { check, validationResult } = require('express-validator')
const router = express.Router()
const auth = require('../../middlewares/auth')
const config = require('config')
const request = require('request')
const Profile = require('../../models/Profile')
const User = require('../../models/User')


// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
   try {
      const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])
      if (!profile) {
         return res.status(400).json({ msg: 'There is no profile for this user' })
         console.log(profile)
      }
      res.json(profile)
   } catch (err) {
      console.log(err.message)
      res.status(500).send("Server Error")
   }
})


// @route   POST api/profile/me
// @desc    Create or Update a Profile
// @access  Private
router.post(
   '/',
   auth,
   check('status', 'Status is required').notEmpty(),
   check('skills', 'Skills is required').notEmpty(),
   async (req, res) => {
      const errors = validationResult(req)
      console.log(errors)
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() })
      }

      const { company, website, location, status,
         skills, bio, githubusername, experiences,
         education, youtube, twitter,
         facebook, linkedin, instagram } = req.body

      // Build profile object
      let profileFields = {}

      profileFields.user = req.user.id
      company && (profileFields.company = company)
      website && (profileFields.website = website)
      location && (profileFields.location = location)
      status && (profileFields.status = status)
      bio && (profileFields.bio = bio)
      githubusername && (profileFields.githubusername = githubusername)

      if (skills) {
         profileFields.skills = skills.split(',').map(skill => skill.trim())
      }

      // Build social object
      profileFields.socials = {}
      facebook && (profileFields.socials.facebook = facebook)
      twitter && (profileFields.socials.twitter = twitter)
      youtube && (profileFields.socials.youtube = youtube)
      linkedin && (profileFields.socials.linkedin = linkedin)
      instagram && (profileFields.socials.instagram = instagram)

      console.log(profileFields)

      try {
         let profile = await Profile.findOne({ user: req.user.id })
         if (profile) {
            // Update
            profile = await Profile.findOneAndUpdate(
               { user: req.user.id },
               { $set: profileFields },
               { new: true }
            )
            return res.json(profile)
         }

         // Create
         profile = new Profile(profileFields)
         await profile.save()
         return res.json(profile)

      } catch (err) {
         console.log(err.message)
         res.status(500).send('Server Error')
      }
   }
)

// @route   GET api/profile
// @desc    Get all user's profile
// @access  Public
router.get('/', async (req, res) => {
   try {
      const profiles = await Profile.find().populate('user', ['avatar', 'name'])
      res.json(profiles)
   } catch (err) {
      console.log(err.message)
      res.status(500).send('Server Error')
   }
})

// @route   GET api/profile/user/:user_id
// @desc    Get all user's profile
// @access  Public
router.get('/user/:user_id', async (req, res) => {
   try {
      const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['avatar', 'name'])
      if (!profile) {
         return res.status(400).json({ msg: 'Profile not found' })
      }
      res.json(profile)
   } catch (err) {
      console.log(err.message)
      if (err.kind == 'ObjectId') {
         return res.status(400).json({ msg: 'Profile not found' })
      }
      res.status(500).send('Server Error')
   }
})

// @route   DELETE api/profile
// @desc    Delete profile, user, posts
// @access  Private
router.delete('/', auth, async (req, res) => {
   try {
      // @todo-delete posts
      // delete profile
      await Profile.findOneAndRemove({ user: req.user.id })
      // delete user
      await User.findOneAndRemove({ _id: req.user.id })
      res.json({ msg: 'User deleted' })
   } catch (err) {
      console.log(err.message)
      res.status(500).send('Server Error')
   }
})

// @route   PUT api/profile/experience
// @desc    Add profile's experience
// @access  Private
router.put(
   '/experience',
   auth,
   check('title', 'Title is required').notEmpty(),
   check('company', 'Company is required').notEmpty(),
   check('from', 'From is required').notEmpty(),

   async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(500).json({ errors: errors.array() })
      }
      const { title, company, location, from,
         to, current, description } = req.body

      const newExp = {
         title, company, location, from,
         to, current, description
      }

      try {
         const profile = await Profile.findOne({ user: req.user.id })
         // handle profile not found
         if (!profile) {
            return res.status(400).json({ errors: [{ msg: 'Profile not found' }] })
         }
         // add experience to head position 
         profile.experience.unshift(newExp)
         await profile.save()
         res.json(profile)
      } catch (err) {
         console.log(err.message)
         res.status(500).send('Server Error')
      }
   }
)

// @route   DELETE api/profile/experience/:exp_id
// @desc    Remove profile's experience
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
   try {
      const profile = await Profile.findOne({ user: req.user.id })
      // handle profile not found
      if (!profile) {
         return res.status(400).json({ msg: 'User not found' })
      }
      const removeIndex = profile.experience.findIndex(experience => experience._id == req.params.exp_id)
      // handle experience not found
      if (removeIndex === -1) {
         return res.status(400).json({ msg: 'Experience not found' })
      }
      profile.experience.splice(removeIndex, 1)
      await profile.save()
      res.json({ profile })
   } catch (err) {
      console.log(err)
      res.status(500).send('Server Error')
   }
})

// @route   PUT api/profile/education
// @desc    Add profile's education
// @access  Private
router.put(
   '/education',
   auth,
   check('school', 'School is required').notEmpty(),
   check('degree', 'Degree is required').notEmpty(),
   check('from', 'From is required').notEmpty(),
   check('fieldofstudy', 'Field of study is required').notEmpty(),

   async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(500).json({ errors: errors.array() })
      }
      const { school, degree, fieldofstudy, from,
         to, current, description } = req.body

      const newEdu = {
         school, degree, fieldofstudy, from,
         to, current, description
      }

      try {
         const profile = await Profile.findOne({ user: req.user.id })
         // handle profile not found
         if (!profile) {
            return res.status(400).json({ errors: [{ msg: 'Profile not found' }] })
         }
         // add education to head position 
         profile.education.unshift(newEdu)
         await profile.save()
         res.json(profile)
      } catch (err) {
         console.log(err.message)
         res.status(500).send('Server Error')
      }
   }
)

// @route   DELETE api/profile/education/:edu_id
// @desc    Remove profile's education
// @access  Private
router.delete('/education/:edu_id', auth, async (req, res) => {
   try {
      const profile = await Profile.findOne({ user: req.user.id })
      // handle profile not found
      if (!profile) {
         return res.status(400).json({ msg: 'Profile not found' })
      }
      const removeIndex = profile.education.findIndex(education => education._id == req.params.edu_id)
      // handle education not found
      if (removeIndex === -1) {
         return res.status(400).json({ msg: 'Education not found' })
      }
      profile.education.splice(removeIndex, 1)
      await profile.save()
      res.json({ profile })
   } catch (err) {
      console.log(err)
      res.status(500).send('Server Error')
   }
})

// @route   GET api/profile/github/:username
// @desc    Get user's repos from github
// @access  Public
router.get('/github/:username', (req, res) => {
   const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&
      sort=created:asc&client_id=${config.get('githubClientId')}&
      client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
   }

   request(options, (error,respone, body) => {
      if(error) {
         console.log(err)
      }
      if(respone.statusCode !== 200){
         res.statusCode(404).json({msg: 'No Github profile found'})
      }
      res.json(JSON.parse(body))
   })
})

module.exports = router