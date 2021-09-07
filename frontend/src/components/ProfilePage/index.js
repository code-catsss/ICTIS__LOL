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
      name: 'Page A',
      uv: 10,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 10,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 10,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 10,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 10,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 10,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 10,
      pv: 4300,
      amt: 2100,
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
                                <p className="profile__name">{profileData.name}</p>
                            </div>
                            <div className="profile__common">
                                <p>Группа: {profileData.group}</p>
                                <p>Кафедра {profileData.kafedra}</p>
                                <p>Кол-во раз прохождения теста: 0</p>
                                <p>Результаты прошлого тестирования: Отсутствуют</p>
                                <p>Исход: Тест не пройден</p>
                            </div>
                        </div>
                        <div className="profile__right">
                            <div className="profile__directions">
                                <h1>Информация о направлениях отсутствует: тест не пройден</h1>
                            </div>
                            <Button className="profile__more-button">Узнать о направлениях подробнее</Button>
                        </div>
                    </div>

                    <p className="profile__best">Рекомендуемая кафедра для поступления - ВТ</p>

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