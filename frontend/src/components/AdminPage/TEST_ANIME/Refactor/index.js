import { Accordion, AccordionDetails, AccordionSummary, Button, TextField } from "@material-ui/core";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import './style.css'


export const TestAXR = (props) => {
    const [quest, setquest] = useState([])

    const [form, setform] = useState({
        content: '',
        lvl: '',
        answers: []
    })
    const [answer_form, set_answer_form] = useState({
        content: '',
        next: 0

    })

    
    const GetQuestions = useCallback(async ()=>{
        await axios.get('/api/test/get_all', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {setquest(response.data)})
    }) 

    const UpdateQuestion = async () =>{
        try {
            await axios.post('/api/test/refactor', {...form, id:props.refactorData._id}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => GetQuestions())
        } catch (error) {
            
        }
    }

    const ChangeDataAnswer = (event) => {
        set_answer_form({...answer_form, [event.target.name]: event.target.value})
    }

    const ChangeDataQuestion = (event) => {
        setform({...form, [event.target.name]: event.target.value})
    }

    function ChangeDataAnswerinQuestion(event, lel){
        
        const newList = form.answers.map((item)=>{
            if(item._id === lel){
                if (event.target.name !== 'content') {
                    item[event.target.name].value = parseInt(event.target.value, 10)
                    console.log(item)    
                }else{
                    item[event.target.name] = event.target.value
                }
                
            }
            
            return item
            
        })
        setform({...form, answers: newList})
    }

    const AddAnswer = () => {
        console.log('lolo')
        let newArr = form.answers
        newArr.push(answer_form)
        console.log(newArr)
        setform({...form, answers : newArr})
    }

    useEffect(()=>{
        setform(props.refactorData)
    }, [setform, ChangeDataAnswerinQuestion])
    return(
        <div>

            <div className="CreateForm">
                <TextField label = "Содержание" name = "content" onChange={ChangeDataQuestion} value={form.content}></TextField>
                <TextField label = "Уровень" name = "lvl" onChange={ChangeDataQuestion} value={form.lvl}></TextField>
                <TextField label = "Содержание ответа" name = "content" onChange={ChangeDataAnswer}></TextField>
                <div>
                <Button variant="outlined" onClick={AddAnswer}>Добавить ответ</Button>
                <Button variant="contained" color="primary" onClick={UpdateQuestion}>Изменить</Button>
                </div>
                <h3>Список ответов:</h3>
                {
                    form.answers.map((i)=>(
                        <Accordion >
                            <AccordionSummary>
                                <TextField name='content' onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()} onChange={(e) => ChangeDataAnswerinQuestion(e, i._id)} value={i.content}></TextField>
                                <Button variant="contained" color="secondary" onClick={() => {
                                    let newa = form.answers
                                    newa.splice(newa.indexOf(i), 1)
                                    setform({...form, answers: newa})
                                }}>Удалить</Button>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TextField name='mag01_04_02' onChange={(e) => ChangeDataAnswerinQuestion(e, i._id)} label={i.mag01_04_02.name} defaultValue={i.mag01_04_02.value}></TextField>
                                <TextField name='mag09_04_01' onChange={(e) => ChangeDataAnswerinQuestion(e, i._id)} label={i.mag09_04_01.name} defaultValue={i.mag09_04_01.value}></TextField>
                                <TextField name='mag09_04_03' onChange={(e) => ChangeDataAnswerinQuestion(e, i._id)} label={i.mag09_04_03.name} defaultValue={i.mag09_04_03.value}></TextField>
                                <TextField name='mag09_04_04' onChange={(e) => ChangeDataAnswerinQuestion(e, i._id)} label={i.mag09_04_04.name} defaultValue={i.mag09_04_04.value}></TextField>
                                <TextField name='mag27_04_03' onChange={(e) => ChangeDataAnswerinQuestion(e, i._id)} label={i.mag27_04_03.name} defaultValue={i.mag27_04_03.value}></TextField>
                            </AccordionDetails>
                        </Accordion>
                    ))
                }


            </div>
        </div>
    )
}