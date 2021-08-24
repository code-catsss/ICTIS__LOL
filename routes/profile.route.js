const {Router} = require('express')
const User = require('../models/User')

const router = Router()

router.get('/', async (req,res) => {
    try {
        
        const {userId} = req.query

        console.log(userId)

        const user = await User.findOne({_id: userId})

        res.json(user)

    } catch (error) {
        console.log(error)
    }
})

router.get('/all', async (req,res) => {
    try {
        

        const user = await User.find({})

        res.json(user)

    } catch (error) {
        console.log(error)
    }
})


module.exports = router