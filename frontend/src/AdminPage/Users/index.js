import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@material-ui/core"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"

export const UsersAdmin = () => {
    
const [users, setUsers] = useState([])

const getUsers = useCallback(async () =>{
    try {
        await axios.get('/api/profile/all', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            setUsers(response.data)
        })
        
    } catch (error) {
        console.log(error)
    }
})


useEffect(()=>{
    getUsers()
}, [setUsers])

return(
    <div className="mainWrapper">

<Button className="CreateBut" color = "primary" variant="contained">Создать</Button>
<TextField className="Field" label= "Поиск"></TextField>

<Table aria-label="a dense table">
    <TableHead>
        <TableRow>
            <TableCell>Ф.И.О.</TableCell>
            <TableCell align="right">Пароль</TableCell>
            <TableCell align="right">Почта</TableCell>
            <TableCell align="right">Роль</TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
        {users.map((row) => (
            <TableRow key={row._id} hover>
                <TableCell >{row.name}</TableCell>
                <TableCell align="right">{row.password}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.role}</TableCell>
                <TableCell align="right"><Button color = "primary" variant="contained">Редактировать</Button></TableCell>
                <TableCell align="right"><Button color = "secondary" variant="contained">Удалить</Button></TableCell>
            </TableRow>
        ))}
    </TableBody>
</Table>

</div>
)

}