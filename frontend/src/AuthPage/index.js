import React, {useContext, useEffect, useState} from 'react'
import Header from '../Header'
import './style.css'
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { Button, TextField } from '@material-ui/core'


export const Auth = () =>{
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        kafedr: '',
        group: '',
    })
    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
        name: ''
    })
    const [emailvalid, setemailvalid] = useState(true)
    const [passwordvalid, setpasswordvalid] = useState(true)
    const [namevalid, setnamevalid] = useState(true)
    const { login } = useContext(AuthContext)
    
    
    const ChangeDate = (event) => {
        setForm({...form, [event.target.name]: event.target.value})

    }

    const TestAuthForVaalidation = () =>{
        setemailvalid(true)
        setpasswordvalid(true)

        if (form.email === '') {
            setFormErrors({formErrors, email:'Это обязательное поле'})
            setemailvalid(false) 
        }
        if (form.password === '') {
         
         setFormErrors({...formErrors, password:'Это обязательное поле'})
         setpasswordvalid(false) 
        }
        if(!form.email.includes("@") && form.email != ''){//Накидать ещё проверок
            setemailvalid(false) 
            setFormErrors({...formErrors, email:'Неправельный формат введённой почты'})
        }
        if(form.password.length < 6 && form.password.length > 0){
            setpasswordvalid(false) 
            setFormErrors({...formErrors, password:'Минимальная длинна пароля: 6 знаков'})
        }
        
    }

    const TestResgisterForVaalidation = () =>{
        setemailvalid(true)
        setpasswordvalid(true)
        setemailvalid(true)

        if (form.email === '') {
            setemailvalid(false) 
            setFormErrors({...formErrors, email:'Это обязательное поле'})
        }
        if (form.password === '') {
         setpasswordvalid(false) 
         setFormErrors({...formErrors, password:'Это обязательное поле'})
        }
        if (form.name === '') {
            setnamevalid(false) 
            setFormErrors({...formErrors, name:'Это обязательное поле'})
           }
        if(!form.email.includes("@") && form.email != ''){//Накидать ещё проверок
            setemailvalid(false) 
            setFormErrors({...formErrors, email:'Неправельный формат введённой почты'})
        }
        if(form.password.length < 6 && form.password.length > 0){
            setpasswordvalid(false) 
            setFormErrors({...formErrors, password:'Минимальная длинна пароля: 6 знаков'})
        }
        
    }

    const LogHandler = async () => {
        try {
            TestAuthForVaalidation()

            if(setemailvalid === false || setpasswordvalid === false){return}


            await axios.post('/api/auth/auth', {...form}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                login(response.data.token, response.data.userId, response.data.role)
            })
        } catch (error) {
            console.log(error)
        }
    }

    
    const RegisterDate = async () => {
        TestResgisterForVaalidation()
        if(setemailvalid === false || setpasswordvalid === false){return}
        
        try {
            await axios.post('/api/auth/registr', {...form}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log(response)
                if(response.data.isOK){
                    LogHandler()
                }    
            }
            )
        } catch (error) {
            console.log(error)
        }
    }

        return(
                <Switch>
                    <Route path = "/registr" >
                    <React.Fragment>
                    <div className = "form">
                        <h1>Регистрация</h1>
                        <TextField label="ФИО*" type="text" name = "name" autoFocus={true} onChange={ChangeDate} />
                        <TextField label="Текущая Кафедра" type="text" name = "kafedr" autoFocus={true} onChange={ChangeDate} />
                        <TextField label="Номер учебной группы" type="text" name = "group" onChange={ChangeDate}/>

                        {emailvalid ? <TextField label="Электронная почта*" type="text" name = "email" onChange={ChangeDate}/>
                        : <TextField error label={formErrors.email} type="text" name = "email" onChange={ChangeDate}/>}

                        {passwordvalid ? <TextField label="Пароль*" type="text" name = "password" onChange={ChangeDate}/>
                        : <TextField error label={formErrors.password} type="text" name = "password" onChange={ChangeDate}/>}

                        <Button variant="contained" color="primary" onClick= {RegisterDate}>Зарегестрироваться</Button>
                        <Link to = "/auth" onClick= {()=>{
                            setemailvalid(true)
                            setpasswordvalid(true)
                        }}>Уже есть аккаунт?</Link>
                        <Link to = "/">Вернуться на главную</Link>
                    </div>
                    </React.Fragment>
                    </Route>
                    <Route path = "/auth">
                    <div className = "form">
                        <h1>Авторизация</h1>
                        {emailvalid ? <TextField label="Почта" type="text" name = "email" onChange={ChangeDate}/>
                        : <TextField error label={formErrors.email} type="text" name = "email" onChange={ChangeDate}/>}
                        
                        {passwordvalid ? <TextField label="Пароль" type="text" name = "password" onChange={ChangeDate}/>
                        : <TextField error label={formErrors.password} type="text" name = "password" onChange={ChangeDate}/>}
                        
                        
                        <Button variant="contained" color="primary" onClick= {LogHandler}>Авторизироваться</Button>
                        <Link to = "/registr" onClick= {()=>{
                            setemailvalid(true)
                            setpasswordvalid(true)
                        }}>В первые на этом портале?</Link>
                        <Link to = "/">Вернуться на главную</Link>
                    </div>
                    </Route>
                </Switch>
        
        )
    }