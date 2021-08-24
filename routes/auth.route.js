const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const bcrypter = require('bcryptjs')
const jwtToken = require('jsonwebtoken')

router.post('/registr', 
    [
        check('email', 'Неккорктный email').isEmail(),
        check('password', 'Пароль нормально пиши').isLength({min:6})
    ]
,

async (req,res) => {
    try {

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Криво ввёл данные'
            })
        }

        const {name, email, password, kafedr, group} = req.body

        const isUsed = await User.findOne({email})

        if(isUsed){
            return res.status(300).json({message: 'Данная почта уже занята, попробуйте другую', isOK: false})
        }

        const hashedPass = await bcrypter.hash(password, 6)

        
        const user = new User({name,email,password:hashedPass,kafedr, group, isLiked: []})


        await user.save()

        res.status(201).json({message: 'Готовый!!!!', isOK: true})
    } catch (error) {
        console.log(error)
    }
})

router.post('/auth', 
    [
        check('email', 'Неккорктный email').isEmail(),
        check('password', 'Пароль нормально пиши').exists()
    ]
,

async (req,res) => {
    try {

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Криво ввёл данные'
            })
        }

        const {email, password} = req.body

        const user = await User.findOne({email})
        
        if(!user){
            return res.status(400).json({message: 'Пользователь не найден'})
        }
        
        
        const isMatch = await bcrypter.compare(password,user.password) 

        
        if(!isMatch){
            return res.status(400).json({message: 'Неверно введён пароль'})
        }

            
            const jwtSecret = 'o3232on5io3b6j2obmiy36go2iyg623yi6g2o3i6g3y'

            const token = jwtToken.sign(
                {user: user.id}, 
                jwtSecret,
                {expiresIn: '1h'}
            ) 
            console.log(user.role)
            res.json({token, userId: user.id, role: user.role})       
      
    } catch (error) {
        console.log(error)
    }
})

module.exports = router