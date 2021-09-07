import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import SFEDU_ICTIS from './SFEDU_ICTIS.png'



import axios from 'axios';
export const  MainScreen = () =>{
    const [news, setNews] = useState([])
    const annotation = {
        first: {
            background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://ucare.timepad.ru/30f2c562-a1ef-4b92-9e7c-2bfe614a68a1/-/preview/")',
            backgroundSize: 'cover'
        },
        second: {
            background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://blog.pearsoninternationalschools.com/wp-content/uploads/2020/01/AL1318051_Original_1800x900-1132x670.jpg")',
            backgroundSize: 'cover'
        },
        third: {
            background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://designerfirst.com/wp-content/uploads/2021/01/freelance-web-developer.jpg")',
            backgroundSize: '100%'
        },
    }

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    

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
                    <Carousel responsive={responsive}
                        draggable
                        additionalTransfrom={0}
                        infinite
                        autoPlay
                        autoPlaySpeed={3000}
                    >
                        <div className="landing__news-slide" style={annotation.first}>
                            <div  className="landing__news-annotation">
                                <h1>Изучи все доступные варианты</h1>
                                <p>Во вкладке "Направления" собрана вся свежая информация о направлениях магистратуры</p>
                            </div>
                        </div>
                        <div className="landing__news-slide" style={annotation.second}>
                            <div  className="landing__news-annotation">
                                <h1>Выбери своё будущее</h1>
                                <p>Мы дадим тебе точную рекомендацию по направлениям магистратуры</p>
                            </div>
                        </div>
                        <div className="landing__news-slide" style={annotation.third}>
                            <div  className="landing__news-annotation">
                                <h1>Будь в курсе последних новостей</h1>
                                <p>Самые свежие новости о проекте доступны во вкладке "Главная"</p>
                            </div>
                        </div>
                        
                            {/* {
                                news.map((i) => (
                                    <div>
                                        <img src={i.img} alt="" />
                                        <div>
                                                <h1>{i.header}</h1>
                                            <button variant="contained" color="primary">Подробнее</button>
                                        </div>
                                    </div>
                                ))
                            } */}
                    </Carousel>
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
