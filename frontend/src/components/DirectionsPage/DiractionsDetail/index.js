import {Header} from '../../Header'
import { Footer } from '../../Footer'
import './style.scss'
import React, {useEffect, useState} from "react";
import arrow from './arrow.png'
import axios from 'axios'
import {Link} from "react-router-dom";



const GetDirection = async (setDirection) => {
    try {
        const DirectionId= window.location.href.split('/')[4]
        // получение всех пользователей
        await axios.get('/api/directions/detail',{
            headers:{'Content-Type': 'application/json'},
            params: {DirectionId}
        }).then(res=>{
                setDirection(res.data)
        })
    } catch (e) {
        console.log(e)
    }
}
export const DirectionsDetail=()=>{

    const [Direction,setDirection]=useState('')
    useEffect(()=>{
        GetDirection(setDirection)
    },[setDirection])

    return(
        <div>
            <Header/>
            <div className="direction container">
                <div className="outline outline_dark"></div>
                <div className="inline inline_dark"></div>

                <div className="direction__name">
                    <h1>{Direction.code+' '+Direction.name}</h1>
                </div>

                <div className="direction__table">
                    <table>
                        <tbody>
                        <tr className="column">
                            <td className="column__code" rowSpan="2">Код</td>
                            <td className="column__name"  rowSpan="2">Наименование<br/>направления<br/>подготовки</td>
                            <td className="column__places" colSpan="3">Количество мест</td>
                            <td className="column__program" rowSpan="2">Магистерские<br/>программы</td>
                            <td className="column__location" rowSpan="2">Место реализации</td>
                            <td className="column__exam" rowSpan="2">Перечень вступительных<br/>испытаний и<br/>минимальное количество<br/>баллов</td>
                            <td className="column__form" rowSpan="2">Форма обучения</td>
                            <td className="column__pay" rowSpan="2">Стоимость<br/>обучения,<br/>руб</td>
                        </tr>
                        <tr>
                            <td>ГБ</td>
                            <td>Из них ЦП</td>
                            <td>ПВЗ</td>
                        </tr>
                        <tr>
                            <td>{Direction.code}</td>
                            <td>{Direction.name}</td>
                            <td>{Direction.GP}</td>
                            <td>{Direction.SP}</td>
                            <td>{Direction.PP}</td>
                            <td>{Direction.program}</td>
                            <td>{Direction.place}</td>
                            <td>{Direction.exam}</td>
                            <td>{Direction.form_of_study}</td>
                            <td>{Direction.COST}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <Link className="direction__toBack" to="/directions">
                    <div className="back-button">
                        <img src={arrow}/>
                        <button>Назад</button>
                    </div>
                </Link>
            </div>
            <Footer/>
        </div>
    )
}