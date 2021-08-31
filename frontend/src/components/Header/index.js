import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'


import logo from '../../common/media/header/logo.png'

import directions from '../../common/media/header/directions.svg'
import home from '../../common/media/header/home.svg'
import test from '../../common/media/header/test.svg'
import profile from '../../common/media/header/profile.svg'


export const Header = () =>{
    const {login,logout, rolek} = useContext(AuthContext)
        return(
            <header className="header container">
                <div className="outline outline_light"></div>
                <div className="inline inline_light"></div>
                <div className="header__logo">
                    <img src={logo} alt="" />
                </div>
                    <div className = "header__menu">
                        <Link to="directions" className="header__button">
                            <img src={directions} alt="" />
                            <button>Направления</button>
                        </Link>
                        <Link to = "/test" className="header__button">
                            <img src={test} alt="" />
                            <button>Тестирование</button>
                        </Link>
                        <Link to = "/profile" className="header__button">
                            <img src={profile} alt="" />
                            <button>Личный кабинет</button>
                        </Link>
                        <Link to = "/home" className="header__button">
                            <img src={home} alt="" />
                            <button>Главная</button>
                        </Link>
                    {rolek === 1 ? <Link to="/admin/users" className="header__button"><button >Админ</button></Link>: null}
                    <div className="header__button"><button  onClick = {logout}>Выйти</button></div>
                    </div>

            </header>
        )
}