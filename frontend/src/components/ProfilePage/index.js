import axios from 'axios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import {Header} from '../Header/index'
import {Button} from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Link } from 'react-router-dom'

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
                            <div className="profile__directions"></div>
                            <button className="profile__more-button">Узнать о направлениях подробнее</button>
                        </div>
                    </div>

                    <p className="profile__best">Рекомендуемая кафедра для поступления - ВТ</p>

                    <div className= "profile__chart">

                    </div>

                    </div>
                </div>
            </div>
        )
    }