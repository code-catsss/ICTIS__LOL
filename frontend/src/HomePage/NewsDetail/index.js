import { Breadcrumbs, Button} from "@material-ui/core"
import {Link} from 'react-router-dom'
import axios from "axios"
import { useCallback, useContext, useEffect, useState } from "react"
import './style.css'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { AuthContext } from "../../context/AuthContext"

export const NewsDetail = (props) => {
    const {userId} = useContext(AuthContext)
    const [article, setArticle]  = useState({
        header: '',
        text: ''
    })
    const [check_like, setChecklike] = useState(false)

   

    const getArticle = useCallback(async () => {
        try {
            await axios.get('/api/news/detail', {
                headers: {
                    'Content-Type': 'application/json'
                },
                params:{
                    id: props.match.params.id,
                    userId: userId
                }
            })
            .then((response) => {
                setArticle(response.data.thisnews)
                setChecklike(response.data.isInclude)
            })
        } catch (error) {
            console.log(error)
        }
    })

    const addLike = useCallback(async ()=> {
        try {
            console.log('lOL')
            await axios.post('/api/news/addlike',{id: props.match.params.id},{
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {userId}
            })
            .then(() => getArticle())
        } catch (error) {
            console.log(error)
        }
    })

    useEffect(() =>{
        getArticle()
    }, [setArticle])

    return(
        <div className="wrapper">
            <div className="contentsds">
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" to="/profile">
                    Новости
                </Link>
                <p>{article.header}</p>
            </Breadcrumbs>
            <h1>{article.header}</h1>
            <img src={article.img} alt="" />
            <p>{article.text}</p>
            <h3>Лайки: {article.likes}</h3>
            <div className = "ButArticle">
            {
                check_like ? <Button
                variant="contained"
                color="secondary"
                startIcon={<FavoriteIcon />}
                onClick = {addLike}
            >
            Нравится
            </Button> : <Button
                variant="contained"
                color="default"
                startIcon={<FavoriteIcon />}
                onClick = {addLike}
            >
            Нравится
            </Button>
            }
            
            <Link to = "/home"><Button variant = "contained" color="secondary">Назад</Button></Link>
            </div>
            </div>
        </div>
    )
}