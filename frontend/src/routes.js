import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import {Profile} from './components/ProfilePage';
import {Home} from './components/HomePage';
import {Auth} from './components/AuthPage';
import {NewsRef} from './components/AdminPage/News/Refactor';
import {NewsDetail} from './components/HomePage/NewsDetail'
import {MainScreen} from './components/MainScreen/index';
import { Admin } from './components/AdminPage';
import { Test } from './components/TestPage';

export const useRoutes = (isLogin, isInAdmin) => {
    if(isLogin){
        if (isInAdmin) {
            return(
                <Switch>
                    <Route path = "/" component = {MainScreen} exact></Route>
                    <Route path = "/home" component = {Home}></Route>
                    <Route path = "/admin" component = {Admin}></Route>
                    <Route path = "/refactor/article/:id" component = {NewsRef} ></Route>
                    <Route path = "/test" component = {Test}></Route>
                    <Route path = "/profile" component = {Profile}></Route>
                    <Route path = "/news/:id" component = {NewsDetail}></Route>
                    
                    <Redirect to="/home"/>
    
                </Switch>
            )
            
        } else {
            return(
                <Switch>
                    <Route path = "/" component = {MainScreen} exact></Route>
                    <Route path = "/home" component = {Home}></Route>
                    <Route path = "/test" component = {Test}></Route>
                    <Route path = "/profile" component = {Profile}></Route>
                    <Route path = "/news/:id" component = {NewsDetail}></Route>
                    
                    <Redirect to="/home"/>
    
                </Switch>
            )
            
        }
        
    }
        return(
            <Switch>
                <Redirect from= "/home" to="/auth"/>
                <Redirect from= "/profile" to="/auth"/>
                <Redirect from= "/test" to="/auth"/>
                <Route path = "/" component = {MainScreen} exact></Route>
                <Route path = "/auth" component = {Auth}></Route>
                <Route path = "/registr" component = {Auth}></Route>
                <Redirect to="/"/>
                
                
                
            </Switch>
        )
    }