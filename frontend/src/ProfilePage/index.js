import axios from 'axios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import {Header} from '../Header/index'
import {Button} from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import './style.css'
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
                <div className="mainProfilec">
                    <div className= "profileData">
                        <h1>Профиль</h1>
                        <img src="data:image/png;base64,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" alt="" width="90%"/>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<CloudUploadIcon />}
                            
                        >
                            Сменить
                        </Button>
                        <p>ФИО: {profileData.name}</p>
                        <p>Группа: {profileData.group}</p>
                        <p>Кафедра {profileData.kafedra}</p>
                        <p>Кол-во раз прохождения теста: 0</p>
                    </div>

                    <div className= "profileDataRes">
                        <h1>Результаты прошлого тестирования:</h1>
                        <p>Отсутствуют</p>
                        <h1>Исход:</h1>
                        <p>Тест не пройден</p>
                        <Link to="/test"><Button>Пройти тестирование</Button></Link>
                    </div>
                </div>
            </div>
        )
    }