const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("connect to database ok."))
  .catch(e => console.log("Error connecting to database : ", e))

// ==========================================================================
// Schemas
// ==========================================================================

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
})

const ExerciceSchema = new mongoose.Schema({
  _userId: mongoose.Schema.Types.ObjectId,
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    default: Date.now
  }
})

// ==========================================================================
// Models
// ==========================================================================

const User = mongoose.model('User', UserSchema)
const Exercice = mongoose.model('Exercice', ExerciceSchema)

// ==========================================================================
// Middlewares
// ==========================================================================

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

// ==========================================================================
// Routes
// ==========================================================================

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.route("/api/users")
  .get(async function (_, res) {
    const users = await User.find()
    res.json(users)
  })
  .post(async function (req, res) {
    try {
      const username = req.body.username
      const createdUser = new User({ name: username })
      const savedUser = await createdUser.save()
      res.json({username: savedUser.name, _id: savedUser._id })
    } catch {
      res.json({ error: "Error when creating user." })
    }
  })

app.post("/api/users/:_id/exercises", function (req, res) {
  try {
    const _userId = mongoose.Types.ObjectId(req.params._id)
    const description = req.body.description
    const duration = Number(req.body.duration)
    const date = req.body.date || Date.now()
    const createdExercice = new Exercice({
      description,
      duration,
      _userId,
      date,
    });
    createdExercice
      .save()
      .then(async savedExercice => {
        const user = await User.findById(savedExercice._userId)

        if (user) {
          res.json({
          _id: user._id,
          username: user.name,
          date: savedExercice.date.toDateString(),
          duration: savedExercice.duration,
          description: savedExercice.description
          })
        } else {
          res.json({ message: "User not found." })
        }
      })
  } catch {
    res.json({ error: "Error create exercice." })
  }
})

app.get("/api/users/:_id/logs", async function (req, res) {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 0
    const from = req.query.from || null
    const to = req.query.to || null
    const _id = req.params._id
    const user = await User.findById(_id)
    if (user) {
      let filter = { _userId: user._id }
      if (from) {
        filter['date'] = { $gte: new Date(from) }
      }
      if (to) {
        filter['date'] = { ...filter.date, $lte: new Date(to) }
      }
      const exercices = await Exercice.find(filter).limit(limit)
      res.json({
        _id: user._id,
        username: user.name,
        count: exercices.length,
        log: exercices.length > 0 ? exercices.map(exercice => ({
          description: exercice.description,
          duration: exercice.duration,
          date: exercice.date ? exercice.date.toDateString() : ""
        })) : []
      })
    } else {
      res.json({ message: "No user found for this id." })
    }
  } catch (e) {
    console.log(e)
    res.json({ error: "Error when quering user." })
  }
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
