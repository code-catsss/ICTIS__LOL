import { Box, Button, TextField } from "@material-ui/core"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import './style.css'
export const DirCreate = () => {

    const [formpost, setFormPost] = useState({
        header: '',
        code: '',
        term: '',
        form_of_study: '',
        GB: '',
        CV: '',
        text: ''

    })

    const ChangeDate = (event) => {
        setFormPost({...formpost, [event.target.name]: event.target.value})

    }
    
    const AddDirection = async () => {
        try {
            await axios.post('/api/directions/add' , {...formpost} , {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => console.log(response))
        } catch (error) {
            console.log(error)
        }
    }
    

    return(
        <div className="formC">
            <h1>Создание</h1>
            <TextField name = "name" label="Название"  onChange={ChangeDate}/>
            <TextField name = "code" label="Код" onChange={ChangeDate} multiline/>
            <TextField name = "term" label="Срок обучения"  onChange={ChangeDate}/>
            <TextField name = "form_of_study" label="Форма обучения" onChange={ChangeDate} multiline/>
            <TextField name = "GB" label="ГБ"  onChange={ChangeDate}/>
            <TextField name = "CV" label="ЦВ" onChange={ChangeDate} multiline/>
            <TextField name = "text" label="Описание" onChange={ChangeDate} multiline/>

            <Link to = "/admin/directions"><Button onClick={AddDirection}>Обновить</Button></Link>
        </div>
    )
}