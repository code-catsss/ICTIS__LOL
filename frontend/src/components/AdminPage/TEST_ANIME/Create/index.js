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
        statedirdet: 0,
        value_1: {
            code_name: '01.04.02_1',
            name: 'Математическое моделирование в инженерных науках',
            num: 0
        },
        value_2: {
            code_name: '01.04.02_2',
            name: 'Прикладная математика для высокопроизводительных вычислительных систем',
            num: 0
        },
        value_3: {
            code_name: '09.04.01_1',
            name: 'Высокопроизводительные вычислительные системы и квантовая обработка информации',
            num: 0
        },
        value_4: {
            code_name: '09.04.01_2',
            name: 'Интеллектуальные системы',
            num: 0
        },
        value_5: {
            code_name: '09.04.01_3',
            name: 'Информационное и программное обеспечение автоматизированных систем',
            num: 0
        },
        value_6: {
            code_name: '09.04.01_4',
            name: 'Разработка информационных систем и web-приложений',
            num: 0
        },
        value_7: {
            code_name: '09.04.01_5',
            name: 'Системная интеграция и управление бизнес-процессами',
            num: 0
        },
        value_8: {
            code_name: '09.04.01_6',
            name: 'IT-management',
            num: 0
        },
        value_9: {
            code_name: '09.04.03_1',
            name: 'Машинное обучение и технологии больших данных',
            num: 0
        },
        value_10: {
            code_name: '09.04.03_2',
            name: 'Эгродизайн пользовательского интерфейса',
            num: 0
        },
        value_11: {
            code_name: '09.04.04_1',
            name: 'Методы и средства разработки программного обеспечения',
            num: 0
        },
        value_12: {
            code_name: '27.04.03_1',
            name: 'Управление киберфизическими системами',
            num: 0
        },
        value_13: {
            code_name: '09.04.01_5',
            name: 'Психотехнологии интеллектуально-личностного развития человека',
            num: 0
        },

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
                item[event.target.name].num = parseInt(event.target.value, 10)
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
                            <TextField name='content' onClick={(event) => event.stopPropagation()} onFocus={(event) => event.stopPropagation()} onChange={(e) => ChangeDataAnswerinQuestion(e, i)} value={i.content}></TextField>
                                {/* <Button variant="contained" color="secondary" onClick={() => {
                                    let newa = form.answers
                                    newa.splice(newa.indexOf(i), 1)
                                    setform({...form, answers: newa})
                                }}>Удалить</Button> */}
                            </AccordionSummary>
                            <AccordionDetails>
                                <div>
                                <TextField name='value_1' onChange={(e) => ChangeDataAnswerinQuestion(e, i)} label={i.value_1.code_name} defaultValue={i.value_1.num}></TextField>
                                <TextField name='value_2' onChange={(e) => ChangeDataAnswerinQuestion(e, i)} label={i.value_2.code_name} defaultValue={i.value_2.num}></TextField>
                                <TextField name='value_3' onChange={(e) => ChangeDataAnswerinQuestion(e, i)} label={i.value_3.code_name} defaultValue={i.value_3.num}></TextField>
                                <TextField name='value_4' onChange={(e) => ChangeDataAnswerinQuestion(e, i)} label={i.value_4.code_name} defaultValue={i.value_4.num}></TextField>
                                <TextField name='value_5' onChange={(e) => ChangeDataAnswerinQuestion(e, i)} label={i.value_5.code_name} defaultValue={i.value_5.num}></TextField>
                                <TextField name='value_6' onChange={(e) => ChangeDataAnswerinQuestion(e, i)} label={i.value_6.code_name} defaultValue={i.value_6.num}></TextField>
                                <TextField name='value_7' onChange={(e) => ChangeDataAnswerinQuestion(e, i)} label={i.value_7.code_name} defaultValue={i.value_7.num}></TextField>
                                <TextField name='value_8' onChange={(e) => ChangeDataAnswerinQuestion(e, i)} label={i.value_8.code_name} defaultValue={i.value_8.num}></TextField>
                                <TextField name='value_9' onChange={(e) => ChangeDataAnswerinQuestion(e, i)} label={i.value_9.code_name} defaultValue={i.value_9.num}></TextField>
                                <TextField name='value_10' onChange={(e) => ChangeDataAnswerinQuestion(e, i)} label={i.value_10.code_name} defaultValue={i.value_10.num}></TextField>
                                <TextField name='value_11' onChange={(e) => ChangeDataAnswerinQuestion(e, i)} label={i.value_11.code_name} defaultValue={i.value_11.num}></TextField>
                                <TextField name='value_12' onChange={(e) => ChangeDataAnswerinQuestion(e, i)} label={i.value_12.code_name} defaultValue={i.value_12.num}></TextField>
                                <TextField name='value_13' onChange={(e) => ChangeDataAnswerinQuestion(e, i)} label={i.value_13.code_name} defaultValue={i.value_13.num}></TextField>
                                </div>
                            
                            
                            </AccordionDetails>
                        </Accordion>
                    ))
                }


            </div>
        </div>
    )
}