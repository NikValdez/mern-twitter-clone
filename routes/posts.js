const passport = require('passport')
const mongoose = require('mongoose')
const express = require('express')

const Post = require('../models/Post')

module.exports = app => {
  app.get('/api/post', (req, res) => {
    res.send('Post')
  })

  //Get all Posts
  app.get('/api/posts', (req, res) => {
    Post.find()
      .sort({ date: -1 })
      .then(posts => res.json(posts))
      .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }))
  })

  //Add a post
  app.post('/api/posts', (req, res) => {
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name
    })

    newPost.save().then(post => res.json(post))
  })
}
