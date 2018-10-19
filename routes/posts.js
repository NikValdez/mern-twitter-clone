const passport = require('passport')
const mongoose = require('mongoose')
const express = require('express')

const Post = require('../models/Post')

module.exports = app => {
  //Get all Posts
  app.get('/api/posts', (req, res) => {
    console.log(res)
    Post.find()
      .sort({ date: -1 })
      .then(posts => res.json(posts))
      .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }))
  })

  //Add a post
  app.post('/api/posts', (req, res) => {
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      image: req.body.image
    })

    newPost.save().then(post => res.json(post))
  })
}
