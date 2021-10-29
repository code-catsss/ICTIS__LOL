import { Button, TextField, Tooltip , Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Accordion, AccordionDetails, AccordionSummary} from "@material-ui/core";
import { TestAX } from "./Create";
import axios from "axios";
import React,{ useCallback, useEffect, useState } from "react";
import Xarrow from 'react-xarrows'
import {Rnd} from 'react-rnd'
import disableScroll from 'disable-scroll';
import './style.css'
import { TestAXR } from "./Refactor";

export const TestAXM = () => {
    const [quest, setquest] = useState([])
    const [arrow, setarrow] = useState([])
    const [sizeW, setsizeW] = useState({
        width: 600,
        height:200
    })
    const [openCreate, setOpenCreate] = useState(false)
    const [openRefactor, setOpenRefactor] = useState(false)
    const [openBound, setopenBound] = useState(false)
    const [BoundTime, setBoundTime] = useState(false)
    const [deleteAnswer, setdeleteAnswer] = useState(false)
    const [selectItem, setselectItem] = useState([])
    const [selectAnswer, setselectAnswer] = useState('')
    const [selectAnswerD, setselectAnswerD] = useState('')
    const [brunches, setbrunches] = useState([])
    const [updateSelect, setupdate] = useState('')
    const [onScrollia, setonScrollia] = useState(false)

    const [currentRefactor, setcurrentRefactor] = useState()

    const selectAnswerH = (e) => setselectAnswer(e.target.value)
    const selectAnswerDD = (e) => {
        setselectAnswerD(e.target.value)
        console.log(selectAnswerD)}
    function checkForAnswers(q){
        return q.answers.every((e) => e.next_question_id === '0')
    }
    function checkForAnswers_l(q){
        const flag = q.answers.some( e => e['next_question_id'] === '0' )
        console.log(flag)
        return  flag
    }


    function SelectionPush(element){
        if(BoundTime){
            if(selectItem.includes(element)){
                let upArr = selectItem
                upArr.pop(element)
                setselectItem(upArr)
                element.isSelecta = false
                setupdate(element.isSelecta)

            }else{
                let upArr = selectItem
                upArr.push(element)
                setselectItem(upArr)
                element.isSelecta = true
                setupdate(element.isSelecta)
            }
        if(selectItem.length >= 2)
            setopenBound(true)
        }

    }
    
    const CheckScroll = () =>{
        if (onScrollia) {
            disableScroll.on()
        }else{
            disableScroll.off()
        }
    }

    const OnWheelScroll = (event) =>{
        disableScroll.off()
        setsizeW({...sizeW, width : sizeW.width + (-event.deltaY)/10, height: sizeW.height +  (-event.deltaY)/10})
            const anime = document.getElementById('ContRnd').getBoundingClientRect()
            if(sizeW.height > anime.height)
                setsizeW({...sizeW, height:anime.height})
            if(sizeW.height < 250)
                setsizeW({...sizeW, height: 250})

        console.log(sizeW.height)
        
    }


    const AddBound= async () =>{
        try {
            await axios.post('/api/test/add_bound', {questions: selectItem, selectAnswer}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } catch (error) {
            
        }
    }

    const DeleteBound= async () =>{
        try {
            await axios.post('/api/test/delete_bound', {questions: selectItem, selectAnswer:selectAnswerD}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } catch (error) {
            
        }
    }

    async function DeleteQuestion(id){
        try {
            await axios.post('/api/test/delete', {id}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(GetQuestions())
        } catch (error) {
            
        }
    }

    const DeleteAll = async () => {
        try {
            await axios.post('/api/test/delete_all', {}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(GetQuestions())
        } catch (error) {
            
        }
    }



    const GetQuestions = useCallback(async ()=>{
        await axios.get('/api/test/get_all', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            setquest(response.data.newQArr)
            setbrunches(response.data.brunches)
            console.log(response.data)
            setupdate(false)

        })
    }) 

    
    useEffect(()=>{
    GetQuestions()
    
    }, [setquest])

    return(
        <div className="mainWRap" onWheel={CheckScroll}>
            <div>
            <Button variant="contained" color="primary" onClick={()=> setOpenCreate(true)}>Добавить вопрос</Button>
            {BoundTime ? <Button onClick ={() => setBoundTime(!BoundTime)} variant="contained" color="default">Выключить режим</Button> :<Button onClick ={() => setBoundTime(!BoundTime)}  variant="contained" color="primary">Изменить связи</Button>}
            <Button variant="contained" color="secondary" onClick={DeleteAll}>Удалить все вопросы</Button>
            </div>
            
            <div id= "ContRnd" onPointerEnter={() => setonScrollia(true)} onPointerLeave={() => setonScrollia(false)} onWheel={OnWheelScroll} className="tree_cont">
            <Rnd  className="tree_cont_rnd" size={{width: sizeW.width, height: sizeW.height}} minHeight="250px">
            <div className='teg_cont'>
            {
                quest.map((i)=>(
                    <div className='teg_cont_in'>
                        {i.map((ix) =>(
                            <Tooltip arrow interactive title={
                            <div className="toolTipA">
                                <h1>Вопрос: {ix.content}</h1>
                                <h2>Ответы:</h2>
                                    {
                                        ix.answers.map((ixa) => (
                                            <Tooltip arrow title={
                                                <div>
                                                    <h4>{ixa.value_1.code_name}: {ixa.value_1.num}</h4>
                                                    <h4>{ixa.value_2.code_name}: {ixa.value_2.num}</h4>
                                                    <h4>{ixa.value_3.code_name}: {ixa.value_3.num}</h4>
                                                    <h4>{ixa.value_4.code_name}: {ixa.value_4.num}</h4>
                                                    <h4>{ixa.value_5.code_name}: {ixa.value_5.num}</h4>
                                                    <h4>{ixa.value_6.code_name}: {ixa.value_6.num}</h4>
                                                    <h4>{ixa.value_7.code_name}: {ixa.value_7.num}</h4>
                                                    <h4>{ixa.value_8.code_name}: {ixa.value_8.num}</h4>
                                                    <h4>{ixa.value_9.code_name}: {ixa.value_9.num}</h4>
                                                    <h4>{ixa.value_10.code_name}: {ixa.value_10.num}</h4>
                                                    <h4>{ixa.value_11.code_name}: {ixa.value_11.num}</h4>
                                                    <h4>{ixa.value_12.code_name}: {ixa.value_12.num}</h4>
                                                    <h4>{ixa.value_13.code_name}: {ixa.value_13.num}</h4>
                                                    
                                                </div>
                                            } placement="right">
                                                <h3>{ixa.next_question_id != 0 ? "✅": "🅾"}{ixa.content}</h3>
                                            </Tooltip>
                                        ))
                                    }
                                <div className="modal_but_conteiner">
                                    <Button variant="contained" onClick={() => {
                                        setOpenRefactor(true)
                                        setcurrentRefactor(ix)
                                        }}>Редактировать</Button>
                                    <Button variant="contained" color="secondary" onClick={() => DeleteQuestion(ix)}>Удалить</Button>
                                </div>
                                
                            </div>}>
                                <h1 onClick={() => SelectionPush(ix)} className={ix.isSelecta === true ? "teg_quest_select": checkForAnswers(ix) ? "teg_quest_no_nextx" : checkForAnswers_l(ix) ? "teg_quest_has_no_next" :'teg_quest'} id={ix._id}>{ix.lvl}</h1>
                            </Tooltip>
                            ))}
                    </div>
                ))
            }
            </div>
            {
                 quest.map((i)=> (
                    <> 
                    {
                     i.map((ix) => (
                         <>{
                         ix.answers.map((ixa)=> (
                             <div>   
                            <Xarrow
                                animateDrawing={0.5}
                                start={ix._id}
                                end={ixa.next_question_id}
                                label={ixa.next_question_id !== '0' ? <p className="arrow_label">{ixa.content}</p>: null}
                          />
                          </div>
                         ))
                         
                     }
                     </>))
                 }
                 </>
                 ))
            }
            </Rnd>
            </div>



            <div className="brunches">
                <h1>Ветки:</h1>
                <h2>  Кол-во: {brunches.length}</h2>
                <h2>  Проблем при подсчёте: 0</h2>
                <h2>Подробнее:</h2>
                {
                    brunches.map((i) => (
                        <Accordion square>
                            <AccordionSummary className="acc_brunch_head">
                                <h3>Ветка №{brunches.indexOf(i) + 1}/</h3>
                                <h3>Кол-во вопросов: {i.length}</h3>
                            </AccordionSummary>
                            <AccordionDetails  className="brunch">
                            {
                                i.map((ix) => (
                                    <p>{ix.content}({ix.answers.filter(e => e.next_question_id != 'no').map((i) => (<>{i.content}</>))})➡ </p>
                                ))
                            }
                            </AccordionDetails>
                        </Accordion>
                    ))
                }
            </div>  




            <Dialog  fullWidth="true" open={openCreate}>
                <DialogTitle id="alert-dialog-title">{"Создание нового вопроса"}</DialogTitle>
                <DialogContent><TestAX></TestAX></DialogContent>
                <DialogActions>
                    <Button onClick={()=> {
                        setOpenCreate(false)
                        GetQuestions()
                        
                    }} color="primary" variant="contained">
                        Готово
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog  fullWidth="true" open={openRefactor}>
                <DialogTitle id="alert-dialog-title">{"Редактирование вопроса"}</DialogTitle>
                <DialogContent><TestAXR refactorData={currentRefactor}></TestAXR></DialogContent>
                <DialogActions>
                    <Button onClick={()=> {
                        setOpenRefactor(false)
                        GetQuestions()
                        
                    }} color="primary" variant="contained">
                        Готово
                    </Button>
                </DialogActions>
            </Dialog>
           

            <Dialog  fullWidth="true" open={openBound}>
                <DialogTitle id="alert-dialog-title">{"Привязка/Удаление ответа"}</DialogTitle>
                <DialogContent>
                    <h3>Привязать доступный:</h3>
                    {selectItem.length !== 0 ? 
                        selectItem[0].answers.filter((i) => i.next_question_id === '0').length === 0 ? <p>Все связи заняты</p> :
                        <TextField onChange={selectAnswerH} select label="Ответ">
                        {selectItem.length !== 0 ?
                            selectItem[0].answers.filter((i) => i.next_question_id === '0').map((i) => (
                                <MenuItem key={i._id} value={i._id}>
                                    {i.content}
                                </MenuItem>
                            )):null
                        }
                    </TextField> :null
                    } 

                    
                    <h3>Удалить привязанный:</h3>
                    <TextField onChange={(event) => {
                        selectAnswerDD(event)
                        setdeleteAnswer(true)
                    }} select label="Ответ">
                        {selectItem.length !== 0 ?
                            selectItem[0].answers.filter((i) => i.next_question_id !== '0').map((i) => (
                                <MenuItem key={i._id} value={i._id}>
                                    {i.content}
                                </MenuItem>
                            )):null
                        }
                    </TextField>



                    <DialogActions>
                    <Button onClick={()=> {
                        AddBound()
                        setopenBound(false)
                        GetQuestions()
                        setselectItem(selectItem.filter((item, i) => i !== i));
                    }} color="primary" variant="contained">
                        Готово
                    </Button>

                    {deleteAnswer ? <Button onClick={()=> {
                        DeleteBound()
                        setopenBound(false)
                        GetQuestions()
                        setselectItem(selectItem.filter((item, i) => i !== i));
                    }} color="secondary" variant="contained">
                        Удалить
                    </Button>: null}
                    
                </DialogActions>
                </DialogContent>
            </Dialog>

        </div>
    )
}