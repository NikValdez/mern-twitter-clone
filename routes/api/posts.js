const passport = require('passport')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

//Post model
const Post = require('../../models/Post')

//User Model
const User = '../../models/User'

//Post validation
const validatePostInput = require('../../validation/post')

//Get all Posts
router.get('/', (req, res) => {
  console.log(res)
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }))
})

// Get post by id
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post found with that ID' })
    )
})

//Add a post
router.post('/', (req, res) => {
  const { errors, isValid } = validatePostInput(req.body)

  //Check validation
  if (!isValid) {
    //If any errors, send 400 with errors to object
    return res.status(400).json(errors)
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    image: req.body.image,
    upload: req.body.upload
  })

  newPost.save().then(post => res.json(post))
})

//Delete a post
router.delete('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => post.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }))
})

//Add comment to post
router.post('/comment/:id', (req, res) => {
  const { errors, isValid } = validatePostInput(req.body)

  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        image: req.body.image
      }
      //Add to comments array
      post.comments.unshift(newComment)

      //save
      post.save().then(post => res.json(post))
    })
    .catch(err => res.status(404).json({ postnotfound: 'No post found' }))
})

//Delete a comment
router.delete('/comment/:id/:comment_id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      //Check if comment exists
      if (
        post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        return res
          .status(404)
          .json({ commentnoteexists: 'Comment does not exist' })
      }

      //Get remove index
      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id)

      //Splice out the comment from array
      post.comments.splice(removeIndex, 1)

      post.save().then(post => res.json(post))
    })
    .catch(err => res.status(404).json({ postnotfound: 'No post found' }))
})

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post('/like/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      const newLike = {
        count: req.body.count
      }
      //Add to likes array
      post.likes.unshift(newLike)

      //save
      post.save().then(post => res.json(post))
    })
    .catch(err => res.status(404).json({ likenotfound: 'No like found' }))
})

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post(
  '/unlike/:id',

  (req, res) => {
    User.findOne({ user: req.user.id }).then(user => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: 'You have not yet liked this post' })
          }

          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id)

          // Splice out of array
          post.likes.splice(removeIndex, 1)

          // Save
          post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }))
    })
  }
)

module.exports = router
