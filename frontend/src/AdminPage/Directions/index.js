import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@material-ui/core"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const DirectionsAdmin = () => {
    
const [directions, setDirections] = useState([])

const getSirections = useCallback(async () =>{
    try {
        await axios.get('/api/directions/all', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            setDirections(response.data)
        })
        
    } catch (error) {
        console.log(error)
    }
})


useEffect(()=>{
    getSirections()
}, [setDirections])

return(
    <div className="mainWrapper">

<Link to="/admin/directions/create"><Button className="CreateBut" color = "primary" variant="contained">Создать</Button></Link>  
<TextField className="Field" label= "Поиск"></TextField>

<Table aria-label="a dense table">
    <TableHead>
        <TableRow>
            <TableCell>Название</TableCell>
            <TableCell align="right">Код</TableCell>
            <TableCell align="right">Срок</TableCell>
            <TableCell align="right">Форма обучения</TableCell>
            <TableCell align="right">ГБ</TableCell>
            <TableCell align="right">ЦВ</TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
        {directions.map((row) => (
            <TableRow key={row._id} hover>
                <TableCell >{row.name}</TableCell>
                <TableCell align="right">{row.code}</TableCell>
                <TableCell align="right">{row.term}</TableCell>
                <TableCell align="right">{row.form_of_study}</TableCell>
                <TableCell align="right">{row.GB}</TableCell>
                <TableCell align="right">{row.CV}</TableCell>
                <TableCell align="right"><Button color = "primary" variant="contained">Редактировать</Button></TableCell>
                <TableCell align="right"><Button color = "secondary" variant="contained">Удалить</Button></TableCell>
            </TableRow>
        ))}
    </TableBody>
</Table>



</div>
)

}