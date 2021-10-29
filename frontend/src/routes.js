import React from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import {Profile} from './components/ProfilePage';
import {Home} from './components/HomePage';
import {Auth} from './components/AuthPage';
import {NewsRef} from './components/AdminPage/News/Refactor';
import {NewsDetail} from './components/HomePage/NewsDetail'
import {MainScreen} from './components/MainScreen/index';
import { Admin } from './components/AdminPage';
import { Test } from './components/TestPage';
import {Directions} from './components/DirectionsPage/index';
import {DirectionsDetail} from "./components/DirectionsPage/DiractionsDetail";

export const useRoutes = (isLogin, isInAdmin) => {

   

    if(!isLogin){
        console.log(isLogin)

        return(
            <Switch>
                <Route path = "/" component = {MainScreen} exact></Route>
                <Route path = "/auth" component = {Auth}></Route>
                <Route path = "/registr" component = {Auth}></Route>
                <Redirect from= "/home" to="/auth"/>
                <Redirect from= "/profile" to="/auth"/>
                <Redirect from= "/test" to="/auth"/>
                <Redirect from= "/directions" to="/auth"/>
                
            </Switch>
        )
        
        
    }else{
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
                    <Route path ="/directions" component={Directions}></Route>
                    <Route path ="/direction/:id" component={DirectionsDetail}></Route>
                    <Redirect to="/directions"/>
                    
    
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
                    <Route path ="/directions" component={Directions}></Route>
                    <Route path ="/direction/:id" component={DirectionsDetail}></Route>
                    <Redirect to="/directions"/>
    
                </Switch>
            )
            
        }
        }
    }