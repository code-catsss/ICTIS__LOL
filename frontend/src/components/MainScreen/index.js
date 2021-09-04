import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import SFEDU_ICTIS from './SFEDU_ICTIS.png'



import axios from 'axios';
export const  MainScreen = () =>{
    const [news, setNews] = useState([])
    

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
            <div className = 'landing'>
                <div className='landing__header'>
                    <img className='landing__logo' src={SFEDU_ICTIS} alt=""/>
                    <div className="landing__menu">
                        <Link to = "/home" className="landing__link">Портал</Link>
                        <Link to = "/profile" className="landing__link">Личный кабинет</Link>
                        <Link to = "/profile" className="landing__link">RUS/ENG</Link>
                    </div>
                </div>
                <div className="landing__content">
                    <div className="landing__test">
                        <p>Никогда не поздно стать тем человеком, быть которым вы всегда мечтали...</p>
                        <Link to="/test"><button className="landing__link">Начать тестирование</button></Link>
                    </div>
                    <div className="landing__news">
                        {/* <MainCarousel>
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
                        </MainCarousel> */}
                    </div>
                </div>


                <div className= 'landing__footer'>
                    <p>Центр тестирования
                        Конфиденциальность</p>
                    <p>Текст от балды
                        Второй текст от балды.</p>
                    <p>Во дворе трава
                       На траве дрова</p>
                    <h1>8(800)-555-35-35</h1>
                </div>

            </div>
        )
    }
