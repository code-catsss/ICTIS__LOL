import { AppBar, Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Toolbar } from "@material-ui/core"
import axios from "axios"
import { useCallback } from "react"
import { useEffect, useState } from "react"
import {Route, Link, Switch} from 'react-router-dom'
import './style.css'
import { TestAXM } from "./TEST_ANIME"
import { PostsAdmin } from "./News"
import { UsersAdmin } from "./Users"
import { DirectionsAdmin } from "./Directions"
import { DirCreate } from "./Directions/Create"

export const Admin = () => {

    
    return(
        <div>
            <header>
                <h1>Панель администратора</h1>
                <Link to = "/admin/users"><Button variant = "outlined" >Пользователи</Button></Link>
                <Link to = "/admin/posts"><Button variant = "outlined">Посты</Button></Link>
                <Link to = "/admin/directions"><Button variant = "outlined">Направления</Button></Link>
                <Link to = "/admin/test"><Button variant = "outlined">Тестирование</Button></Link>
                <Link to = "/home"><Button variant = "contained">Обратно в портал</Button></Link>
            </header>

            <Switch>
                <Route path= "/admin/users">
                    <UsersAdmin></UsersAdmin>
                </Route>

                <Route path= "/admin/posts">
                   <PostsAdmin></PostsAdmin>
                </Route>

                <Route path= "/admin/directions" exact>
                    <DirectionsAdmin></DirectionsAdmin>
                </Route>

                <Route path= "/admin/directions/create">
                    <DirCreate></DirCreate>
                </Route>

                

                <Route path= "/admin/test">
                    <TestAXM></TestAXM>
                </Route>
            </Switch>

            

        </div> 
    )
}