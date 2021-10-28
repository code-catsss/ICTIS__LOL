const {Router} = require('express')
const Question = require('../models/Questoin')

const router = Router()

function getCurrentBrunch(brunches, que){
    let NewArr = []
    for (let index = 0; index < brunches.length; index++) {
        const ss =  brunches[index][brunches[index].length - 1].answers.length
        
        for (let index_2= 0; index_2< ss; index_2++) {
            if (brunches[index][brunches[index].length - 1].answers[index_2].next_question_id === que._id.toString()) {
                NewArr.push(brunches[index])
            }
            
        }
        
    }
    
    return NewArr
}

router.post('/add_question', async (req,res) => {
    try {
        const {content, lvl, answers} = req.body

        const questoin = new Question({content: content, lvl: lvl, isEnd: false, answers: answers})

        questoin.save()

        res.status(200).json({message: 'successfully'})

    } catch (error) {
        console.log(error)
        res.status(400).json({message: error})
    }
})

router.post('/add_bound', async (req,res) => {
    try {
        const {questions, selectAnswer} = req.body
         console.log(selectAnswer)
        await Question.updateOne({'_id': questions[0]._id, 'answers._id': selectAnswer}, {$set:{
            'answers.$.next_question_id': questions[1]._id
        }})

        res.status(200).json({message: 'successfully'})

    } catch (error) {
        console.log(error)
        res.status(400).json({message: error})
    }
})

router.post('/delete_bound', async (req,res) => {
    try {
        const {questions, selectAnswer} = req.body
         console.log(selectAnswer)
        await Question.updateOne({'_id': questions[0]._id, 'answers._id': selectAnswer}, {$set:{
            'answers.$.next_question_id':'0'
        }})

        res.status(200).json({message: 'successfully'})

    } catch (error) {
        console.log(error)
        res.status(400).json({message: error})
    }
})

router.get('/get_all', async (req,res) => {
    try {

        const questoins = await Question.find({})
        
        const check = await Question.find({})
        const getBrunches = await check.sort((a, b) => a.lvl > b.lvl ? 1 : -1)

        let brunches = []
        
        for (let index = 0; index < getBrunches.length; index++) {
            let checks = []
            checks = getCurrentBrunch(brunches, getBrunches[index])
            for (let i_s = 0; i_s < checks.length; i_s++) {
                if(checks[i_s] != undefined) await brunches.splice(brunches.indexOf(checks[i_s]), 1)
             }              
            for (let index2 = 0; index2 < getBrunches[index].answers.length; index2++) {
                if(getBrunches[index].lvl !== 0){
                    for (let index3 = 0; index3 < checks.length; index3++) {
                        if(checks[index3] != undefined ){
                            let newBrunch = await JSON.parse(JSON.stringify(checks[index3]))
                            let newQuest = await JSON.parse(JSON.stringify(getBrunches[index]))
                            for (let Lol= 0; Lol < newQuest.answers.length; Lol++) {
                                if (newQuest.answers[Lol].next_question_id != getBrunches[index].answers[index2].next_question_id){
                                    newQuest.answers[Lol].next_question_id = await 'no'
                                }    
                        }
                        if(newBrunch != undefined)
                            newBrunch.push(newQuest)
    
                        if(newBrunch != undefined)
                            brunches.push(newBrunch)
                        }
    
                    }
                   
                    
                }
                else{
                    let newBrunch =  await []
                    let newQuest = await JSON.parse(JSON.stringify(getBrunches[index]))

                    
                    for (let Lol= 0; Lol < newQuest.answers.length; Lol++) {
                        if (newQuest.answers[Lol].next_question_id != getBrunches[index].answers[index2].next_question_id){
                            newQuest.answers[Lol].next_question_id = await 'no'
                        }
                        
                    }
                    
                    if(newBrunch != undefined)
                        newBrunch.push(newQuest)

                    
                    await brunches.push(newBrunch)
                    
                }
                
                
                
            }
            
            

        }
        
        
        const lvl_quest = await questoins.map(element => {
            return element.lvl
        })

        let buffer = []
        let newQArr = []
        for (let index = 0; index < lvl_quest.length; index++) {
            if (!buffer.includes(lvl_quest[index])) {
                buffer.push(lvl_quest[index])
                let m_array = []
                m_array.push(questoins[index])
                newQArr.push(m_array)
            }
            else{
                for (let lol = 0; lol < newQArr.length; lol++) {
                    if (newQArr[lol][0].lvl === lvl_quest[index]) {
                        newQArr[lol].push(questoins[index])
                    }

                    
                }
            }
        }
        res.json({newQArr, brunches})

    } catch (error) {
        console.log(error)
        res.status(400).json({message: 'sdsds'})
    }
})
router.post('/delete', async (req,res) => {
    try {
        const {id} = req.body
        
        await Question.updateMany({answers:{$elemMatch: {next_question_id: id}}}, {$set: { "answers.$.next_question_id": '0' }})

        await Question.deleteOne({_id: id})

        res.status(200).json({message: 'sdsds'})

    } catch (error) {
        console.log(error)
        res.status(400).json({message: 'sdsds'})
    }
})

router.post('/delete_all', async (req,res) => {
    try {
        
        await Question.deleteMany({})

        res.status(200).json({message: 'sdsds'})

    } catch (error) {
        console.log(error)
        res.status(400).json({message: 'sdsds'})
    }
})



router.post('/refactor', async (req,res) => {
    try {

        const {content,lvl,answers, id} = req.body

        await Question.updateOne({_id: id}, {$set: {
            content: content,
            lvl: lvl,
            answers: answers
        }}, (err,res) => {
            console.log(err)
        })

        res.status(200).json({message: 'Готовый!!!!'})
    } catch (error) {
        console.log(error)
    }
})

router.get('/start_test', async (req,res) =>{
    try {

        const start = await Question.findOne({lvl:0})

        res.json(start)
    } catch (error) {
        console.log(error)
    }
})

router.get('/next_question', async (req,res) =>{
    try {

        const {id} = req.query

        const next = await Question.findOne({_id:id})

        res.json(next)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router