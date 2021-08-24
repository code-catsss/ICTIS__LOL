const {Router, json} = require('express')
const News = require('../models/News')
const User = require('../models/User')

const router = Router()

router.get('/all', async (req,res) =>{
    try {

        const {userId} = req.query
        if(userId){
            const user = await User.findOne({_id: userId})

        const allnews = await News.find({})
        let isInclude = false
        const newNews = await Promise.all(allnews.map(element => {
            let newElem = {}
            isInclude = user.isLiked.includes(element._id)

            newElem.header = element.header
            newElem.text = element.text
            newElem.date = element.date
            newElem.img = element.img
            newElem.likes = element.likes
            newElem.views = element.views
            newElem.isliked = isInclude
            newElem._id = element._id
            

            return newElem


            
        }))
        console.log(newNews)
        res.json(newNews)
        }else{
            const allnews = await News.find({})
            res.json(allnews)
        }
        
        
    } catch (error) {
        console.log(error)
    }
})

router.get('/detail', async (req,res) =>{
    try {

        const {id, userId} = req.query

        if(userId){
            const user = await User.findOne({_id: userId})
            const isInclude = user.isLiked.includes(id)
            const thisnews = await News.findOne({_id: id})
            res.json({thisnews, isInclude})
        }
        else{
            const thisnews = await News.findOne({_id: id})
            res.json(thisnews)
        }


    
    } catch (error) {
        console.log(error)
    }
})

router.post('/addlike', async (req,res) => {
    try {

        const {userId} = req.query
        const {id} = req.body

        const user = await User.findOne({_id: userId})

        const isInclude = user.isLiked.includes(id)
        const article = await News.findOne({_id: id})
        if(isInclude){
            await News.updateOne({_id: id}, {$set: {
                likes: parseInt(article.likes) - 1
            }}, (err,res) => {
                console.log(err)
            })

            await User.updateOne({_id: userId}, {$pull:{
                isLiked:{$in:id}
            }}, (err,res) => {
                console.log(err)
            })

            res.status(200).json({message: 'Готовый!!!!'})
        }else{


            await News.updateOne({_id: id}, {$set: {
                likes: parseInt(article.likes) + 1
            }}, (err,res) => {
                console.log(err)
            })

            await User.updateOne({_id: userId}, {$push:{
                isLiked:id
            }}, (err,res) => {
                console.log(err)
            })

        res.status(200).json({message: 'Готовый!!!!'})
        }
        
    } catch (error) {
        console.log(error)
    }
})

router.post('/addview', async (req,res) => {
    try {

        const {id} = req.body

        const article = await News.findOne({_id: id})

        await News.updateOne({_id: id}, {$set: {
            views: parseInt(article.views) + 1
        }}, (err,res) => {
            console.log(err)
        })


        res.status(200).json({message: 'Готовый!!!!'})
    } catch (error) {
        console.log(error)
    }
})

router.post('/add', async (req,res) => {
    try {

        const {header,text,date} = req.body

        const article = new News({header: header, text: text, date: date, img: 'https://static.wikia.nocookie.net/virtualyoutuber/images/4/4f/Gawr_Gura_Portrait.png/revision/latest?cb=20201205090629&path-prefix=ru'})

        await article.save()

        res.status(200).json({message: 'Готовый!!!!'})
    } catch (error) {
        console.log(error)
    }
})

router.post('/refactor', async (req,res) => {
    try {

        const {header,text,date, id} = req.body

        await News.updateOne({_id: id}, {$set: {
            header: header,
            text: text,
            date: date
        }}, (err,res) => {
            console.log(err)
        })

        res.status(200).json({message: 'Готовый!!!!'})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router