import axios from 'axios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import {Header} from '../Header'
import { Card , CardActionArea,CardActions, Button , CardMedia, RadioGroup, FormControlLabel, Radio, Accordion, AccordionSummary, AccordionDetails, IconButton, CardHeader} from '@material-ui/core'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { AuthContext } from '../../context/AuthContext'
import CreateIcon from '@material-ui/icons/Create';
import { Footer } from '../Footer'

export const Home = () =>{
    const [news, setNews] = useState([])
    const {rolek, userId} = useContext(AuthContext)

    const getNews = useCallback(async () =>{
        try {
            await axios.get('/api/news/all', {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {userId}
            })
            .then((response) => {
                setNews(response.data)
                console.log(response.data)
            })
            
        } catch (error) {
            console.log(error)
        }
    })

    async function addView(id) {
        try {
            console.log(id)
            await axios.post('/api/news/addview',{id: id },{
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getNews()
        
    }, [setNews])

        return(
            <div>
                <Header/>

                <div className = "home container">

                    <div className="outline outline_dark"></div>
                    <div className="inline inline_dark"></div>

                    <h1 className="home__title">Новости</h1>

                    <div className="home__content">
                        <div className = "home__news">
                        {
                            news.map((item)=>{
                                return(
                                <Card className="home__article" key={news.indexOf(item)}>
                                    <CardHeader className="home__article-subheader" subheader={"Опубликовано:" + item.date}></CardHeader>
                                    <CardActionArea className="home__article-area">
                                        <div className= "home__article-image">
                                            <img src={item.img} alt="" />
                                        </div>
                                        <h2 className="home__article-header">{item.header}</h2>
                                        <p className="home__article-info">{item.text}</p>
                                    </CardActionArea>
                                    <CardActions>
                                            <FavoriteIcon color = {item.isliked ? "secondary": "disabled"}/>
                                        <p>{item.likes}</p>
                                        
                                            <VisibilityIcon/>
                                        <p>{item.views}</p>
                                        {rolek == 1?  <Link to = {"/refactor/article/" + item._id}><IconButton>
                                            <CreateIcon/>
                                        </IconButton></Link>: null}
                                        <Link to = {"/news/" + item._id}><Button variant = "outlined" color="primary"  onClick = {() => addView(item._id)}>
                                            Подробнее
                                        </Button>
                                        </Link>
                                    </CardActions>
                                    
                                </Card>
                                )
                                
                            })
                        }
                        </div>
                    
                    </div>
                </div>

                <Footer />
            </div>
            
        )
    }