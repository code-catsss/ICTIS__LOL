import { Box, Button, TextField } from "@material-ui/core"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import './style.css'
export const NewsRef = (props) => {

    const [formpost, setFormPost] = useState({
        header: '',
        text: '',
        date: new Date()
    })

    const ChangeDate = (event) => {
        setFormPost({...formpost, [event.target.name]: event.target.value})

    }
    
    const AddPost = async () => {
        try {
            await axios.post('/api/news/add' , {...formpost} , {
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
        <div className="form">
            <h1>Редактирование</h1>
            <TextField name = "header" label="Заголовок" value= {formpost.header} onChange={ChangeDate}/>
            <TextField name = "text" label="Текст статьи" value= {formpost.text} onChange={ChangeDate} multiline/>
            <TextField
                name="date"
                type="datetime-local"
                defaultValue= {formpost.date}
                onChange={ChangeDate}
            />
            <Link to = "/home"><Button >Обновить</Button></Link>
        </div>
    )
}