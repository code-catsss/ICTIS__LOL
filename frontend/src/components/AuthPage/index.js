import React, {useContext, useState} from 'react'
import {Header} from '../Header'
import {Switch, Link, Route} from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { Button, TextField } from '@material-ui/core'
import { Footer } from '../Footer'


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
    })
    const { login } = useContext(AuthContext)
    
    
    const ChangeDate = (event) => {
        setForm({...form, [event.target.name]: event.target.value})

    }

    const TestAuthForVaalidation = () =>{

        let error = false
        const new_form = {
            email: '',
            password: ''
        }

        if(form.email.length === 0) {
            error = true
            new_form.email = 'Это обязательное поле'
        }
        if(form.password.length === 0) {
            error = true
            new_form.password = 'Это обязательное поле'
        }

        setFormErrors(new_form)
        if (error) return false
        else return true
        

    }

    const TestResgisterForVaalidation = () =>{
        
    }

    const LogHandler = async () => {
        try {

            const check = TestAuthForVaalidation()
            if(!check) return

            console.log(formErrors)


            await axios.post('/api/auth/auth', {...form}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .catch(error =>{
                if (error.response.status === 400) {
                    console.log(error.response.data)
                    setFormErrors(error.response.data)   
                }
            })
            .then(response => {
                login(response.data.token, response.data.userId, response.data.role)
            })
        } catch (error) {
            console.log(error)
        }
    }

    
    const registrationAcc = async () => {
        TestResgisterForVaalidation()
        
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
            <div>
                <Header></Header>
                <Switch>
                    <Route path = "/registr" >
                    <React.Fragment>
                    <div className = "auth container">

                        <div className="outline outline_dark"></div>
                        <div className="inline inline_dark"></div>
                    
                    <div className = "auth__form">
                        <h1 className = "auth__title">Регистрация</h1>
                        <TextField className = "auth__input" label="ФИО*" type="text" name = "name" autoFocus={true} onChange={ChangeDate} />
                        <TextField className = "auth__input" label="Текущая Кафедра" type="text" name = "kafedr" autoFocus={true} onChange={ChangeDate} />
                        <TextField className = "auth__input" label="Учебная группа" type="text" name = "group" onChange={ChangeDate}/>

                        {formErrors.email.length === 0 ? <TextField className = "auth__input" label="Электронная почта*" type="text" name = "email" onChange={ChangeDate}/>
                        : <TextField className = "auth__input" error label={'sadasd'} type="text" name = "email" onChange={ChangeDate}/>}

                        {formErrors.email.length === 0 ? <TextField className = "auth__input" label="Пароль*" type="text" name = "password" onChange={ChangeDate}/>
                        : <TextField className = "auth__input" error label={'sdsa'} type="text" name = "password" onChange={ChangeDate}/>}

                        <Button className = "auth__submit" variant="contained" color="primary" onClick= {registrationAcc}>Зарегестрироваться</Button>
                        <Link className = "auth__link" to = "/auth" >Уже есть аккаунт?</Link>
                        <Link className = "auth__link" to = "/">Вернуться на главную</Link>
                    </div>
                    </div>
                    </React.Fragment>
                    </Route>




                    <Route path = "/auth">
                    <div className = "auth container">

                        <div className="outline outline_dark"></div>
                        <div className="inline inline_dark"></div>

                    <div className = "auth__form">
                        <h1  className = "auth__title">Авторизация</h1>
                        {formErrors.email.length === 0 ? <TextField label="Почта" type="text" name = "email" onChange={ChangeDate}/>
                        : <TextField error label={formErrors.email} type="text" name = "email" onChange={ChangeDate}/>}
                        
                        {formErrors.password.length === 0 ? <TextField label="Пароль" type="text" name = "password" onChange={ChangeDate}/>
                        : <TextField error label={formErrors.password} type="text" name = "password" onChange={ChangeDate}/>}
                        
                        
                        <Button variant="contained" color="primary" onClick= {LogHandler}>Авторизироваться</Button>
                        <Link className = "auth__link" to = "/registr">В первые на этом портале?</Link>
                        <Link className = "auth__link" to = "/">Вернуться на главную</Link>
                    </div>
                    </div>
                    </Route>
                    
                </Switch>
            <Footer />
        </div>
        )
    }