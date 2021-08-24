import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@material-ui/core"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"

export const PostsAdmin = () => {
    
const [news, setNews] = useState([])

const getNews = useCallback(async () =>{
    try {
        await axios.get('/api/news/all', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            setNews(response.data)
        })
        
    } catch (error) {
        console.log(error)
    }
})


useEffect(()=>{
    getNews()
}, [setNews])

return(
    <div className="mainWrapper">

<Button className="CreateBut" color = "primary" variant="contained">Создать</Button>
<TextField className="Field" label= "Поиск"></TextField>

<Table aria-label="a dense table">
    <TableHead>
        <TableRow>
            <TableCell>Заголовок</TableCell>
            <TableCell align="right">Текст</TableCell>
            <TableCell align="right">Дата публикации</TableCell>
            <TableCell align="right">Лайки</TableCell>
            <TableCell align="right">Просмотры</TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
        {news.map((row) => (
            <TableRow key={row._id} hover>
                <TableCell >{row.header}</TableCell>
                <TableCell align="right">{row.text}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.likes}</TableCell>
                <TableCell align="right">{row.views}</TableCell>
                <TableCell align="right"><Button color = "primary" variant="contained">Редактировать</Button></TableCell>
                <TableCell align="right"><Button color = "secondary" variant="contained">Удалить</Button></TableCell>
            </TableRow>
        ))}
    </TableBody>
</Table>

</div>
)

}