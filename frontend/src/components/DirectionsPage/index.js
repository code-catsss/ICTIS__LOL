import {Header} from '../Header'
import { Footer } from '../Footer'
import axios from 'axios'
import React, {useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import filin from './filin.png'
export const Directions = () => {

    const [Directions,setDirections]=useState([])

    const getDirections = useCallback(async () =>{
        try {
            await axios.get('/api/directions/all',{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    console.log(res.data)
                    setDirections(res.data)
                })

        } catch (error) {
            console.log(error)
        }
    })
    useEffect(()=>{
        getDirections()
    },[setDirections])
return(
    <div>
    <Header/>
        <div className='directions container'>

                <div className="outline outline_dark"></div>
                <div className="inline inline_dark"></div>

                <div className="directions__label">
                    <h1>Список направлений:</h1>
                    <ul>
                        {
                            Directions?
                                Directions.map(direction=>(

                                   <Link to={'/direction/'+ direction._id}>
                                       <li>
                                               {direction.code+' '+direction.name}
                                       </li>
                                   </Link>
                                    )
                                )
                                :
                                <h1>нет направлений</h1>
                        }
                    </ul>
                </div>

                <div className="directions__text">
                    <h1>Первые <b>3</b> направления<br/>наиболее рекомендуемые<br/>для Вас.</h1>
                </div>
                <div className="directions__img">
                    <img src={filin}/>
                </div>

            </div>

        <Footer/>
    </div>
    )
}