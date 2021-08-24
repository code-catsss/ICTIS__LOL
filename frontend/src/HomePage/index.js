import axios from 'axios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import {Header} from '../Header'
import { Card , CardActionArea,CardActions, Button , CardMedia, RadioGroup, FormControlLabel, Radio, Accordion, AccordionSummary, AccordionDetails, IconButton, CardHeader} from '@material-ui/core'
import './style.css'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { AuthContext } from '../context/AuthContext'
import CreateIcon from '@material-ui/icons/Create';

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
                <div className = "WrapContainer">
                    <div className = "MainBlock">
                        <h1>Новости</h1>
                        <div className = "MainBlockNews">
                        {
                            news.map((item)=>{
                                return(
                                <Card>
                                    <CardHeader subheader={"Опубликовано:" + item.date}>
                                    </CardHeader>
                                    <CardActionArea>
                                        <div className = "image_wrap"><img className= "imgNew" src={item.img} alt="" /></div>
                                        
                                        <h2>{item.header}</h2>
                                        <p>{item.text}</p>
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
                    <div className = "SubMenuBlock">
                        <h3>Рассширенный поиск:</h3>
                        <Accordion>
                            <AccordionSummary>
                                Фильтры
                            </AccordionSummary>
                            <AccordionDetails>
                            <RadioGroup aria-label="gender" name="gender1">
                            <FormControlLabel value="female" control={<Radio />} label="По популярности" />
                            <FormControlLabel value="male" control={<Radio />} label="По рейтингу" />
                            <FormControlLabel value="other" control={<Radio />} label="По дате" />
                            </RadioGroup>
                            
                            </AccordionDetails>
                        </Accordion>
                        {/* <h4>Сортировка:</h4> */}
                        <Accordion>
                            <AccordionSummary>
                                Сортировка
                            </AccordionSummary>
                            <AccordionDetails>
                            <RadioGroup aria-label="gender" name="gender1">
                            <FormControlLabel value="female" control={<Radio />} label="По популярности" />
                            <FormControlLabel value="male" control={<Radio />} label="По рейтингу" />
                            <FormControlLabel value="other" control={<Radio />} label="По дате" />
                            </RadioGroup>
                            
                            </AccordionDetails>
                        </Accordion>
                        

                    </div>
                </div>
            </div>
            
        )
    }