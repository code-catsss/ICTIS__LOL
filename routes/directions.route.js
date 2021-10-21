const {Router} = require('express')
const Direction = require('../models/Directions')
const User = require("../models/User");
const News = require("../models/News");

const router = Router()


router.get('/all', async (req,res) => {
    try {
        const dir = await Direction.find({})
        res.json(dir)

    } catch (error) {
        console.log(error)
    }
})


router.post('/add', async (req,res) => {
    try {

        const {name,code,term,form_of_study,GB,CV} = req.body

        const dir = new Direction({name: name,code: code,term: term,form_of_study:form_of_study,GB:GB,CV:CV})

        await dir.save()

        res.status(200).json({message: 'Готовый!!!!'})
    } catch (error) {
        console.log(error)
    }
})

router.get('/detail', async (req,res) =>{
    try {

        const {DirectionId} = req.query
        const thisdirection = await Direction.findOne({_id: DirectionId})
        res.json(thisdirection)
    } catch (error) {
        res.json('not found')
    }
})
module.exports = router