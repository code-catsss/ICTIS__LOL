import { Button, FormControl, FormLabel, RadioGroup,Radio, FormControlLabel } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { Header } from "../Header"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import axios from "axios";
import { Link } from "react-router-dom";



export const Test = () =>{

    const [currentquest,setCurrentquest ] = useState({
        content: '',
        answers: []
    })
    const [period, setPeriod] = useState('start')
    const [nextid, setNextid] = useState()
    const [calcans, setcalcans] = useState()
    const [userParams, setUserParams] = useState([
        { 
            name: "01.04.02",
            value: 0.5
    
        },
        { 
            name: '09.04.01',
            value: 0.5
        },
        { 
            name: '09.04.03',
            value: 0.5
        },
        { 
            name: '09.04.04',
            value: 0.5
        },
        {
            name: '27.04.03',
            value: 0.5
    
        },
    ])

    const ColculateParams = () =>{
        const q = currentquest.answers.find(e => e._id === calcans)
        
        let newarr = []
        newarr.push(q.mag01_04_02)
        newarr.push(q.mag09_04_01)
        newarr.push(q.mag09_04_03)
        newarr.push(q.mag09_04_04)
        newarr.push(q.mag27_04_03)
        let newParams = JSON.parse(JSON.stringify(userParams))
        for (let index = 0; index < userParams.length; index++) {
            newParams[index].value = newParams[index].value + newarr[index].value
            
        }
        console.log(newParams)
        setUserParams(newParams)
    }

    const SwitchPeriod = () => {
        switch (period) {
            case 'start':
                GetStartQuest()
                setPeriod('test')
                break;
            case 'test':
                if (nextid === '0') {
                    setPeriod('end')
                    
                }
                else{
                    GetNextQuest()
                    break;
                }
                    
            default:
                break;
        }
    }

    const GetNextQuest = useCallback(async ()=>{
        await axios.get('/api/test/next_question', {
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                id: nextid
            }
        }).then(res => setCurrentquest(res.data))
    }) 

    const GetStartQuest = useCallback(async ()=>{
        await axios.get('/api/test/start_test', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res.data)
            setCurrentquest(res.data)
        })
    }) 


    

    switch (period) {
        case 'start':
            return(
                <div className="test">
                    <Header></Header>
                    <div className="mainWrapperStart">
                    <div className="startBlock">
                        <p>Данное тестирование даст вам рекомендацию к определению подходящего вам направления магистратуры. Но выбор в любом случае всегда за вами.</p>
                        <Button onClick={SwitchPeriod}>Начать</Button>
                    </div>
                    </div>
                </div>
            )
        case 'test':
            return(
                <div>
                    <Header></Header>
                    <div className="test">
                        <div className="test__contnet">
                        <div className="test__interact">
                            <h1>Вопрос №{currentquest.lvl + 1}</h1>
                            <h3>{currentquest.content}</h3>
                            <FormControl component="fieldset">
                            <FormLabel component="legend">Выберите ответ:</FormLabel>
                                <RadioGroup onChange={(event)=>{
                                    setcalcans(event.target.value)
                                    const astana = currentquest.answers.find(e => e._id === event.target.value)
                                    setNextid(astana.next_question_id)
                                }}>
                                    {
                                        currentquest.answers.map((i)=>(
                                            <FormControlLabel key={i._id} value={i._id} control={<Radio />} label={i.content} />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                            <Button onClick={() =>{
                                 ColculateParams()
                                SwitchPeriod()
                            }}>Далее</Button>
                        </div>
                        <ResponsiveContainer className="test__chart" width={400} height={400}>
                            <RadarChart  cx={200} cy={200} outerRadius={150} data={userParams}>
                                <PolarGrid />
                                
                                <PolarRadiusAxis />
                                <Radar name="Chel" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                            </RadarChart>
                        </ResponsiveContainer>

                        </div>
                    </div>
                    
                    </div>
            )
        case 'end':
                return(
                    <div>
                    <Header></Header>
                    <div className="mainWrapperStart">
                    <div className="startBlock">
                        <p>Благодарим вас за прохождение данного тестирования. Результаты представленны ниже:

                            Так же результаты будут доступны во вкладке "Профиль"
                        </p>
                        <Link to="/profile"><Button>Завершить</Button></Link>
                    </div>
                    </div>
                </div>
                )
        default:
            break;
    }
    
}