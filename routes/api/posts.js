const passport = require('passport')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

//Post model
const Post = require('../../models/Post')

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
    image: req.body.image
  })

  newPost.save().then(post => res.json(post))
})

//Delete a post
router.delete('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => post.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }))
})

module.exports = router
