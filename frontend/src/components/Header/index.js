import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import MenuIcon from '@material-ui/icons/Menu';


import logo from '../../common/media/header/logo.png'

import directions from '../../common/media/header/directions.svg'
import home from '../../common/media/header/home.svg'
import test from '../../common/media/header/test.svg'
import profile from '../../common/media/header/profile.svg'
import { IconButton, Menu, MenuItem } from '@material-ui/core';


export const Header = () =>{
    const {login,logout, rolek} = useContext(AuthContext)
    const [menu, setmenu] = useState(null)
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
                    {login === true ? <div className="header__button"><button  onClick = {logout}>Выйти</button></div> : null}
                    </div>

                    <IconButton className="header__button-mobile" onClick={(event) => setmenu(event.currentTarget)} size="large" aria-controls="fade-menu" aria-haspopup="true">
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        keepMounted
                        open={Boolean(menu)}
                        anchorEl={menu}
                        onClose={() => setmenu(null)}
                    >
                        <MenuItem>
                        <Link to="directions" className="header__button">
                            Направления
                        </Link>
                        </MenuItem>
                        <MenuItem>
                        <Link to = "/test" className="header__button">
                            Тестирование
                        </Link>
                        </MenuItem>
                        <MenuItem>
                        <Link to = "/profile" className="header__button">
                            Личный кабинет
                        </Link>
                        </MenuItem>
                        <MenuItem>
                        <Link to = "/home" className="header__button">
                            Главная
                        </Link>
                        </MenuItem>
                        {rolek === 1 ? <MenuItem><Link to="/admin/users" className="header__button">Админ</Link></MenuItem>: null}
                        {login === true ? <MenuItem onClick = {logout}>Выйти</MenuItem> : null}
                     </Menu>

            </header>
        )
}