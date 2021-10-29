import { Button, FormControl, FormLabel, RadioGroup,Radio, FormControlLabel } from "@material-ui/core";
import { useCallback, useContext, useState } from "react";
import { Header } from "../Header"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext'
import { Footer } from "../Footer";


export const Test = () =>{
    const {userId} = useContext(AuthContext)

    const [currentquest,setCurrentquest ] = useState({
        content: '',
        answers: []
    })
    const [period, setPeriod] = useState('start')
    const [nextid, setNextid] = useState()
    const [calcans, setcalcans] = useState()
    const [userParams, setUserParams] = useState([
        {
            code_name: '01.04.02_1',
            name: 'Математическое моделирование в инженерных науках',
            num: 0
        },
        {
            code_name: '01.04.02_2',
            name: 'Прикладная математика для высокопроизводительных вычислительных систем',
            num: 0
        },
        {
            code_name: '09.04.01_1',
            name: 'Высокопроизводительные вычислительные системы и квантовая обработка информации',
            num: 0
        },
        {
            code_name: '09.04.01_2',
            name: 'Интеллектуальные системы',
            num: 0
        },
        {
            code_name: '09.04.01_3',
            name: 'Информационное и программное обеспечение автоматизированных систем',
            num: 0
        },
        {
            code_name: '09.04.01_4',
            name: 'Разработка информационных систем и web-приложений',
            num: 0
        },
        {
            code_name: '09.04.01_5',
            name: 'Системная интеграция и управление бизнес-процессами',
            num: 0
        },
        {
            code_name: '09.04.01_6',
            name: 'IT-management',
            num: 0
        },
        {
            code_name: '09.04.03_1',
            name: 'Машинное обучение и технологии больших данных',
            num: 0
        },
        {
            code_name: '09.04.03_2',
            name: 'Эгродизайн пользовательского интерфейса',
            num: 0
        },
        {
            code_name: '09.04.04_1',
            name: 'Методы и средства разработки программного обеспечения',
            num: 0
        },
        {
            code_name: '27.04.03_1',
            name: 'Управление киберфизическими системами',
            num: 0
        },
        {
            code_name: '09.04.01_5',
            name: 'Психотехнологии интеллектуально-личностного развития человека',
            num: 0
        },
    ])

    const ColculateParams = () =>{
        const q = currentquest.answers.find(e => e._id === calcans)
        
        let newarr = []
        newarr.push(q.value_1)
        newarr.push(q.value_2)
        newarr.push(q.value_3)
        newarr.push(q.value_4)
        newarr.push(q.value_5)
        newarr.push(q.value_6)
        newarr.push(q.value_7)
        newarr.push(q.value_8)
        newarr.push(q.value_9)
        newarr.push(q.value_10)
        newarr.push(q.value_11)
        newarr.push(q.value_12)
        newarr.push(q.value_13)

        let newParams = JSON.parse(JSON.stringify(userParams))
        for (let index = 0; index < userParams.length; index++) {
            newParams[index].num = newParams[index].num + newarr[index].num
            
        }
        console.log(newParams)
        setUserParams(newParams)
    }

    const updateUser = async () => {
        try {
            await axios.post('/api/test/finish_test', {userId, userParams}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log(response)
            }
            )
        } catch (error) {
            console.log(error)
        }
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
                <div>
                    <Header></Header>
                    <div className="test">
                    <div className="test__block">
                        <p>Данное тестирование даст вам рекомендацию к определению подходящего вам направления магистратуры. Но выбор в любом случае всегда за вами.</p>
                        <Button onClick={SwitchPeriod}>Начать</Button>
                    </div>
                    </div>
                    <Footer></Footer>
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
                        <ResponsiveContainer className="test__chart" width={350} height={350}>
                            <RadarChart  cx={200} cy={200} outerRadius={150} data={userParams}>
                                <PolarGrid />
                                
                                <PolarRadiusAxis />
                                <Radar name="Chel" dataKey="num" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                            </RadarChart>
                        </ResponsiveContainer>

                        </div>
                    </div>
                    <Footer></Footer>
                    </div>
            )
        case 'end':
                return(
                    <div>
                    <Header></Header>
                    <div className="test">
                    <div  className="test__block">
                        <p>Благодарим вас за прохождение данного тестирования. Результаты будут доступны во вкладке "Профиль".
                        </p>
                        <Link to="/profile"><Button onClick={updateUser}>Завершить</Button></Link>
                    </div>
                    </div>
                    <Footer></Footer>
                </div>
                )
        default:
            break;
    }
    
}