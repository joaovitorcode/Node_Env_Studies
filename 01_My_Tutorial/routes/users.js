const express = require('express')

const router = express.Router()

const User = require('../models/user')

// Post Method
router.post('/post', async (req, res) => {
  const data = new User({
    name: req.body.name,
    age: req.body.age
  })

  try {
    const dataToSave = await data.save()
    res.status(200).json(dataToSave)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get all Method
router.get('/getAll', async (req, res) => {
  try {
    const data = await User.find()
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get one Method
router.get('/getOne/:id', async (req, res) => {
  try {
    const id = req.params.id
    const data = await User.findById(id)
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update by ID Method
router.patch('/update/:id', async (req, res) => {
  try {
    const id = req.params.id
    const updateData = req.body
    const options = { new: true }

    const result = await User.findByIdAndUpdate(id, updateData, options)

    res.json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id
    const data = await User.findByIdAndDelete(id)
    res.json(`Document with ${data.name} has been deleted..`)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})

module.exports = router
