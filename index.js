const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const keys = require('./config/keys').mongoURI

//Load models
require('./models/User')

require('./config/passport')(passport)

const auth = require('./routes/api/auth')

mongoose
  .connect(
    keys,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

const app = express()

app.use(bodyParser.json())

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', auth)

app.get('/api/test', (req, res) => {
  res.send('Test')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
