import { Accordion, AccordionDetails, AccordionSummary, Button, TextField,Switch, Tabs, Tab } from "@material-ui/core";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import './style.css'


export const TestAX = () => {
    const [quest, setquest] = useState([])


    const [form, setform] = useState({
        content: '',
        lvl: '',
        answers: []
    })
    const [answer_form, set_answer_form] = useState({
        content: '',
        mag01_04_02:{ 
            name: '01.04.02',
            value: 0
        },
        mag09_04_01:{ 
            name: '09.04.01',
            value: 0
        },
        mag09_04_03:{ 
            name: '09.04.03',
            value: 0
        },
        mag09_04_04:{ 
            name: '09.04.04',
            value: 0
        },
        mag27_04_03:{
            name: '27.04.03',
            value: 0
        },
        statedir: '0',
        statedirdet: 0

    })

    
    const GetQuestions = useCallback(async ()=>{
        await axios.get('/api/test/get_all', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {setquest(response.data)})
    }) 

    const UploadQuestion = async () =>{
        try {
            await axios.post('/api/test/add_question', {...form}, {
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
        console.log(form.answers)
        const chel = JSON.parse(JSON.stringify(form.answers))
        const newList = chel.map((item)=>{
            if(item.content === lel.content ){
                item[event.target.name].value = parseInt(event.target.value, 10)
                

                
            }
            console.log(item)
            return item
            
            
        })
        console.log(newList)
        setform({...form, answers: newList})
    }

    const AddAnswer = () => {
        console.log('lolo')
        let newArr = form.answers
        newArr.push(answer_form)
        console.log(newArr)
        setform({...form, answers : newArr})
    }

    
    return(
        <div>

            <div className="CreateForm">
                <TextField label = "Содержание" name = "content" onChange={ChangeDataQuestion}></TextField>
                <TextField label = "Уровень" name = "lvl" onChange={ChangeDataQuestion}></TextField>
                <TextField label = "Содержание ответа" name = "content" onChange={ChangeDataAnswer}></TextField>
                <div>
                <Button variant="outlined" onClick={AddAnswer}>Добавить ответ</Button>
                <Button variant="contained" color="primary" onClick={UploadQuestion}>Сохранить</Button>
                </div>
                <h3>Список ответов:</h3>
                {
                    form.answers.map((i)=>(
                        <Accordion >
                            <AccordionSummary>
                                <TextField onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()} value={i.content}></TextField>
                                <Button variant="contained" color="secondary" onClick={() => {
                                    let newa = form.answers
                                    newa.splice(newa.indexOf(i), 1)
                                    setform({...form, answers: newa})
                                }}>Удалить</Button>
                                
                                <Switch label="lol" onChange={()=>{
                                    if (form.answers[form.answers.indexOf(i)].statedir === i._id) {
                                        const chel = JSON.parse(JSON.stringify(form.answers))
                                        chel[form.answers.indexOf(i)].statedir = '0'
                                        setform({...form, answers: chel})
                                    }
                                    else if(form.answers[form.answers.indexOf(i)].statedir === '0'){
                                        const chel = JSON.parse(JSON.stringify(form.answers))
                                        chel[form.answers.indexOf(i)].statedir = i._id
                                        setform({...form, answers: chel})
                                    }
                                }
                                } onClick={(event) => event.stopPropagation()} name="checkedA" color="primary" name="checkedB"/>
                            </AccordionSummary>
                            <AccordionDetails>
                                {form.answers[form.answers.indexOf(i)].statedir === i._id ? <><Tabs variant="scrollable"
          scrollButtons="auto" value={form.answers[form.answers.indexOf(i)].statedirdet} onChange={(e, nw)=>{
                                    const chel = JSON.parse(JSON.stringify(form.answers))
                                    chel[form.answers.indexOf(i)].statedirdet = nw
                                    setform({...form, answers: chel})
                                }} indicatorColor="primary" textColor="primary">
                                    <Tab label={i.mag01_04_02.name}></Tab>
                                    <Tab label={i.mag09_04_01.name}></Tab>
                                    <Tab label={i.mag09_04_03.name}></Tab>
                                    <Tab label={i.mag09_04_04.name}></Tab>
                                    <Tab label={i.mag27_04_03.name}></Tab>
                                </Tabs>
                                <hr />
                                <p>
                                    Похуй
                                </p>
                                </> 
                                : <div>
                                    <TextField name='mag01_04_02' onChange={(e) => ChangeDataAnswerinQuestion(e, i)} label={i.mag01_04_02.name} defaultValue={i.mag01_04_02.value}></TextField>
                                <TextField name='mag09_04_01' onChange={(e) => ChangeDataAnswerinQuestion(e, i)} label={i.mag09_04_01.name} defaultValue={i.mag09_04_01.value}></TextField>
                                <TextField name='mag09_04_03' onChange={(e) => ChangeDataAnswerinQuestion(e, i)} label={i.mag09_04_03.name} defaultValue={i.mag09_04_03.value}></TextField>
                                <TextField name='mag09_04_04' onChange={(e) => ChangeDataAnswerinQuestion(e, i)} label={i.mag09_04_04.name} defaultValue={i.mag09_04_04.value}></TextField>
                                <TextField name='mag27_04_03' onChange={(e) => ChangeDataAnswerinQuestion(e, i)} label={i.mag27_04_03.name} defaultValue={i.mag27_04_03.value}></TextField>
                                </div> }
                            
                            </AccordionDetails>
                        </Accordion>
                    ))
                }


            </div>
        </div>
    )
}