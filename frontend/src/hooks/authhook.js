import { useState, useEffect, useCallback } from "react";

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setuserId] = useState(null)
    const [rolek, setRole] = useState(null)
    const [isReady, setIsReady] = useState(false)

    const login = useCallback((jwtToken, id, role) => {
        setToken(jwtToken)
        setuserId(id)
        setRole(role)

        localStorage.setItem('userData', JSON.stringify({
            userId: id,
            token: jwtToken,
            rolek: role
        }))
    }, [])
    const logout = () => (
        setToken(null),
        setuserId(null),
        setRole(null),
        localStorage.removeItem('userData')
    )

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('userData'))
        if(data && data.token){
            login(data.token, data.userId, data.rolek)
        }

        setIsReady(true)
    }, [login])

    return {login,logout, token, userId, isReady, rolek}
}