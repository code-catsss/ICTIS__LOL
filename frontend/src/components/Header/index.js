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
            <header class="header container">
                <div className="outline outline_light"></div>
                <div className="inline inline_light"></div>
                <div className="header__logo">
                    <img src={logo} alt="" />
                </div>
                <div className = "header__menu">

                    <div className = "header__menu header__menu_user">
                        <Link className="header__button">
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

                    </div>
                    {/* <div>
                    {rolek === 1 ? <Link to="/admin/users"><Button variant = "contained" color = "default">Админ</Button></Link>: null}
                    <Button className = "leave" variant = "contained" color = "secondary" onClick = {logout}>Ливнуть</Button>
                    </div> */}

                </div>
            </header>
        )
}