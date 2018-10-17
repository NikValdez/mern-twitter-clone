const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
//Load models
require('./models/User')
require('./models/Post')

require('./config/passport')(passport)

mongoose
  .connect(
    keys.mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

const app = express()
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)

app.use(passport.initialize())
app.use(passport.session())

require('./routes/auth')(app)
require('./routes/posts')(app)

app.get('/test', (req, res) => {
  res.send('Test')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
