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




export const Profile = () =>{

    const [profileData, setprofileData] = useState({
        name: '',
        group: '',
        kafedra: '',
        directions: []
    })
    const {userId} = useContext(AuthContext)

    const getDirections = useCallback(async (direct) => {
        try {
            axios.get('/api/directions/all',{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        .then((res) => {
            let directions = direct.directions
            console.log(directions)
            for (let index = 0; index < res.data.length; index++) {
                for (let i = 0; i < directions.length; i++) {
                    if (directions[i].name === res.data[index].code) {
                        directions[i].title = res.data[index].name
                    }   
                }
            }
            setprofileData({
                name: direct.name,
                group: direct.group,
                kafedra: direct.kafedr,
                directions: directions,
            })
            console.log(directions)
        })
            
        } catch (error) {
            console.log(error)
            
        }
    })

    const getProfile = useCallback(async () => {
        try {
            
            await axios.get('/api/profile', {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {userId}
            })
            .then((response) => {
                setprofileData({
                    name: response.data.name,
                    group: response.data.group,
                    kafedra: response.data.kafedr,
                    directions: response.data.directions
                })

                return response.data
            })
            .then((lol) => getDirections(lol))
        
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
                                <p>Текущая кафедра: <strong>{profileData.kafedra}</strong></p>
                                {/* <p>Кол-во раз прохождения теста: <strong>0</strong></p> */}
                                {profileData.directions.length !== 0 ? <p>Исход: <em><b>На основе результатов тестирования мы рекомендуем вам три направления, выделенные в списке подчёркиванием. С более подробной информацией о направлениях вы можете ознакомиться во вкладке "Направления".</b></em></p>:
                                <p>Исход: Пожалуйста, пройдите тестирование, чтобы мы смогли рекомендовать вам направления.</p>}
                            </div>
                        </div>
                        <div className="profile__right">
                            <div className="profile__directions">
                                <p className="profile__directions-title">Список направлений:</p>
                                {
                                    profileData.directions.length !== 0 ?
                                    profileData.directions.map((i) => (
                                        <li className= {profileData.directions.indexOf(i) < 3 ? "profile__un":null}>{i.name}</li>
                                    ))
                                    :
                                    <p>
                                        Пожалуйста, пройдите тестирование, чтобы мы смогли порекомендовать вам направления.
                                    </p>
                                }
                                {/* <li>09.04.01 - Информатика и вычислительная техника</li>
                                <li>09.04.04 - Программная инженерия</li>
                                <li>01.04.02 - Прикладная математика и информатика	</li>
                                <li>09.04.03 - Прикладная информатика	</li>
                                <li>27.04.03 - Системный анализ и управление</li>
                                <li>37.04.01 - Психология</li> */}
                            </div>
                            <Link to="/directions"><Button className="profile__more-button">Узнать о направлениях подробнее</Button></Link>
                        </div>
                    </div>

                    <div className= "profile__chart">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart height={400} data={profileData.directions}>
                            <Tooltip content="name"/>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Bar dataKey="num" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                    </div>

                    </div>
                </div>
                <Footer />
            </div>
        )
    }