import React, { useCallback, useEffect, useState } from 'react';
import './style.css'

import {MainCarousel, CardSlide, CardHeader} from './style'
import { Button, Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SFEDU_ICTIS from './SFEDU_ICTIS.png'
import axios from 'axios';
export const  MainScreen = () =>{
    const [news, setNews] = useState([])
      const images =  [
            {
                src: 'https://s0.rbk.ru/v6_top_pics/media/img/0/36/755843385793360.jpeg'
            },
            {
                src: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/SFedU.jpg'
            },
            {
                src: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/SFedU.jpg'
            },
            {
                src: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/SFedU.jpg'
            },
           
        ]
    

    const getNews = useCallback(async () =>{
        try {
            await axios.get('/api/news/all', {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => {
                setNews(response.data)
                console.log(response.data)
            })
            
        } catch (error) {
            console.log(error)
        }
    })

    useEffect(()=>{
        getNews()
        
    }, [setNews])


        return(
            <div className = 'mainWrap'>
                <div className='mains_head'>
                    <img src={SFEDU_ICTIS} alt="" height="60%"/>
                    <div className="but_main_cont">
                        <Link to = "/home" className="but_head">Портал</Link>
                        <Link to = "/profile" className="but_head">Личный кабинет</Link>
                        <Link to = "/profile" className="but_head">RUS/ENG</Link>
                    </div>
                </div>
                <div className="content">
                    <div className="left_side_cont">
                        <Typography variant="h1" >
                        <p align = "center">Никогда не поздно стать тем человеком, быть которым вы всегда мечтали...</p>
                        </Typography>
                        <Typography variant="button" ><Link to="/test"><button>Начать тестирование</button></Link></Typography>
                        

                    </div>
                    <div className="slider">
                        <MainCarousel>
                            {
                                news.map((i) => (
                                    <CardSlide src={i.img}>
                                        <CardHeader>
                                            <Typography className="slideSS"  variant="caption" color="white">
                                                <h1>{i.header}</h1>
                                            </Typography>
                                            <Button variant="contained" color="primary">Подробнее</Button>
                                        </CardHeader>
                                    </CardSlide>
                                ))
                            }
                        </MainCarousel>
                    </div>
                </div>


                <div className= 'mains_footer'>
                <Typography variant="h2" >
                    <p>Центр тестирования
                        Конфиденциальность</p>
                        </Typography>
                        <Typography variant="h2" >
                    <p>Текст от балды
                        Второй текст от балды.</p>
                        </Typography>
                        <Typography variant="h2" >
                    <p>Во дворе трава
                       На траве дрова</p>
                    </Typography>
                    <Typography variant="h2" >
                    <h1>8(800)-555-35-35</h1>
                </Typography>
                </div>

            </div>
        )
    }
