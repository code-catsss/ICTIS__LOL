import React, { useContext } from 'react'
import {PageWrapper, HeadText} from './style'
import './inde.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Button, withStyles } from '@material-ui/core'


export const Header = () =>{
    const {login,logout, rolek} = useContext(AuthContext)
        return(
            <header>
                <div className = "main_but_cont">
                    <div className = "no_main_but_cont">
                        <Link to = "/home"><Button variant = "contained" color = "primary">Главная</Button></Link>
                        <Link to = "/profile"><Button variant = "contained" color = "primary">Личный кабинет</Button></Link>
                        <Link to = "/test"><Button variant = "contained" color = "primary">Тестирование</Button></Link>
                        <Link><Button variant = "contained" color = "primary">Направления</Button></Link>
                    </div>
                    <div>
                    {rolek === 1 ? <Link to="/admin/users"><Button variant = "contained" color = "default">Админ</Button></Link>: null}
                    <Button className = "leave" variant = "contained" color = "secondary" onClick = {logout}>Ливнуть</Button>
                    </div>

                </div>
            </header>
        )
}