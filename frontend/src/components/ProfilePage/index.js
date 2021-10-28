import axios from 'axios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import {Header} from '../Header/index'
import {Button} from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Link } from 'react-router-dom'


import { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Footer } from '../Footer'


const data = [
    {
      name: '01.04.02',
      uv: 70,
      pv: 2400,
      amt: 2400,
    },
    {
      name: '09.04.01',
      uv: 150,
      pv: 1398,
      amt: 2210,
    },
    {
      name: '27.04.03',
      uv: 50,
      pv: 9800,
      amt: 2290,
    },
    {
      name: '09.04.04',
      uv: 80,
      pv: 3908,
      amt: 2000,
    },
    {
      name: '09.04.03 ',
      uv: 55,
      pv: 4800,
      amt: 2181,
    },
    {
      name: '37.04.01',
      uv: 10,
      pv: 3800,
      amt: 2500,
    },
  ];

export const Profile = () =>{
    const [profileData, setprofileData] = useState({
        name: '',
        group: '',
        kafedra: ''
    })
    const {userId} = useContext(AuthContext)

    const getProfile = useCallback(async () => {
        try {
            
            await axios.get('/api/profile', {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {userId}
            })
            .then((response) => setprofileData({
                name: response.data.name,
                group: response.data.group,
                kafedra: response.data.kafedr,
            }))
        } catch (error) {
            console.log(error)
        }
    }, [userId])
    useEffect(() => {
        getProfile()
    }, [setprofileData])
        return(
            <div>
                <Header/>
                <div className="profile">
                    <div className="container">

                    <div className="outline outline_dark"></div>
                    <div className="inline inline_dark"></div>

                    <div className= "profile__main">
                        <div className="profile__info">
                            <div className="profile__header">
                                <div className="profile__avatar">
                                    {/* <img src="////" alt="//////" /> */}
                                </div>
                                <p className="profile__name"><b>{profileData.name}</b></p>
                            </div>
                            <div className="profile__common">
                                <p>Группа: <strong>{profileData.group}</strong></p>
                                {/* <p>Текущая кафедра: {profileData.kafedra}</p> */}
                                <p>Текущая кафедра: <strong>"Информатика и вычислительная техника"</strong></p>
                                <p>Кол-во раз прохождения теста: <strong>1</strong></p>
                                <p>Результаты прошлого тестирования: <strong>Отсутствуют</strong></p>
                                <p>Исход: <em><b>На основе результатов тестирования мы рекомендуем вам три направления, выделенные в списке подчёркиванием. С более подробной информацией о направлениях вы можете ознакомиться во вкладке "Направления".</b></em></p>
                            </div>
                        </div>
                        <div className="profile__right">
                            <div className="profile__directions">
                                <p className="profile__directions-title">Список направлений:</p>
                                <li>09.04.01 - Информатика и вычислительная техника</li>
                                <li>09.04.04 - Программная инженерия</li>
                                <li>01.04.02 - Прикладная математика и информатика	</li>
                                <li>09.04.03 - Прикладная информатика	</li>
                                <li>27.04.03 - Системный анализ и управление</li>
                                <li>37.04.01 - Психология</li>
                            </div>
                            <Button className="profile__more-button">Узнать о направлениях подробнее</Button>
                        </div>
                    </div>

                    <p className="profile__best">Рекомендуемая кафедра для поступления: <b>"Информатика и вычислительная техника"</b></p>

                    <div className= "profile__chart">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart height={400} data={data}>
                            <Tooltip content={<>ПИВО</>}/>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Bar dataKey="uv" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                    </div>

                    </div>
                </div>
                <Footer />
            </div>
        )
    }